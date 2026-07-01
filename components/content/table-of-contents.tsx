import type { TocItemView } from '@/lib/knowledge/view';
import { cn } from '@/lib/utils';

/**
 * Sticky table of contents — jump links to page sections. Desktop-only aside;
 * hidden on mobile where it would add scrolling rather than remove it.
 */
export function TableOfContents({
  items,
  className,
}: {
  items: TocItemView[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" data-no-print className={cn('sticky top-20', className)}>
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        On this page
      </p>
      <ul className="border-border mt-3 space-y-0.5 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:border-primary hover:text-foreground -ml-px block border-l-2 border-transparent py-1 pl-3 text-sm transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
