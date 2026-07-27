import { getContactCollection } from "@/lib/contact";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const collection = await getContactCollection();
  const [total, newest, recent] = await Promise.all([
    collection.countDocuments(),
    collection.countDocuments({ status: "new" }),
    collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray(),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-paperDimmer">
          Overview
        </p>
        <h1 className="font-display text-3xl font-semibold text-paper">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total messages" value={total} />
        <StatCard label="New messages" value={newest} accent />
      </div>

      <section>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-paperDimmer">
          Recent contact submissions
        </h2>
        {recent.length === 0 ? (
          <p className="rounded-lg border border-line bg-surface px-5 py-8 text-sm text-paperDim">
            No submissions yet.
          </p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
            {recent.map((item) => (
              <li key={item._id.toString()} className="px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display font-semibold text-paper">
                    {item.name}
                  </p>
                  <p className="font-mono text-[11px] text-paperDimmer">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "—"}
                  </p>
                </div>
                <p className="mt-1 font-mono text-xs text-paperDim">
                  {item.email}
                  {item.phone ? ` · ${item.phone}` : ""}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-paperDim">
                  {item.message}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-signal">
                  {item.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface px-5 py-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-paperDimmer">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-3xl font-semibold tabular-nums ${
          accent ? "text-teal" : "text-paper"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
