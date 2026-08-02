/** Build a public media URL from a stored R2 object key. */
export function mediaUrl(key: string): string {
  const base = process.env.MEDIA_BASE_URL?.replace(/\/$/, "");
  if (!base) {
    throw new Error("MEDIA_BASE_URL must be set in the environment");
  }
  const normalized = key.replace(/^\//, "");
  return `${base}/${normalized}`;
}
