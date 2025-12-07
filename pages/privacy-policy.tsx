import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  const pageTitle = 'Privacy Policy | YourTravelGuide';
  const pageDescription = 'YourTravelGuide runs without personal data collection, trackers, or invasive analytics.';

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-500">Privacy Policy</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">We do not collect, profile, or sell personal data.</h1>
          <p className="text-base text-slate-600">
            YourTravelGuide is a static educational site. There are no accounts, logins, payment forms, or ad trackers that capture
            personal information. This page simply explains the handful of operational signals that may pass through our
            infrastructure so you know exactly what to expect.
          </p>
        </header>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">No personal data collection</h2>
            <p className="text-slate-600">
              We do not save names, IDs, government documents, payment details, or search queries. All rule lookups happen entirely
              in your browser using the dataset that ships with the site. We only store the minimal operational signals described
              below.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Operational signals that still exist</h2>
            <p className="text-slate-600">
              Our hosting provider temporarily records standard server logs (IP address, browser type, date/time) to stop abuse and
              keep the site running. These logs roll off automatically and we do not combine them with any other data.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Optional location feature</h2>
            <p className="text-slate-600">
              Certain tools (such as “Find Nearby Airports”) may ask for your location via the browser&rsquo;s Geolocation API. The
              browser seeks your explicit permission, and the coordinates stay on your device. We only use the latitude/longitude
              momentarily to calculate distances and never store, log, or send that location to our servers.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Cookies and future ads</h2>
            <p className="text-slate-600">
              YourTravelGuide does not set first-party cookies today. If we add Google AdSense in the future, Google may store its own
              cookies to measure impressions and prevent fraud. You can manage those preferences directly inside Google&apos;s Ad
              Settings dashboard.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Questions or deletion requests</h2>
            <p className="text-slate-600">
              Because we avoid collecting identifiable data, there is usually nothing to delete. Still, if you believe information
              related to you is stored on our systems, write to us and we will confirm and erase it.
            </p>
          </section>
        </div>

        <section className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-blue-900">Reach the privacy contact</h2>
          <p className="mt-3 text-blue-900">
            Email <a href="mailto:privacy@YourTravelGuide.help" className="font-semibold underline">privacy@YourTravelGuide.help</a> with any
            privacy concern. We aim to reply within three working days.
          </p>
        </section>
      </section>
    </Layout>
  );
}

