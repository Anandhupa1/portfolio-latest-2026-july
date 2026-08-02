"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";
import { logoutAdmin } from "@/app/actions/auth";

type Props = {
  email: string;
  children: ReactNode;
};

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/messages", label: "Messages", exact: false },
  { href: "/admin/media", label: "Media", exact: false },
] as const;

export default function AdminShell({ email, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-line px-5 py-5">
        <Link
          href="/admin"
          className="font-mono text-sm font-semibold tracking-[0.2em] text-paper"
        >
          ADMIN
        </Link>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-paperDimmer">
          Control panel
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
        {NAV.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-md px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors",
                active
                  ? "bg-surface2 text-paper"
                  : "text-paperDim hover:bg-surface2/60 hover:text-paper"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={clsx(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  active ? "bg-signal" : "bg-paperDimmer"
                )}
                aria-hidden
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-line px-5 py-4">
        <p className="truncate font-mono text-[11px] text-paperDimmer" title={email}>
          {email}
        </p>
        <Link
          href="/"
          className="block font-mono text-[11px] uppercase tracking-wider text-paperDim transition-colors hover:text-paper"
        >
          View site
        </Link>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="font-mono text-[11px] uppercase tracking-wider text-paperDim transition-colors hover:text-signal"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-line bg-surface md:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-40 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={clsx(
            "absolute inset-0 bg-ink/70 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={clsx(
            "absolute inset-y-0 left-0 w-64 border-r border-line bg-surface shadow-xl transition-transform duration-200 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebar}
        </aside>
      </div>

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-ink/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-paper"
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M3 4.5h12M3 9h12M3 13.5h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="font-mono text-xs font-semibold tracking-[0.18em] text-paper">
            ADMIN
          </span>
        </header>

        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
