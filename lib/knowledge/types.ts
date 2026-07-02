/* eslint-disable @typescript-eslint/consistent-type-imports --
   These enum objects are read via `typeof x.enumValues` (a type query), which
   requires the runtime VALUE binding — an `import type` would break typecheck. */
import {
  carriageEnum,
  complexityEnum,
  confidenceEnum,
  consumptionContextEnum,
  decisionTypeEnum,
  entityTypeEnum,
  evidenceLevelEnum,
  factValueTypeEnum,
  intentEnum,
  nodeStateEnum,
  resolverDimensionEnum,
  reviewStatusEnum,
  reviewTargetEnum,
  riskLevelEnum,
  timePhaseEnum,
  topicEdgeEnum,
  travelTypeEnum,
  validityEnum,
  verdictEnum,
  volatilityEnum,
} from '@/db/schema/enums';

/**
 * Domain string-literal unions, derived from the single source of truth (the
 * pg enums). Importing `.enumValues` pulls no DB connection — pure data — so
 * domain logic and tests stay framework-free while never drifting from the DB.
 */
export type EvidenceLevel = (typeof evidenceLevelEnum.enumValues)[number];
export type Verdict = (typeof verdictEnum.enumValues)[number];
export type ResolverDimension = (typeof resolverDimensionEnum.enumValues)[number];
export type Validity = (typeof validityEnum.enumValues)[number];
export type Confidence = (typeof confidenceEnum.enumValues)[number];
export type Volatility = (typeof volatilityEnum.enumValues)[number];
export type NodeState = (typeof nodeStateEnum.enumValues)[number];
export type RiskLevel = (typeof riskLevelEnum.enumValues)[number];
export type TravelType = (typeof travelTypeEnum.enumValues)[number];
export type Carriage = (typeof carriageEnum.enumValues)[number];
export type TimePhase = (typeof timePhaseEnum.enumValues)[number];
export type Intent = (typeof intentEnum.enumValues)[number];
export type DecisionType = (typeof decisionTypeEnum.enumValues)[number];
export type Complexity = (typeof complexityEnum.enumValues)[number];
export type ConsumptionContext = (typeof consumptionContextEnum.enumValues)[number];
export type EntityType = (typeof entityTypeEnum.enumValues)[number];
export type ReviewTarget = (typeof reviewTargetEnum.enumValues)[number];
export type ReviewStatus = (typeof reviewStatusEnum.enumValues)[number];
export type TopicEdge = (typeof topicEdgeEnum.enumValues)[number];
export type FactValueType = (typeof factValueTypeEnum.enumValues)[number];

/**
 * AnswerKind — the traveller-facing DECISION TYPE that determines the verdict
 * VOCABULARY. The underlying `Verdict` enum stays a small, closed polarity
 * (allowed / conditional / not-allowed / depends); AnswerKind reshapes how that
 * polarity is *worded and coloured* so it matches the user's intent. A carry
 * question reads "Allowed / Not allowed"; a requirement reads "Required / Not
 * required"; validity reads "Valid / Minimum required"; etc. Never show
 * "Not allowed" for a requirement, validity, acceptance or eligibility question.
 */
export type AnswerKind =
  'carry' | 'requirement' | 'validity' | 'acceptance' | 'recommendation' | 'eligibility';
