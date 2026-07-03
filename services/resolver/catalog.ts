import 'server-only';
import { topicRepository } from '@/repositories/topic.repo';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import {
  answerKindForSlug,
  appliesToLabel,
  CATEGORIES,
  categoryForSlug,
  INTENT_GROUP_META,
  INTENT_GROUPS,
  intentGroupForSlug,
  orderSubcategories,
  PREFERRED_POPULAR,
  PREFLIGHT_CHECKLIST,
  subcategoryForSlug,
  TRAVELLER_COLLECTIONS,
} from '@/db/seed/content';
import type { AnswerKind, Verdict } from '@/lib/knowledge/types';

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
      answerKind: answerKindForSlug(r.slug),
      intentGroup: intentGroupForSlug(r.slug),
      subcategory: subcategoryForSlug(r.slug),
      riskLevel: r.riskLevel,
      // Category from the content registry (authoritative), then the DB field,
      // then a safe fallback — so nothing is ever ungrouped.
      category: categoryForSlug(r.slug) ?? r.category ?? FALLBACK_CATEGORY,
    });
  }
  return out;
}

/** The N most recently verified questions (already ordered newest-first). */
export async function recentlyVerified(limit = 6): Promise<QuestionSummaryView[]> {
  const all = await listVerifiedQuestions();
  return all.slice(0, limit);
}

export interface ChecklistItemView {
  slug: string;
  /** Action-worded prompt, e.g. "Is my passport valid enough?". */
  label: string;
  verdict: Verdict;
  answerKind: AnswerKind;
}

/**
 * The "Before you leave for the airport" checklist — action-worded last-minute
 * questions mapped to their REAL verified answers. Only verified items appear
 * (fail-closed), so the signature feature never links to an unpublished page.
 */
export async function preflightChecklist(): Promise<ChecklistItemView[]> {
  const all = await listVerifiedQuestions();
  const bySlug = new Map(all.map((q) => [q.slug, q]));
  const out: ChecklistItemView[] = [];
  for (const { slug, label } of PREFLIGHT_CHECKLIST) {
    const q = bySlug.get(slug);
    if (q) out.push({ slug, label, verdict: q.verdict, answerKind: q.answerKind });
  }
  return out;
}

/**
 * Homepage "Popular" — known traveller demand first (only verified slugs that
 * exist), then filled from the rest of the catalog. Grows automatically.
 */
export async function popularQuestions(limit = 8): Promise<QuestionSummaryView[]> {
  const all = await listVerifiedQuestions();
  const bySlug = new Map(all.map((q) => [q.slug, q]));
  const out: QuestionSummaryView[] = [];
  for (const slug of PREFERRED_POPULAR) {
    const q = bySlug.get(slug);
    if (q) {
      out.push(q);
      bySlug.delete(slug);
    }
  }
  for (const q of bySlug.values()) {
    if (out.length >= limit) break;
    out.push(q);
  }
  return out.slice(0, limit);
}

export interface SubcategoryGroup {
  subcategory: string;
  questions: QuestionSummaryView[];
}

export interface IntentGroupView {
  group: string;
  description: string;
  questions: QuestionSummaryView[];
  /** Questions within this group, bucketed by subcategory (canonical order). */
  subgroups: SubcategoryGroup[];
}

/**
 * Verified questions grouped by traveller INTENT (the homepage discovery axis),
 * in canonical journey order, with a subcategory breakdown within each group
 * (Category → Subcategory → Question). Only non-empty groups are returned, so
 * the page grows automatically and never shows an empty stage — this is the
 * scalable structure that supports thousands of questions without adding more
 * top-level nav. Data-driven from the Core.
 */
export async function listByIntentGroup(): Promise<IntentGroupView[]> {
  const all = await listVerifiedQuestions();
  const byGroup = new Map<string, QuestionSummaryView[]>();
  for (const q of all) {
    const list = byGroup.get(q.intentGroup) ?? [];
    list.push(q);
    byGroup.set(q.intentGroup, list);
  }
  const out: IntentGroupView[] = [];
  for (const group of INTENT_GROUPS) {
    const questions = byGroup.get(group);
    if (questions && questions.length > 0) {
      const bySubcat = new Map<string, QuestionSummaryView[]>();
      const untagged: QuestionSummaryView[] = [];
      for (const q of questions) {
        if (!q.subcategory) {
          untagged.push(q);
          continue;
        }
        const list = bySubcat.get(q.subcategory) ?? [];
        list.push(q);
        bySubcat.set(q.subcategory, list);
      }
      const orderedNames = orderSubcategories(group, [...bySubcat.keys()]);
      const subgroups: SubcategoryGroup[] = orderedNames.map((subcategory) => ({
        subcategory,
        questions: bySubcat.get(subcategory) ?? [],
      }));
      if (untagged.length > 0) subgroups.push({ subcategory: 'General', questions: untagged });
      out.push({ group, description: INTENT_GROUP_META[group], questions, subgroups });
    }
  }
  return out;
}

export interface TravellerCollectionView {
  id: string;
  label: string;
  description: string;
  questions: QuestionSummaryView[];
}

/**
 * Curated traveller-type collections (cross-cutting discovery, e.g. "Travelling
 * with children"), realised over the live verified catalog. Fail-closed: a
 * collection only appears once at least 3 of its curated questions are actually
 * verified, so it's never a promise the Core can't keep.
 */
export async function travellerCollections(): Promise<TravellerCollectionView[]> {
  const all = await listVerifiedQuestions();
  const bySlug = new Map(all.map((q) => [q.slug, q]));
  const out: TravellerCollectionView[] = [];
  for (const c of TRAVELLER_COLLECTIONS) {
    const questions = c.slugs
      .map((s) => bySlug.get(s))
      .filter((q): q is QuestionSummaryView => Boolean(q));
    if (questions.length >= 3) {
      out.push({ id: c.id, label: c.label, description: c.description, questions });
    }
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
