import type { ConditionView } from '@/lib/knowledge/view';
import { isCaveatCondition } from '@/lib/knowledge/presentation';

/**
 * DetailsList — the default label→value presentation for conditions that
 * aren't a numeric threshold or a procedure. Rows sit directly on the page,
 * separated by hairline dividers — no enclosing bordered box, which would
 * read as a floating panel rather than part of the answer. Two enhancements,
 * both purely display transforms of real data (no new facts):
 *  - a row literally labelled "Accepted" with a comma-separated value renders
 *    as chips instead of a text wall — e.g. "Passport, Aadhaar, driving
 *    licence" becomes three small pills;
 *  - a "Note"/"Check" row renders as a small italic line spanning the row,
 *    since it's context for the answer above it, not an equal-weight fact.
 */
export function DetailsList({ conditions }: { conditions: ConditionView[] }) {
  return (
    <dl className="divide-border divide-y">
      {conditions.map((c) => {
        if (isCaveatCondition(c.label)) {
          return (
            <div key={c.label} className="py-2.5 first:pt-0">
              <p className="text-muted-foreground text-sm italic">{c.value}</p>
            </div>
          );
        }

        const isAcceptedList =
          c.label.trim().toLowerCase() === 'accepted' && c.value?.includes(',');
        return (
          <div
            key={c.label}
            className="flex items-baseline justify-between gap-4 py-3 first:pt-0"
          >
            <dt className="text-muted-foreground shrink-0 text-sm">{c.label}</dt>
            {isAcceptedList ? (
              <dd className="flex flex-wrap justify-end gap-1.5">
                {c
                  .value!.split(',')
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((item) => (
                    <span
                      key={item}
                      className="bg-muted text-foreground rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
              </dd>
            ) : (
              <dd className="text-right text-sm font-medium">{c.value ?? '—'}</dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}
