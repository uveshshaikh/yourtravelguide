import type { ConditionView } from '@/lib/knowledge/view';

/**
 * DetailsList — the default label→value presentation for conditions that
 * aren't a numeric threshold or a procedure. One enhancement, purely a display
 * transform of real data (no new facts): a row literally labelled "Accepted"
 * renders its existing comma-separated value as chips instead of a text wall —
 * e.g. "Passport, Aadhaar, driving licence" becomes three small pills.
 */
export function DetailsList({ conditions }: { conditions: ConditionView[] }) {
  return (
    <dl className="border-border divide-border rounded-xl border">
      {conditions.map((c) => {
        const isAcceptedList =
          c.label.trim().toLowerCase() === 'accepted' && c.value?.includes(',');
        return (
          <div key={c.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
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
