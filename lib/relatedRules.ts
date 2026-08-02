import { Rule } from '../data/types';

/**
 * Resolves a slug to its Rule, or null if it doesn't match any current rule.
 * The ONE place that knows how to do this safely — every caller that turns a
 * bare slug reference (richContent.internalLinks, rule.internalLinks, ...)
 * into a link must go through this, so an unresolved/renamed/typo'd slug can
 * never silently render as a broken or legacy link. See
 * components/RuleDetail.tsx's getRuleUrl for the URL-building counterpart.
 */
export function resolveRuleBySlug(slug: string, allRules: Rule[]): Rule | null {
  return allRules.find((r) => r.slug === slug) ?? null;
}

const MAX_RELATED = 6;
/** Only fall back to the broadest tier (same category) if tiers 1-2 leave a
 *  rule genuinely thin — never used just to pad every page up to MAX_RELATED. */
const MIN_BEFORE_CATEGORY_FALLBACK = 3;

/**
 * Derives semantically-relevant related rules for a given rule directly from
 * the data model — no hardcoded per-rule relationships to maintain.
 *
 * Ranked by relevance, most specific first:
 *   0. rule.internalLinks (manually-curated slugs), if ever populated —
 *      honours existing curation rather than overriding it.
 *   1. Same subcategory — the strongest topical-relevance signal available.
 *   2. Shared tags — ranked by number of overlapping tags.
 *   3. Same category — a last-resort fallback, only applied when a rule
 *      would otherwise end up with fewer than MIN_BEFORE_CATEGORY_FALLBACK
 *      related pages (e.g. the handful of subcategories that currently
 *      contain only one rule). Never used to inflate an already-adequate list.
 */
export function getRelatedRules(rule: Rule, allRules: Rule[], max = MAX_RELATED): Rule[] {
  const seen = new Set<string>([rule.slug]);
  const result: Rule[] = [];

  const add = (candidates: Rule[]) => {
    for (const candidate of candidates) {
      if (result.length >= max) return;
      if (seen.has(candidate.slug)) continue;
      seen.add(candidate.slug);
      result.push(candidate);
    }
  };

  // Tier 0: manually-curated overrides, if ever populated for this rule.
  if (rule.internalLinks?.length) {
    add(
      rule.internalLinks
        .map((slug) => resolveRuleBySlug(slug, allRules))
        .filter((r): r is Rule => r !== null),
    );
  }

  // Tier 1: same subcategory.
  const subcategory = 'subcategory' in rule ? rule.subcategory : undefined;
  if (subcategory) {
    add(allRules.filter((r) => 'subcategory' in r && r.subcategory === subcategory));
  }

  // Tier 2: shared tags, ranked by overlap count (most shared tags first).
  if (result.length < max && rule.tags.length > 0) {
    const ruleTags = new Set(rule.tags);
    const scored = allRules
      .filter((r) => !seen.has(r.slug))
      .map((r) => ({ rule: r, score: r.tags.filter((t) => ruleTags.has(t)).length }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.rule);
    add(scored);
  }

  // Tier 3: same category — true last resort, only for genuinely thin rules.
  if (result.length < MIN_BEFORE_CATEGORY_FALLBACK) {
    add(allRules.filter((r) => r.category === rule.category));
  }

  return result;
}
