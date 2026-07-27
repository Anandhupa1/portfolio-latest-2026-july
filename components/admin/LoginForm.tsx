"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/auth";
import type { AuthActionResult } from "@/lib/auth/schema";

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<AuthActionResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const res = await loginAdmin({
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
    });

    if (res.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }

    setPending(false);
    setResult(res);
    if (res.fieldErrors) setFieldErrors(res.fieldErrors);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="admin-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="contact-field"
          disabled={pending}
        />
        {fieldErrors.email?.[0] && (
          <p className="mt-1 font-mono text-[11px] text-signal">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="admin-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="contact-field"
          disabled={pending}
        />
        {fieldErrors.password?.[0] && (
          <p className="mt-1 font-mono text-[11px] text-signal">
            {fieldErrors.password[0]}
          </p>
        )}
      </div>

      {result && !result.ok && (
        <p className="font-mono text-xs text-signal" role="alert">
          {result.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="admin-btn w-full">
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center font-mono text-xs text-paperDimmer">
        Need an account?{" "}
        <Link href="/admin/register" className="text-signal hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
