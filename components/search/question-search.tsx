'use client';
import { useId, useMemo, useRef, useState } from 'react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { Clock, CornerDownLeft, Search, TrendingUp } from 'lucide-react';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { searchQuestions } from '@/lib/search';
import { Badge } from '@/components/ui/badge';
import { verdictDisplay } from '@/components/decision/verdict-config';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';

const RECENTS_KEY = 'ytg:recent-searches';

/**
 * QuestionSearch — the product's primary action. A calm, accessible combobox:
 * • Empty + focused → recent searches, popular questions and category shortcuts.
 * • Typing → instant, typo-tolerant results (Fuse.js, no AI) with verdict + category.
 * Arrow keys move the highlight, Enter opens it, Escape closes. Works without JS
 * via a native GET form that lands on /search.
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
  // SSR-safe lazy read. Recents only render inside the (initially closed) panel,
  // so there is no hydration mismatch.
  const [recents, setRecents] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(RECENTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const blurTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const q = query.trim();
  const isHero = size === 'hero';
  const results = useMemo(() => searchQuestions(catalog, query, 8), [catalog, query]);
  const popular = useMemo(() => catalog.slice(0, 5), [catalog]);
  const intentGroups = useMemo(
    () => [...new Set(catalog.map((c) => c.intentGroup))].slice(0, 8),
    [catalog],
  );

  // The keyboard-navigable list depends on mode (typing → results, else popular).
  const items = q.length > 0 ? results : popular;
  const panelOpen = open;

  function remember(term: string) {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recents.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 5);
    setRecents(next);
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function goToResults(term = q) {
    if (!term) return;
    remember(term);
    router.push(`/search?q=${encodeURIComponent(term)}` as Route);
    setOpen(false);
  }
  function openQuestion(slug: string) {
    if (q) remember(q);
    router.push(`/question/${slug}`);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = items[active];
      if (chosen) openQuestion(chosen.slug);
      else goToResults();
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    }
  }

  const showResults = panelOpen && q.length > 0;
  const showBrowse = panelOpen && q.length === 0;

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
          'border-input bg-card focus-within:border-primary focus-within:ring-primary/15 flex w-full items-center gap-3 border transition-all focus-within:ring-4',
          isHero ? 'rounded-2xl px-5 py-4 text-base shadow-sm' : 'rounded-xl px-3.5 py-2 text-sm',
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
            blurTimer.current = setTimeout(() => setOpen(false), 140);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={panelOpen}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
          aria-label="Search verified travel questions"
          placeholder={isHero ? 'Can I carry a power bank? Do I need a visa?…' : 'Search questions'}
          className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent outline-none"
        />
        {isHero ? <Kbd className="hidden sm:inline-flex">/</Kbd> : null}
      </div>

      {panelOpen ? (
        <div
          className="border-border bg-popover absolute inset-x-0 top-full z-50 mt-2 max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain rounded-2xl border shadow-xl"
          onMouseDown={(e) => e.preventDefault()}
        >
          {/* Recent searches (from this device only). */}
          {showBrowse && recents.length > 0 ? (
            <div className="border-border border-b p-2">
              <p className="text-muted-foreground px-2 py-1 text-[0.7rem] font-semibold tracking-wide uppercase">
                Recent
              </p>
              <div className="flex flex-wrap gap-1.5 px-2 pt-1 pb-1.5">
                {recents.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => goToResults(r)}
                    className="border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors"
                  >
                    <Clock className="size-3" aria-hidden />
                    {r}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Popular / results list (keyboard-navigable). */}
          <ul id={listId} role="listbox" aria-label={showResults ? 'Results' : 'Popular questions'}>
            {!showResults ? (
              <li
                className="text-muted-foreground px-4 pt-3 pb-1 text-[0.7rem] font-semibold tracking-wide uppercase"
                aria-hidden
              >
                <TrendingUp className="mr-1.5 inline size-3" />
                Popular
              </li>
            ) : null}
            {items.map((r, i) => {
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
                    'flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm',
                    i === active ? 'bg-muted' : 'bg-popover',
                  )}
                >
                  <span className={cn('size-1.5 shrink-0 rounded-full', v.dot)} aria-hidden />
                  <span className="min-w-0 flex-1 truncate text-left">{r.question}</span>
                  <span className="text-muted-foreground hidden text-xs sm:inline">
                    {r.category}
                  </span>
                  <Badge variant={v.badge}>{v.label}</Badge>
                </li>
              );
            })}
            {showResults && results.length === 0 ? (
              <li className="text-muted-foreground px-4 py-6 text-center text-sm">
                No matches. Press{' '}
                <Kbd className="mx-0.5 inline-flex">
                  <CornerDownLeft className="size-3" aria-hidden />
                </Kbd>{' '}
                to see all verified questions.
              </li>
            ) : null}
          </ul>

          {/* Intent (journey-stage) shortcuts (browse mode only). */}
          {showBrowse ? (
            <div className="border-border border-t p-3">
              <p className="text-muted-foreground px-1 pb-2 text-[0.7rem] font-semibold tracking-wide uppercase">
                Explore by journey stage
              </p>
              <div className="flex flex-wrap gap-1.5">
                {intentGroups.map((g) => (
                  <a
                    key={g}
                    href={`/search?intent=${encodeURIComponent(g)}`}
                    className="border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 rounded-full border px-2.5 py-1 text-xs transition-colors"
                  >
                    {g}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
