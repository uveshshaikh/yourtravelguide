import { and, eq, lte } from 'drizzle-orm';
import { db } from '@/db';
import { reviews } from '@/db/schema';
import { createReviewSchema, type CreateReviewInput } from '@/lib/knowledge/validation';
import { firstOrThrow, type Actor } from '@/repositories/_base';
import type { ReviewStatus } from '@/lib/knowledge/types';

/**
 * Review repository — the freshness engine. A review is a scheduled or completed
 * verification of a node (fact | claim | topic). `scheduledFor` comes from the
 * node's volatility SLA; `riskLevel` (denormalised at scheduling time) routes the
 * required reviewer per the Governance Matrix (Critical → credentialed).
 */
export const reviewRepository = {
  async schedule(input: CreateReviewInput, actor?: Actor) {
    const data = createReviewSchema.parse(input);
    return firstOrThrow(
      await db
        .insert(reviews)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'review',
    );
  },

  /** Reviews due on/before `asOf` and not yet actioned — the maintenance queue. */
  async listDue(asOf: Date = new Date()) {
    return db.query.reviews.findMany({
      where: and(eq(reviews.status, 'pending'), lte(reviews.scheduledFor, asOf)),
      orderBy: (r, { asc }) => [asc(r.scheduledFor)],
    });
  },

  async start(id: string, reviewerId: string, actor?: Actor) {
    return firstOrThrow(
      await db
        .update(reviews)
        .set({
          status: 'in_progress',
          reviewerId,
          startedAt: new Date(),
          updatedBy: actor,
          updatedAt: new Date(),
        })
        .where(eq(reviews.id, id))
        .returning(),
      'review',
    );
  },

  /** Close a review. `outcome` records what happened, e.g. "verified-unchanged". */
  async complete(
    id: string,
    result: {
      status: Extract<ReviewStatus, 'approved' | 'rejected'>;
      outcome: string;
      notes?: string;
    },
    actor?: Actor,
  ) {
    return firstOrThrow(
      await db
        .update(reviews)
        .set({
          status: result.status,
          outcome: result.outcome,
          notes: result.notes,
          completedAt: new Date(),
          updatedBy: actor,
          updatedAt: new Date(),
        })
        .where(eq(reviews.id, id))
        .returning(),
      'review',
    );
  },
};
