import { ArrowRight } from 'lucide-react';
import type { RelatedItemView } from '@/lib/knowledge/view';
import { VerdictCard } from '@/components/decision/verdict-card';
import { cn } from '@/lib/utils';

/**
 * RelatedQuestions — the forward/lateral decision graph ("you might also ask").
 * Renders as verdict cards so users see the answer shape before clicking.
 */
export function RelatedQuestions({
  items,
  className,
}: {
  items: RelatedItemView[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-q-heading" className={className}>
      <h2 id="related-q-heading" className="text-lg font-semibold">
        Related questions
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((it) =>
          it.verdict ? (
            <VerdictCard key={it.id} question={it.label} verdict={it.verdict} href={it.href} />
          ) : (
            <a
              key={it.id}
              href={it.href}
              className="group border-border bg-card hover:border-primary/40 flex items-center justify-between gap-3 rounded-xl border p-4 font-medium transition-colors"
            >
              {it.label}
              <ArrowRight
                className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          ),
        )}
      </div>
    </section>
  );
}

/** RelatedTopics — lateral domain links, rendered as compact chips. */
export function RelatedTopics({
  items,
  className,
}: {
  items: RelatedItemView[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-t-heading" className={className}>
      <h2 id="related-t-heading" className="text-sm font-semibold">
        Related topics
      </h2>
      <ul className={cn('mt-3 flex flex-wrap gap-2')}>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={it.href}
              className="border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground inline-flex rounded-full border px-3 py-1.5 text-sm transition-colors"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
