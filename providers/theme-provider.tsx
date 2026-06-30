'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ComponentProps } from 'react';

/** Wraps next-themes with our defaults (system-aware, class-based). */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
