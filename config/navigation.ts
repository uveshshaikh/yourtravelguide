/**
 * Navigation data. Sprint 3A ships the SHELL only — links are placeholders
 * (href '#') wired to real routes in later sprints. Labels are journey-framed
 * (Phase 1): traveller language on top, stable domains underneath.
 */
export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: NavItem[];
}

/** Primary header navigation (journey stages). */
export const primaryNav: NavItem[] = [
  { label: 'Before you fly', href: '#' },
  { label: 'At the airport', href: '#' },
  { label: 'Documents & visas', href: '#' },
  { label: 'Customs & money', href: '#' },
];

/** Footer sitemap. "Trust" column reflects the Constitution's trust pages. */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Explore',
    items: [
      { label: 'Airport rules', href: '#' },
      { label: 'Baggage', href: '#' },
      { label: 'Travel documents', href: '#' },
      { label: 'Customs', href: '#' },
    ],
  },
  {
    title: 'Trust',
    items: [
      { label: 'About', href: '#' },
      { label: 'Editorial policy', href: '#' },
      { label: 'How we verify', href: '#' },
      { label: 'Our sources', href: '#' },
      { label: 'Corrections', href: '#' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Contact', href: '#' },
      { label: 'Updates', href: '#' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ],
  },
];
