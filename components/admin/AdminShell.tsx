import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAdmin } from "@/app/actions/auth";

type Props = {
  email: string;
  children: ReactNode;
};

export default function AdminShell({ email, children }: Props) {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="border-b border-line bg-surface/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-mono text-sm font-semibold tracking-wider text-paper"
            >
              ADMIN
            </Link>
            <nav className="hidden sm:block">
              <Link
                href="/admin"
                className="font-mono text-xs uppercase tracking-widest text-paperDim hover:text-paper"
              >
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-paperDimmer sm:inline">
              {email}
            </span>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="font-mono text-xs uppercase tracking-wider text-paperDim transition-colors hover:text-signal"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
