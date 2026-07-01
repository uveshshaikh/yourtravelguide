import 'server-only';
import { claimRepository } from '@/repositories/claim.repo';
import { entityRepository } from '@/repositories/entity.repo';
import type { EntityType, Verdict } from '@/lib/knowledge/types';

/**
 * Entity page resolver — lists the published, verified claims about an entity
 * (airline / airport / country / …). Same fail-closed spirit: an unknown entity
 * is NotFound; an entity with no published claims returns an empty list (the UI
 * says "verification in progress"), never fabricated guidance.
 */

export interface EntityQuestionView {
  id: string;
  question: string;
  verdict: Verdict;
  summary: string;
}

export interface EntityPageView {
  code: string;
  name: string;
  questions: EntityQuestionView[];
}

export type EntityPageResult =
  { state: 'available'; view: EntityPageView } | { state: 'not_found' };

export async function resolveEntityPage(type: EntityType, code: string): Promise<EntityPageResult> {
  const entity = await entityRepository.getByCode(type, code);
  if (!entity) return { state: 'not_found' };

  const claimRows = await claimRepository.findPublishedForSubject(type, code);
  const questions: EntityQuestionView[] = claimRows.map((c) => ({
    id: c.id,
    question: c.question,
    verdict: c.verdict,
    summary: c.summary,
  }));

  return { state: 'available', view: { code: entity.code, name: entity.name, questions } };
}
