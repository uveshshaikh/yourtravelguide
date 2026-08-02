import type { Rule } from '../data/types';

export const NEW_ARCH_CATEGORIES = ['airport-rules', 'travel-documents', 'customs'] as const;

export type NewArchCategory = typeof NEW_ARCH_CATEGORIES[number];

/**
 * Narrows a Rule to a new-architecture rule with a typed category and subcategory.
 * Use this as a filter predicate or conditional guard.
 */
export function isNewArchRule(
  rule: Rule,
): rule is Rule & { category: NewArchCategory; subcategory: string } {
  return (NEW_ARCH_CATEGORIES as readonly string[]).includes(rule.category);
}

/** Canonical URL for a category hub page, e.g. "/airport-rules". */
export function buildCategoryUrl(category: string): string {
  return `/${category}`;
}

/**
 * Canonical URL for a subcategory hub page, e.g.
 * "/airport-rules/cabin-baggage". Built from buildCategoryUrl so a hub URL
 * and its breadcrumb link can never diverge -- there's only one place that
 * knows how to construct it.
 */
export function buildSubcategoryUrl(category: string, subcategory: string): string {
  return `${buildCategoryUrl(category)}/${subcategory}`;
}

/**
 * Returns the canonical URL path for any rule.
 *
 * New-arch:  /airport-rules/cabin-baggage/power-bank-in-flight
 * Legacy:    /rules/passport-photocopy-valid
 */
export function buildRuleUrl(rule: Rule | { category: string; subcategory?: string; slug: string }): string {
  if ((NEW_ARCH_CATEGORIES as readonly string[]).includes(rule.category) && rule.subcategory) {
    return `${buildSubcategoryUrl(rule.category, rule.subcategory)}/${rule.slug}`;
  }
  return `/rules/${rule.slug}`;
}
