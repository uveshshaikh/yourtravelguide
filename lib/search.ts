import Fuse from 'fuse.js';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { SEARCH_SYNONYMS } from '@/db/seed/content';

/**
 * Expand common Indian-English phrasings to the term our questions actually use
 * (e.g. "e-visa" → "visa", "hand baggage" → "cabin baggage") before fuzzy
 * matching. This is query expansion, not new content — SEARCH_SYNONYMS never
 * introduces a fact, only a synonym for one already in a verified question.
 */
function expandSynonyms(query: string): string {
  let expanded = query;
  const lower = query.toLowerCase();
  for (const [pattern, canonical] of SEARCH_SYNONYMS) {
    if (lower.includes(pattern) && !lower.includes(canonical)) {
      expanded = `${expanded} ${canonical}`;
    }
  }
  return expanded;
}

/**
 * Typo-tolerant question search — NO AI. A small client-safe fuzzy matcher
 * (Fuse.js) over the verified-question catalog. Runs identically on the server
 * (results page) and client (instant homepage suggestions). Fast for the small,
 * slowly-growing catalog; a server index is a later concern, not now.
 */
export function searchQuestions(
  catalog: QuestionSummaryView[],
  query: string,
  limit = 8,
): QuestionSummaryView[] {
  const q = query.trim();
  if (q.length === 0) return catalog.slice(0, limit);

  const fuse = new Fuse(catalog, {
    keys: ['question'],
    threshold: 0.4, // typo tolerance
    ignoreLocation: true, // match anywhere in the question
    minMatchCharLength: 2,
  });
  return fuse.search(expandSynonyms(q), { limit }).map((r) => r.item);
}
