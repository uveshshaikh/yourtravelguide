import { z } from 'zod';
import {
  carriageEnum,
  complexityEnum,
  consumptionContextEnum,
  decisionTypeEnum,
  entityTypeEnum,
  evidenceLevelEnum,
  factValueTypeEnum,
  intentEnum,
  resolverDimensionEnum,
  reviewTargetEnum,
  riskLevelEnum,
  timePhaseEnum,
  travelTypeEnum,
  validityEnum,
  verdictEnum,
  volatilityEnum,
} from '@/db/schema/enums';

/**
 * Input validation for every write into the knowledge graph. Repositories
 * validate with these before touching the DB — nothing enters unvalidated
 * (Constitution: fail closed). Schemas derive their enums from the single
 * source of truth so they never drift from the DB.
 */
const pgEnumZ = <T extends readonly [string, ...string[]]>(e: { enumValues: T }) =>
  z.enum(e.enumValues);

const uuid = z.string().uuid();
const code = z.string().min(1).max(64);

// --- Provenance ---
export const createAuthoritySchema = z.object({
  code,
  name: z.string().min(1),
  jurisdictionCountry: z.string().length(2).nullish(),
  websiteUrl: z.string().url().nullish(),
  defaultEvidenceLevel: pgEnumZ(evidenceLevelEnum),
  description: z.string().nullish(),
});

export const createSourceSchema = z.object({
  authorityId: uuid,
  title: z.string().min(1),
  url: z.string().url(),
  archivedUrl: z.string().url().nullish(),
  sourceType: z.string().nullish(),
  publishedAt: z.coerce.date().nullish(),
  accessedAt: z.coerce.date().optional(),
});

export const createEvidenceSchema = z.object({
  sourceId: uuid,
  assertion: z.string().min(1),
  evidenceLevel: pgEnumZ(evidenceLevelEnum),
  capturedAt: z.coerce.date().optional(),
});

// --- Truth ---
export const createFactSchema = z.object({
  subjectType: pgEnumZ(entityTypeEnum),
  subjectCode: code,
  key: z.string().min(1).max(128),
  label: z.string().min(1),
  valueType: pgEnumZ(factValueTypeEnum),
  value: z.unknown(),
  unit: z.string().nullish(),
  ownerAuthorityId: uuid,
  /**
   * Evidence backing this fact. The evidence TIER is derived from these rows,
   * never passed in (Rule 2). A fact must cite at least one Evidence.
   */
  evidenceIds: z.array(uuid).min(1),
  volatility: pgEnumZ(volatilityEnum).optional(),
  lastVerifiedAt: z.coerce.date().nullish(),
});

// --- Decision ---
export const scopeSchema = z.object({
  origin: z.array(z.string()).nullish(),
  destination: z.array(z.string()).nullish(),
  transit: z.array(z.string()).nullish(),
  travelType: z.array(pgEnumZ(travelTypeEnum)).nullish(),
  carriage: z.array(pgEnumZ(carriageEnum)).nullish(),
  airline: z.array(z.string()).nullish(),
  airport: z.array(z.string()).nullish(),
  profile: z.array(z.string()).nullish(),
  validFrom: z.coerce.date().nullish(),
  validUntil: z.coerce.date().nullish(),
});

export const createClaimSchema = z.object({
  subjectType: pgEnumZ(entityTypeEnum),
  subjectCode: code,
  question: z.string().min(1),
  verdict: pgEnumZ(verdictEnum),
  resolverDimensions: z.array(pgEnumZ(resolverDimensionEnum)).nullish(),
  validity: pgEnumZ(validityEnum).optional(),
  summary: z.string().min(1),
  conditions: z.record(z.unknown()).nullish(),
  scope: scopeSchema.optional(),
  ownerAuthorityId: uuid,
  /** A claim must cite evidence; its tier is derived from these (Rule 2). */
  evidenceIds: z.array(uuid).min(1),
  /** Facts this claim composes (the reuse engine). Optional at creation. */
  factIds: z.array(uuid).optional(),
  volatility: pgEnumZ(volatilityEnum).optional(),
  riskLevel: pgEnumZ(riskLevelEnum).optional(),
  lastVerifiedAt: z.coerce.date().nullish(),
});

export const createClaimExceptionSchema = z.object({
  claimId: uuid,
  profileCode: code,
  dimension: pgEnumZ(resolverDimensionEnum).nullish(),
  modifier: z.string().min(1),
  verdictOverride: pgEnumZ(verdictEnum).nullish(),
  evidenceId: uuid.nullish(),
  notes: z.string().nullish(),
});

// --- Composition ---
export const createTopicSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case'),
  question: z.string().min(1),
  journeyStage: z.string().nullish(),
  timePhase: pgEnumZ(timePhaseEnum),
  intent: pgEnumZ(intentEnum),
  searchPattern: z.string().nullish(),
  decisionType: pgEnumZ(decisionTypeEnum),
  complexity: pgEnumZ(complexityEnum).optional(),
  riskLevel: pgEnumZ(riskLevelEnum).optional(),
  volatility: pgEnumZ(volatilityEnum).optional(),
  emotionalEntry: z.string().nullish(),
  emotionalExit: z.string().nullish(),
  seasonality: z.array(z.string()).nullish(),
  consumptionContext: pgEnumZ(consumptionContextEnum).optional(),
});

// --- Trust / lifecycle ---
export const createReviewSchema = z.object({
  targetType: pgEnumZ(reviewTargetEnum),
  targetId: uuid,
  reviewerId: uuid.nullish(),
  riskLevel: pgEnumZ(riskLevelEnum).optional(),
  scheduledFor: z.coerce.date(),
});

// --- Entity references ---
export const createEntitySchema = z.object({
  code,
  name: z.string().min(1),
});

export type CreateAuthorityInput = z.infer<typeof createAuthoritySchema>;
export type CreateSourceInput = z.infer<typeof createSourceSchema>;
export type CreateEvidenceInput = z.infer<typeof createEvidenceSchema>;
export type CreateFactInput = z.infer<typeof createFactSchema>;
export type CreateClaimInput = z.infer<typeof createClaimSchema>;
export type CreateClaimExceptionInput = z.infer<typeof createClaimExceptionSchema>;
export type CreateTopicInput = z.infer<typeof createTopicSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ScopeInput = z.infer<typeof scopeSchema>;
