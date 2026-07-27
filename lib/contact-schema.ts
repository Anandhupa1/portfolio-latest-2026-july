import { z } from "zod";

export const PROJECT_TYPES = [
  "new_build",
  "fix_existing",
  "performance",
  "commerce",
  "other",
] as const;

export const projectTypeLabels: Record<(typeof PROJECT_TYPES)[number], string> =
  {
    new_build: "New build",
    fix_existing: "Fix existing system",
    performance: "Performance / scaling",
    commerce: "Commerce / multi-locale",
    other: "Other",
  };

const emptyToUndef = (v: unknown) =>
  v === "" || v === null || v === undefined ? undefined : v;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short")
    .max(2000, "Message is too long"),
  company: z.preprocess(
    emptyToUndef,
    z.string().trim().max(120, "Company name is too long").optional()
  ),
  project_type: z.preprocess(
    emptyToUndef,
    z.enum(PROJECT_TYPES).optional()
  ),
  website: z.preprocess(emptyToUndef, z.string().max(0).optional()),
  page_url: z.preprocess(
    emptyToUndef,
    z.string().trim().max(500).optional()
  ),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
