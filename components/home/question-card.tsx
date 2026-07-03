import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { Badge } from '@/components/ui/badge';
import { LastVerifiedBadge } from '@/components/trust/trust-badges';
import { answerKindLabel, verdictDisplay } from '@/components/decision/verdict-config';

/**
 * QuestionCard — a real verified question as a calm, scannable card. A thin
 * verdict-coloured rail carries the meaning; the surface stays neutral so a wall
 * of cards reads as one system. Shows category · decision type · question ·
 * verdict · last-verified. The whole card is the tap target.
 */
export function QuestionCard({ item }: { item: QuestionSummaryView }) {
  const v = verdictDisplay(item.answerKind, item.verdict);
  return (
    <a
      href={`/question/${item.slug}`}
      className="group border-border bg-card hover:border-primary/30 relative flex flex-col gap-3 overflow-hidden rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Verdict rail — the only colour, so it reads instantly. */}
      <span className={`absolute inset-y-0 left-0 w-1 ${v.dot}`} aria-hidden />

      <p className="text-muted-foreground truncate text-xs font-medium tracking-wide uppercase">
        {item.category} · {answerKindLabel[item.answerKind]}
      </p>

      <p className="text-[0.975rem] leading-snug font-semibold text-balance">{item.question}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <Badge variant={v.badge}>
          <v.Icon className="size-3.5" aria-hidden />
          {v.label}
        </Badge>
        {item.lastVerified ? <LastVerifiedBadge date={item.lastVerified} /> : null}
      </div>
    </a>
  );
}
