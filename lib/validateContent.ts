import { Rule } from '../data/types';

/**
 * Build-time content-integrity checks for data/rules.ts. Called from
 * next.config.ts at module-evaluation time, so it runs on every `next dev`,
 * `next build`, and `next start` boot and fails loudly before the app ever
 * serves a page, rather than letting a broken reference render silently
 * (or, at render time, simply vanish -- see components/RuleDetail.tsx's
 * getRuleUrl / lib/relatedRules.ts, which both already filter out
 * unresolvable slugs defensively).
 *
 * Deliberately NOT checked here: category/subcategory validity. That's
 * already enforced at compile time by the CategorySubcategoryPair
 * discriminated union in data/types.ts (data/rules.ts is typed as Rule[]),
 * so a runtime re-check here would just duplicate a guarantee TypeScript
 * already gives for free.
 */
export function validateRules(allRules: Rule[]): void {
  const errors: string[] = [];

  const slugCounts = new Map<string, number>();
  for (const r of allRules) {
    slugCounts.set(r.slug, (slugCounts.get(r.slug) ?? 0) + 1);
  }
  for (const [slug, count] of slugCounts) {
    if (count > 1) errors.push(`Duplicate rule slug "${slug}" appears ${count} times.`);
  }

  const validSlugs = new Set(allRules.map((r) => r.slug));
  for (const r of allRules) {
    for (const link of r.richContent?.internalLinks ?? []) {
      if (!validSlugs.has(link.slug)) {
        errors.push(
          `Rule "${r.slug}" has a richContent.internalLinks reference to unknown slug ` +
            `"${link.slug}" (label: "${link.label}").`,
        );
      }
    }
    for (const slug of r.internalLinks ?? []) {
      if (!validSlugs.has(slug)) {
        errors.push(`Rule "${r.slug}" has an internalLinks reference to unknown slug "${slug}".`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `data/rules.ts failed content validation (${errors.length} issue${errors.length === 1 ? '' : 's'}):\n` +
        errors.map((e) => `  - ${e}`).join('\n'),
    );
  }
}
