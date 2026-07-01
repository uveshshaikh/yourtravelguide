import { notFound } from 'next/navigation';
import { resolveDecision } from '@/services/resolver';
import { DecisionPage } from '@/components/decision/decision-page';
import { KnowledgeInProgress } from '@/components/decision/knowledge-incomplete';

/**
 * /topic/[slug] — resolves a topic to its verified decision. Same resolver, same
 * three-state contract; no business logic in the page.
 */
export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
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
