import { ArrowUpRight } from 'lucide-react';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { Badge } from '@/components/ui/badge';
import { LastVerifiedBadge } from '@/components/trust/trust-badges';
import { verdictDisplay } from '@/components/decision/verdict-config';

/**
 * QuestionCard — a real verified question as a scannable card: category, the
 * question, its decision-type verdict preview, and when it was last verified.
 * The whole card is the target (large tap area for one-handed use).
 */
export function QuestionCard({ item }: { item: QuestionSummaryView }) {
  const v = verdictDisplay(item.answerKind, item.verdict);
  return (
    <a
      href={`/question/${item.slug}`}
      className="group border-border bg-card hover:border-primary/40 hover:shadow-primary/5 focus-visible:border-primary/60 relative flex flex-col gap-3 rounded-2xl border p-5 transition-all hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {item.category}
        </span>
        <ArrowUpRight
          className="text-muted-foreground/60 group-hover:text-primary size-4 shrink-0 transition-colors"
          aria-hidden
        />
      </div>

      <p className="text-[0.975rem] leading-snug font-semibold text-pretty">{item.question}</p>

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
