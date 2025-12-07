import Layout from '../components/Layout';

export default function Disclaimer() {
  const pageTitle = 'Disclaimer | YourTravelGuide';
  const pageDescription = 'Understand the limitations of YourTravelGuide content and how to validate rules before you travel.';

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-rose-500">Disclaimer</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">YourTravelGuide is an independent guide, not an official authority.</h1>
          <p className="text-base text-slate-600">
            We do our best to keep every rule accurate, but airports, airlines, security teams, and customs officers can change
            requirements without public notice. Use the information below to stay safe.
          </p>
        </header>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Independent research</h2>
            <p className="mt-3 text-slate-600">
              YourTravelGuide summarizes government notifications, airline baggage charts, and airport advisories. We are not affiliated
              with the Bureau of Civil Aviation Security, CISF, the Airports Authority of India, or any airline.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Always confirm locally</h2>
            <p className="mt-3 text-slate-600">
              Final decisions rest with the officer handling your flight. Please confirm critical questions with the airline
              counter, CISF supervisor, or customs desk before you travel.
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">No legal or official advice</h2>
            <div className="mt-3 space-y-2 text-slate-600">
              <p>Information on YourTravelGuide is provided for general travel guidance only.</p>
              <p>Airline and airport rules can change at any time.</p>
              <p>Please confirm the latest requirements with your airline or the relevant authorities before you travel.</p>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Use at your own discretion</h2>
            <div className="mt-3 space-y-2 text-slate-600">
              <p>You are responsible for your travel decisions, documents, and belongings.</p>
              <p>YourTravelGuide provides general guidance, but we cannot be held liable for any actions taken based on our information, including airline decisions or security restrictions.</p>
            </div>
          </section>
        </div>

        <section className="bg-slate-900 text-white rounded-3xl p-6">
          <h2 className="text-xl font-bold">Need more clarity?</h2>
          <p className="mt-2 text-white/80">
            Write to <a href="mailto:hello@YourTravelGuide.help" className="underline font-semibold">hello@YourTravelGuide.help</a> and we
            will share the underlying public reference for a rule whenever possible.
          </p>
        </section>
      </section>
    </Layout>
  );
}

