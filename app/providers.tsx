'use client';
import { type ReactNode } from 'react';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { SearchShortcut } from '@/components/search/search-shortcut';

/** Composes all global client-side providers in one place. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SearchShortcut />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
