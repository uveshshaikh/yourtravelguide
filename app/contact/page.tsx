import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { siteConfig } from '@/config/site';

const DESCRIPTION = `Get in touch with ${siteConfig.name}.`;

export const metadata: Metadata = {
  title: 'Contact',
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { type: 'website', url: '/contact', title: 'Contact', description: DESCRIPTION },
  twitter: { card: 'summary', title: 'Contact', description: DESCRIPTION },
};

/** /contact — a single real channel, no fabricated phone/address/team contacts. */
export default function ContactPage() {
  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Contact</h1>
      <div className="text-muted-foreground mt-6 space-y-5 text-pretty">
        <p>
          Spotted something wrong or outdated on a specific answer? See{' '}
          <a href="/trust#contact" className="text-primary hover:underline">
            Report an error
          </a>{' '}
          in the Trust &amp; Editorial Center — tell us which question it is and what looks
          incorrect, and we'll check it against the original source.
        </p>
        <p>For anything else, reach us at:</p>
        <a
          href={`mailto:${siteConfig.supportEmail}`}
          className="border-primary bg-primary text-primary-foreground hover:bg-primary-hover inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Mail className="size-4" aria-hidden />
          {siteConfig.supportEmail}
        </a>
      </div>
    </Container>
  );
}
