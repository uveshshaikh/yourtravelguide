import { ArrowRight, CircleCheck, PlaneTakeoff } from 'lucide-react';
import type { ChecklistItemView } from '@/services/resolver/catalog';
import { verdictDisplay } from '@/components/decision/verdict-config';

/**
 * PreflightChecklist — the signature, action-oriented section. Instead of topics,
 * it answers the last-minute questions a traveller has on the way out the door.
 * Every item links to a REAL verified answer (fail-closed upstream), so this is
 * useful, not decorative.
 */
export function PreflightChecklist({ items }: { items: ChecklistItemView[] }) {
  if (items.length === 0) return null;
  return (
    <div className="border-border bg-card overflow-hidden rounded-3xl border shadow-sm">
      <div className="border-border bg-accent/60 flex items-center gap-3 border-b px-6 py-5">
        <span className="bg-primary text-primary-foreground grid size-10 shrink-0 place-items-center rounded-xl">
          <PlaneTakeoff className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Before you leave for the airport</h2>
          <p className="text-muted-foreground text-sm">
            The last-minute checks travellers forget — tap any to confirm.
          </p>
        </div>
      </div>

      <ul className="grid gap-1.5 p-3 sm:grid-cols-2 sm:p-4">
        {items.map((item) => {
          const v = verdictDisplay(item.answerKind, item.verdict);
          return (
            <li key={item.slug}>
              <a
                href={`/question/${item.slug}`}
                className="group hover:bg-muted flex h-full items-center gap-3 rounded-xl px-3 py-3 transition-colors"
              >
                <CircleCheck className="text-primary size-5 shrink-0" aria-hidden />
                <span className="min-w-0 flex-1 text-sm font-medium text-pretty">{item.label}</span>
                <span
                  className={`size-2 shrink-0 rounded-full ${v.dot}`}
                  aria-hidden
                  title={v.label}
                />
                <ArrowRight
                  className="text-muted-foreground/50 group-hover:text-primary size-4 shrink-0 transition-all group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
