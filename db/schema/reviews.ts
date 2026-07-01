import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { auditColumns, idColumn } from '@/db/schema/_helpers';
import { reviewStatusEnum, reviewTargetEnum, riskLevelEnum } from '@/db/schema/enums';

/**
 * Review — a scheduled or completed verification of a knowledge node.
 * Polymorphic target (fact | claim | topic) via (targetType, targetId).
 * `scheduledFor` is set from the node's volatility SLA; `riskLevel` (denormalised)
 * routes the required reviewer per the Governance Matrix (Critical → credentialed).
 */
export const reviews = pgTable(
  'reviews',
  {
    ...idColumn,
    targetType: reviewTargetEnum('target_type').notNull(),
    targetId: uuid('target_id').notNull(),
    reviewerId: uuid('reviewer_id'),
    status: reviewStatusEnum('status').notNull().default('pending'),
    riskLevel: riskLevelEnum('risk_level').notNull().default('medium'),
    scheduledFor: timestamp('scheduled_for', { withTimezone: true }).notNull(),
    startedAt: timestamp('started_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    /** Outcome of a completed review, e.g. "verified-unchanged", "updated". */
    outcome: text('outcome'),
    notes: text('notes'),
    ...auditColumns,
  },
  (t) => [
    index('reviews_target_idx').on(t.targetType, t.targetId),
    index('reviews_status_idx').on(t.status),
    index('reviews_scheduled_idx').on(t.scheduledFor),
  ],
);
