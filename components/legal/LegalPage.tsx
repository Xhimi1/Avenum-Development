'use client';

import { useT, type Bi } from '@/lib/i18n';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { EMAIL, PHONE_DISPLAY } from '@/lib/contact';

export interface LegalSection {
  heading: Bi;
  body: Bi[];
}

const LAST_UPDATED = { en: 'Last updated: January 2026', sq: 'Përditësuar së fundmi: Janar 2026' };
const CONTACT_LINE = {
  en: `Questions? Reach us at ${EMAIL} or ${PHONE_DISPLAY}.`,
  sq: `Pyetje? Na kontakto në ${EMAIL} ose ${PHONE_DISPLAY}.`,
};

export default function LegalPage({ title, sections }: { title: Bi; sections: LegalSection[] }) {
  const t = useT();

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <h1 className="heading-hero">
          {t(title)}
        </h1>
        <p className="mt-3 text-xs text-white/50">{t(LAST_UPDATED)}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="heading-sm">{t(s.heading)}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/75 md:text-base">
                {s.body.map((p, pi) => (
                  <p key={pi}>{t(p)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-white/75">
          {t(CONTACT_LINE)}
        </p>
      </main>

      <Footer />
    </div>
  );
}
