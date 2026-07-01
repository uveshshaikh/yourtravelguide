import { describe, expect, it } from 'vitest';
import { matchesScope, resolve, scopeSpecificity, type Resolvable } from '@/lib/knowledge/scope';

describe('matchesScope', () => {
  it('matches when scope is empty (ANY)', () => {
    expect(matchesScope({}, { airline: '6E' })).toBe(true);
  });

  it('matches when the context value is in the scoped set', () => {
    expect(matchesScope({ airline: ['6E', 'AI'] }, { airline: '6E' })).toBe(true);
  });

  it('rejects when the context value is outside the scoped set', () => {
    expect(matchesScope({ airline: ['6E'] }, { airline: 'AI' })).toBe(false);
  });

  it('rejects when scope restricts a dimension the context leaves unspecified', () => {
    expect(matchesScope({ airline: ['6E'] }, {})).toBe(false);
  });

  it('respects a temporal validity window', () => {
    const scope = { validUntil: new Date('2026-01-01T00:00:00Z') };
    expect(matchesScope(scope, { date: new Date('2026-06-30T00:00:00Z') })).toBe(false);
    expect(matchesScope(scope, { date: new Date('2025-12-01T00:00:00Z') })).toBe(true);
  });
});

describe('scopeSpecificity', () => {
  it('counts restricted dimensions', () => {
    expect(scopeSpecificity({})).toBe(0);
    expect(scopeSpecificity({ airline: ['6E'], destination: ['AE'] })).toBe(2);
  });

  it('counts a validity window as one dimension', () => {
    expect(scopeSpecificity({ validFrom: new Date() })).toBe(1);
  });
});

describe('resolve', () => {
  const general: Resolvable & { id: string } = {
    id: 'general',
    scope: {},
    evidenceLevel: 'airline_policy',
  };
  const specific: Resolvable & { id: string } = {
    id: 'specific',
    scope: { airline: ['6E'] },
    evidenceLevel: 'airline_policy',
  };

  it('orders most-specific first', () => {
    const result = resolve([general, specific], { airline: '6E' });
    expect(result.map((r) => r.id)).toEqual(['specific', 'general']);
  });

  it('breaks specificity ties by highest evidence', () => {
    const weak: Resolvable & { id: string } = {
      id: 'weak',
      scope: {},
      evidenceLevel: 'airline_policy',
    };
    const strong: Resolvable & { id: string } = {
      id: 'strong',
      scope: {},
      evidenceLevel: 'government_regulation',
    };
    const result = resolve([weak, strong], {});
    expect(result[0]?.id).toBe('strong');
  });

  it('excludes non-matching claims', () => {
    const result = resolve([specific], { airline: 'AI' });
    expect(result).toHaveLength(0);
  });
});
