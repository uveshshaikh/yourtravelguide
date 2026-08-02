import { Rule } from '../data/types';
import { ArticleSection } from '../data/sections';

/**
 * Compatibility layer for the modular section architecture (Phase B1,
 * revised Phase C1).
 *
 * Returns the effective ordered list of sections for a rule:
 *   1. richContent (if present) is adapted into the equivalent sections,
 *      exactly as before -- no data migrated or duplicated, just re-described
 *      through one interface.
 *   2. rule.sections, if a rule has any hand-authored modules, are appended
 *      after the richContent-derived ones.
 *
 * Originally (Phase B1) rule.sections fully REPLACED richContent when
 * present. That didn't survive contact with a real module: giving
 * water-bottle-airport an Airline Guidance section (Phase C1) via
 * rule.sections would have discarded its entire existing richContent-derived
 * article. Sections now layer instead of override, so a rule keeps its
 * existing content and picks up new modules incrementally, one at a time --
 * which is what "populate only one article, don't migrate the rest" actually
 * requires in practice. (Not handled: a rule.sections entry of a type that
 * richContent also derives, e.g. a second 'overview' -- the derived one wins
 * because RuleDetail's `.find()` sees it first. No current use case needs an
 * override, so that's left as a known limitation rather than solved here.)
 */
export function getArticleSections(rule: Rule): ArticleSection[] {
  const richContent = rule.richContent;
  if (!richContent) return [...(rule.sections ?? [])];

  const sections: ArticleSection[] = [];

  if (richContent.quickAnswer) {
    sections.push({ type: 'quickAnswer', text: richContent.quickAnswer });
  }

  if (richContent.overview.length > 0) {
    sections.push({ type: 'overview', paragraphs: richContent.overview });
  }

  if (richContent.dos.length > 0 || richContent.donts.length > 0) {
    sections.push({ type: 'dosDonts', dos: richContent.dos, donts: richContent.donts });
  }

  for (const checklist of richContent.checklists) {
    sections.push({ type: 'checklist', title: checklist.title, items: checklist.items });
  }

  if (richContent.table) {
    sections.push({
      type: 'table',
      caption: richContent.table.caption,
      headers: richContent.table.headers,
      rows: richContent.table.rows,
    });
  }

  if (richContent.examples && richContent.examples.length > 0) {
    sections.push({ type: 'examples', items: richContent.examples });
  }

  if (richContent.faqs.length > 0) {
    sections.push({ type: 'faq', items: richContent.faqs });
  }

  if (richContent.tips.length > 0) {
    sections.push({ type: 'tips', items: richContent.tips });
  }

  if (richContent.internalLinks.length > 0) {
    sections.push({ type: 'internalLinks', links: richContent.internalLinks });
  }

  if (rule.sources.length > 0) {
    sections.push({ type: 'reference', sources: rule.sources });
  }

  return [...sections, ...(rule.sections ?? [])];
}

/**
 * True for the section types RuleDetail.tsx actually renders (Phase B2,
 * airlineGuidance added Phase C1, airportGuidance added Phase C2,
 * domesticInternationalGuidance added Phase C3, waterSafety added Phase
 * C4). The remaining types (decisionTree, scenario, exception,
 * securityProcess, callout) are typed placeholders only -- real, but with
 * no renderer yet.
 *
 * The `never` branch is a compile-time guarantee: adding a new
 * ArticleSection variant without updating this switch is a type error, so a
 * future module type can never silently render as nothing forever -- it has
 * to be deliberately added here first.
 */
export function isImplementedSection(section: ArticleSection): boolean {
  switch (section.type) {
    case 'quickAnswer':
    case 'overview':
    case 'checklist':
    case 'dosDonts':
    case 'table':
    case 'examples':
    case 'faq':
    case 'tips':
    case 'internalLinks':
    case 'reference':
    case 'airlineGuidance':
    case 'airportGuidance':
    case 'domesticInternationalGuidance':
    case 'waterSafety':
      return true;
    case 'decisionTree':
    case 'scenario':
    case 'exception':
    case 'securityProcess':
    case 'callout':
      return false;
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}
