import { ArrowRight } from 'lucide-react';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { Badge } from '@/components/ui/badge';
import { LastVerifiedBadge } from '@/components/trust/trust-badges';
import { verdictDisplay } from '@/components/decision/verdict-config';

/**
 * VerifiedQuestionResult — a search/browse result for a VERIFIED question.
 * Shows the four things a traveller needs to trust and choose: question,
 * verdict, last-verified date, applicability. Links to the full answer.
 */
export function VerifiedQuestionResult({ item }: { item: QuestionSummaryView }) {
  const v = verdictDisplay(item.answerKind, item.verdict);
  return (
    <a
      href={`/question/${item.slug}`}
      className="group border-border bg-card hover:border-primary/40 block rounded-xl border p-4 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-pretty">{item.question}</p>
        <ArrowRight
          className="text-muted-foreground mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant={v.badge}>
          <v.Icon className="size-3.5" aria-hidden />
          {v.label}
        </Badge>
        {item.lastVerified ? <LastVerifiedBadge date={item.lastVerified} /> : null}
        <span className="text-muted-foreground text-xs">{item.appliesTo}</span>
      </div>
    </a>
  );
}
