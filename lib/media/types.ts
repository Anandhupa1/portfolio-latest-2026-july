export type MediaItem = {
  key: string;
  url: string;
  size: number;
  uploaded: string;
};

export type MediaUploadResult = {
  key: string;
  url: string;
};

export type MediaActionResult<T = void> =
  | (T extends void ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string };
