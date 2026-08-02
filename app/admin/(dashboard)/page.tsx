import Link from "next/link";
import { getContactCollection } from "@/lib/contact";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const collection = await getContactCollection();
  const [total, newest] = await Promise.all([
    collection.countDocuments(),
    collection.countDocuments({ status: "new" }),
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

      <section className="rounded-lg border border-line bg-surface px-5 py-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-paperDimmer">
          Quick links
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/admin/messages"
              className="font-mono text-sm text-paperDim transition-colors hover:text-signal"
            >
              View contact messages →
            </Link>
          </li>
          <li>
            <Link
              href="/"
              rel="noopener noreferrer"
              target="_blank"
              className="font-mono text-sm text-paperDim transition-colors hover:text-signal"
            >
              Open portfolio site →
            </Link>
          </li>
        </ul>
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
