/** Default route-level loading UI. Replaced per-route with skeletons later. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="flex min-h-dvh items-center justify-center">
      <div className="border-muted border-t-foreground size-6 animate-spin rounded-full border-2" />
    </div>
  );
}
