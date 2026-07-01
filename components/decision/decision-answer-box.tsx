import type { ConditionView, TrustView } from '@/lib/knowledge/view';
import type { Verdict, Validity } from '@/lib/knowledge/types';
import { evidenceLevelRankLabel } from '@/lib/knowledge/labels';
import { VerdictBanner } from '@/components/decision/verdict-banner';
import { ConfidenceBadge, LastVerifiedBadge } from '@/components/trust/trust-badges';
import { cn } from '@/lib/utils';

/**
 * DecisionAnswerBox — the answer-first block (the "ProtectedAnswerZone"): the
 * verdict, the one-sentence answer, the key conditions, and a compact trust
 * strip — everything a rushed traveller needs above the fold, in order.
 */
export function DecisionAnswerBox({
  verdict,
  answer,
  validity,
  conditions,
  trust,
  className,
}: {
  verdict: Verdict;
  answer: string;
  validity?: Validity;
  conditions?: ConditionView[];
  trust: TrustView;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <VerdictBanner verdict={verdict} answer={answer} validity={validity} />

      {conditions?.length ? (
        <dl className="grid gap-2 sm:grid-cols-2">
          {conditions.map((c) => (
            <div
              key={c.label}
              className="border-border bg-card flex items-baseline justify-between gap-3 rounded-lg border px-3 py-2"
            >
              <dt className="text-muted-foreground text-sm">{c.label}</dt>
              <dd className="font-mono text-sm font-medium">{c.value ?? '—'}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <LastVerifiedBadge date={trust.lastVerified} />
        <ConfidenceBadge confidence={trust.confidence} />
        <span className="text-muted-foreground text-xs">
          {evidenceLevelRankLabel[trust.evidenceLevel]}
        </span>
      </div>
    </div>
  );
}
