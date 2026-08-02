import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { siteConfig } from '@/config/site';

const DESCRIPTION = 'The terms for using YourTravelGuide.';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: DESCRIPTION,
  alternates: { canonical: '/terms' },
  openGraph: { type: 'website', url: '/terms', title: 'Terms of Use', description: DESCRIPTION },
  twitter: { card: 'summary', title: 'Terms of Use', description: DESCRIPTION },
};

/** /terms — kept deliberately minimal and factual; not a substitute for legal review. */
export default function TermsPage() {
  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Terms of Use
      </h1>
      <div className="text-muted-foreground mt-6 space-y-5 text-pretty">
        <section>
          <h2 className="text-foreground text-lg font-semibold">What this site is</h2>
          <p className="mt-2">
            {siteConfig.name} is an informational resource for Indian travellers. It is not legal,
            immigration, customs, or travel-agency advice, and it doesn't act on your behalf with
            any airline or government authority.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">Accuracy</h2>
          <p className="mt-2">
            Every answer is sourced from an official authority and shows the date it was last
            verified — see the{' '}
            <a href="/trust" className="text-primary hover:underline">
              Trust &amp; Editorial Center
            </a>{' '}
            for how that works. Rules can change after that date. For anything time-critical,
            always confirm directly with your airline or the relevant authority before you travel.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">External links</h2>
          <p className="mt-2">
            Answers link to official government and airline websites as sources. We aren't
            responsible for the content or availability of those external sites.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">Changes</h2>
          <p className="mt-2">
            Answers are corrected and updated as part of the site's ongoing verification process,
            and these terms may be updated over time.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-primary hover:underline">
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
