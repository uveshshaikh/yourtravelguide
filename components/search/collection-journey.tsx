import { ArrowRight, Check } from 'lucide-react';
import type { CollectionStageView } from '@/services/resolver/catalog';
import { verdictDisplay } from '@/components/decision/verdict-config';

/**
 * CollectionJourney — a guided, step-by-step checklist for a JOURNEY collection
 * (e.g. First-time flyers). Deliberately not a search-results grid: a numbered,
 * connected vertical timeline, each stage a real step in the traveller's actual
 * journey, in the order they'll experience it. Only stages with live, verified
 * questions render (a stage with nothing verified right now is simply absent,
 * never shown empty).
 */
export function CollectionJourney({ stages }: { stages: CollectionStageView[] }) {
  return (
    <ol className="mt-8 space-y-0">
      {stages.map((stage, i) => {
        const isLast = i === stages.length - 1;
        return (
          <li key={stage.label} className="relative flex gap-5 pb-10 last:pb-0">
            {/* Numbered marker + connecting line down to the next stage. */}
            <div className="flex flex-col items-center">
              <span className="bg-primary text-primary-foreground grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold">
                <Check className="size-4" aria-hidden />
              </span>
              {!isLast ? <span className="bg-border mt-1 w-px flex-1" aria-hidden /> : null}
            </div>

            <div className="min-w-0 flex-1 pt-1">
              <h2 className="font-semibold tracking-tight">
                <span className="text-muted-foreground mr-1.5 text-sm font-normal tabular-nums">
                  {i + 1}
                </span>
                {stage.label}
              </h2>
              <ul className="border-border bg-card mt-3 divide-y overflow-hidden rounded-2xl border">
                {stage.questions.map((q) => {
                  const v = verdictDisplay(q.answerKind, q.verdict);
                  return (
                    <li key={q.slug}>
                      <a
                        href={`/question/${q.slug}`}
                        className="group hover:bg-muted flex items-center gap-3 px-4 py-3.5 transition-colors"
                      >
                        <span className={`size-2 shrink-0 rounded-full ${v.dot}`} aria-hidden />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {q.question}
                        </span>
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
          </li>
        );
      })}
    </ol>
  );
}
