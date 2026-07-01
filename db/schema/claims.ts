import {
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { auditColumns, idColumn, softDeleteColumn } from '@/db/schema/_helpers';
import {
  carriageEnum,
  confidenceEnum,
  entityTypeEnum,
  evidenceLevelEnum,
  nodeStateEnum,
  resolverDimensionEnum,
  riskLevelEnum,
  travelTypeEnum,
  validityEnum,
  verdictEnum,
  volatilityEnum,
} from '@/db/schema/enums';
import { authorities } from '@/db/schema/authorities';
import { evidence } from '@/db/schema/evidence';
import { facts } from '@/db/schema/facts';

/**
 * Claim — THE decision unit. `subject + verdict + scope + conditions`, composing
 * Facts and citing Evidence. Airline/airport/country "policies" and item "rules"
 * are all Claims (Blueprint Part 2 — one decision model, not three).
 *
 * Verdict is THREE orthogonal axes:
 *  - verdict            (the answer)
 *  - resolverDimensions (which scope dim a conditional answer depends on)
 *  - validity           (lifecycle/time state)
 *
 * Scope arrays: NULL = ANY (matches everything); a non-empty array = that
 * specific set. Resolution = most-specific-wins (lib/knowledge/scope.ts).
 */
export const claims = pgTable(
  'claims',
  {
    ...idColumn,
    subjectType: entityTypeEnum('subject_type').notNull(),
    subjectCode: text('subject_code').notNull(),
    /** The decision in the traveller's words, e.g. "Can I carry a power bank?". */
    question: text('question').notNull(),

    // --- Verdict: three orthogonal axes ---
    verdict: verdictEnum('verdict').notNull(),
    resolverDimensions: resolverDimensionEnum('resolver_dimensions').array(),
    validity: validityEnum('validity').notNull().default('stable'),

    /** One-sentence answer. */
    summary: text('summary').notNull(),
    /** Structured limits/conditions, e.g. { maxWh: 100 }. */
    conditions: jsonb('conditions'),

    // --- Scope (NULL = ANY) ---
    scopeOrigin: text('scope_origin').array(),
    scopeDestination: text('scope_destination').array(),
    scopeTransit: text('scope_transit').array(),
    scopeTravelType: travelTypeEnum('scope_travel_type').array(),
    scopeCarriage: carriageEnum('scope_carriage').array(),
    scopeAirlines: text('scope_airlines').array(),
    scopeAirports: text('scope_airports').array(),
    scopeProfiles: text('scope_profiles').array(),
    validFrom: timestamp('valid_from', { withTimezone: true }),
    validUntil: timestamp('valid_until', { withTimezone: true }),

    // --- Trust envelope (evidenceLevel/confidence DERIVED by the repository) ---
    ownerAuthorityId: uuid('owner_authority_id')
      .notNull()
      .references(() => authorities.id),
    /** Highest tier among the Claim's cited Evidence — derived, never hand-set. */
    evidenceLevel: evidenceLevelEnum('evidence_level').notNull(),
    confidence: confidenceEnum('confidence').notNull().default('provisional'),
    volatility: volatilityEnum('volatility').notNull().default('medium'),
    /** Consequence of being wrong → sets review rigor (Governance Matrix). */
    riskLevel: riskLevelEnum('risk_level').notNull().default('medium'),
    lastVerifiedAt: timestamp('last_verified_at', { withTimezone: true }),
    reviewDue: timestamp('review_due', { withTimezone: true }),

    // --- Lifecycle ---
    state: nodeStateEnum('state').notNull().default('draft'),
    currentVersion: integer('current_version').notNull().default(1),
    supersededById: uuid('superseded_by_id'),

    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [
    index('claims_subject_idx').on(t.subjectType, t.subjectCode),
    index('claims_owner_idx').on(t.ownerAuthorityId),
    index('claims_review_due_idx').on(t.reviewDue),
    index('claims_state_idx').on(t.state),
    // GIN indexes accelerate scope resolution by airline/destination.
    index('claims_scope_airlines_gin').using('gin', t.scopeAirlines),
    index('claims_scope_destination_gin').using('gin', t.scopeDestination),
  ],
);

/** Junction: a Claim composes Facts (the reuse engine — one fact, many claims). */
export const claimFacts = pgTable(
  'claim_facts',
  {
    claimId: uuid('claim_id')
      .notNull()
      .references(() => claims.id),
    factId: uuid('fact_id')
      .notNull()
      .references(() => facts.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.claimId, t.factId] })],
);

/** Junction: a Claim cites Evidence. */
export const claimEvidence = pgTable(
  'claim_evidence',
  {
    claimId: uuid('claim_id')
      .notNull()
      .references(() => claims.id),
    evidenceId: uuid('evidence_id')
      .notNull()
      .references(() => evidence.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.claimId, t.evidenceId] })],
);

/**
 * ClaimException — a profile-specific delta on a base Claim (Phase 2: profiles
 * are overlays, NOT duplicated pages). Composed child; dies with its claim.
 */
export const claimExceptions = pgTable(
  'claim_exceptions',
  {
    ...idColumn,
    claimId: uuid('claim_id')
      .notNull()
      .references(() => claims.id),
    /** Traveller-profile code this exception applies to. */
    profileCode: text('profile_code').notNull(),
    dimension: resolverDimensionEnum('dimension'),
    modifier: text('modifier').notNull(),
    /** Optional verdict override for this profile. */
    verdictOverride: verdictEnum('verdict_override'),
    evidenceId: uuid('evidence_id').references(() => evidence.id),
    notes: text('notes'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [index('claim_exceptions_claim_idx').on(t.claimId)],
);

/** Immutable, append-only Claim version history (mirrors fact_versions). */
export const claimVersions = pgTable(
  'claim_versions',
  {
    ...idColumn,
    claimId: uuid('claim_id')
      .notNull()
      .references(() => claims.id),
    version: integer('version').notNull(),
    verdict: verdictEnum('verdict').notNull(),
    validity: validityEnum('validity').notNull(),
    summary: text('summary').notNull(),
    conditions: jsonb('conditions'),
    evidenceLevel: evidenceLevelEnum('evidence_level').notNull(),
    confidence: confidenceEnum('confidence').notNull(),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    changeReason: text('change_reason'),
    supersedesVersion: integer('supersedes_version'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    createdBy: uuid('created_by'),
  },
  (t) => [uniqueIndex('claim_versions_claim_version_uniq').on(t.claimId, t.version)],
);
