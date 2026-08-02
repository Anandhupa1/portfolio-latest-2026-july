"use client";

import { useState, type FormEvent } from "react";
import {
  deleteMedia,
  listMedia,
  uploadMedia,
} from "@/app/actions/media";
import type { MediaItem } from "@/lib/media/types";

type Props = {
  initialItems: MediaItem[];
  initialError?: string;
};

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaManager({ initialItems, initialError }: Props) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState(initialError ?? null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  async function refresh() {
    const res = await listMedia();
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setItems(res.data);
    setError(null);
  }

  async function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setMessage(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await uploadMedia(fd);
    setUploading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    form.reset();
    setMessage(`Uploaded ${res.data.key}`);
    setSelectedKey(res.data.key);
    await refresh();
  }

  async function onDelete(key: string) {
    if (!window.confirm(`Delete ${key}?`)) return;

    setDeletingKey(key);
    setError(null);
    setMessage(null);

    const res = await deleteMedia(key);
    setDeletingKey(null);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    setItems((prev) => prev.filter((item) => item.key !== key));
    if (selectedKey === key) setSelectedKey(null);
    setMessage("Deleted.");
  }

  async function copyKey(key: string) {
    try {
      await navigator.clipboard.writeText(key);
      setMessage(`Copied key: ${key}`);
      setSelectedKey(key);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onUpload}
        className="rounded-lg border border-line bg-surface px-5 py-6"
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-paperDimmer">
          Upload
        </h2>
        <p className="mt-2 text-sm text-paperDim">
          JPEG, PNG, or WebP · max 10MB. Store the returned key in MongoDB — not
          the full URL.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label htmlFor="file" className="admin-label">
              Image file
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              disabled={uploading}
              className="contact-field file:mr-3 file:border-0 file:bg-transparent file:font-mono file:text-xs file:uppercase file:tracking-wider file:text-paperDim"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="admin-btn shrink-0 sm:mb-0"
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </div>
      </form>

      {(error || message) && (
        <div
          className={
            error
              ? "rounded-md border border-signal/30 bg-signal/10 px-4 py-3 font-mono text-xs text-signal"
              : "rounded-md border border-teal/30 bg-teal/10 px-4 py-3 font-mono text-xs text-paper"
          }
          role="status"
        >
          {error ?? message}
        </div>
      )}

      <section>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-paperDimmer">
            Library · {items.length}
          </h2>
          <button
            type="button"
            onClick={() => void refresh()}
            className="font-mono text-[11px] uppercase tracking-wider text-paperDim transition-colors hover:text-paper"
          >
            Refresh
          </button>
        </div>

        {items.length === 0 ? (
          <p className="rounded-lg border border-line bg-surface px-5 py-8 text-sm text-paperDim">
            No media yet. Upload an image to get started.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const busy = deletingKey === item.key;
              const selected = selectedKey === item.key;
              return (
                <li
                  key={item.key}
                  className={
                    selected
                      ? "overflow-hidden rounded-lg border border-teal/40 bg-surface"
                      : "overflow-hidden rounded-lg border border-line bg-surface"
                  }
                >
                  <div className="relative aspect-[4/3] bg-surface2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 px-4 py-3">
                    <div>
                      <p
                        className="truncate font-mono text-[11px] text-paper"
                        title={item.key}
                      >
                        {item.key}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-paperDimmer">
                        {formatBytes(item.size)} ·{" "}
                        {new Date(item.uploaded).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => void copyKey(item.key)}
                        className="font-mono text-[11px] uppercase tracking-wider text-paperDim transition-colors hover:text-paper"
                      >
                        Copy key
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] uppercase tracking-wider text-paperDim transition-colors hover:text-paper"
                      >
                        Open
                      </a>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onDelete(item.key)}
                        className="font-mono text-[11px] uppercase tracking-wider text-paperDim transition-colors hover:text-signal disabled:opacity-50"
                      >
                        {busy ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
