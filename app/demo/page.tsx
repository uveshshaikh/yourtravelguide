import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';

export const metadata: Metadata = {
  title: 'Demo',
  robots: { index: false, follow: false },
};

/** Index of the Sprint-3B demo/story pages (not indexed; internal). */
export default function DemoIndexPage() {
  const links = [
    {
      href: '/demo/decision',
      title: 'Canonical decision page',
      desc: 'The definitive answer template.',
    },
    {
      href: '/demo/components',
      title: 'Component gallery',
      desc: 'Every Decision-Experience component.',
    },
  ];
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Decision Experience — demos</h1>
      <p className="text-muted-foreground mt-2">Internal preview pages for Sprint 3B.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="border-border bg-card hover:border-primary/40 block rounded-xl border p-5 transition-colors"
            >
              <p className="font-medium">{l.title}</p>
              <p className="text-muted-foreground mt-1 text-sm">{l.desc}</p>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
