import { ChevronDown } from 'lucide-react';
import type { FaqView } from '@/lib/knowledge/view';
import { cn } from '@/lib/utils';

/**
 * FaqAccordion — native <details>/<summary> disclosure: fully keyboard- and
 * screen-reader-accessible with zero JavaScript, and expands correctly even
 * before hydration (works for print and no-JS).
 */
export function FaqAccordion({ faqs, className }: { faqs: FaqView[]; className?: string }) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className={className}>
      <h2 id="faq-heading" className="text-lg font-semibold">
        Frequently asked questions
      </h2>
      <div className="divide-border border-border mt-3 divide-y overflow-hidden rounded-xl border">
        {faqs.map((f) => (
          <details key={f.id} className="group bg-card open:bg-subtle px-4">
            <summary
              className={cn(
                'flex cursor-pointer list-none items-center justify-between gap-3 py-4 font-medium',
                '[&::-webkit-details-marker]:hidden',
              )}
            >
              {f.question}
              <ChevronDown
                className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="text-muted-foreground pb-4 text-sm">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
