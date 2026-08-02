import { Rule } from '../data/types';
import { ArticleSection } from '../data/sections';

/**
 * Compatibility layer for the modular section architecture (Phase B1).
 *
 * Returns the effective ordered list of sections for a rule:
 *   1. rule.sections, if a rule has been authored directly in the new
 *      modular format -- takes priority, used as-is.
 *   2. Otherwise, richContent is adapted into the equivalent sections on
 *      the fly. No data is migrated or duplicated; this just re-describes
 *      the existing fields as sections so both formats can be consumed
 *      through one interface going forward.
 *
 * Nothing in the app calls this yet -- RuleDetail.tsx still renders
 * richContent/rule fields directly, so existing page output is unchanged.
 * This function exists so future rendering work (and newly-authored rules)
 * have a single, fully-typed entry point instead of two parallel shapes.
 */
export function getArticleSections(rule: Rule): ArticleSection[] {
  if (rule.sections) return rule.sections;

  const richContent = rule.richContent;
  if (!richContent) return [];

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

  return sections;
}
