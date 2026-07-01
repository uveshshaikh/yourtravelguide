import type { Metadata } from 'next';
import { DecisionPage } from '@/components/decision/decision-page';
import { powerBankBreadcrumb, powerBankDecision } from '@/app/demo/mock-data';

export const metadata: Metadata = {
  title: 'Decision page (demo)',
  robots: { index: false, follow: false },
};

/** Demo: the canonical decision page rendered from a mock DecisionView. */
export default function DecisionDemoPage() {
  return <DecisionPage decision={powerBankDecision} breadcrumb={powerBankBreadcrumb} />;
}
