import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120),
  password: z.string().min(1, "Password is required").max(72),
});

export type AuthActionResult =
  | { ok: true; verificationKey?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
