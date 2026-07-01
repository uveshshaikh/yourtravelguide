import { describe, expect, it } from 'vitest';
import { createClaimSchema, createFactSchema, createTopicSchema } from '@/lib/knowledge/validation';

const UUID = '00000000-0000-0000-0000-000000000000';

describe('createFactSchema', () => {
  const base = {
    subjectType: 'airline',
    subjectCode: '6E',
    key: 'cabin_baggage_weight_kg',
    label: 'Cabin baggage weight',
    valueType: 'number',
    value: 7,
    ownerAuthorityId: UUID,
    evidenceIds: [UUID],
  };

  it('accepts a fact backed by evidence', () => {
    expect(createFactSchema.safeParse(base).success).toBe(true);
  });

  it('rejects a fact with no evidence (Rule 2: tier is derived, not free)', () => {
    expect(createFactSchema.safeParse({ ...base, evidenceIds: [] }).success).toBe(false);
  });

  it('rejects a fact that supplies an evidence tier directly', () => {
    const parsed = createFactSchema.safeParse({ ...base, evidenceLevel: 'government_regulation' });
    // extra key is stripped, not honoured — the tier can never be hand-set.
    expect(parsed.success).toBe(true);
    expect(parsed.success && 'evidenceLevel' in parsed.data).toBe(false);
  });
});

describe('createClaimSchema', () => {
  const base = {
    subjectType: 'travel_item',
    subjectCode: 'power-bank',
    question: 'Can I carry a power bank?',
    verdict: 'allowed_with_conditions',
    summary: 'Yes, up to 100Wh in cabin baggage.',
    ownerAuthorityId: UUID,
    evidenceIds: [UUID],
  };

  it('accepts a claim citing evidence', () => {
    expect(createClaimSchema.safeParse(base).success).toBe(true);
  });

  it('rejects a claim with no cited evidence', () => {
    expect(createClaimSchema.safeParse({ ...base, evidenceIds: [] }).success).toBe(false);
  });
});

describe('createTopicSchema', () => {
  const base = {
    slug: 'power-bank-in-flight',
    question: 'Can I carry a power bank in flight?',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
  };

  it('accepts a kebab-case slug', () => {
    expect(createTopicSchema.safeParse(base).success).toBe(true);
  });

  it('rejects a non-kebab-case slug', () => {
    expect(createTopicSchema.safeParse({ ...base, slug: 'Power Bank' }).success).toBe(false);
  });
});
