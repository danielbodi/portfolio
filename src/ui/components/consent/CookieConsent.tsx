import { useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { Card } from '../cards/Card';

type Choice = 'granted' | 'denied';

/** Read by the Clarity loader in index.html; keep the key in sync. */
const STORAGE_KEY = 'cookie-consent';

/** Dispatch on window to reopen the banner, e.g. from a "Cookie preferences" link. */
export const OPEN_COOKIE_PREFERENCES = 'open-cookie-preferences';

declare global {
  interface Window {
    loadClarity?: () => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES));
}

/**
 * Analytics consent. Clarity is not loaded until the visitor accepts; both
 * choices carry the same weight. Above the docked mobile navigation on
 * phones, bottom-right from md up, clear of the hero actions.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(() => readChoice() === null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_PREFERENCES, show);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES, show);
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage unavailable: the choice applies to this visit only.
    }
    if (choice === 'granted') {
      window.loadClarity?.();
    } else {
      window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="region"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-4 bottom-24 z-[60] md:bottom-6 md:left-auto md:right-6 md:max-w-sm"
    >
      <Card>
        <h2 id="cookie-consent-title" className="mb-2 text-base font-semibold text-gray-100">
          Analytics cookies
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-400">
          With your consent, Microsoft Clarity records how pages are used (clicks, scrolling,
          time on page) so I can see what helps and what gets in the way. Nothing loads unless you
          accept.{' '}
          <a
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 underline underline-offset-2"
          >
            Microsoft privacy statement
          </a>
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => choose('granted')}>
            Accept
          </Button>
          <Button variant="secondary" onClick={() => choose('denied')}>
            Decline
          </Button>
        </div>
      </Card>
    </div>
  );
}
