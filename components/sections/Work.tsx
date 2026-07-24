'use client';

import { useRef } from 'react';
import ArrowRight from '@/components/ui/ArrowRight';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import WorkServices from '@/components/sections/WorkServices';
import { PROJECTS } from '@/lib/projects';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const HEADING: Bi = {
  en: 'Work that speaks for itself.',
  sq: 'Punë që flet vetë.',
};
const SUBHEADING: Bi = {
  en: 'A handful of recent projects — each one designed, built and shipped to make an impression.',
  sq: 'Disa nga projektet e fundit — secili i dizajnuar, ndërtuar dhe lançuar për të lënë përshtypje.',
};
const CASE_STUDY_LABEL: Bi = { en: 'See case study', sq: 'Shiko studimin e rastit' };

export default function Work() {
  const t = useT();
  const scrollerRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-work-card]');
    const amount = (card?.offsetWidth ?? 640) + 32;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = scrollerRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    dragRef.current = { isDown: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    el.style.scrollSnapType = 'none';
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = scrollerRef.current;
    const state = dragRef.current;
    if (!el || !state.isDown) return;
    const dx = e.clientX - state.startX;
    if (Math.abs(dx) > 3) state.moved = true;
    el.scrollLeft = state.scrollLeft - dx;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = scrollerRef.current;
    dragRef.current.isDown = false;
    if (el) {
      el.style.scrollSnapType = '';
      if (e.pointerId != null && el.hasPointerCapture?.(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <section id="work" data-scene-section className="relative bg-white py-24 text-black md:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-12">
        <div className="flex items-end justify-between gap-6 px-2 md:px-0">
          <div className="max-w-2xl">
            <SplitText
              as="h2"
              className="font-display text-[clamp(2.1rem,5.5vw,4.6rem)] font-semibold leading-[0.95]"
            >
              {t(HEADING)}
            </SplitText>
            <FadeIn delay={0.15}>
              <p className="mt-4 max-w-xl text-sm text-black md:text-base">{t(SUBHEADING)}</p>
            </FadeIn>
          </div>

          <div className="mb-2 hidden flex-shrink-0 gap-2 md:flex">
            <button
              type="button"
              data-cursor
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className="pointer-events-auto flex h-10 w-14 items-center justify-center rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-300 hover:bg-gray-300"
            >
              <ArrowRight className="h-4 w-4 rotate-180 text-black" />
            </button>
            <button
              type="button"
              data-cursor
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className="pointer-events-auto flex h-10 w-14 items-center justify-center rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-300 hover:bg-gray-300"
            >
              <ArrowRight className="h-4 w-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-1.5 md:px-12">
        <ul
          ref={scrollerRef}
          data-hscroll
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={handleClickCapture}
          className="pointer-events-auto mt-14 flex flex-col gap-y-10 md:mt-20 md:flex-row md:gap-8 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory md:cursor-grab md:active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((project, i) => (
            <li key={project.name} data-work-card className="md:flex md:w-[40rem] md:flex-shrink-0 md:snap-start">
              <FadeIn delay={0.1 * i} className="md:flex md:h-full md:w-full md:flex-col">
                <div className="overflow-hidden rounded-2xl border-8 border-[#E2E5FA] bg-white pt-5 px-5 md:flex md:h-full md:flex-col md:pt-7 md:px-7">
                  <span className="inline-block w-fit rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
                    {t(project.category)}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                    {project.name}
                  </h3>
                  <button
                    type="button"
                    data-cursor
                    aria-label={t(CASE_STUDY_LABEL)}
                    className="group pointer-events-auto mt-5 flex h-12 w-20 items-center justify-center rounded-full border-2 border-[#6367FF] bg-[#6367FF] transition-colors duration-300 hover:bg-[#4f52e0]"
                  >
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <div
                    className="mt-6 aspect-[1101/1500] overflow-hidden rounded-t-lg md:aspect-[512/585] md:h-auto md:rounded-t-lg"
                    style={{
                      background: project.canvasColor ?? 'linear-gradient(180deg, #D2EBFB 0%, #F3FAFF 100%)',
                    }}
                  >
                    {project.image ? (
                      <div className="flex h-full items-center justify-center pt-6 px-5 md:items-end md:pt-8 md:px-8">
                        <div className="h-full w-full overflow-hidden rounded-t-lg md:rounded-t-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt=""
                            draggable={false}
                            className="h-full w-full select-none object-cover object-top"
                            style={project.imageScale ? { transform: `scale(${project.imageScale})` } : undefined}
                          />
                        </div>
                      </div>
                    ) : (
                      <div aria-hidden className="h-full w-full" />
                    )}
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>

      <WorkServices />
    </section>
  );
}

