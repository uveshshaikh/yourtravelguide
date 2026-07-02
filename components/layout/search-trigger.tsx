import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * SearchTrigger — a compact search entry point in the header that links to the
 * real /search page (a working destination). Instant search itself lives in
 * <QuestionSearch> on the homepage and /search.
 */
export function SearchTrigger({ className }: { className?: string }) {
  return (
    <a
      href="/search"
      aria-label="Search questions"
      className={cn(
        'border-input bg-card text-muted-foreground hover:border-primary/40 flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2 text-sm transition-colors',
        className,
      )}
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <span className="flex-1 truncate">Search questions</span>
    </a>
  );
}
