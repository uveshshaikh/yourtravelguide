import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { auditColumns, idColumn, softDeleteColumn } from '@/db/schema/_helpers';
import { evidenceLevelEnum } from '@/db/schema/enums';
import { sources } from '@/db/schema/sources';

/**
 * Evidence — one assertion extracted from a Source, stamped with its tier.
 * The bridge between a document and a Fact/Claim. Facts and claims cite
 * Evidence; they never cite raw URLs.
 */
export const evidence = pgTable(
  'evidence',
  {
    ...idColumn,
    sourceId: uuid('source_id')
      .notNull()
      .references(() => sources.id),
    assertion: text('assertion').notNull(),
    evidenceLevel: evidenceLevelEnum('evidence_level').notNull(),
    capturedAt: timestamp('captured_at', { withTimezone: true }).defaultNow().notNull(),
    // Evidence is immutable. A corrected reading is a NEW row referencing this
    // one — the assertion we cited is never silently rewritten (Rule 8).
    supersededById: uuid('superseded_by_id'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [
    index('evidence_source_idx').on(t.sourceId),
    index('evidence_level_idx').on(t.evidenceLevel),
  ],
);
