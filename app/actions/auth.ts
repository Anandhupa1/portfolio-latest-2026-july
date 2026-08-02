"use server";

import { redirect } from "next/navigation";
import {
  loginSchema,
  registerSchema,
  type AuthActionResult,
} from "@/lib/auth/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  clearSessionCookie,
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth/session";
import { getUsersCollection, type AdminUser } from "@/lib/auth/users";

export async function registerAdmin(
  raw: unknown
): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const email = parsed.data.email.toLowerCase();
  const { password } = parsed.data;

  try {
    const users = await getUsersCollection();
    const existing = await users.findOne({ email });
    if (existing) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const passwordHash = await hashPassword(password);
    await users.insertOne({
      email,
      passwordHash,
      isVerified: false,
      createdAt: new Date(),
    } as AdminUser);

    return { ok: true };
  } catch (err) {
    console.error("registerAdmin error:", err);
    return { ok: false, error: "Could not create account. Try again." };
  }
}

export async function loginAdmin(raw: unknown): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const email = parsed.data.email.toLowerCase();
  const { password } = parsed.data;

  try {
    const users = await getUsersCollection();
    const user = await users.findOne({ email });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return { ok: false, error: "Invalid email or password." };
    }

    if (!user.isVerified) {
      return {
        ok: false,
        error: "Need super admin approval to continue login.",
      };
    }

    const token = await createSessionToken({
      sub: user._id.toString(),
      email: user.email,
    });
    await setSessionCookie(token);
    return { ok: true };
  } catch (err) {
    console.error("loginAdmin error:", err);
    return { ok: false, error: "Could not sign in. Try again." };
  }
}

export async function logoutAdmin() {
  await clearSessionCookie();
  redirect("/admin/login");
}
