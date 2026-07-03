/**
 * Navigation data. Every entry here MUST be a working destination — no dead
 * links. These all resolve: /search (browse everything) and the intent-filtered
 * /search?intent=<stage> views for stages that carry verified content.
 */
export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: NavItem[];
}

/** Header primary navigation — a few high-traffic, populated destinations. */
export const primaryNav: NavItem[] = [
  { label: 'All questions', href: '/search' },
  { label: 'Packing', href: '/search?intent=Packing' },
  { label: 'Documents', href: '/search?intent=Documents' },
  { label: 'Family', href: '/search?intent=Family%20travel' },
];

/** Footer sitemap — only working destinations. */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Explore',
    items: [
      { label: 'All questions', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  {
    title: 'By journey stage',
    items: [
      { label: 'Packing', href: '/search?intent=Packing' },
      { label: 'Airport security', href: '/search?intent=Airport%20security' },
      { label: 'Documents', href: '/search?intent=Documents' },
      { label: 'Family travel', href: '/search?intent=Family%20travel' },
      { label: 'Medical travel', href: '/search?intent=Medical%20travel' },
      { label: 'Money & customs', href: '/search?intent=Money%20%26%20customs' },
    ],
  },
];
