import { describe, expect, it } from 'vitest';
import { toAppliesTo, toConditions, toSourceViews, toTrustView } from '@/services/resolver/mappers';
import type { ClaimInput, EvidenceInput } from '@/services/resolver/types';

const NOW = new Date('2026-07-01T00:00:00Z');

const ev = (id: string, sourceId: string): EvidenceInput => ({
  id,
  evidenceLevel: 'government_regulation',
  source: {
    id: sourceId,
    authorityName: 'DGCA',
    authorityCode: 'dgca',
    title: 'Doc',
    url: 'https://x',
    evidenceLevel: 'government_regulation',
    publishedAt: null,
    archivedUrl: null,
  },
});

const claim = (over: Partial<ClaimInput> = {}): ClaimInput => ({
  id: 'c1',
  subjectType: 'travel_item',
  subjectCode: 'x',
  question: 'q',
  verdict: 'allowed',
  resolverDimensions: null,
  validity: 'stable',
  summary: 's',
  conditions: null,
  scope: {},
  evidenceLevel: 'government_regulation',
  confidence: 'confirmed',
  currentVersion: 1,
  lastVerifiedAt: new Date('2026-06-01T00:00:00Z'),
  reviewDue: new Date('2026-06-15T00:00:00Z'),
  state: 'published',
  deletedAt: null,
  riskLevel: 'medium',
  ...over,
});

describe('mappers', () => {
  it('toSourceViews dedupes by source id', () => {
    expect(toSourceViews([ev('e1', 's1'), ev('e2', 's1'), ev('e3', 's2')])).toHaveLength(2);
  });

  it('toAppliesTo maps both travel types and airline codes', () => {
    const a = toAppliesTo(
      claim({ scope: { travelType: ['domestic', 'international'], airlines: ['6E'] } }),
    );
    expect(a.travelType).toBe('both');
    expect(a.airlines).toEqual(['6E']);
    expect(a.origin).toBeUndefined();
  });

  it('toConditions handles arrays, records and unknown shapes', () => {
    expect(toConditions([{ label: 'Max', value: '100 Wh' }])).toEqual([
      { label: 'Max', value: '100 Wh' },
    ]);
    expect(toConditions({ Carriage: 'Cabin' })).toEqual([{ label: 'Carriage', value: 'Cabin' }]);
    expect(toConditions('nonsense')).toBeUndefined();
    expect(toConditions(null)).toBeUndefined();
  });

  it('toTrustView derives review state (overdue in the past)', () => {
    const t = toTrustView(claim(), new Date('2026-06-05T00:00:00Z'), NOW);
    expect(t.reviewState).toBe('overdue'); // reviewDue 2026-06-15 < NOW 2026-07-01
    expect(t.confidence).toBe('confirmed');
  });
});
