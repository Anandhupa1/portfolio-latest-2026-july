import type { MediaItem, MediaUploadResult } from "@/lib/media/types";

function workerConfig() {
  const baseUrl = process.env.MEDIA_WORKER_URL?.replace(/\/$/, "");
  const secret = process.env.WORKER_SECRET;
  if (!baseUrl) {
    throw new Error("MEDIA_WORKER_URL must be set in the environment");
  }
  if (!secret) {
    throw new Error("WORKER_SECRET must be set in the environment");
  }
  return { baseUrl, secret };
}

async function workerFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const { baseUrl, secret } = workerConfig();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${secret}`);

  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

async function readWorkerError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string };
    if (body.error) return body.error;
  } catch {
    // ignore JSON parse failures
  }
  return `Media worker request failed (${res.status})`;
}

export async function workerUpload(file: File): Promise<MediaUploadResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await workerFetch("/media", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error(await readWorkerError(res));
  }

  return (await res.json()) as MediaUploadResult;
}

export async function workerList(): Promise<MediaItem[]> {
  const res = await workerFetch("/media", { method: "GET" });
  if (!res.ok) {
    throw new Error(await readWorkerError(res));
  }
  return (await res.json()) as MediaItem[];
}

export async function workerDelete(key: string): Promise<void> {
  const res = await workerFetch(`/media/${encodeURIComponent(key)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(await readWorkerError(res));
  }
}
