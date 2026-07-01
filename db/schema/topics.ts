import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { auditColumns, idColumn, softDeleteColumn } from '@/db/schema/_helpers';
import {
  complexityEnum,
  consumptionContextEnum,
  decisionTypeEnum,
  intentEnum,
  nodeStateEnum,
  riskLevelEnum,
  timePhaseEnum,
  topicEdgeEnum,
  volatilityEnum,
} from '@/db/schema/enums';
import { claims } from '@/db/schema/claims';

/**
 * Topic — a traveller question (the Phase-2 TopicNode v2). Carries the
 * classification fields that drive the Governance Routing Matrix. Answered by
 * Claims; linked to other Topics by three edge types.
 */
export const topics = pgTable(
  'topics',
  {
    ...idColumn,
    slug: text('slug').notNull(),
    question: text('question').notNull(),
    journeyStage: text('journey_stage'),
    timePhase: timePhaseEnum('time_phase').notNull(),
    intent: intentEnum('intent').notNull(),
    searchPattern: text('search_pattern'),
    decisionType: decisionTypeEnum('decision_type').notNull(),
    complexity: complexityEnum('complexity').notNull().default('simple'),
    riskLevel: riskLevelEnum('risk_level').notNull().default('medium'),
    volatility: volatilityEnum('volatility').notNull().default('medium'),
    emotionalEntry: text('emotional_entry'),
    emotionalExit: text('emotional_exit'),
    seasonality: text('seasonality').array(),
    // NB: a Topic has NO owning authority — authority belongs to its Claims.
    // Editorial maintenance ownership of a topic is tracked via `reviews`.
    consumptionContext: consumptionContextEnum('consumption_context').notNull().default('standard'),
    state: nodeStateEnum('state').notNull().default('draft'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [
    uniqueIndex('topics_slug_uniq').on(t.slug),
    index('topics_time_phase_idx').on(t.timePhase),
    index('topics_risk_idx').on(t.riskLevel),
    index('topics_state_idx').on(t.state),
  ],
);

/** Junction: a Topic is answered by one or more Claims (shared). */
export const topicClaims = pgTable(
  'topic_claims',
  {
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topics.id),
    claimId: uuid('claim_id')
      .notNull()
      .references(() => claims.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.topicId, t.claimId] })],
);

/**
 * Topic graph edges — THREE distinct types (Blueprint Part 10):
 *  - next_decision  (forward, time-ordered journey graph)
 *  - sibling        (lateral, same cluster)
 *  - latent_question(deeper, "you should also know")
 * Directionality of next_decision is validated in the domain layer.
 */
export const topicEdges = pgTable(
  'topic_edges',
  {
    ...idColumn,
    fromTopicId: uuid('from_topic_id')
      .notNull()
      .references(() => topics.id),
    toTopicId: uuid('to_topic_id')
      .notNull()
      .references(() => topics.id),
    edgeType: topicEdgeEnum('edge_type').notNull(),
    position: integer('position').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex('topic_edges_uniq').on(t.fromTopicId, t.toTopicId, t.edgeType),
    index('topic_edges_from_idx').on(t.fromTopicId, t.edgeType),
  ],
);
