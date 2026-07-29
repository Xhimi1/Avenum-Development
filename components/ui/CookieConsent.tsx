'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { useT, type Bi } from '@/lib/i18n';

const STORAGE_KEY = 'avenum-cookie-consent';
type Consent = 'accepted' | 'rejected';
/** idle: pre-entrance · visible: shown · closing: sliding out (no fade) */
type Phase = 'idle' | 'visible' | 'closing';

const TITLE: Bi = { en: 'We use cookies', sq: 'Përdorim cookies' };
const BODY: Bi = {
  en: 'We use a privacy-friendly analytics cookie to see how visitors use this site — nothing is ever sold or shared.',
  sq: 'Përdorim një cookie analitike miqësore me privatësinë, thjesht për të parë si përdoret faqja — asgjë nuk shitet apo ndahet.',
};
const LEARN_MORE: Bi = { en: 'Learn more', sq: 'Mëso më shumë' };
const ACCEPT: Bi = { en: 'Accept', sq: 'Prano' };
const REJECT: Bi = { en: 'Reject', sq: 'Refuzo' };

/** Accept/reject banner for the (cookie-less, privacy-friendly) Vercel
 *  Analytics beacon. Analytics only mounts once the visitor accepts;
 *  the choice is remembered in localStorage so the banner shows once. */
export default function CookieConsent() {
  const t = useT();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [resolved, setResolved] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent | null;
    setResolved(true);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
      return;
    }
    const timeout = window.setTimeout(() => setPhase('visible'), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  const choose = (value: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setPhase('closing');
    window.setTimeout(() => setConsent(value), 500);
  };

  return (
    <>
      {consent === 'accepted' && <Analytics />}

      {resolved && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className={`fixed inset-x-0 bottom-0 z-[70] w-full rounded-t-2xl border-t border-white/10 bg-[#0a0a0d] px-6 py-5 shadow-2xl ease-out md:px-12 ${
            phase === 'closing'
              ? 'pointer-events-none translate-y-full transition-transform duration-500 ease-in'
              : phase === 'visible'
                ? 'pointer-events-auto translate-y-0 opacity-100 transition-all duration-500'
                : 'pointer-events-none translate-y-4 opacity-0 transition-all duration-500'
          }`}
        >
          <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <div>
              <p className="text-sm font-semibold text-white">{t(TITLE)}</p>
              <p className="subtext mt-1 max-w-xl text-xs leading-relaxed">
                {t(BODY)}{' '}
                <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
                  {t(LEARN_MORE)}
                </Link>
              </p>
            </div>
            <div className="flex gap-2 md:shrink-0">
              <button
                type="button"
                data-cursor
                onClick={() => choose('rejected')}
                className="flex-1 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/5 md:flex-none md:px-5 md:py-2.5 md:text-xs"
              >
                {t(REJECT)}
              </button>
              <button
                type="button"
                data-cursor
                onClick={() => choose('accepted')}
                className="flex-1 rounded-full bg-gradient-to-t from-[#4f52e0] to-[#6367FF] px-5 py-3.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 md:flex-none md:px-5 md:py-2.5 md:text-xs"
              >
                {t(ACCEPT)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
