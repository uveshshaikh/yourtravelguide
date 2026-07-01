import { ShieldCheck } from 'lucide-react';
import type { TrustView } from '@/lib/knowledge/view';
import { evidenceLevelLabel, validityLabel } from '@/lib/knowledge/labels';
import { formatDate } from '@/lib/format';
import { ConfidenceBadge, ReviewStatusBadge, VersionBadge } from '@/components/trust/trust-badges';
import { cn } from '@/lib/utils';

/**
 * TrustPanel — "Why you can trust this answer." Composes the trust envelope
 * (evidence tier, system-derived confidence, verification date, review state,
 * reviewer, version) from the Sprint-3A trust framework in one place.
 */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className="text-right text-sm font-medium">{children}</dd>
    </div>
  );
}

export function TrustPanel({
  trust,
  sourceCount,
  className,
}: {
  trust: TrustView;
  sourceCount?: number;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="trust-heading"
      className={cn('border-border bg-card rounded-xl border p-5', className)}
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-primary size-5" aria-hidden />
        <h2 id="trust-heading" className="text-sm font-semibold">
          Why trust this answer
        </h2>
      </div>
      <dl className="divide-border mt-2 divide-y">
        <Row label="Evidence">{evidenceLevelLabel[trust.evidenceLevel]}</Row>
        <Row label="Confidence">
          <ConfidenceBadge confidence={trust.confidence} />
        </Row>
        <Row label="Last verified">{formatDate(trust.lastVerified)}</Row>
        {trust.reviewDue ? <Row label="Next review">{formatDate(trust.reviewDue)}</Row> : null}
        <Row label="Status">
          <ReviewStatusBadge state={trust.reviewState} />
        </Row>
        <Row label="Validity">{validityLabel[trust.validity]}</Row>
        {trust.reviewedBy ? <Row label="Reviewed by">{trust.reviewedBy}</Row> : null}
        <Row label="Version">
          <VersionBadge version={trust.version} />
        </Row>
        {typeof sourceCount === 'number' ? <Row label="Official sources">{sourceCount}</Row> : null}
      </dl>
    </section>
  );
}
