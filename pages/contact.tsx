import Layout from '../components/Layout';

export default function Contact() {
  const pageTitle = 'Contact YourTravelGuide';
  const pageDescription = 'Official contact details for YourTravelGuide to meet AdSense and transparency requirements.';

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-indigo-500">Contact</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Talk to the YourTravelGuide team</h1>
        </header>

        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <p className="text-slate-600">
            Email <a href="mailto:contact@yourtravelguide.in" className="font-semibold text-blue-600 underline">contact@yourtravelguide.in</a> for any question about the site. Add a short subject so we know if it is about media, privacy, partnerships, or mailing paperwork.
          </p>
        </section>
      </section>
    </Layout>
  );
}

