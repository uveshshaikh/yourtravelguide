import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { siteConfig } from '@/config/site';
import { listVerifiedQuestions } from '@/services/resolver/catalog';

const DESCRIPTION =
  'What YourTravelGuide is, how it works, and why every answer is sourced from an official authority.';

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { type: 'website', url: '/about', title: 'About', description: DESCRIPTION },
  twitter: { card: 'summary', title: 'About', description: DESCRIPTION },
};

/**
 * /about — what the site is and why it exists. Deliberately does NOT invent a
 * founding story, team, address, or company details we don't have. The "why
 * trust this" mechanism belongs on /trust; this page only covers purpose.
 */
export default async function AboutPage() {
  const questions = await listVerifiedQuestions();

  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        About {siteConfig.name}
      </h1>
      <div className="text-muted-foreground mt-6 space-y-4 text-pretty">
        <p>{siteConfig.description}</p>
        <p>
          Air travel in India involves rules from several different authorities — security
          screening, customs, immigration, and airline policy each work differently, and it's easy
          to find outdated or contradictory advice online. {siteConfig.name} answers one traveller
          question at a time, and every answer is sourced from the official authority responsible
          for that specific rule — never a guess, and never aggregated forum advice.
        </p>
        <p>
          There are currently <strong className="text-foreground">{questions.length}</strong>{' '}
          verified questions published. Each one shows the date it was last checked and links
          directly to its official source.
        </p>
        <p>
          {siteConfig.name} is an independent information resource. It is not affiliated with the
          Directorate General of Civil Aviation, the Bureau of Civil Aviation Security, Indian
          Customs, any airline, or any other authority it cites.
        </p>
        <p>
          For exactly how answers are sourced, verified, and corrected, see the{' '}
          <a href="/trust" className="text-primary hover:underline">
            Trust &amp; Editorial Center
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
