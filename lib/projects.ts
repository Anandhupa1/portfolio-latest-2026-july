export type TicketStatus = "LIVE" | "IN PROGRESS";

export type ProjectTicket = {
  id: string;
  title: string;
  status: TicketStatus;
  paragraphs: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
};

export const projects: ProjectTicket[] = [
  {
    id: "PROJ-001",
    title: "Amberhouse",
    status: "LIVE",
    paragraphs: [
      "Real estate marketplace with bilingual EN/AR experience and full RTL support — spanning property discovery, registration, and booking flows.",
      "Shipped multi-role onboarding, PayTabs payments, timezone-correct scheduling, AWS ECS deployment, and SEO foundations (sitemaps, hreflang).",
    ],
    stack: [
      "Next.js",
      "Express",
      "MongoDB",
      "PayTabs",
      "AWS ECS",
      "Luxon",
      "EN/AR RTL",
    ],
    metrics: [
      { label: "Locales", value: "EN / AR · full RTL" },
      { label: "Onboarding", value: "Multi-role registration" },
      { label: "Payments", value: "PayTabs integrated" },
    ],
  },
  {
    id: "PROJ-002",
    title: "V Perfumes",
    status: "LIVE",
    paragraphs: [
      "Multi-store e-commerce platform for the GCC region — catalog, checkout, and store operations across instances on AWS ECS.",
      "Owned backend performance work: query tuning, indexing strategy, and a Redis-backed shared cache layer for consistent responses across scaled services.",
    ],
    stack: ["Node.js", "Express", "MongoDB Atlas", "Redis", "AWS ECS"],
    metrics: [
      { label: "Architecture", value: "Multi-store commerce" },
      { label: "Data layer", value: "Indexed · query-tuned" },
      { label: "Cache", value: "Redis across ECS" },
    ],
  },
  {
    id: "PROJ-003",
    title: "Commerce Platform",
    status: "IN PROGRESS",
    paragraphs: [
      "Multi-language, multi-store commerce app built from scratch with Next.js App Router and Express — no off-the-shelf template.",
      "TanStack Query for server state, Zustand for client state, shadcn/ui for the interface, and next-intl for localization from day one.",
    ],
    stack: [
      "Next.js App Router",
      "Express",
      "TanStack Query",
      "Zustand",
      "shadcn/ui",
      "next-intl",
    ],
    metrics: [
      { label: "Approach", value: "Custom architecture" },
      { label: "Scope", value: "Multi-lang · multi-store" },
      { label: "State", value: "TanStack + Zustand" },
    ],
  },
];
