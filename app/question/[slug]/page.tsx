import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveDecision } from '@/services/resolver';
import { DecisionPage } from '@/components/decision/decision-page';
import { KnowledgeInProgress } from '@/components/decision/knowledge-incomplete';

/**
 * One canonical URL per verified question — the title/description come straight
 * from the real, verified answer (never invented, never keyword-stuffed), so
 * each closely-related search query is served by a single authoritative page
 * rather than duplicate near-identical ones.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await resolveDecision(slug);
  if (result.state !== 'available') return {};
  return {
    title: result.view.question,
    description: result.view.answer,
    alternates: { canonical: `/question/${slug}` },
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

  return (
    <DecisionPage
      decision={result.view}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: result.view.question }]}
    />
  );
}
