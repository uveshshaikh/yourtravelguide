/**
 * Navigation data. Every entry here MUST be a working destination — no dead
 * links. These all resolve: /search (browse everything) and the intent-filtered
 * /search?intent=<stage> views for stages that carry verified content.
 */
export interface NavItem {
  label: string;
  href: string;
}

/**
 * Header primary navigation — intentionally empty. This is a search-first
 * product: the header is Logo · Search · Theme, nothing more. Journey stages are
 * navigated contextually (homepage discovery, the /search filter bar, and the
 * footer sitemap) — they do NOT belong in the global nav bar.
 */
export const primaryNav: NavItem[] = [];

/**
 * Footer links — deliberately minimal. The footer is NOT a second homepage: it
 * carries only the essential global destinations. Journey-stage browsing lives
 * where it's contextual (homepage discovery + the /search filter bar).
 */
export const footerLinks: NavItem[] = [
  { label: 'All questions', href: '/search' },
  { label: 'Trust & Editorial Center', href: '/trust' },
  { label: 'Home', href: '/' },
];
