'use client';

import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { NAV_SERVICES } from '@/lib/services-nav';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import ServiceIcon from './ServiceIcon';

const HEADING = { en: 'Explore our other services.', sq: 'Eksploro shërbimet tona të tjera.' };
const LEARN_MORE = { en: 'Learn more', sq: 'Mëso më shumë' };

/** Cross-links to every service page except the one currently open —
 *  replaces the (heavier) project gallery that used to sit here. */
export default function OtherServices({ currentHref }: { currentHref: string }) {
  const t = useT();
  const pageNavigate = useStore((s) => s.pageNavigate);
  const others = NAV_SERVICES.filter((svc) => svc.href !== currentHref);

  return (
    <section className="relative bg-white py-24 text-black md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SplitText
          as="h2"
          className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[1] tracking-normal text-[#0A2947]"
        >
          {t(HEADING)}
        </SplitText>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {others.map((svc) => (
            <button
              key={svc.href}
              type="button"
              data-cursor
              onClick={() => pageNavigate(svc.href, { accent: svc.accent, bg: '#0b0a16' })}
              className="group flex w-full items-start gap-4 rounded-2xl border border-black bg-white p-5 text-left"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${svc.accent}14`, color: svc.accent }}
              >
                <ServiceIcon id={svc.id} className="h-6 w-6" />
              </span>
              <div className="flex min-w-0 flex-col gap-4">
                <div>
                  <div className="truncate font-display text-base font-semibold">{t(svc.title)}</div>
                  <div className="mt-0.5 truncate text-xs text-[#0A2947]/55">{t(svc.desc)}</div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-black underline underline-offset-2">
                  {t(LEARN_MORE)}
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
