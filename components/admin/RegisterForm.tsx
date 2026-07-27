"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { registerAdmin } from "@/app/actions/auth";
import type { AuthActionResult } from "@/lib/auth/schema";

export default function RegisterForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<AuthActionResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
    };

    const res = await registerAdmin(payload);
    setPending(false);
    setResult(res);
    if (!res.ok && res.fieldErrors) setFieldErrors(res.fieldErrors);
    if (res.ok) e.currentTarget.reset();
  }

  if (result?.ok) {
    return (
      <div className="space-y-4 rounded-md border border-teal/30 bg-teal/10 p-5">
        <p className="font-display text-lg font-semibold text-paper">
          Account created
        </p>
        <p className="text-sm text-paperDim">
          It is locked until you verify it in MongoDB. Find the user in{" "}
          <code className="text-signal">admin_users</code> and set{" "}
          <code className="text-signal">isVerified</code> to{" "}
          <code className="text-teal">true</code>.
        </p>
        <div>
          <p className="admin-label">verificationKey</p>
          <code className="mt-1 block break-all rounded border border-line bg-ink px-3 py-2 font-mono text-xs text-paper">
            {result.verificationKey}
          </code>
        </div>
        <Link href="/admin/login" className="admin-btn inline-flex">
          Go to sign in
        </Link>
      </div>
    );
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
          autoComplete="new-password"
          required
          minLength={8}
          className="contact-field"
          disabled={pending}
          placeholder="Min 8 characters"
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
        {pending ? "Creating…" : "Create account"}
      </button>

      <p className="text-center font-mono text-xs text-paperDimmer">
        Already registered?{" "}
        <Link href="/admin/login" className="text-signal hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
