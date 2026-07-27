"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import type { ProjectTicket } from "@/lib/projects";

type TicketCardProps = {
  project: ProjectTicket;
  open: boolean;
  onToggle: () => void;
  index: number;
};

export default function TicketCard({
  project,
  open,
  onToggle,
  index,
}: TicketCardProps) {
  const reduced = useReducedMotion();
  const isLive = project.status === "LIVE";

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-lg border border-line bg-surface"
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-surface2 sm:gap-4 sm:px-5 sm:py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal"
        >
          <span className="font-mono text-[11px] tracking-wider text-paperDimmer">
            {project.id}
          </span>
          <span className="flex-1 font-display text-lg font-semibold text-paper sm:text-xl">
            {project.title}
          </span>
          <span
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider",
              isLive
                ? "border-teal/30 bg-teal/10 text-teal"
                : "border-signal/30 bg-signal/10 text-signal"
            )}
          >
            {isLive && (
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
              </span>
            )}
            {project.status}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="text-paperDimmer"
            aria-hidden
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 border-t border-line px-4 py-6 sm:px-5 sm:py-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                {project.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 32)}
                    className="mb-4 text-sm leading-relaxed text-paperDim last:mb-0"
                  >
                    {p}
                  </p>
                ))}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-line bg-ink/40 px-2.5 py-1 font-mono text-[10px] tracking-wide text-paperDim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="space-y-4 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                {project.metrics.map((m) => (
                  <li key={m.label}>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-paperDimmer">
                      {m.label}
                    </p>
                    <p className="mt-1 font-display text-base font-semibold text-paper">
                      {m.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
