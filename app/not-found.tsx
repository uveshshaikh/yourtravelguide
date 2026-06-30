import Link from 'next/link';

/** 404 — shown for unmatched routes. */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
      >
        Back to home
      </Link>
    </main>
  );
}
