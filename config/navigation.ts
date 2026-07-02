/**
 * Navigation data. Every entry here MUST be a working destination — no dead
 * links. Primary nav is empty until real domain hubs exist (search is the
 * primary way to navigate); it grows automatically as those hubs are built.
 */
export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: NavItem[];
}

/** Header primary navigation. Empty until verified domain hubs exist. */
export const primaryNav: NavItem[] = [];

/** Footer sitemap — only working destinations. */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Explore',
    items: [{ label: 'All questions', href: '/search' }],
  },
];
