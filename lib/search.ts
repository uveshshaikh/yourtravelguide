import Fuse from 'fuse.js';
import type { QuestionSummaryView } from '@/lib/knowledge/view';

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
  return fuse.search(q, { limit }).map((r) => r.item);
}
