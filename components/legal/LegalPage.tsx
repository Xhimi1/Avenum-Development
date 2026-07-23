'use client';

import Link from 'next/link';
import { useT, type Bi } from '@/lib/i18n';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';
import { EMAIL, PHONE_DISPLAY } from '@/lib/contact';

export interface LegalSection {
  heading: Bi;
  body: Bi[];
}

const BACK_LINK = { en: '← Back to the experience', sq: '← Kthehu te eksperienca' };
const COPYRIGHT = {
  en: '© 2026 Avenum — All rights reserved',
  sq: '© 2026 Avenum — Të gjitha të drejtat e rezervuara',
};
const LAST_UPDATED = { en: 'Last updated: January 2026', sq: 'Përditësuar së fundmi: Janar 2026' };
const CONTACT_LINE = {
  en: `Questions? Reach us at ${EMAIL} or ${PHONE_DISPLAY}.`,
  sq: `Pyetje? Na kontakto në ${EMAIL} ose ${PHONE_DISPLAY}.`,
};

export default function LegalPage({ title, sections }: { title: Bi; sections: LegalSection[] }) {
  const t = useT();

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Logo className="text-3xl md:text-4xl" />
        <div className="flex items-center gap-4">
          <Link href="/" data-cursor className="text-xs text-black">
            {t(BACK_LINK)}
          </Link>
          <LangToggle light />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.05]">
          {t(title)}
        </h1>
        <p className="mt-3 text-xs text-black/50">{t(LAST_UPDATED)}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-lg font-semibold md:text-xl">{t(s.heading)}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-black/75 md:text-base">
                {s.body.map((p, pi) => (
                  <p key={pi}>{t(p)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-black/10 pt-6 text-sm text-black/75">
          {t(CONTACT_LINE)}
        </p>
      </main>

      <footer className="border-t border-black/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-3 text-xs text-black md:flex-row md:items-center md:justify-between">
          <p>{t(COPYRIGHT)}</p>
          <Link href="/" data-cursor className="w-fit text-black">
            avenum.website
          </Link>
        </div>
      </footer>
    </div>
  );
}
