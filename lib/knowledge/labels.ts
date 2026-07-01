import type {
  Confidence,
  DecisionType,
  EvidenceLevel,
  Intent,
  RiskLevel,
  TimePhase,
  Validity,
  Verdict,
} from '@/lib/knowledge/types';

/**
 * Human-readable labels for the knowledge enums. Centralised so no component
 * ever hardcodes a rule string — labels come from here, values from the schema.
 */

export const verdictLabel: Record<Verdict, string> = {
  allowed: 'Allowed',
  allowed_with_conditions: 'Allowed with conditions',
  not_allowed: 'Not allowed',
  unresolved: 'Depends on your trip',
};

export const confidenceLabel: Record<Confidence, string> = {
  confirmed: 'Confirmed',
  likely: 'Likely',
  provisional: 'Provisional',
};

export const evidenceLevelLabel: Record<EvidenceLevel, string> = {
  government_regulation: 'Government regulation',
  government_advisory: 'Government advisory',
  international_standard: 'International standard',
  airport_policy: 'Airport policy',
  airline_policy: 'Airline policy',
  expert_recommendation: 'Expert guidance',
  traveller_experience: 'Traveller experience',
};

/** Short trust weighting shown to users (tiers 1–5 are authoritative). */
export const evidenceLevelRankLabel: Record<EvidenceLevel, string> = {
  government_regulation: 'Official · binding',
  government_advisory: 'Official · advisory',
  international_standard: 'International standard',
  airport_policy: 'Operator policy',
  airline_policy: 'Operator policy',
  expert_recommendation: 'Editorial guidance',
  traveller_experience: 'Traveller report',
};

export const validityLabel: Record<Validity, string> = {
  stable: 'Current',
  temporary: 'Temporary',
  seasonal: 'Seasonal',
  under_review: 'Under review',
  deprecated: 'Outdated',
};

export const riskLabel: Record<RiskLevel, string> = {
  low: 'Low impact',
  medium: 'Medium impact',
  high: 'High impact',
  critical: 'Critical',
};

export const timePhaseLabel: Record<TimePhase, string> = {
  before: 'Before you fly',
  during: 'At the airport',
  after: 'After you land',
  emergency: 'Emergency',
};

export const intentLabel: Record<Intent, string> = {
  reassurance: 'Reassurance',
  verdict: 'Can I…?',
  requirement: 'Do I need…?',
  threshold: 'How much…?',
  procedure: 'What happens…?',
  comparison: 'Compare',
  decision: 'Should I…?',
  checklist: 'Checklist',
  timing: 'Timing',
  cost: 'Cost',
  emergency: 'Emergency',
};

export const decisionTypeLabel: Record<DecisionType, string> = {
  verdict: 'Quick answer',
  requirement: 'Requirement',
  procedure: 'Step by step',
  threshold: 'Limit',
  comparison: 'Comparison',
  checklist: 'Checklist',
  decision: 'Decision',
  emergency: 'Emergency',
};

/** UI-level review state (derived from reviewDue vs now). */
export type ReviewState = 'current' | 'due_soon' | 'overdue';
export const reviewStateLabel: Record<ReviewState, string> = {
  current: 'Up to date',
  due_soon: 'Review due soon',
  overdue: 'Review overdue',
};
