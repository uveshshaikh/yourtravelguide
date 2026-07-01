import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { topicClaims, topicEdges, topics } from '@/db/schema';
import { AppError } from '@/lib/errors';
import { isForwardTransition } from '@/lib/knowledge/journey';
import type { TopicEdge } from '@/lib/knowledge/types';
import { createTopicSchema, type CreateTopicInput } from '@/lib/knowledge/validation';
import { firstOrThrow, type Actor } from '@/repositories/_base';

/**
 * Topic repository — the traveller-question layer. Topics are answered by shared
 * Claims and linked to one another by three edge types.
 */
export const topicRepository = {
  async create(input: CreateTopicInput, actor?: Actor) {
    const data = createTopicSchema.parse(input);
    return firstOrThrow(
      await db
        .insert(topics)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'topic',
    );
  },

  async getBySlug(slug: string) {
    return db.query.topics.findFirst({
      where: and(eq(topics.slug, slug), isNull(topics.deletedAt)),
    });
  },

  /** Record that a Topic is answered by a Claim. */
  async answerWith(topicId: string, claimId: string) {
    return firstOrThrow(
      await db.insert(topicClaims).values({ topicId, claimId }).returning(),
      'topic-claim link',
    );
  },

  /**
   * Link two topics in the decision graph. For `next_decision`, enforces
   * forward-in-time directionality so the journey graph can never loop
   * backward — the invariant that keeps recommendations logical.
   */
  async link(fromTopicId: string, toTopicId: string, edgeType: TopicEdge, position = 0) {
    if (edgeType === 'next_decision') {
      const [from, to] = await Promise.all([
        db.query.topics.findFirst({
          where: eq(topics.id, fromTopicId),
          columns: { timePhase: true },
        }),
        db.query.topics.findFirst({
          where: eq(topics.id, toTopicId),
          columns: { timePhase: true },
        }),
      ]);
      if (!from || !to) throw AppError.notFound('One or both topics do not exist.');
      if (!isForwardTransition(from.timePhase, to.timePhase)) {
        throw AppError.validation(
          `A next_decision edge cannot point backward in time (${from.timePhase} → ${to.timePhase}).`,
        );
      }
    }

    return firstOrThrow(
      await db
        .insert(topicEdges)
        .values({ fromTopicId, toTopicId, edgeType, position })
        .returning(),
      'topic edge',
    );
  },

  /** Outbound edges of a given type — powers "Next in your journey" etc. */
  async edges(fromTopicId: string, edgeType: TopicEdge) {
    return db.query.topicEdges.findMany({
      where: and(eq(topicEdges.fromTopicId, fromTopicId), eq(topicEdges.edgeType, edgeType)),
      orderBy: (e, { asc }) => [asc(e.position)],
    });
  },
};
