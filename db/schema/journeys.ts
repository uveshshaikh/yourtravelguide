import { index, integer, pgTable, primaryKey, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { auditColumns, idColumn, softDeleteColumn } from '@/db/schema/_helpers';
import { topics } from '@/db/schema/topics';

/**
 * Journey — an ordered collection of Topics (stages, life-event collections).
 * A view/playlist over the graph; it composes existing Topics, never new truth.
 */
export const journeys = pgTable(
  'journeys',
  {
    ...idColumn,
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [uniqueIndex('journeys_slug_uniq').on(t.slug)],
);

export const journeyStages = pgTable(
  'journey_stages',
  {
    ...idColumn,
    journeyId: uuid('journey_id')
      .notNull()
      .references(() => journeys.id),
    stageKey: text('stage_key').notNull(),
    title: text('title').notNull(),
    position: integer('position').notNull(),
    ...auditColumns,
  },
  (t) => [uniqueIndex('journey_stages_pos_uniq').on(t.journeyId, t.position)],
);

export const journeyTopics = pgTable(
  'journey_topics',
  {
    journeyId: uuid('journey_id')
      .notNull()
      .references(() => journeys.id),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topics.id),
    position: integer('position').notNull().default(0),
  },
  (t) => [
    primaryKey({ columns: [t.journeyId, t.topicId] }),
    index('journey_topics_journey_idx').on(t.journeyId),
  ],
);
