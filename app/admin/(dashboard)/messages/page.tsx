import AdminPagination from "@/components/admin/AdminPagination";
import { getContactCollection } from "@/lib/contact";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

type Props = {
  searchParams?: { page?: string };
};

function parsePage(raw: string | undefined, totalPages: number) {
  const n = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  if (totalPages < 1) return 1;
  return Math.min(n, totalPages);
}

export default async function AdminMessagesPage({ searchParams }: Props) {
  const collection = await getContactCollection();
  const total = await collection.countDocuments();
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = parsePage(searchParams?.page, totalPages);
  const skip = (page - 1) * PAGE_SIZE;

  const messages = await collection
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(PAGE_SIZE)
    .toArray();

  const from = total === 0 ? 0 : skip + 1;
  const to = Math.min(skip + messages.length, total);

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-paperDimmer">
          Inbox
        </p>
        <h1 className="font-display text-3xl font-semibold text-paper">
          Messages
        </h1>
        <p className="mt-2 text-sm text-paperDim">
          Contact form submissions from the portfolio site.
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface px-5 py-8 text-sm text-paperDim">
          No submissions yet.
        </p>
      ) : (
        <>
          <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
            {messages.map((item) => (
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
                <p className="mt-2 whitespace-pre-wrap text-sm text-paperDim">
                  {item.message}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-signal">
                  {item.status}
                </p>
              </li>
            ))}
          </ul>

          <AdminPagination
            page={page}
            totalPages={totalPages}
            total={total}
            from={from}
            to={to}
          />
        </>
      )}
    </div>
  );
}
