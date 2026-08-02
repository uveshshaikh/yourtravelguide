import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { VerifiedQuestionResult } from '@/components/search/verified-question-result';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/config/site';
import { listByIntentGroup } from '@/services/resolver/catalog';
import { intentGroupForCategorySlug, intentGroupSlug } from '@/db/seed/content';

/**
 * /category/[slug] — canonical, indexable hub pages for the traveller-intent
 * groups that already organise the homepage/search (Packing, Baggage,
 * Documents, ...). Renders ONLY groups with real verified content
 * (`listByIntentGroup()` already omits empty groups) — a slug for a group
 * with zero live questions 404s rather than showing an empty page. No
 * answers are duplicated here: every question is a link to its own
 * canonical /question/[slug] page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = intentGroupForCategorySlug(slug);
  if (!group) return { robots: { index: false, follow: false } };

  const groups = await listByIntentGroup();
  const match = groups.find((g) => g.group === group);
  if (!match) return { robots: { index: false, follow: false } };

  const url = `/category/${slug}`;
  const title = match.group;
  const description = match.description;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = intentGroupForCategorySlug(slug);
  if (!group) notFound();

  const groups = await listByIntentGroup();
  const match = groups.find((g) => g.group === group);
  if (!match) notFound();

  const url = `${siteConfig.url}/category/${slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: match.group, item: url },
    ],
  };

  // A genuine collection of real, verified pages — never a fabricated listing.
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: match.group,
    description: match.description,
    url,
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    hasPart: match.questions.map((q) => ({
      '@type': 'WebPage',
      name: q.question,
      url: `${siteConfig.url}/question/${q.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <Container className="max-w-2xl py-8 sm:py-10">
        <a
          href="/search"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All questions
        </a>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {match.group}
        </h1>
        <p className="text-muted-foreground mt-2 text-pretty">{match.description}</p>
        <p className="text-muted-foreground mt-1 text-sm">
          {match.questions.length} verified {match.questions.length === 1 ? 'question' : 'questions'}
        </p>

        <div className="mt-8 space-y-10">
          {match.subgroups.map((sub) => (
            <section key={sub.subcategory}>
              <h2 className="text-sm font-semibold tracking-wide uppercase">{sub.subcategory}</h2>
              <div className="mt-3 space-y-3">
                {sub.questions.map((q) => (
                  <VerifiedQuestionResult key={q.slug} item={q} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
