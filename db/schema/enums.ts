import { pgEnum } from 'drizzle-orm/pg-core';

/**
 * Database enums — the controlled vocabularies of the knowledge model.
 * These mirror the locked Knowledge Platform Blueprint. Ordinal *ranking*
 * (e.g. evidence tiers) lives in the domain layer, not in PG enum order.
 */

/** 7-tier evidence hierarchy (highest authority first). See lib/knowledge/evidence.ts. */
export const evidenceLevelEnum = pgEnum('evidence_level', [
  'government_regulation',
  'government_advisory',
  'international_standard',
  'airport_policy',
  'airline_policy',
  'expert_recommendation',
  'traveller_experience',
]);

/** Verdict axis 1 — the answer. Deliberately small + closed. */
export const verdictEnum = pgEnum('verdict', [
  'allowed',
  'allowed_with_conditions',
  'not_allowed',
  'unresolved',
]);

/** Verdict axis 2 — which scope dimension a conditional claim resolves against. */
export const resolverDimensionEnum = pgEnum('resolver_dimension', [
  'airline',
  'airport',
  'origin',
  'destination',
  'transit',
  'carriage',
  'profile',
]);

/** Verdict axis 3 — lifecycle/validity, orthogonal to the verdict. */
export const validityEnum = pgEnum('validity', [
  'stable',
  'temporary',
  'seasonal',
  'under_review',
  'deprecated',
]);

/** System-derived confidence ordinal (never hand-set numeric). */
export const confidenceEnum = pgEnum('confidence', ['confirmed', 'likely', 'provisional']);

/** Volatility tier → drives review SLA (lib/knowledge/volatility.ts). */
export const volatilityEnum = pgEnum('volatility', ['very_high', 'high', 'medium', 'low']);

/** Publication lifecycle state machine for any knowledge node. */
export const nodeStateEnum = pgEnum('node_state', [
  'draft',
  'in_review',
  'approved',
  'published',
  'superseded',
  'retired',
]);

/** Risk = consequence of being wrong. Sets the trust bar, not popularity. */
export const riskLevelEnum = pgEnum('risk_level', ['low', 'medium', 'high', 'critical']);

export const travelTypeEnum = pgEnum('travel_type', ['domestic', 'international']);

export const carriageEnum = pgEnum('carriage', ['cabin', 'checked']);

/** Coarse journey rollup used for nav + decision-graph directionality. */
export const timePhaseEnum = pgEnum('time_phase', ['before', 'during', 'after', 'emergency']);

/** Traveller intent (Phase 2). */
export const intentEnum = pgEnum('intent', [
  'reassurance',
  'verdict',
  'requirement',
  'threshold',
  'procedure',
  'comparison',
  'decision',
  'checklist',
  'timing',
  'cost',
  'emergency',
]);

/** Decision type → drives page template + tool fit. */
export const decisionTypeEnum = pgEnum('decision_type', [
  'verdict',
  'requirement',
  'procedure',
  'threshold',
  'comparison',
  'checklist',
  'decision',
  'emergency',
]);

export const complexityEnum = pgEnum('complexity', ['simple', 'medium', 'complex', 'very_complex']);

/** Layout mode — one resilient default + a glanceable/offline emergency mode. */
export const consumptionContextEnum = pgEnum('consumption_context', [
  'standard',
  'glanceable_offline',
]);

/** Kinds of real-world entity a fact/claim/scope can reference. */
export const entityTypeEnum = pgEnum('entity_type', [
  'country',
  'airline',
  'airport',
  'document',
  'travel_item',
  'traveller_profile',
  'authority',
]);

/** What a Review targets. */
export const reviewTargetEnum = pgEnum('review_target', ['fact', 'claim', 'topic']);

export const reviewStatusEnum = pgEnum('review_status', [
  'pending',
  'in_progress',
  'approved',
  'rejected',
]);

/** Three distinct topic-graph edge types (Phase 2 / Blueprint Part 10). */
export const topicEdgeEnum = pgEnum('topic_edge', ['next_decision', 'sibling', 'latent_question']);

/** Atomic fact value kinds. */
export const factValueTypeEnum = pgEnum('fact_value_type', [
  'number',
  'string',
  'boolean',
  'range',
  'structured',
]);
