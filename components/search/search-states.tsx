import { Search, SearchX, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/feedback/empty-state';
import { ErrorState } from '@/components/feedback/error-state';
import { cn } from '@/lib/utils';

/** Related searches — presentational chips (search logic is a later sprint). */
export function RelatedSearches({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-label="Related searches" className={className}>
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        Related searches
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((q) => (
          <li
            key={q}
            className="border-border bg-card text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm"
          >
            <TrendingUp className="size-3.5" aria-hidden />
            {q}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Search suggestions dropdown (e.g. shown under the input as you type). */
export function SearchSuggestions({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div
      className={cn(
        'border-border bg-popover overflow-hidden rounded-xl border shadow-sm',
        className,
      )}
    >
      <ul className="divide-border divide-y" role="listbox" aria-label="Suggestions">
        {items.map((s) => (
          <li key={s.label} role="option" aria-selected="false">
            <a
              href={s.href ?? '#'}
              className="hover:bg-muted flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
            >
              <Search className="text-muted-foreground size-4 shrink-0" aria-hidden />
              <span className="truncate">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** No results — calm, with a nudge toward official sources. */
export function SearchNoResults({ query, className }: { query?: string; className?: string }) {
  return (
    <EmptyState
      icon={SearchX}
      title={query ? `No results for “${query}”` : 'No results found'}
      description="Try fewer or different words. If it's urgent, check your airline or the relevant authority directly."
      className={className}
    />
  );
}

/** Loading placeholder for a results list. */
export function SearchLoading({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn('space-y-3', className)} aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}

/** Search failure. */
export function SearchError({ className }: { className?: string }) {
  return (
    <ErrorState
      title="Search is unavailable"
      description="We couldn't run your search just now. Please try again in a moment."
      className={className}
    />
  );
}
