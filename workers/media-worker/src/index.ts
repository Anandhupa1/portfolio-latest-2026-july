const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 10 * 1024 * 1024;
const KEY_PREFIX = "media/";

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

function timingSafeEqualString(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBuf = enc.encode(a);
  const bBuf = enc.encode(b);
  if (aBuf.byteLength !== bBuf.byteLength) return false;
  return crypto.subtle.timingSafeEqual(aBuf, bBuf);
}

function assertAuth(request: Request, env: Env): boolean {
  const header = request.headers.get("Authorization") ?? "";
  if (!header.startsWith("Bearer ")) return false;
  const token = header.slice("Bearer ".length).trim();
  if (!token || !env.WORKER_SECRET) return false;
  return timingSafeEqualString(token, env.WORKER_SECRET);
}

function sanitizeFilename(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? "file";
  const cleaned = base
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
  return cleaned || "file";
}

function publicUrl(env: Env, key: string): string {
  const base = env.MEDIA_PUBLIC_BASE_URL.replace(/\/$/, "");
  return `${base}/${key}`;
}

function isSafeKey(key: string): boolean {
  return (
    key.startsWith(KEY_PREFIX) &&
    !key.includes("..") &&
    !key.includes("\\") &&
    key.length <= 512
  );
}

async function handleUpload(request: Request, env: Env): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Expected multipart/form-data body." }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return json({ error: 'Missing "file" field.' }, 400);
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return json(
      { error: "Invalid file type. Allowed: image/jpeg, image/png, image/webp." },
      400
    );
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return json({ error: "File must be between 1 byte and 10MB." }, 400);
  }

  const key = `${KEY_PREFIX}${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;
  await env.MEDIA_BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  return json({ key, url: publicUrl(env, key) }, 201);
}

async function handleList(env: Env): Promise<Response> {
  const items: {
    key: string;
    url: string;
    size: number;
    uploaded: string;
  }[] = [];

  let cursor: string | undefined;
  do {
    const page = await env.MEDIA_BUCKET.list({
      prefix: KEY_PREFIX,
      cursor,
      limit: 1000,
    });
    for (const obj of page.objects) {
      items.push({
        key: obj.key,
        url: publicUrl(env, obj.key),
        size: obj.size,
        uploaded: obj.uploaded.toISOString(),
      });
    }
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  return json(items);
}

async function handleDelete(key: string, env: Env): Promise<Response> {
  if (!isSafeKey(key)) {
    return json({ error: "Invalid key." }, 400);
  }
  await env.MEDIA_BUCKET.delete(key);
  return json({ success: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (!assertAuth(request, env)) {
      return json({ error: "Unauthorized" }, 401);
    }

    const url = new URL(request.url);
    const { pathname } = url;

    try {
      if (request.method === "POST" && pathname === "/media") {
        return await handleUpload(request, env);
      }

      if (request.method === "GET" && pathname === "/media") {
        return await handleList(env);
      }

      if (request.method === "DELETE" && pathname.startsWith("/media/")) {
        const key = decodeURIComponent(pathname.slice("/media/".length));
        return await handleDelete(key, env);
      }

      return json({ error: "Not found" }, 404);
    } catch (err) {
      console.error("media-worker error:", err);
      return json({ error: "Internal server error" }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
