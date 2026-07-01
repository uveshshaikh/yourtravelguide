import { Search } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

/**
 * Search entry point — the platform's primary action. Sprint 3A ships the
 * VISUAL placeholder only (no search functionality, per scope). Rendered as a
 * button so it's keyboard-focusable and clearly actionable; wired up in 3B.
 *
 * `size="hero"` is the large homepage field; `size="bar"` is the compact header.
 */
export function SearchTrigger({
  size = 'bar',
  className,
}: {
  size?: 'bar' | 'hero';
  className?: string;
}) {
  const isHero = size === 'hero';
  return (
    <button
      type="button"
      aria-label="Search travel questions"
      aria-disabled="true"
      className={cn(
        'group border-input bg-card text-muted-foreground hover:border-primary/40 flex w-full items-center gap-3 rounded-xl border text-left transition-colors',
        isHero ? 'px-5 py-4 text-base shadow-sm' : 'px-3.5 py-2 text-sm',
        className,
      )}
    >
      <Search
        className={cn('text-muted-foreground shrink-0', isHero ? 'size-5' : 'size-4')}
        aria-hidden
      />
      <span className="flex-1 truncate">
        {isHero ? 'Can I carry a power bank? Is my passport valid?…' : 'Search travel questions'}
      </span>
      {isHero ? <Kbd className="hidden sm:inline-flex">/</Kbd> : null}
    </button>
  );
}
