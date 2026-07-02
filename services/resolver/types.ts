import type {
  Carriage,
  Confidence,
  DecisionType,
  EvidenceLevel,
  Intent,
  NodeState,
  ResolverDimension,
  RiskLevel,
  TravelType,
  Validity,
  Verdict,
} from '@/lib/knowledge/types';
import type { DecisionView } from '@/lib/knowledge/view';

/**
 * Resolver input contract — the narrow, typed shapes the pure resolver/mappers
 * operate on. The `gather` step adapts repository rows into these; the pure core
 * (buildDecision + mappers) is DB-free and fully unit-testable. Every field
 * originates from Knowledge Core data; there are no fabricated defaults.
 */

export interface ScopeInput {
  origin?: string[] | null;
  destination?: string[] | null;
  transit?: string[] | null;
  travelType?: TravelType[] | null;
  carriage?: Carriage[] | null;
  airlines?: string[] | null;
  airports?: string[] | null;
  profiles?: string[] | null;
}

export interface ClaimInput {
  id: string;
  subjectType: string;
  subjectCode: string;
  question: string;
  verdict: Verdict;
  resolverDimensions: ResolverDimension[] | null;
  validity: Validity;
  summary: string;
  conditions: unknown;
  scope: ScopeInput;
  evidenceLevel: EvidenceLevel;
  confidence: Confidence;
  currentVersion: number;
  lastVerifiedAt: Date | null;
  reviewDue: Date | null;
  state: NodeState;
  deletedAt: Date | null;
  riskLevel: RiskLevel;
}

export interface TopicInput {
  slug: string;
  question: string;
  intent: Intent | null;
  decisionType: DecisionType;
  riskLevel: RiskLevel;
}

export interface SourceInput {
  id: string;
  authorityName: string;
  authorityCode: string;
  title: string;
  url: string;
  evidenceLevel: EvidenceLevel;
  publishedAt: Date | null;
  archivedUrl: string | null;
}

export interface EvidenceInput {
  id: string;
  evidenceLevel: EvidenceLevel;
  source: SourceInput;
}

export interface ExceptionInput {
  id: string;
  profileCode: string;
  modifier: string;
  verdictOverride: Verdict | null;
}

export interface VersionInput {
  version: number;
  date: Date;
  summary: string;
  changeReason: string | null;
}

export interface RelatedInput {
  slug: string;
  question: string;
}

export interface AuthorityInput {
  name: string;
  jurisdiction: string | null;
  websiteUrl: string | null;
  description: string | null;
}

/** Everything the resolver gathered for one topic slug. */
export interface RawDecisionInputs {
  topic: TopicInput | null;
  claim: ClaimInput | null;
  authority: AuthorityInput | null;
  evidence: EvidenceInput[];
  exceptions: ExceptionInput[];
  versions: VersionInput[];
  relatedQuestions: RelatedInput[];
  relatedTopics: RelatedInput[];
}

// ── The three-state refusal contract ────────────────────────────────────────

export type IncompleteReason =
  | 'no_published_claim'
  | 'no_evidence'
  | 'missing_trust_fields'
  /** The verdict and the explanation disagree — never render a contradiction. */
  | 'verdict_incoherent';

/** STATE 2 — topic identified, but not enough verified knowledge to publish. */
export interface InsufficientKnowledge {
  state: 'incomplete';
  topicSlug: string;
  question: string;
  /** Internal reason for the editorial queue — never rendered as guidance. */
  reason: IncompleteReason;
}

/** STATE 1 — a fully verified, publishable answer. */
export interface DecisionAvailable {
  state: 'available';
  view: DecisionView;
}

/** STATE 3 — no supported knowledge for this slug. */
export interface DecisionNotFound {
  state: 'not_found';
}

export type DecisionResult = DecisionAvailable | InsufficientKnowledge | DecisionNotFound;
