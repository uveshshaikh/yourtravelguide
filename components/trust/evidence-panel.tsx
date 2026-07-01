import type { EvidenceLevel } from '@/lib/knowledge/types';
import { evidenceLevelLabel, evidenceLevelRankLabel } from '@/lib/knowledge/labels';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * EvidencePanel — what *kind* of evidence backs the answer, and what that means.
 * Tiers 1–5 establish facts; 6–7 only supplement. Showing this prevents an
 * operator's discretionary policy reading like binding law.
 */
const explanation: Record<EvidenceLevel, string> = {
  government_regulation: 'A binding rule issued by a government regulator.',
  government_advisory: 'Official government guidance — authoritative but not binding law.',
  international_standard: 'An international standard (e.g. ICAO, IATA, WHO).',
  airport_policy: 'A specific airport’s operational policy — can vary by airport.',
  airline_policy: 'A specific airline’s policy — can vary by airline and fare.',
  expert_recommendation: 'Our editorial guidance, clearly marked as ours.',
  traveller_experience: 'A traveller report — context only, never the sole basis for a fact.',
};

const isOfficial = (level: EvidenceLevel) =>
  level === 'government_regulation' ||
  level === 'government_advisory' ||
  level === 'international_standard';

export function EvidencePanel({
  evidenceLevel,
  className,
}: {
  evidenceLevel: EvidenceLevel;
  className?: string;
}) {
  return (
    <section className={cn('border-border bg-card rounded-xl border p-5', className)}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-semibold">Evidence</h2>
        <Badge variant={isOfficial(evidenceLevel) ? 'info' : 'neutral'}>
          {evidenceLevelRankLabel[evidenceLevel]}
        </Badge>
      </div>
      <p className="mt-2 text-sm font-medium">{evidenceLevelLabel[evidenceLevel]}</p>
      <p className="text-muted-foreground mt-1 text-sm">{explanation[evidenceLevel]}</p>
    </section>
  );
}
