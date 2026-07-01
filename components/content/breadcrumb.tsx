import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItemView } from '@/lib/knowledge/view';

/**
 * Breadcrumb — the canonical domain path + escape hatch. Reflects the stable
 * domain hierarchy (not the journey), critical for orientation on mobile.
 * The last item is the current page (aria-current).
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItemView[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a href={item.href} className="hover:text-foreground hover:underline">
                  {item.label}
                </a>
              ) : (
                <span
                  className={isLast ? 'text-foreground font-medium' : undefined}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRight className="size-3.5 shrink-0" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
