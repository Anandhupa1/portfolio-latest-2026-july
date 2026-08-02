"use server";

import { requireVerifiedAdmin } from "@/lib/auth/require-admin";
import type { MediaActionResult, MediaItem, MediaUploadResult } from "@/lib/media/types";
import { workerDelete, workerList, workerUpload } from "@/lib/media/worker";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 10 * 1024 * 1024;

export async function uploadMedia(
  formData: FormData
): Promise<MediaActionResult<MediaUploadResult>> {
  const admin = await requireVerifiedAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file to upload." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Only JPEG, PNG, and WebP images are allowed.",
    };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Image must be 10MB or smaller." };
  }

  try {
    const data = await workerUpload(file);
    return { ok: true, data };
  } catch (err) {
    console.error("uploadMedia error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}

export async function listMedia(): Promise<MediaActionResult<MediaItem[]>> {
  const admin = await requireVerifiedAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  try {
    const data = await workerList();
    return { ok: true, data };
  } catch (err) {
    console.error("listMedia error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not list media.",
    };
  }
}

export async function deleteMedia(
  key: string
): Promise<MediaActionResult> {
  const admin = await requireVerifiedAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  if (!key || typeof key !== "string" || !key.startsWith("media/")) {
    return { ok: false, error: "Invalid media key." };
  }

  try {
    await workerDelete(key);
    return { ok: true };
  } catch (err) {
    console.error("deleteMedia error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Delete failed.",
    };
  }
}
