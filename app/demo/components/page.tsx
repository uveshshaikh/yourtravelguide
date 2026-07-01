import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { Verdict } from '@/lib/knowledge/types';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/feedback/empty-state';
import { ErrorState } from '@/components/feedback/error-state';
import { Inbox } from 'lucide-react';
// Decision
import { VerdictBanner } from '@/components/decision/verdict-banner';
import { VerdictCard } from '@/components/decision/verdict-card';
import { DecisionAnswerBox } from '@/components/decision/decision-answer-box';
import { AppliesToPanel } from '@/components/decision/applies-to-panel';
import { ExceptionsPanel } from '@/components/decision/exceptions-panel';
import { WarningList } from '@/components/decision/important-warning';
import { RuleCard, RequirementCard } from '@/components/decision/rule-card';
import { ComparisonTable } from '@/components/decision/comparison-table';
import { DecisionSkeleton } from '@/components/decision/decision-skeleton';
// Trust
import {
  ConfidenceBadge,
  LastVerifiedBadge,
  ReviewStatusBadge,
  VersionBadge,
} from '@/components/trust/trust-badges';
import { TrustPanel } from '@/components/trust/trust-panel';
import { AuthorityPanel } from '@/components/trust/authority-panel';
import { EvidencePanel } from '@/components/trust/evidence-panel';
import { OfficialSourcesList } from '@/components/trust/official-sources-list';
import { VersionHistory } from '@/components/trust/version-history';
// Content
import { Breadcrumb } from '@/components/content/breadcrumb';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { RelatedQuestions, RelatedTopics } from '@/components/content/related';
import { JourneyTimeline } from '@/components/content/journey-timeline';
import { FeedbackWidget } from '@/components/content/feedback-widget';
// Search
import { CategoryResult, EntityResult, QuestionResult } from '@/components/search/search-results';
import {
  RelatedSearches,
  SearchError,
  SearchLoading,
  SearchNoResults,
  SearchSuggestions,
} from '@/components/search/search-states';
// Entities
import {
  AirlineCard,
  AirportCard,
  CountryCard,
  DocumentCard,
  JourneyCard,
  ProfileCard,
} from '@/components/entities/entity-cards';
import {
  airlines,
  airports,
  categoryResults,
  comparisonColumns,
  comparisonRows,
  countries,
  documents,
  entityResults,
  journeys,
  journeySteps,
  powerBankBreadcrumb,
  powerBankDecision as d,
  profiles,
  questionResults,
  relatedSearches,
} from '@/app/demo/mock-data';

export const metadata: Metadata = {
  title: 'Component gallery (demo)',
  robots: { index: false, follow: false },
};

const verdicts: Verdict[] = ['allowed', 'allowed_with_conditions', 'not_allowed', 'unresolved'];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-border scroll-mt-24 border-t pt-8">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Demo: every Decision-Experience component with representative props. */
export default function ComponentGalleryPage() {
  return (
    <Container className="space-y-10 py-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Decision Experience — components</h1>
        <p className="text-muted-foreground mt-2">
          Every reusable component, driven by typed mock data. See the{' '}
          <a href="/demo/decision" className="text-primary hover:underline">
            canonical decision page
          </a>
          .
        </p>
      </header>

      <Section title="Verdict banner">
        <div className="grid gap-3">
          {verdicts.map((v) => (
            <VerdictBanner key={v} verdict={v} answer={d.answer} />
          ))}
        </div>
      </Section>

      <Section title="Verdict cards & rule cards">
        <div className="grid gap-3 sm:grid-cols-2">
          <VerdictCard
            question={d.question}
            verdict={d.verdict}
            answer="Cabin only, ≤100 Wh."
            href="#"
          />
          <RuleCard
            title="Power bank"
            verdict="allowed_with_conditions"
            summary="Cabin only, up to 100 Wh."
            meta={['100 Wh', 'Cabin']}
            href="#"
          />
          <RequirementCard
            title="Valid passport"
            requirement="required"
            detail="Must be valid 6 months beyond travel."
            href="#"
          />
          <RequirementCard
            title="Travel insurance"
            requirement="recommended"
            detail="Required for Schengen; wise elsewhere."
          />
        </div>
      </Section>

      <Section title="Decision answer box">
        <DecisionAnswerBox
          verdict={d.verdict}
          answer={d.answer}
          conditions={d.conditions}
          trust={d.trust}
        />
      </Section>

      <Section title="Trust badges">
        <div className="flex flex-wrap items-center gap-2">
          <LastVerifiedBadge date={d.trust.lastVerified} />
          <ConfidenceBadge confidence="confirmed" />
          <ConfidenceBadge confidence="likely" />
          <ConfidenceBadge confidence="provisional" />
          <ReviewStatusBadge state="current" />
          <ReviewStatusBadge state="due_soon" />
          <ReviewStatusBadge state="overdue" />
          <VersionBadge version={3} />
        </div>
      </Section>

      <Section title="Applies to / Exceptions / Warnings">
        <div className="grid gap-4 lg:grid-cols-2">
          <AppliesToPanel appliesTo={d.appliesTo} />
          {d.exceptions ? <ExceptionsPanel exceptions={d.exceptions} /> : null}
        </div>
        <div className="mt-4">{d.warnings ? <WarningList warnings={d.warnings} /> : null}</div>
      </Section>

      <Section title="Trust panels">
        <div className="grid gap-4 lg:grid-cols-2">
          <TrustPanel trust={d.trust} sourceCount={d.sources.length} />
          <AuthorityPanel
            name="DGCA"
            jurisdiction="India · Directorate General of Civil Aviation"
            description="India's civil aviation regulator."
            websiteUrl="https://www.dgca.gov.in/"
          />
          <EvidencePanel evidenceLevel="government_regulation" />
          <OfficialSourcesList sources={d.sources} />
        </div>
        <div className="mt-4">{d.versions ? <VersionHistory versions={d.versions} /> : null}</div>
      </Section>

      <Section title="FAQ / Related / Breadcrumb / Journey">
        <Breadcrumb items={powerBankBreadcrumb} className="mb-4" />
        {d.faqs ? <FaqAccordion faqs={d.faqs} /> : null}
        <div className="mt-6 space-y-6">
          {d.relatedQuestions ? <RelatedQuestions items={d.relatedQuestions} /> : null}
          {d.relatedTopics ? <RelatedTopics items={d.relatedTopics} /> : null}
        </div>
        <div className="mt-6 max-w-md">
          <JourneyTimeline steps={journeySteps} />
        </div>
      </Section>

      <Section title="Comparison table">
        <ComparisonTable
          caption="Cabin baggage & batteries by airline"
          columns={comparisonColumns}
          rows={comparisonRows}
        />
      </Section>

      <Section title="Search UI">
        <div className="grid gap-3">
          {questionResults.map((r) => (
            <QuestionResult key={r.id} result={r} />
          ))}
          {categoryResults.map((r) => (
            <CategoryResult key={r.id} result={r} />
          ))}
          {entityResults.map((r) => (
            <EntityResult key={r.id} result={r} />
          ))}
        </div>
        <div className="mt-4 max-w-md">
          <SearchSuggestions
            items={[{ label: 'power bank in flight' }, { label: 'power bank checked baggage' }]}
          />
        </div>
        <div className="mt-4">
          <RelatedSearches items={relatedSearches} />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <SearchNoResults query="jetpack" />
          <SearchLoading rows={3} />
          <SearchError />
        </div>
      </Section>

      <Section title="Entity cards">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AirlineCard airline={airlines[0]!} />
          <AirportCard airport={airports[0]!} />
          <CountryCard country={countries[0]!} />
          <DocumentCard document={documents[0]!} />
          <ProfileCard profile={profiles[0]!} />
          <JourneyCard journey={journeys[0]!} />
        </div>
      </Section>

      <Section title="States: empty / error / loading / feedback">
        <div className="grid gap-4 lg:grid-cols-2">
          <EmptyState
            icon={Inbox}
            title="Nothing saved yet"
            description="Answers you save will appear here."
            action={<Button size="sm">Browse topics</Button>}
          />
          <ErrorState action={<Button size="sm">Try again</Button>} />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Spinner label="Loading answer" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="mt-6 max-w-2xl">
          <DecisionSkeleton />
        </div>
        <div className="mt-6 max-w-xl">
          <FeedbackWidget />
        </div>
      </Section>

      <Section title="Buttons & badges (3A)">
        <div className="flex flex-wrap items-center gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge variant="allowed">Allowed</Badge>
          <Badge variant="conditional">Conditional</Badge>
          <Badge variant="denied">Denied</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Section>
    </Container>
  );
}
