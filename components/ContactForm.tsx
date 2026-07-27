"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import clsx from "clsx";
import { submitContact } from "@/app/actions/contact";
import {
  PROJECT_TYPES,
  projectTypeLabels,
  type ContactActionResult,
} from "@/lib/contact-schema";

const fieldClass = "contact-field";

const labelClass =
  "mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-paperDimmer";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ContactActionResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
      project_type: String(fd.get("project_type") ?? ""),
      website: String(fd.get("website") ?? ""),
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const res = await submitContact(payload);
      setResult(res);
      if (!res.ok && res.fieldErrors) {
        setFieldErrors(res.fieldErrors);
        return;
      }
      if (res.ok) form.reset();
    } catch {
      setResult({
        ok: false,
        error: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setPending(false);
    }
  }

  if (result?.ok) {
    return (
      <div
        className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-md border border-teal/30 bg-teal/10 px-5 py-8 text-center"
        role="status"
      >
        <p className="font-display text-lg font-semibold text-paper">
          Message sent
        </p>
        <p className="mt-2 text-sm text-paperDim">
          Thanks — I usually reply within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-5 font-mono text-xs tracking-wide text-teal underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-4 text-left"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" error={fieldErrors.name?.[0]} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            className={fieldClass}
            placeholder="Your name"
            disabled={pending}
          />
        </Field>
        <Field id="email" label="Email" error={fieldErrors.email?.[0]} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            className={fieldClass}
            placeholder="you@company.com"
            disabled={pending}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="company" label="Company" error={fieldErrors.company?.[0]}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            className={fieldClass}
            placeholder="Optional"
            disabled={pending}
          />
        </Field>
        <Field
          id="project_type"
          label="What do you need?"
          error={fieldErrors.project_type?.[0]}
        >
          <select
            id="project_type"
            name="project_type"
            className={clsx(fieldClass, "appearance-none")}
            defaultValue=""
            disabled={pending}
          >
            <option value="">Select (optional)</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {projectTypeLabels[t]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label="Message"
        error={fieldErrors.message?.[0]}
        required
      >
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          className={clsx(fieldClass, "min-h-[120px] resize-y")}
          placeholder="What are you building or fixing?"
          disabled={pending}
        />
      </Field>

      <div
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {result && !result.ok && (
        <p className="font-mono text-xs text-signal" role="alert">
          {result.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center bg-signal px-5 py-3 font-mono text-sm font-medium tracking-wide text-ink transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal sm:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="text-signal"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 font-mono text-[11px] text-signal">{error}</p>
      ) : null}
    </div>
  );
}
