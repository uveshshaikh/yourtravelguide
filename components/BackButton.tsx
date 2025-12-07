import { useRouter } from 'next/router';
import { MouseEvent, useCallback } from 'react';

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
}

const defaultClasses =
  'inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors gap-2';

export default function BackButton({
  fallbackHref = '/',
  label = 'Back',
  className,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const canGoBack = typeof window !== 'undefined' && window.history.length > 1;
      if (canGoBack) {
        router.back();
      } else {
        router.push(fallbackHref);
      }
    },
    [router, fallbackHref]
  );

  const classes = className ? `${defaultClasses} ${className}` : defaultClasses;

  return (
    <button
      type="button"
      onClick={handleBack}
      className={classes}
      aria-label={label}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
