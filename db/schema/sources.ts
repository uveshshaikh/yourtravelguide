import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { auditColumns, idColumn, softDeleteColumn } from '@/db/schema/_helpers';
import { authorities } from '@/db/schema/authorities';

/**
 * Source — a specific publication of an Authority (a circular, a policy page).
 * Stores an archived snapshot + access date so provenance survives link rot
 * (Blueprint Part 2: "we cite our captured record, not a fragile external URL").
 */
export const sources = pgTable(
  'sources',
  {
    ...idColumn,
    authorityId: uuid('authority_id')
      .notNull()
      .references(() => authorities.id),
    title: text('title').notNull(),
    url: text('url').notNull(),
    /** Snapshot/web-archive URL captured at ingest. */
    archivedUrl: text('archived_url'),
    sourceType: text('source_type'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    accessedAt: timestamp('accessed_at', { withTimezone: true }).defaultNow().notNull(),
    // Sources are immutable once captured. A revised publication is a NEW row
    // pointing back here — append-only history without in-place edits (Rule 8).
    supersededById: uuid('superseded_by_id'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [index('sources_authority_idx').on(t.authorityId)],
);
