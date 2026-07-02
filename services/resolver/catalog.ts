import 'server-only';
import { topicRepository } from '@/repositories/topic.repo';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { appliesToLabel, CATEGORIES, categoryForSlug } from '@/db/seed/content';

/**
 * The verified-question catalog — the search index + homepage source.
 * Only PUBLISHED, verified questions appear (fail-closed). Data-driven: it grows
 * automatically as verified content is added; nothing is hardcoded.
 */

type Row = Awaited<ReturnType<typeof topicRepository.listVerifiedQuestions>>[number];

const FALLBACK_CATEGORY = 'More travel questions';

function appliesToSummary(row: Row): string {
  const parts: string[] = [];
  parts.push(
    row.scopeAirlines && row.scopeAirlines.length > 0
      ? row.scopeAirlines.join(' / ')
      : 'All airlines',
  );
  const tt = row.scopeTravelType;
  if (tt && tt.length > 0) {
    parts.push(
      tt.includes('domestic') && tt.includes('international')
        ? 'Domestic & international'
        : tt[0] === 'domestic'
          ? 'Domestic'
          : 'International',
    );
  }
  if (row.scopeProfiles && row.scopeProfiles.length > 0) parts.push(row.scopeProfiles.join(', '));
  return parts.join(' · ');
}

export async function listVerifiedQuestions(): Promise<QuestionSummaryView[]> {
  const rows = await topicRepository.listVerifiedQuestions();
  const seen = new Set<string>();
  const out: QuestionSummaryView[] = [];
  for (const r of rows) {
    if (seen.has(r.slug)) continue;
    seen.add(r.slug);
    out.push({
      slug: r.slug,
      question: r.question,
      verdict: r.verdict,
      lastVerified: r.lastVerifiedAt ? r.lastVerifiedAt.toISOString() : '',
      // Registry questions carry a descriptive label; unknown DB-only rows fall
      // back to their stored scope columns.
      appliesTo: categoryForSlug(r.slug) ? appliesToLabel(r.slug) : appliesToSummary(r),
      riskLevel: r.riskLevel,
      // Category from the content registry (authoritative), then the DB field,
      // then a safe fallback — so nothing is ever ungrouped.
      category: categoryForSlug(r.slug) ?? r.category ?? FALLBACK_CATEGORY,
    });
  }
  return out;
}

export interface CategoryGroup {
  category: string;
  questions: QuestionSummaryView[];
}

/**
 * Verified questions grouped by category, in the canonical display order.
 * Empty categories are omitted, so the homepage only ever shows real content.
 */
export async function listVerifiedByCategory(): Promise<CategoryGroup[]> {
  const all = await listVerifiedQuestions();
  const byCategory = new Map<string, QuestionSummaryView[]>();
  for (const q of all) {
    const list = byCategory.get(q.category) ?? [];
    list.push(q);
    byCategory.set(q.category, list);
  }
  const ordered: CategoryGroup[] = [];
  for (const category of [...CATEGORIES, FALLBACK_CATEGORY]) {
    const questions = byCategory.get(category);
    if (questions && questions.length > 0) ordered.push({ category, questions });
  }
  return ordered;
}
