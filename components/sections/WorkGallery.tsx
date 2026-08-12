'use client';

import { useRef } from 'react';
import ArrowRight from '@/components/ui/ArrowRight';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import { PROJECTS } from '@/lib/projects';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const HEADING: Bi = {
  en: 'Our portfolio.',
  sq: 'Projektet tona.',
};
const SUBHEADING: Bi = {
  en: "A few of our projects that we're proud of.",
  sq: 'Disa nga projektet tona të cilat jemi krenarë për to.',
};
const CASE_STUDY_LABEL: Bi = { en: 'See the project', sq: 'Shiko projektin' };
const EXPLORE_WORK_LABEL: Bi = { en: 'Explore work', sq: 'Eksploro projektin' };
const VIEW_MORE_LABEL: Bi = { en: 'View more', sq: 'Shiko më shumë' };

/**
 * The project gallery/slider from the homepage Work section, extracted so it
 * can be dropped into other pages too. `mobileSlider` opts into a horizontal
 * drag-slider with visible arrows on mobile as well as desktop; the
 * homepage keeps its original stacked-cards mobile layout by leaving it off.
 * `grid` drops the heading/subheading and the slider entirely, laying every
 * card out in a static responsive grid instead (used on the portfolio page,
 * which has its own hero heading already).
 */
export default function WorkGallery({
  mobileSlider = false,
  grid = false,
}: {
  mobileSlider?: boolean;
  grid?: boolean;
}) {
  const t = useT();
  const pageNavigate = useStore((s) => s.pageNavigate);
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
    // A press starting on a real button (e.g. "See case study") is a click,
    // not a drag — don't grab pointer capture, or a few px of natural mouse
    // jitter gets misread as a drag and the click never reaches the button.
    if ((e.target as HTMLElement).closest('button')) return;
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
    <>
      {!grid && (
        <div className="mx-auto w-full max-w-6xl px-4 md:px-12">
          <div className="flex items-end justify-between gap-6 px-2 md:px-0">
            <div className="max-w-2xl">
              <SplitText
                as="h2"
                className="font-display text-[clamp(2.8rem,7.2vw,6.4rem)] font-semibold leading-[0.95] text-white md:text-[clamp(2.8rem,4.5vw,4.4rem)]"
              >
                {t(HEADING)}
              </SplitText>
              <FadeIn delay={0.15}>
                <p className="mt-4 max-w-xl text-base font-medium text-white">{t(SUBHEADING)}</p>
              </FadeIn>
            </div>

            <div className={`mb-2 flex-shrink-0 gap-2 ${mobileSlider ? 'flex' : 'hidden md:flex'}`}>
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
      )}

      <div className={grid || mobileSlider ? 'w-full md:px-12' : 'w-full px-1.5 md:px-12'}>
        <ul
          ref={scrollerRef}
          data-hscroll
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={handleClickCapture}
          className={
            grid
              ? 'flex flex-col gap-y-10'
              : mobileSlider
              ? 'pointer-events-auto mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-20 md:gap-8'
              : 'pointer-events-auto mt-14 flex flex-col gap-y-8 md:mt-20 md:flex-row md:gap-8 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory md:cursor-grab md:active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden'
          }
        >
          {PROJECTS.filter((project) => grid || !project.hideFromHome).map((project) => (
            <li
              key={project.name}
              data-work-card
              className={
                grid
                  ? 'flex w-full'
                  : mobileSlider
                  ? 'flex w-full shrink-0 snap-center md:w-[40rem] md:snap-start'
                  : 'md:flex md:w-[40rem] md:flex-shrink-0 md:snap-start'
              }
            >
              {grid ? (
                <div className="flex w-full flex-col gap-6 rounded-2xl border-8 border-[#E2E5FA] bg-white p-5 md:flex-row md:items-center md:gap-10 md:p-7">
                  {/* image — its own box, same border the row now has too */}
                  <div
                    className="aspect-[1101/1500] w-full overflow-hidden rounded-lg bg-white md:aspect-[512/585] md:w-[22rem] md:flex-shrink-0"
                    style={{
                      background: project.canvasColor ?? 'linear-gradient(180deg, #D2EBFB 0%, #F3FAFF 100%)',
                    }}
                  >
                    {project.image ? (
                      <div className="flex h-full items-end justify-center px-5 pt-6 md:px-8 md:pt-8">
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

                  {/* eyebrow, title, description, button */}
                  <div className="flex flex-col">
                    <span className="inline-block w-fit rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
                      {t(project.category)}
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-[#333D6D] md:text-4xl">
                      {project.name}
                      {project.isPrototype && (
                        <span className="text-sm font-normal opacity-30 md:text-base"> (Prototype)</span>
                      )}
                    </h3>
                    {project.description && (
                      <p className="mt-3 max-w-md text-xs text-[#0A2947] md:text-sm">
                        {t(project.description)}
                      </p>
                    )}
                    <button
                      type="button"
                      data-cursor
                      aria-label={t(CASE_STUDY_LABEL)}
                      onClick={() => {
                        if (dragRef.current.moved) return;
                        pageNavigate(`/portfolio/${project.slug}`, { accent: project.tagColor, bg: '#0b0a16' });
                      }}
                      className="pointer-events-auto mt-5 flex h-12 w-fit items-center gap-2 rounded-full border-2 border-[#6367FF] bg-[#6367FF] px-6 font-display text-base font-medium text-white transition-colors duration-300 hover:bg-[#4f52e0]"
                    >
                      {t(VIEW_MORE_LABEL)}
                      <ArrowRight className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className={mobileSlider ? 'flex h-full w-full flex-col' : 'md:flex md:h-full md:w-full md:flex-col'}>
                  <div
                    className={
                      mobileSlider
                        ? 'flex h-full flex-col overflow-hidden rounded-2xl border-8 border-[#E2E5FA] bg-white px-5 pt-5 ring-4 ring-white md:px-7 md:pt-7'
                        : 'overflow-hidden rounded-2xl border-8 border-[#E2E5FA] bg-white px-5 pt-5 ring-4 ring-white md:flex md:h-full md:flex-col md:px-7 md:pt-7'
                    }
                    style={{
                      backgroundImage: 'radial-gradient(rgba(75,85,99,0.25) 0.75px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="inline-block w-fit rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
                        {t(project.category)}
                      </span>
                      <h3 className="mt-2 font-display text-3xl font-semibold text-[#333D6D] md:text-4xl">
                        {project.name}
                        {project.isPrototype && (
                          <span className="text-sm font-normal opacity-30 md:text-base"> (Prototype)</span>
                        )}
                      </h3>
                      <button
                        type="button"
                        data-cursor
                        aria-label={t(CASE_STUDY_LABEL)}
                        onClick={() => {
                          if (dragRef.current.moved) return;
                          pageNavigate(`/portfolio/${project.slug}`, { accent: project.tagColor, bg: '#0b0a16' });
                        }}
                        className="pointer-events-auto mt-5 flex h-12 items-center gap-2 rounded-full bg-[#6367FF] px-6 font-display text-base font-medium text-white transition-colors duration-300 hover:bg-[#4f52e0]"
                      >
                        {t(EXPLORE_WORK_LABEL)}
                        <ArrowRight className="h-4 w-4 text-white" />
                      </button>
                    </div>

                    <div className="mx-auto mt-6 aspect-[1101/1200] w-[85%] rounded-t-2xl md:aspect-[512/460] md:h-auto md:w-[75%] md:rounded-t-2xl">
                      {project.image ? (
                        <div className="flex h-full items-center justify-center pt-6 md:items-end md:pt-8">
                          <div className="h-full w-full overflow-hidden rounded-t-2xl border-x-4 border-t-4 border-white shadow-[0_35px_70px_-10px_rgba(55,65,81,0.9)] md:rounded-t-xl">
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
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
