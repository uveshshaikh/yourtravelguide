import Layout from '../components/Layout';

export default function Terms() {
  const pageTitle = 'Terms & Conditions | YourTravelGuide';
  const pageDescription = 'Read the terms that govern how you use YourTravelGuide and the limitations of liability.';

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-500">Terms & Conditions</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Please read these terms before using YourTravelGuide.</h1>
          <p className="text-base text-slate-600">
            By visiting this site you agree to follow the conditions below. They keep YourTravelGuide transparent and make sure we can
            keep the project online for everyone.
          </p>
        </header>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Informational purpose only</h2>
            <p className="text-slate-600">
              YourTravelGuide summarizes publicly available travel and aviation rules. We do not represent any airline, airport,
              regulator, or security authority. Always confirm final requirements with the official authority handling your trip.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Acceptable use</h2>
            <p className="text-slate-600">
              You may read, share, or quote YourTravelGuide content for personal, non-commercial planning. Do not scrape, mirror, or
              automate large parts of the site without written permission. Any automated use must respect our performance and
              security controls.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Accuracy and updates</h2>
            <p className="text-slate-600">
              Aviation and customs rules change without notice. We review data regularly but cannot guarantee that every rule is
              current for every airport at every moment. Use the site as a guide and double-check with your airline, CISF, or
              customs officer.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Limitation of liability</h2>
            <p className="text-slate-600">
              YourTravelGuide, its contributors, and partners are not responsible for direct or indirect losses, missed flights,
              penalties, or confiscations resulting from reliance on the content. Your travel decisions remain your
              responsibility.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Changes to these terms</h2>
            <p className="text-slate-600">
              We may update these terms when laws or product features change. The &ldquo;Last updated&rdquo; date on this page tells you the
              latest version. Continuing to use YourTravelGuide means you accept the revised terms.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Governing law</h2>
            <p className="text-slate-600">
              These terms are governed by the laws of India. Any dispute arising from the site will be handled by the courts in
              Bengaluru, Karnataka, unless another venue is required by law.
            </p>
          </section>
        </div>

        <section className="bg-slate-900 text-white rounded-3xl p-6">
          <h2 className="text-xl font-bold">Questions about the terms?</h2>
          <p className="mt-2 text-white/80">
            Email <a href="mailto:legal@YourTravelGuide.help" className="underline font-semibold">legal@YourTravelGuide.help</a> and we will
            respond within five working days.
          </p>
          <p className="mt-4 text-xs tracking-wide uppercase text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
        </section>
      </section>
    </Layout>
  );
}

