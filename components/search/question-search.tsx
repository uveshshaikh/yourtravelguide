'use client';
import { useId, useMemo, useRef, useState } from 'react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { searchQuestions } from '@/lib/search';
import { Badge } from '@/components/ui/badge';
import { verdictDisplay } from '@/components/decision/verdict-config';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

/**
 * QuestionSearch — the real, instant, typo-tolerant search over VERIFIED
 * questions (Fuse.js, no AI). Accessible combobox: arrow keys move the
 * selection, Enter opens it (or the results page), Escape closes. Falls back to
 * a native GET form (works without JS) that lands on /search.
 */
export function QuestionSearch({
  catalog,
  size = 'hero',
  className,
}: {
  catalog: QuestionSummaryView[];
  size?: 'hero' | 'bar';
  className?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const results = useMemo(() => searchQuestions(catalog, query, 8), [catalog, query]);
  const isHero = size === 'hero';
  const showList = open && query.trim().length > 0 && results.length > 0;

  function goToResults() {
    router.push(`/search?q=${encodeURIComponent(query.trim())}` as Route);
    setOpen(false);
  }
  function openQuestion(slug: string) {
    router.push(`/question/${slug}`);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = results[active];
      if (chosen) openQuestion(chosen.slug);
      else goToResults();
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <form
      role="search"
      action="/search"
      onSubmit={(e) => {
        e.preventDefault();
        goToResults();
      }}
      className={cn('relative', className)}
    >
      <div
        className={cn(
          'border-input bg-card focus-within:border-primary/60 flex w-full items-center gap-3 rounded-xl border text-left transition-colors',
          isHero ? 'px-5 py-4 text-base shadow-sm' : 'px-3.5 py-2 text-sm',
        )}
      >
        <Search
          className={cn('text-muted-foreground shrink-0', isHero ? 'size-5' : 'size-4')}
          aria-hidden
        />
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
          placeholder={
            isHero ? 'Can I carry a power bank? Is my passport valid?…' : 'Search questions'
          }
          className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent outline-none"
        />
        {isHero ? <Kbd className="hidden sm:inline-flex">/</Kbd> : null}
      </div>

      {showList ? (
        <ul
          id={listId}
          role="listbox"
          className="border-border bg-popover absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border shadow-lg"
          onMouseDown={(e) => e.preventDefault()}
        >
          {results.map((r, i) => {
            const v = verdictDisplay(r.answerKind, r.verdict);
            return (
              <li
                key={r.slug}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  openQuestion(r.slug);
                }}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm',
                  i === active ? 'bg-muted' : 'bg-popover',
                )}
              >
                <span className="min-w-0 truncate text-left">{r.question}</span>
                <Badge variant={v.badge}>
                  <v.Icon className="size-3.5" aria-hidden />
                  {v.label}
                </Badge>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
