'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { useT, type Bi } from '@/lib/i18n';
import { PROJECTS } from '@/lib/projects';
import { prefersReducedMotion } from '@/lib/utils';

const REVEAL_AFTER_MS = 5000;

const HEADING: Bi = { en: 'New website launched', sq: 'Faqe e re e lançuar' };
const VIEW_PROJECT_LABEL: Bi = { en: 'View project', sq: 'Shiko projektin' };

const project = PROJECTS.find((p) => p.slug === 'kroni-restaurant')!;

/** Fixed, centered promo card announcing the latest launch — appears 5s
 *  after the homepage loads, every time the page loads. */
export default function LaunchPopup() {
  const t = useT();
  const pageNavigate = useStore((s) => s.pageNavigate);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), REVEAL_AFTER_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!visible || !card) return;
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.94, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [visible]);

  const dismiss = () => setVisible(false);

  const viewProject = () => {
    dismiss();
    pageNavigate(`/portfolio/${project.slug}`, { accent: project.tagColor, bg: '#0b0a16' });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="New website launched"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-6"
      onClick={dismiss}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden rounded-[8px] bg-white shadow-2xl"
      >
        <button
          type="button"
          data-cursor
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6367FF] transition-colors duration-300 hover:bg-gray-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden className="h-4 w-4">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div
          aria-hidden
          className="relative aspect-video w-full overflow-hidden rounded-t-[8px]"
          style={{ background: project.canvasColor ?? '#EEF0FF' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/kroni-mockup.webp"
            alt=""
            className="absolute inset-0 z-0 h-full w-full -translate-x-24 -translate-y-14 -rotate-[18deg] scale-x-125 -scale-y-125 object-contain md:-translate-x-32"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/kroni-mockup.webp"
            alt=""
            className="absolute inset-0 z-0 h-full w-full translate-x-24 translate-y-10 -rotate-[18deg] scale-125 object-contain"
          />
        </div>

        <div className="p-6 text-center">
          <span className="inline-block rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
            {project.name}
          </span>
          <p className="mt-2 font-display text-3xl font-semibold text-[#333D6D]">{t(HEADING)}</p>

          <button
            type="button"
            data-cursor
            onClick={viewProject}
            className="pointer-events-auto mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#6367FF] px-8 py-4 font-display text-base font-medium tracking-normal text-white transition-colors duration-300 hover:bg-[#4f52e0]"
          >
            {t(VIEW_PROJECT_LABEL)}
          </button>
        </div>
      </div>
    </div>
  );
}
