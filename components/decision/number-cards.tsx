import type { ConditionView } from '@/lib/knowledge/view';

/**
 * NumberCards — for threshold ("How much…") questions. The answer IS a number
 * (a weight, a size, an amount); users scan for a big figure, not a sentence.
 * Renders only real condition rows from the Knowledge Core — never a fabricated
 * or estimated value.
 */
export function NumberCards({ conditions }: { conditions: ConditionView[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {conditions.map((c) => (
        <div key={c.label} className="border-border bg-card rounded-xl border p-4 text-center">
          <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {c.label}
          </dt>
          <dd className="text-foreground mt-1.5 text-xl font-semibold text-balance">
            {c.value ?? '—'}
          </dd>
        </div>
      ))}
    </div>
  );
}
