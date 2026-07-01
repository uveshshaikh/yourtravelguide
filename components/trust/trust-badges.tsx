import { BadgeCheck, ShieldCheck } from 'lucide-react';
import type { Confidence } from '@/lib/knowledge/types';
import { confidenceLabel, reviewStateLabel, type ReviewState } from '@/lib/knowledge/labels';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { formatDate } from '@/lib/format';

/** "Verified 1 Jul 2026" — distinct from "updated"; the trust signal travellers read. */
export function LastVerifiedBadge({ date }: { date: string }) {
  return (
    <Badge variant="neutral">
      <BadgeCheck className="size-3.5" aria-hidden />
      Verified {formatDate(date)}
    </Badge>
  );
}

const reviewVariant: Record<ReviewState, NonNullable<BadgeProps['variant']>> = {
  current: 'allowed',
  due_soon: 'conditional',
  overdue: 'denied',
};

export function ReviewStatusBadge({ state }: { state: ReviewState }) {
  return <Badge variant={reviewVariant[state]}>{reviewStateLabel[state]}</Badge>;
}

const confidenceVariant: Record<Confidence, NonNullable<BadgeProps['variant']>> = {
  confirmed: 'allowed',
  likely: 'info',
  provisional: 'conditional',
};

/** System-derived confidence (never hand-set). */
export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <Badge variant={confidenceVariant[confidence]}>
      <ShieldCheck className="size-3.5" aria-hidden />
      {confidenceLabel[confidence]}
    </Badge>
  );
}

export function VersionBadge({ version }: { version: number }) {
  return (
    <Badge variant="outline">
      <span className="font-mono">v{version}</span>
    </Badge>
  );
}
