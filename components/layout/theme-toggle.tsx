'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@teispace/next-themes';

/**
 * Light/dark toggle. The icon switches purely via the `dark:` CSS variant (no
 * mount-state effect, no hydration mismatch): both icons render, and the active
 * `.dark` class on <html> reveals the correct one before paint.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="text-muted-foreground hover:bg-muted hover:text-foreground inline-grid size-9 place-items-center rounded-md transition-colors"
      aria-label="Toggle light or dark theme"
    >
      <Sun className="hidden size-[1.15rem] dark:block" aria-hidden />
      <Moon className="block size-[1.15rem] dark:hidden" aria-hidden />
    </button>
  );
}
