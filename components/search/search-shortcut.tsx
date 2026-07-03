'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** The id every <QuestionSearch> input renders, so this shortcut can find it. */
export const SEARCH_INPUT_ID = 'global-search-input';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

/**
 * Global "/" shortcut (Gmail/GitHub/Linear-style), mounted once in the root
 * layout so the "/" hint shown next to every search box is actually true:
 *  • If a <QuestionSearch> input is on the page, focus it.
 *  • Otherwise, go to /search.
 * Ignored while already typing, or with a modifier key held.
 */
export function SearchShortcut() {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;

      e.preventDefault();
      const input = document.getElementById(SEARCH_INPUT_ID);
      if (input instanceof HTMLInputElement) {
        input.focus();
        input.select();
      } else {
        router.push('/search');
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [router]);

  return null;
}
