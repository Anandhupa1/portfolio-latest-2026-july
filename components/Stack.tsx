const categories = [
  {
    title: "Frontend",
    items: ["React / Next.js", "TypeScript", "TanStack Query", "Zustand"],
  },
  {
    title: "Backend",
    items: ["Node.js / Express", "MongoDB", "Redis", "REST APIs"],
  },
  {
    title: "Infrastructure",
    items: ["AWS ECS", "S3 / CloudFront", "SES", "CodePipeline / CodeBuild"],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-10 max-w-xl">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-paperDimmer">
          Capabilities
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Stack
        </h2>
      </div>

      <ul className="grid grid-cols-1 border border-line sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <li
            key={cat.title}
            className={[
              "bg-surface/40 p-6 sm:p-8",
              i > 0 ? "border-t border-line sm:border-t-0" : "",
              i === 1 ? "sm:border-l border-line" : "",
              i === 2 ? "border-t border-line lg:border-t-0 lg:border-l" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal">
              {cat.title}
            </h3>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="font-display text-base font-medium text-paper"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
