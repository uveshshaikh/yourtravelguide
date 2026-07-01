import { timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Shared column sets, spread into table definitions for consistency.
 *
 * `createdBy`/`updatedBy` are plain UUIDs (no FK to auth.users) so the knowledge
 * model stays decoupled from the auth provider — Blueprint: "Traveller (the
 * person) is not in the knowledge graph".
 */
export const auditColumns = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  createdBy: uuid('created_by'),
  updatedBy: uuid('updated_by'),
};

/**
 * Soft-delete marker. Knowledge is never hard-deleted (Constitution:
 * append-only history). Retirement = nodeState 'retired' + deletedAt set.
 * Repositories filter `isNull(deletedAt)` by default.
 */
export const softDeleteColumn = {
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
};

/** Standard primary key. */
export const idColumn = {
  id: uuid('id').defaultRandom().primaryKey(),
};
