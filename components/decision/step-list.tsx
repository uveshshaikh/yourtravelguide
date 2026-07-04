import type { ConditionView } from '@/lib/knowledge/view';

/**
 * StepList — for procedure ("How do I…") questions. Renders each real
 * condition row as a numbered, connected step rather than a flat definition
 * list, since a process is a sequence, not a set of facts. Only ever renders
 * the conditions the Knowledge Core actually has — no invented steps.
 */
export function StepList({ conditions }: { conditions: ConditionView[] }) {
  return (
    <ol className="space-y-0">
      {conditions.map((c, i) => {
        const isLast = i === conditions.length - 1;
        return (
          <li key={c.label} className="relative flex gap-4 pb-4 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="border-border bg-card text-foreground grid size-7 shrink-0 place-items-center rounded-full border text-xs font-semibold">
                {i + 1}
              </span>
              {!isLast ? <span className="bg-border mt-1 w-px flex-1" aria-hidden /> : null}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p className="text-sm font-semibold">{c.label}</p>
              {c.value ? (
                <p className="text-muted-foreground mt-0.5 text-sm text-pretty">{c.value}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
