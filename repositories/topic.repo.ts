import { and, desc, eq, isNotNull, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { claims, topicClaims, topicEdges, topics } from '@/db/schema';
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

  /** Published, live claims answering this topic (via the topic_claims junction). */
  async publishedClaims(topicId: string) {
    const rows = await db
      .select({ claim: claims })
      .from(topicClaims)
      .innerJoin(claims, eq(topicClaims.claimId, claims.id))
      .where(
        and(
          eq(topicClaims.topicId, topicId),
          eq(claims.state, 'published'),
          isNull(claims.deletedAt),
        ),
      );
    return rows.map((r) => r.claim);
  },

  /**
   * Related topics that are actually answerable — targets with a PUBLISHED claim
   * only, so a "related question" link can never dead-end on unverified content.
   * De-duplicated by slug.
   */
  async relatedTargets(topicId: string) {
    const rows = await db
      .select({
        slug: topics.slug,
        question: topics.question,
        edgeType: topicEdges.edgeType,
        position: topicEdges.position,
      })
      .from(topicEdges)
      .innerJoin(topics, eq(topicEdges.toTopicId, topics.id))
      .innerJoin(topicClaims, eq(topicClaims.topicId, topics.id))
      .innerJoin(
        claims,
        and(
          eq(topicClaims.claimId, claims.id),
          eq(claims.state, 'published'),
          isNull(claims.deletedAt),
        ),
      )
      .where(and(eq(topicEdges.fromTopicId, topicId), isNull(topics.deletedAt)))
      .orderBy(topicEdges.position);

    const seen = new Set<string>();
    const out: { slug: string; question: string; edgeType: (typeof rows)[number]['edgeType'] }[] =
      [];
    for (const r of rows) {
      if (seen.has(r.slug)) continue;
      seen.add(r.slug);
      out.push({ slug: r.slug, question: r.question, edgeType: r.edgeType });
    }
    return out;
  },

  /**
   * The verified-question catalog — every topic with a PUBLISHED, verified claim.
   * Powers homepage popular/featured and the search index. Data-driven: it grows
   * automatically as verified questions are added. Newest verification first.
   */
  async listVerifiedQuestions() {
    return db
      .select({
        slug: topics.slug,
        question: topics.question,
        category: topics.journeyStage,
        verdict: claims.verdict,
        lastVerifiedAt: claims.lastVerifiedAt,
        riskLevel: claims.riskLevel,
        scopeAirlines: claims.scopeAirlines,
        scopeAirports: claims.scopeAirports,
        scopeTravelType: claims.scopeTravelType,
        scopeProfiles: claims.scopeProfiles,
        scopeOrigin: claims.scopeOrigin,
        scopeDestination: claims.scopeDestination,
      })
      .from(topics)
      .innerJoin(topicClaims, eq(topicClaims.topicId, topics.id))
      .innerJoin(
        claims,
        and(
          eq(topicClaims.claimId, claims.id),
          eq(claims.state, 'published'),
          isNull(claims.deletedAt),
          isNotNull(claims.lastVerifiedAt),
        ),
      )
      .where(isNull(topics.deletedAt))
      .orderBy(desc(claims.lastVerifiedAt));
  },
};
