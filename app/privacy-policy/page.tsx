import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { siteConfig } from '@/config/site';

const DESCRIPTION = "What information YourTravelGuide collects, and what it doesn't.";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  alternates: { canonical: '/privacy-policy' },
  openGraph: { type: 'website', url: '/privacy-policy', title: 'Privacy Policy', description: DESCRIPTION },
  twitter: { card: 'summary', title: 'Privacy Policy', description: DESCRIPTION },
};

/**
 * /privacy-policy — describes what this codebase actually does today, nothing
 * more. No accounts, no forms, no third-party analytics currently exist here;
 * this page is intentionally scoped to match, not to a generic template.
 * Update it if any of that changes before launch.
 */
export default function PrivacyPolicyPage() {
  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Privacy Policy
      </h1>
      <div className="text-muted-foreground mt-6 space-y-5 text-pretty">
        <p>
          {siteConfig.name} doesn't require you to create an account, and there are no forms on
          this site that collect personal information.
        </p>
        <section>
          <h2 className="text-foreground text-lg font-semibold">Theme preference</h2>
          <p className="mt-2">
            If you switch between light and dark mode, that choice is stored only in your own
            browser's local storage. It's never sent to us and never leaves your device.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">Technical logs</h2>
          <p className="mt-2">
            Like most websites, our hosting infrastructure may record standard technical
            information — such as IP address, browser type, and pages requested — for security and
            operational purposes. We don't use this for advertising or tracking, and we don't
            currently run any third-party analytics or advertising trackers on this site.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">External links</h2>
          <p className="mt-2">
            Answers on this site link to official government and authority websites as sources.
            Once you follow one of those links, that site's own privacy practices apply — we have
            no control over them.
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">If you contact us</h2>
          <p className="mt-2">
            If you email{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-primary hover:underline">
              {siteConfig.supportEmail}
            </a>
            , we keep that correspondence so we can respond to you.
          </p>
        </section>
        <p className="text-sm">
          This policy reflects how the site works today. If that changes, this page will be
          updated.
        </p>
      </div>
    </Container>
  );
}
