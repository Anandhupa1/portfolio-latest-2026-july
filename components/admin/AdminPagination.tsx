import Link from "next/link";
import clsx from "clsx";

type Props = {
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  basePath?: string;
};

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

/** Compact page list: 1 … 4 5 6 … 20 */
function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) pages.add(i);
  }
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
    result.push(sorted[i]);
  }
  return result;
}

const btnBase =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 font-mono text-xs tracking-wide transition-colors";

export default function AdminPagination({
  page,
  totalPages,
  total,
  from,
  to,
  basePath = "/admin/messages",
}: Props) {
  if (total === 0) return null;

  const pages = buildPages(page, totalPages);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 rounded-lg border border-line bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <p className="font-mono text-[11px] text-paperDimmer">
        Showing{" "}
        <span className="tabular-nums text-paperDim">
          {from}–{to}
        </span>{" "}
        of <span className="tabular-nums text-paperDim">{total}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {prevDisabled ? (
          <span
            className={clsx(
              btnBase,
              "cursor-not-allowed border-line text-paperDimmer/40"
            )}
            aria-disabled
          >
            Prev
          </span>
        ) : (
          <Link
            href={pageHref(basePath, page - 1)}
            className={clsx(
              btnBase,
              "border-lineStrong bg-ink text-paperDim hover:border-signal hover:text-paper"
            )}
            aria-label="Previous page"
          >
            Prev
          </Link>
        )}

        <ul className="flex flex-wrap items-center gap-1.5">
          {pages.map((item, idx) =>
            item === "…" ? (
              <li
                key={`ellipsis-${idx}`}
                className="px-1 font-mono text-xs text-paperDimmer"
                aria-hidden
              >
                …
              </li>
            ) : (
              <li key={item}>
                {item === page ? (
                  <span
                    className={clsx(
                      btnBase,
                      "border-signal bg-signal text-ink"
                    )}
                    aria-current="page"
                  >
                    {item}
                  </span>
                ) : (
                  <Link
                    href={pageHref(basePath, item)}
                    className={clsx(
                      btnBase,
                      "border-lineStrong bg-ink text-paperDim hover:border-signal hover:text-paper"
                    )}
                    aria-label={`Page ${item}`}
                  >
                    {item}
                  </Link>
                )}
              </li>
            )
          )}
        </ul>

        {nextDisabled ? (
          <span
            className={clsx(
              btnBase,
              "cursor-not-allowed border-line text-paperDimmer/40"
            )}
            aria-disabled
          >
            Next
          </span>
        ) : (
          <Link
            href={pageHref(basePath, page + 1)}
            className={clsx(
              btnBase,
              "border-lineStrong bg-ink text-paperDim hover:border-signal hover:text-paper"
            )}
            aria-label="Next page"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}
