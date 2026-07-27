"use client";

import { useState } from "react";
import { projects } from "@/lib/projects";
import TicketCard from "./TicketCard";

export default function ProjectTickets() {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-10 max-w-xl">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-paperDimmer">
          Selected work
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Project tickets
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-paperDim">
          Selected builds — marketplaces, multi-store commerce, and the systems
          that keep them fast and reliable.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <TicketCard
            key={project.id}
            project={project}
            index={index}
            open={openId === project.id}
            onToggle={() => toggle(project.id)}
          />
        ))}
      </div>
    </section>
  );
}
