import MediaManager from "@/components/admin/MediaManager";
import { listMedia } from "@/app/actions/media";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const result = await listMedia();

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-paperDimmer">
          Assets
        </p>
        <h1 className="font-display text-3xl font-semibold text-paper">
          Media
        </h1>
        <p className="mt-2 text-sm text-paperDim">
          Upload and manage images in R2. Save object keys on documents; build
          public URLs at render time with{" "}
          <span className="font-mono text-xs text-paperDimmer">
            MEDIA_BASE_URL
          </span>
          .
        </p>
      </div>

      <MediaManager
        initialItems={result.ok ? result.data : []}
        initialError={result.ok ? undefined : result.error}
      />
    </div>
  );
}
