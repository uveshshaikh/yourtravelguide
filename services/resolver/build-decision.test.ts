import { describe, expect, it } from 'vitest';
import { buildDecision } from '@/services/resolver/build-decision';
import type {
  ClaimInput,
  EvidenceInput,
  RawDecisionInputs,
  TopicInput,
} from '@/services/resolver/types';

const NOW = new Date('2026-07-01T00:00:00Z');

function makeTopic(over: Partial<TopicInput> = {}): TopicInput {
  return {
    slug: 'power-bank-in-flight',
    question: 'Can I carry a power bank?',
    intent: 'verdict',
    decisionType: 'verdict',
    riskLevel: 'high',
    ...over,
  };
}

function makeClaim(over: Partial<ClaimInput> = {}): ClaimInput {
  return {
    id: 'c1',
    subjectType: 'travel_item',
    subjectCode: 'power-bank',
    question: 'Can I carry a power bank?',
    verdict: 'allowed_with_conditions',
    resolverDimensions: null,
    validity: 'stable',
    summary: 'Cabin only, up to 100 Wh.',
    conditions: [{ label: 'Max capacity', value: '100 Wh' }],
    scope: {},
    evidenceLevel: 'government_regulation',
    confidence: 'confirmed',
    currentVersion: 3,
    lastVerifiedAt: new Date('2026-06-15T00:00:00Z'),
    reviewDue: new Date('2026-09-13T00:00:00Z'),
    state: 'published',
    deletedAt: null,
    riskLevel: 'high',
    ...over,
  };
}

function makeEvidence(over: Partial<EvidenceInput> = {}): EvidenceInput {
  return {
    id: 'e1',
    evidenceLevel: 'government_regulation',
    source: {
      id: 's1',
      authorityName: 'DGCA',
      authorityCode: 'dgca',
      title: 'Carriage of lithium batteries',
      url: 'https://www.dgca.gov.in/',
      evidenceLevel: 'government_regulation',
      publishedAt: new Date('2024-03-01T00:00:00Z'),
      archivedUrl: null,
    },
    ...over,
  };
}

function makeInputs(over: Partial<RawDecisionInputs> = {}): RawDecisionInputs {
  return {
    topic: makeTopic(),
    claim: makeClaim(),
    authority: null,
    evidence: [makeEvidence()],
    exceptions: [],
    versions: [],
    relatedQuestions: [],
    relatedTopics: [],
    ...over,
  };
}

describe('buildDecision — refusal contract', () => {
  it('STATE 1: returns a verified DecisionView for a published, evidenced claim', () => {
    const result = buildDecision(makeInputs(), NOW);
    expect(result.state).toBe('available');
    if (result.state !== 'available') return;
    expect(result.view.verdict).toBe('allowed_with_conditions');
    expect(result.view.answer).toBe('Cabin only, up to 100 Wh.');
    expect(result.view.sources).toHaveLength(1);
    expect(result.view.trust.confidence).toBe('confirmed');
    expect(result.view.trust.lastVerified).toBe('2026-06-15T00:00:00.000Z');
    expect(result.view.trust.reviewState).toBe('current');
    // Fields absent from the Knowledge Core are omitted, never fabricated.
    expect(result.view.overview).toBeUndefined();
    expect(result.view.warnings).toBeUndefined();
  });

  it('STATE 3: unknown topic → not_found', () => {
    expect(buildDecision(makeInputs({ topic: null, claim: null }), NOW).state).toBe('not_found');
  });

  it('STATE 2: topic known but no published claim → incomplete', () => {
    const r = buildDecision(makeInputs({ claim: null }), NOW);
    expect(r).toMatchObject({ state: 'incomplete', reason: 'no_published_claim' });
  });

  it('STATE 2: draft claim → incomplete (refuses unpublished)', () => {
    const r = buildDecision(makeInputs({ claim: makeClaim({ state: 'draft' }) }), NOW);
    expect(r).toMatchObject({ state: 'incomplete', reason: 'no_published_claim' });
  });

  it('STATE 2: soft-deleted claim → incomplete', () => {
    const r = buildDecision(makeInputs({ claim: makeClaim({ deletedAt: new Date() }) }), NOW);
    expect(r).toMatchObject({ state: 'incomplete', reason: 'no_published_claim' });
  });

  it('STATE 2: no evidence → incomplete', () => {
    expect(buildDecision(makeInputs({ evidence: [] }), NOW)).toMatchObject({
      state: 'incomplete',
      reason: 'no_evidence',
    });
  });

  it('STATE 2: only non-factual (tier 6–7) evidence → incomplete', () => {
    const weak = makeEvidence({ evidenceLevel: 'traveller_experience' });
    expect(buildDecision(makeInputs({ evidence: [weak] }), NOW)).toMatchObject({
      state: 'incomplete',
      reason: 'no_evidence',
    });
  });

  it('STATE 2: missing verification date → incomplete (never fakes a verified date)', () => {
    const r = buildDecision(makeInputs({ claim: makeClaim({ lastVerifiedAt: null }) }), NOW);
    expect(r).toMatchObject({ state: 'incomplete', reason: 'missing_trust_fields' });
  });

  it('allows an honest "unresolved" verdict (depends), which is not a guess', () => {
    const r = buildDecision(makeInputs({ claim: makeClaim({ verdict: 'unresolved' }) }), NOW);
    expect(r.state).toBe('available');
  });
});
