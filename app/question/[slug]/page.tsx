import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveDecision } from '@/services/resolver';
import { DecisionPage } from '@/components/decision/decision-page';
import { KnowledgeInProgress } from '@/components/decision/knowledge-incomplete';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/config/site';
import { intentGroupForSlug, intentGroupSlug } from '@/db/seed/content';

/**
 * One canonical URL per verified question — the title/description come straight
 * from the real, verified answer (never invented, never keyword-stuffed), so
 * each closely-related search query is served by a single authoritative page
 * rather than duplicate near-identical ones.
 *
 * Incomplete-knowledge pages (real slug, not yet verified) explicitly noindex:
 * they return HTTP 200 with an honest "in progress" notice, which must never
 * be indexed as if it were a real answer.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await resolveDecision(slug);
  if (result.state !== 'available') {
    return { robots: { index: false, follow: true } };
  }

  const { view } = result;
  const url = `/question/${slug}`;
  return {
    title: view.question,
    description: view.answer,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: view.question,
      description: view.answer,
    },
    twitter: {
      card: 'summary_large_image',
      title: view.question,
      description: view.answer,
    },
  };
}

/**
 * /question/[slug] — the canonical decision route. Renders ONLY the resolver's
 * ViewModel; the page contains no business logic and no data access.
 * Three states: verified answer · verification in progress · 404.
 */
export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await resolveDecision(slug);

  if (result.state === 'not_found') notFound();
  if (result.state === 'incomplete') return <KnowledgeInProgress question={result.question} />;

  const { view } = result;
  const url = `${siteConfig.url}/question/${slug}`;
  const group = intentGroupForSlug(slug);
  const categoryHref = `/category/${intentGroupSlug(group)}`;
  const categoryUrl = `${siteConfig.url}${categoryHref}`;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: view.question,
    description: view.answer,
    url,
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    dateModified: view.trust.lastVerified,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: group, item: categoryUrl },
      { '@type': 'ListItem', position: 3, name: view.question, item: url },
    ],
  };

  // Genuine FAQ content: this page IS one real, sourced question-and-answer —
  // never padded with invented extra Q&A pairs.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: view.question,
        acceptedAnswer: { '@type': 'Answer', text: view.answer },
      },
    ],
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <DecisionPage
        decision={view}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: group, href: categoryHref },
          { label: view.question },
        ]}
      />
    </>
  );
}
