import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { siteConfig } from '@/config/site';

const DESCRIPTION = "Why you should always confirm time-critical rules directly with your airline or the relevant authority.";

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: DESCRIPTION,
  alternates: { canonical: '/disclaimer' },
  openGraph: { type: 'website', url: '/disclaimer', title: 'Disclaimer', description: DESCRIPTION },
  twitter: { card: 'summary', title: 'Disclaimer', description: DESCRIPTION },
};

/** /disclaimer — the same real disclaimer sentence shown on every decision page and in the site footer, expanded slightly. Not a separate legal invention. */
export default function DisclaimerPage() {
  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Disclaimer
      </h1>
      <div className="text-muted-foreground mt-6 space-y-5 text-pretty">
        <p>
          {siteConfig.name} is an independent information resource. It is not affiliated with the
          Directorate General of Civil Aviation, the Bureau of Civil Aviation Security, Indian
          Customs, the Bureau of Immigration, any airline, or any other authority it cites as a
          source.
        </p>
        <p>
          Every answer is sourced from the official authority responsible for that specific rule
          and shows the date it was last verified — see the{' '}
          <a href="/trust" className="text-primary hover:underline">
            Trust &amp; Editorial Center
          </a>{' '}
          for the full methodology. Rules can change after that date, and enforcement can vary by
          airport, airline, or individual officer discretion.
        </p>
        <p>
          Nothing on this site is legal, immigration, customs, or medical advice. For anything
          time-critical — a visa, a customs declaration, a medical device, a compensation claim —
          always confirm directly with your airline or the relevant government authority before
          you travel.
        </p>
      </div>
    </Container>
  );
}
