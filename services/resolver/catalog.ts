import 'server-only';
import { topicRepository } from '@/repositories/topic.repo';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import {
  answerKindForSlug,
  appliesToLabel,
  authorityForSlug,
  authorityProfiles,
  CATEGORIES,
  categoryForSlug,
  collectionSlugs,
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

export interface CollectionStageView {
  label: string;
  questions: QuestionSummaryView[];
}

export interface TravellerCollectionView {
  id: string;
  label: string;
  description: string;
  /** Flattened, live-verified questions — used by the compact homepage card. */
  questions: QuestionSummaryView[];
  /** Present only for journey collections (e.g. First-time flyers): the real,
   *  ordered stages, each already filtered to what's currently verified. */
  stages?: CollectionStageView[];
}

/**
 * Curated traveller-type collections (cross-cutting discovery, e.g. "Travelling
 * with children"), realised over the live verified catalog. Fail-closed: a
 * collection only appears once at least 3 of its curated questions are actually
 * verified, so it's never a promise the Core can't keep. Journey collections
 * additionally carry their real stage structure, with each stage independently
 * filtered to live content — a stage with nothing currently verified simply
 * doesn't render, rather than showing a broken/empty step.
 */
export async function travellerCollections(): Promise<TravellerCollectionView[]> {
  const all = await listVerifiedQuestions();
  const bySlug = new Map(all.map((q) => [q.slug, q]));
  const resolveSlugs = (slugs: string[]) =>
    slugs.map((s) => bySlug.get(s)).filter((q): q is QuestionSummaryView => Boolean(q));

  const out: TravellerCollectionView[] = [];
  for (const c of TRAVELLER_COLLECTIONS) {
    const questions = resolveSlugs(collectionSlugs(c));
    if (questions.length < 3) continue;

    const stages = c.stages
      ?.map((s) => ({ label: s.label, questions: resolveSlugs(s.slugs) }))
      .filter((s) => s.questions.length > 0);

    out.push({ id: c.id, label: c.label, description: c.description, questions, stages });
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

export interface AuthorityProfileView {
  code: string;
  name: string;
  websiteUrl: string;
  description: string;
  /** Count of currently LIVE verified questions citing this authority. */
  verifiedCount: number;
}

/**
 * Authority profiles for the Trust Center's "Sources & Authorities" section,
 * with a LIVE count — cross-checked against what's actually verified and
 * published right now (fail-closed), not just what the registry declares. An
 * authority with zero live questions is omitted, so the page never overclaims.
 */
export async function authoritiesWithLiveCounts(): Promise<AuthorityProfileView[]> {
  const all = await listVerifiedQuestions();
  const counts = new Map<string, number>();
  for (const q of all) {
    const code = authorityForSlug(q.slug);
    if (!code) continue;
    counts.set(code, (counts.get(code) ?? 0) + 1);
  }
  return authorityProfiles()
    .map((a) => ({ ...a, verifiedCount: counts.get(a.code.toLowerCase()) ?? 0 }))
    .filter((a) => a.verifiedCount > 0);
}
