import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * ComparisonTable — compare entities (columns) across attributes (rows), e.g.
 * airline baggage policies. Mobile-first: on small screens it stacks into one
 * card per entity (no horizontal scroll, per the Phase-1 UX rule); a real
 * <table> renders on larger screens for scan-ability.
 */
export interface ComparisonColumn {
  key: string;
  label: string;
}
export interface ComparisonRow {
  label: string;
  /** Cell values aligned to `columns` order. */
  cells: ReactNode[];
}

export function ComparisonTable({
  caption,
  columns,
  rows,
  className,
}: {
  caption?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  className?: string;
}) {
  return (
    <div className={className}>
      {caption ? <p className="mb-3 text-sm font-medium">{caption}</p> : null}

      {/* Desktop / tablet: table */}
      <div className="border-border hidden overflow-hidden rounded-xl border sm:block">
        <table className="w-full text-sm">
          <caption className="sr-only">{caption ?? 'Comparison'}</caption>
          <thead>
            <tr className="bg-subtle">
              <th scope="col" className="text-muted-foreground px-4 py-2.5 text-left font-medium">
                &nbsp;
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="px-4 py-2.5 text-left font-semibold">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="text-muted-foreground px-4 py-2.5 text-left font-medium">
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td key={columns[i]?.key ?? i} className="px-4 py-2.5">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per entity/column */}
      <div className="grid gap-3 sm:hidden">
        {columns.map((col, ci) => (
          <div key={col.key} className="border-border bg-card rounded-xl border p-4">
            <p className="font-semibold">{col.label}</p>
            <dl className="divide-border mt-2 divide-y">
              {rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-3 py-1.5">
                  <dt className="text-muted-foreground text-sm">{row.label}</dt>
                  <dd className={cn('text-right text-sm font-medium')}>{row.cells[ci]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
