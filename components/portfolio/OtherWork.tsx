'use client';

import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import { PROJECTS } from '@/lib/projects';
import ArrowRight from '@/components/ui/ArrowRight';

const HEADING: Bi = { en: 'Other work', sq: 'Punë të tjera' };

/** Cross-links to every other case-study page — a stack of big, full-width
 *  rows (title, big arrow) rather than the card grid OtherServices.tsx
 *  uses, since it fits this page's plainer design. */
export default function OtherWork({ currentSlug }: { currentSlug: string }) {
  const t = useT();
  const pageNavigate = useStore((s) => s.pageNavigate);
  const others = PROJECTS.filter((p) => p.slug !== currentSlug);

  if (others.length === 0) return null;

  return (
    <section className="mx-auto mt-20 w-full max-w-5xl md:mt-28">
      <h2 className="font-display text-3xl font-medium text-[#333D6D] md:text-4xl">{t(HEADING)}</h2>

      <div className="mt-8 border-t border-black">
        {others.map((p) => (
          <button
            key={p.slug}
            type="button"
            data-cursor
            onClick={() => pageNavigate(`/portfolio/${p.slug}`, { accent: p.tagColor, bg: '#0b0a16' })}
            className="group flex w-full items-center justify-between gap-6 border-b border-black py-8 text-left transition-colors duration-300 hover:bg-black/[0.02]"
          >
            <h3 className="min-w-0 font-display text-xl font-bold leading-none text-[#333D6D] md:text-2xl">
              {p.name}
              {p.isPrototype && (
                <span className="text-sm font-normal opacity-30 md:text-base"> (Prototype)</span>
              )}
            </h3>

            <ArrowRight
              className="h-8 w-8 shrink-0 text-black transition-transform duration-300 group-hover:translate-x-2 md:h-12 md:w-12"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
