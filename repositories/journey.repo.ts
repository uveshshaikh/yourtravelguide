import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { journeyStages, journeyTopics, journeys } from '@/db/schema';
import {
  createJourneySchema,
  createJourneyStageSchema,
  type CreateJourneyInput,
  type CreateJourneyStageInput,
} from '@/lib/knowledge/validation';
import { firstOrThrow, type Actor } from '@/repositories/_base';

/**
 * Journey repository — ordered collections of Topics (stages, life-event
 * collections). A journey is a view over existing topics; it composes them,
 * never storing new truth.
 */
export const journeyRepository = {
  async create(input: CreateJourneyInput, actor?: Actor) {
    const data = createJourneySchema.parse(input);
    return firstOrThrow(
      await db
        .insert(journeys)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'journey',
    );
  },

  async getBySlug(slug: string) {
    return db.query.journeys.findFirst({
      where: and(eq(journeys.slug, slug), isNull(journeys.deletedAt)),
    });
  },

  /** Add an ordered stage to a journey (Plan → Pack → Airport → …). */
  async addStage(input: CreateJourneyStageInput, actor?: Actor) {
    const data = createJourneyStageSchema.parse(input);
    return firstOrThrow(
      await db
        .insert(journeyStages)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'journey stage',
    );
  },

  /** Place a Topic into a journey at a given position. */
  async addTopic(journeyId: string, topicId: string, position = 0) {
    return firstOrThrow(
      await db.insert(journeyTopics).values({ journeyId, topicId, position }).returning(),
      'journey-topic link',
    );
  },

  async stages(journeyId: string) {
    return db.query.journeyStages.findMany({
      where: eq(journeyStages.journeyId, journeyId),
      orderBy: (s, { asc }) => [asc(s.position)],
    });
  },

  async topics(journeyId: string) {
    return db.query.journeyTopics.findMany({
      where: eq(journeyTopics.journeyId, journeyId),
      orderBy: (jt, { asc }) => [asc(jt.position)],
    });
  },
};
