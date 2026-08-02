# media-worker

Cloudflare Worker that manages portfolio media in an R2 bucket. Called only from the Next.js server (never from the browser).

## Endpoints

| Method | Path | Body | Response |
|--------|------|------|----------|
| `POST` | `/media` | `multipart/form-data` field `file` | `{ key, url }` |
| `GET` | `/media` | — | `[{ key, url, size, uploaded }]` |
| `DELETE` | `/media/:key` | — | `{ success: true }` |

Auth on every request: `Authorization: Bearer <WORKER_SECRET>`.

## One-time setup

1. Create an R2 bucket named `my-app-images` (or change `bucket_name` in `wrangler.jsonc`).
2. Enable a public bucket URL (r2.dev or custom domain) and set `MEDIA_PUBLIC_BASE_URL` in `wrangler.jsonc`.
3. Install deps and generate types:

```bash
cd workers/media-worker
npm install
npx wrangler types
```

4. Set the production secret:

```bash
npx wrangler secret put WORKER_SECRET
```

5. For local dev, copy `.dev.vars.example` → `.dev.vars` and set the same secret.

## Scripts

```bash
npm run dev      # wrangler dev (local R2 simulation by default)
npm run deploy   # deploy to Cloudflare
npm run types    # regenerate Env from wrangler.jsonc
```

## Smoke test (after `npm run dev`)

```bash
curl -X POST http://127.0.0.1:8787/media \
  -H "Authorization: Bearer YOUR_SECRET" \
  -F "file=@./test.jpg;type=image/jpeg"
```
