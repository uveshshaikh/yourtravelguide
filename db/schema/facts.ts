import { sql } from 'drizzle-orm';
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
  confidenceEnum,
  entityTypeEnum,
  evidenceLevelEnum,
  factValueTypeEnum,
  nodeStateEnum,
  volatilityEnum,
} from '@/db/schema/enums';
import { authorities } from '@/db/schema/authorities';
import { evidence } from '@/db/schema/evidence';

/**
 * Fact — the atomic unit of truth. Lives EXACTLY ONCE (single-home), enforced
 * by the partial unique index on (subjectType, subjectCode, key) for live rows.
 * Carries its trust envelope inline. `confidence` is a derived cache computed by
 * the domain layer (lib/knowledge/confidence.ts), never hand-set.
 */
export const facts = pgTable(
  'facts',
  {
    ...idColumn,
    /** The entity this fact is about. */
    subjectType: entityTypeEnum('subject_type').notNull(),
    subjectCode: text('subject_code').notNull(),
    /** Fact-group key, e.g. "cabin_baggage_weight_kg". */
    key: text('key').notNull(),
    label: text('label').notNull(),

    valueType: factValueTypeEnum('value_type').notNull(),
    value: jsonb('value').notNull(),
    unit: text('unit'),

    // --- Trust envelope (all DERIVED by the repository; never hand-entered) ---
    ownerAuthorityId: uuid('owner_authority_id')
      .notNull()
      .references(() => authorities.id),
    /**
     * Highest evidence tier among the linked Evidence (Rule 2: one truth, one
     * home). A denormalised cache of `factEvidence` for query/sort — recomputed
     * whenever evidence links change; it can never diverge from its evidence.
     */
    evidenceLevel: evidenceLevelEnum('evidence_level').notNull(),
    confidence: confidenceEnum('confidence').notNull().default('provisional'),
    volatility: volatilityEnum('volatility').notNull().default('medium'),
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
    uniqueIndex('facts_single_home_uniq')
      .on(t.subjectType, t.subjectCode, t.key)
      .where(sql`${t.deletedAt} is null`),
    index('facts_subject_idx').on(t.subjectType, t.subjectCode),
    index('facts_owner_idx').on(t.ownerAuthorityId),
    index('facts_review_due_idx').on(t.reviewDue),
    index('facts_state_idx').on(t.state),
  ],
);

/**
 * Immutable, append-only version history for a Fact. A change creates a new row;
 * old rows are never updated or deleted (Constitution: "we supersede, never
 * silently overwrite"). Powers the public "what changed" feed + audit trail.
 */
export const factVersions = pgTable(
  'fact_versions',
  {
    ...idColumn,
    factId: uuid('fact_id')
      .notNull()
      .references(() => facts.id),
    version: integer('version').notNull(),
    valueType: factValueTypeEnum('value_type').notNull(),
    value: jsonb('value').notNull(),
    unit: text('unit'),
    evidenceLevel: evidenceLevelEnum('evidence_level').notNull(),
    confidence: confidenceEnum('confidence').notNull(),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    changeReason: text('change_reason'),
    supersedesVersion: integer('supersedes_version'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    createdBy: uuid('created_by'),
  },
  (t) => [uniqueIndex('fact_versions_fact_version_uniq').on(t.factId, t.version)],
);

/** Junction: a Fact is backed by one or more Evidence; Evidence is reusable. */
export const factEvidence = pgTable(
  'fact_evidence',
  {
    factId: uuid('fact_id')
      .notNull()
      .references(() => facts.id),
    evidenceId: uuid('evidence_id')
      .notNull()
      .references(() => evidence.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.factId, t.evidenceId] })],
);
