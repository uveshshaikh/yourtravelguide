import { siteConfig } from '@/config/site';

/**
 * Foundation landing page.
 *
 * Sprint 1 ships NO travel features by design. This is a deliberately minimal
 * placeholder proving the App Router shell, theming, and styling pipeline work
 * end-to-end. The real homepage is built in a later sprint against the
 * knowledge graph.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <p className="text-muted-foreground text-sm font-medium">{siteConfig.name}</p>
      <h1 className="text-3xl font-semibold tracking-tight text-balance">Foundation ready.</h1>
      <p className="text-muted-foreground">
        The production engineering foundation is in place. Travel features, pages, and tools are
        built in subsequent sprints against the knowledge graph.
      </p>
    </main>
  );
}
