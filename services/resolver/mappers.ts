import type {
  AppliesToView,
  AuthorityView,
  ConditionView,
  DecisionView,
  ExceptionView,
  RelatedItemView,
  SourceView,
  TrustView,
  VersionEntryView,
} from '@/lib/knowledge/view';
import { reviewStateOf } from '@/lib/knowledge/review';
import type {
  AuthorityInput,
  ClaimInput,
  EvidenceInput,
  ExceptionInput,
  RelatedInput,
  TopicInput,
  VersionInput,
} from '@/services/resolver/types';

/**
 * Pure ViewModel mappers. Repository/gathered inputs → typed view-models.
 * No fabricated defaults, no placeholder values, no manual confidence — every
 * value passes through unchanged from the Knowledge Core.
 */

/** Official-sources mapper (dedupes by source id). */
export function toSourceViews(evidence: EvidenceInput[]): SourceView[] {
  const seen = new Set<string>();
  const out: SourceView[] = [];
  for (const e of evidence) {
    if (seen.has(e.source.id)) continue;
    seen.add(e.source.id);
    out.push({
      id: e.source.id,
      authority: e.source.authorityName,
      authorityCode: e.source.authorityCode,
      title: e.source.title,
      url: e.source.url,
      evidenceLevel: e.source.evidenceLevel,
      publishedAt: e.source.publishedAt ? e.source.publishedAt.toISOString() : undefined,
      archivedUrl: e.source.archivedUrl ?? undefined,
    });
  }
  return out;
}

/** Trust mapper. `verifiedAt` is the caller-validated (non-null) verification date. */
export function toTrustView(claim: ClaimInput, verifiedAt: Date, now: Date): TrustView {
  return {
    confidence: claim.confidence,
    evidenceLevel: claim.evidenceLevel,
    lastVerified: verifiedAt.toISOString(),
    reviewDue: claim.reviewDue ? claim.reviewDue.toISOString() : undefined,
    reviewState: reviewStateOf(claim.reviewDue, now),
    version: claim.currentVersion,
    validity: claim.validity,
  };
}

/** Authority mapper. */
export function toAuthorityView(authority: AuthorityInput): AuthorityView {
  return {
    name: authority.name,
    jurisdiction: authority.jurisdiction ?? undefined,
    websiteUrl: authority.websiteUrl ?? undefined,
    description: authority.description ?? undefined,
  };
}

/** Scope → applicability. Absent dimensions stay undefined (meaning "all"). */
export function toAppliesTo(claim: ClaimInput): AppliesToView {
  const s = claim.scope;
  let travelType: AppliesToView['travelType'];
  const t = s.travelType;
  if (t && t.length > 0) {
    travelType = t.includes('domestic') && t.includes('international') ? 'both' : t[0];
  }
  return {
    origin: s.origin && s.origin.length > 0 ? s.origin.join(', ') : undefined,
    destination: s.destination && s.destination.length > 0 ? s.destination.join(', ') : undefined,
    travelType,
    airlines: s.airlines && s.airlines.length > 0 ? s.airlines : undefined,
    airports: s.airports && s.airports.length > 0 ? s.airports : undefined,
    profiles: s.profiles && s.profiles.length > 0 ? s.profiles : undefined,
    dependsOn:
      claim.resolverDimensions && claim.resolverDimensions.length > 0
        ? claim.resolverDimensions
        : undefined,
  };
}

/** Safely map free-form `conditions` jsonb to display rows. Unknown shapes → none. */
export function toConditions(raw: unknown): ConditionView[] | undefined {
  const rows: ConditionView[] = [];
  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (item && typeof item === 'object' && 'label' in item) {
        const rec = item as Record<string, unknown>;
        rows.push({
          label: String(rec.label),
          value: 'value' in rec ? String(rec.value) : undefined,
        });
      }
    }
  } else if (raw && typeof raw === 'object') {
    for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
      rows.push({ label: key, value: value == null ? undefined : String(value) });
    }
  }
  return rows.length > 0 ? rows : undefined;
}

export function toExceptions(exceptions: ExceptionInput[]): ExceptionView[] {
  return exceptions.map((ex) => ({
    id: ex.id,
    appliesTo: ex.profileCode,
    detail: ex.modifier,
    verdictOverride: ex.verdictOverride ?? undefined,
  }));
}

export function toVersionEntries(versions: VersionInput[]): VersionEntryView[] {
  return versions.map((v) => ({
    version: v.version,
    date: v.date.toISOString(),
    summary: v.summary,
    changeReason: v.changeReason ?? undefined,
  }));
}

/** Related-questions / related-topics mapper. Verdict is intentionally omitted
 *  (not resolved here) rather than guessed. Links target real question routes. */
export function toRelatedItems(items: RelatedInput[]): RelatedItemView[] {
  return items.map((it) => ({ id: it.slug, label: it.question, href: `/question/${it.slug}` }));
}

/** DecisionView mapper. Callers pass the narrowed, validated topic/claim. */
export function toDecisionView(
  topic: TopicInput,
  claim: ClaimInput,
  parts: {
    evidence: EvidenceInput[];
    exceptions: ExceptionInput[];
    versions: VersionInput[];
    relatedQuestions: RelatedInput[];
    relatedTopics: RelatedInput[];
  },
  verifiedAt: Date,
  now: Date,
): DecisionView {
  return {
    id: claim.id,
    slug: topic.slug,
    question: topic.question,
    verdict: claim.verdict,
    answer: claim.summary,
    conditions: toConditions(claim.conditions),
    appliesTo: toAppliesTo(claim),
    exceptions: parts.exceptions.length > 0 ? toExceptions(parts.exceptions) : undefined,
    // NOTE: warnings / overview / examples / faqs are NOT in the Knowledge Core
    // schema yet — they are omitted, never fabricated.
    warnings: undefined,
    trust: toTrustView(claim, verifiedAt, now),
    sources: toSourceViews(parts.evidence),
    overview: undefined,
    examples: undefined,
    faqs: undefined,
    relatedQuestions:
      parts.relatedQuestions.length > 0 ? toRelatedItems(parts.relatedQuestions) : undefined,
    relatedTopics: parts.relatedTopics.length > 0 ? toRelatedItems(parts.relatedTopics) : undefined,
    versions: parts.versions.length > 0 ? toVersionEntries(parts.versions) : undefined,
    intent: topic.intent ?? undefined,
    decisionType: topic.decisionType,
    riskLevel: claim.riskLevel,
  };
}
