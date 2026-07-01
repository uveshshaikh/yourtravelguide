import { notFound } from 'next/navigation';
import { resolveDecision } from '@/services/resolver';
import { DecisionPage } from '@/components/decision/decision-page';
import { KnowledgeInProgress } from '@/components/decision/knowledge-incomplete';

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
