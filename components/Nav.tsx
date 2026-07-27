"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-[background,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-line bg-ink/75 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-paper"
        >
          <span
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-teal"
            aria-hidden
          />
          ANANDHU P A
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs font-medium uppercase tracking-widest text-paperDim transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[11px] tracking-wide text-paperDim">
          <span
            className="relative flex h-2 w-2"
            aria-hidden
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
          </span>
          <span className="hidden sm:inline">Available for projects</span>
          <span className="sm:hidden">Available</span>
        </div>
      </nav>
    </header>
  );
}
