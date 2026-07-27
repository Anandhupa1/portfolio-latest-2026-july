"use client";

import CountUp from "./CountUp";
import MagneticButton from "./MagneticButton";

const metrics = [
  {
    label: "Production systems",
    display: <CountUp to={3} />,
  },
  {
    label: "Locales shipped",
    display: (
      <>
        <CountUp to={2} />
        <span className="ml-2 font-mono text-xs font-normal text-paperDimmer">
          EN/AR RTL
        </span>
      </>
    ),
  },
  {
    label: "User flows built",
    display: <CountUp to={4} />,
  },
  {
    label: "Cache layer",
    display: (
      <span className="font-display text-xl font-semibold text-paper sm:text-2xl">
        Redis
        <span className="ml-2 font-mono text-xs font-normal text-paperDimmer">
          TTL+LRU
        </span>
      </span>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-24"
    >
      <div className="flex flex-col justify-center">
        <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-paperDimmer">
          Full-stack engineer · Kochi, Kerala
        </p>
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-[3.25rem]">
          I build the parts of your product{" "}
          <span className="text-signal">that aren&apos;t allowed to fail.</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-paperDim">
          Performance, payments, multi-locale commerce, and the infrastructure
          underneath — shipped for products that have to stay up.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton href="#work" variant="primary">
            View work
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-[0_0_0_1px_rgba(237,239,242,0.02)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" aria-hidden />
          <span className="ml-3 font-mono text-[11px] tracking-wide text-paperDimmer">
            system_status.log
          </span>
        </div>
        <ul className="divide-y divide-line">
          {metrics.map((m) => (
            <li
              key={m.label}
              className="flex items-baseline justify-between gap-4 px-4 py-4 sm:px-5"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-paperDimmer">
                {m.label}
              </span>
              <span className="text-right font-display text-xl font-semibold tabular-nums text-paper sm:text-2xl">
                {m.display}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
