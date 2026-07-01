import { Container } from '@/components/layout/container';
import { StatusNote } from '@/components/feedback/status-note';

/**
 * KnowledgeInProgress — STATE 2 (Knowledge Incomplete). The topic is known but
 * not yet verified, so we render this instead of guidance. It NEVER fabricates
 * an answer; it states plainly that verification is in progress.
 */
export function KnowledgeInProgress({ question }: { question: string }) {
  return (
    <Container className="py-16">
      <h1 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {question}
      </h1>
      <div className="mt-6 max-w-xl">
        <StatusNote tone="info" title="Verification in progress">
          <p>
            We’ve identified this question but haven’t finished confirming the answer against
            official sources. To keep you safe, we don’t publish travel guidance until it’s verified
            — we’d rather show nothing than something wrong. Please check back soon.
          </p>
        </StatusNote>
      </div>
    </Container>
  );
}
