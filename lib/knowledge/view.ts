import type {
  AnswerKind,
  Confidence,
  DecisionType,
  EvidenceLevel,
  Intent,
  ResolverDimension,
  RiskLevel,
  TimePhase,
  Validity,
  Verdict,
} from '@/lib/knowledge/types';
import type { ReviewState } from '@/lib/knowledge/labels';

/**
 * Presentation view-models for the Decision Experience. These are the typed
 * props every UI component consumes — derived from the Sprint-2 schema but
 * shaped for rendering (resolved, flattened, display-ready). Components take
 * these; they never touch the database or hardcode rules.
 */

export interface SourceView {
  id: string;
  /** Owning authority, e.g. "DGCA". */
  authority: string;
  authorityCode?: string;
  title: string;
  url: string;
  evidenceLevel: EvidenceLevel;
  /** ISO date. */
  publishedAt?: string;
  /** Archived snapshot URL (link-rot insurance). */
  archivedUrl?: string;
}

export interface AuthorityView {
  name: string;
  jurisdiction?: string;
  websiteUrl?: string;
  description?: string;
}

export interface TrustView {
  confidence: Confidence;
  /** Highest evidence tier backing the answer. */
  evidenceLevel: EvidenceLevel;
  /** ISO date the answer was last re-verified. */
  lastVerified: string;
  /** ISO date the next review is due. */
  reviewDue?: string;
  reviewState: ReviewState;
  version: number;
  reviewedBy?: string;
  validity: Validity;
}

/** Resolved applicability — who and where this answer is for. */
export interface AppliesToView {
  origin?: string;
  destination?: string;
  travelType?: 'domestic' | 'international' | 'both';
  airlines?: string[];
  airports?: string[];
  profiles?: string[];
  /** Which scope dimension the verdict depends on (drives "Depends on…"). */
  dependsOn?: ResolverDimension[];
}

export interface ExceptionView {
  id: string;
  /** Who/what the exception applies to, e.g. "Medical travellers". */
  appliesTo: string;
  detail: string;
  verdictOverride?: Verdict;
}

export interface WarningView {
  id: string;
  tone?: 'warning' | 'danger' | 'info';
  title: string;
  detail?: string;
}

export interface FaqView {
  id: string;
  question: string;
  answer: string;
}

export interface RelatedItemView {
  id: string;
  label: string;
  href: string;
  /** Optional verdict chip on related questions. */
  verdict?: Verdict;
}

export interface VersionEntryView {
  version: number;
  date: string; // ISO
  summary: string;
  changeReason?: string;
}

export interface ConditionView {
  label: string;
  value?: string;
}

/** The full canonical-decision-page view-model. */
export interface DecisionView {
  id: string;
  slug: string;
  question: string;
  verdict: Verdict;
  /** One-sentence answer. */
  answer: string;
  /** Structured conditions/limits, e.g. { label: 'Max capacity', value: '100 Wh' }. */
  conditions?: ConditionView[];
  appliesTo: AppliesToView;
  exceptions?: ExceptionView[];
  warnings?: WarningView[];
  trust: TrustView;
  sources: SourceView[];
  /** Detailed explanation paragraphs. */
  overview?: string[];
  examples?: string[];
  faqs?: FaqView[];
  relatedQuestions?: RelatedItemView[];
  relatedTopics?: RelatedItemView[];
  versions?: VersionEntryView[];
  intent?: Intent;
  decisionType?: DecisionType;
  /** Decision type that determines the verdict vocabulary/tone. */
  answerKind?: AnswerKind;
  riskLevel?: RiskLevel;
}

export interface BreadcrumbItemView {
  label: string;
  href?: string;
}

export interface TocItemView {
  id: string;
  label: string;
}

export interface JourneyStepView {
  id: string;
  phase: TimePhase;
  title: string;
  description?: string;
  href?: string;
  status?: 'done' | 'current' | 'upcoming';
}

// ── Entity view-models ──────────────────────────────────────────────────────

export interface AirlineView {
  code: string;
  name: string;
  countryCode?: string;
  websiteUrl?: string;
  href?: string;
}

export interface AirportView {
  code: string;
  name: string;
  city?: string;
  countryCode?: string;
  href?: string;
}

export interface CountryView {
  code: string;
  name: string;
  href?: string;
}

export interface DocumentView {
  code: string;
  name: string;
  category?: string;
  href?: string;
}

export interface ProfileView {
  code: string;
  name: string;
  description?: string;
  href?: string;
}

export interface JourneyView {
  slug: string;
  title: string;
  description?: string;
  stepCount?: number;
  href?: string;
}

// ── Search view-models ──────────────────────────────────────────────────────

/** A verified question in the search/browse catalog (search index entry). */
export interface QuestionSummaryView {
  slug: string;
  question: string;
  verdict: Verdict;
  /** ISO date the answer was last verified. */
  lastVerified: string;
  /** Short applicability summary, e.g. "All airlines · Domestic & international". */
  appliesTo: string;
  riskLevel: RiskLevel;
  /** Traveller-facing category, e.g. "Baggage & items". */
  category: string;
  /** Traveller-intent group (discovery axis), e.g. "Packing", "Family travel". */
  intentGroup: string;
  /** Decision type that determines the verdict vocabulary/tone. */
  answerKind: AnswerKind;
}

export interface QuestionResultView {
  id: string;
  question: string;
  href: string;
  verdict?: Verdict;
  summary?: string;
}

export interface CategoryResultView {
  id: string;
  title: string;
  href: string;
  description?: string;
  count?: number;
}

export interface EntityResultView {
  id: string;
  kind: 'airline' | 'airport' | 'country' | 'document' | 'traveller_profile';
  label: string;
  sublabel?: string;
  href: string;
}
