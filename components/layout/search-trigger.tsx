import { Search } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

/**
 * SearchTrigger — a search-field-shaped link in the header. It looks like the
 * real input so the primary action is obvious everywhere, and lands on the live
 * <QuestionSearch> on /search.
 */
export function SearchTrigger({ className }: { className?: string }) {
  return (
    <a
      href="/search"
      aria-label="Search verified questions"
      className={cn(
        'group border-input bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground focus-visible:border-primary flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2 text-sm transition-colors',
        className,
      )}
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <span className="flex-1 truncate text-left">Search questions</span>
      <Kbd className="hidden lg:inline-flex">/</Kbd>
    </a>
  );
}
