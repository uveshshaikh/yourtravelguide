import Layout from '../components/Layout';

export default function About() {
  const pageTitle = 'About YourTravelGuide';
  const pageDescription = 'Why we created YourTravelGuide and how we keep aviation and customs guidance up to date.';

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-green-500">About Us</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">YourTravelGuide helps Indian travelers know what is allowed before they start for the airport.</h1>
          <p className="text-base text-slate-600">
            The project started as a personal checklist for friends taking their first flights. It is now a continuously updated
            reference covering documents, packing, security, and customs moments that typically cause last-minute confusion.
          </p>
        </header>

        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Why we exist</h2>
          <p className="text-slate-600">
            YourTravelGuide began as a simple shared note between friends who kept asking, &ldquo;Is this allowed in my cabin bag?&rdquo; We
            turned that note into a public site so anyone can quickly check what documents, gadgets, or gifts are okay before
            leaving for the airport.
          </p>
          <p className="text-slate-600">
            Every answer lives in one place, written plainly and organized by the travel moment you care about. No fluff, no
            guessing—just a calm reference you can check before you leave home.
          </p>
        </section>
      </section>
    </Layout>
  );
}

