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
      "UAE real estate marketplace spanning buyers, brokers, non-residents, and VIP investors — with full English/Arabic support and RTL layout.",
      "Built registration flows for four distinct user types, PayTabs payment integration, AWS ECS deployment, and SEO foundations (sitemaps, hreflang).",
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
      { label: "Locales", value: "EN/AR full RTL" },
      { label: "User flows", value: "4 registration paths" },
      { label: "Booking", value: "UTC+4 via Luxon" },
    ],
  },
  {
    id: "PROJ-002",
    title: "V Perfumes",
    status: "LIVE",
    paragraphs: [
      "GCC multi-store e-commerce brought in for a MongoDB Atlas performance crisis: a $lookup type-mismatch driving ~40M document scans per query.",
      "Fixed the type mismatch alongside missing indexes across several collections, and built a Redis-backed shared cache handler for multi-instance ECS cache invalidation.",
    ],
    stack: ["MongoDB Atlas", "Redis", "Express", "AWS ECS", "Node.js"],
    metrics: [
      { label: "Query scans", value: "~40M → 12k" },
      { label: "Indexes", value: "3 collections fixed" },
      { label: "Cache", value: "Shared Redis / ECS" },
    ],
  },
  {
    id: "PROJ-003",
    title: "New Commerce Build",
    status: "IN PROGRESS",
    paragraphs: [
      "Multi-language, multi-store commerce app built from scratch — no template — with Next.js App Router and Express.",
      "TanStack Query for server state, Zustand for client state, shadcn/ui for the interface layer, and next-intl for localization from day one.",
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
      { label: "Approach", value: "No commerce template" },
      { label: "Architecture", value: "Multi-lang / multi-store" },
      { label: "State", value: "TanStack + Zustand" },
    ],
  },
];
