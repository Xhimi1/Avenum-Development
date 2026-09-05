'use client';

import { useMemo, useRef, useState } from 'react';
import ArrowRight from '@/components/ui/ArrowRight';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import { PROJECTS } from '@/lib/projects';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Bi } from '@/lib/i18n';

const HEADING: Bi = {
  en: 'Our portfolio.',
  sq: 'Projektet tona.',
};
const SUBHEADING: Bi = {
  en: "A few of our projects that we're proud of.",
  sq: 'Disa nga projektet tona më ambicioze.',
};
const CASE_STUDY_LABEL: Bi = { en: 'See the project', sq: 'Shiko projektin' };
const EXPLORE_WORK_LABEL: Bi = { en: 'Explore work', sq: 'Eksploro projektin' };
const VIEW_MORE_LABEL: Bi = { en: 'View more', sq: 'Shiko më shumë' };
const ALL_FILTER_LABEL: Bi = { en: 'All', sq: 'Të gjitha' };

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

  // Filter tabs (grid mode only): one per distinct project category, in the
  // order it first appears in PROJECTS, plus an "All" tab. Multiple category
  // tabs can be active at once — a project shows if its category is in the
  // active set (or if the set is empty, meaning "All").
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const toggleCategory = (categoryEn: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryEn)) next.delete(categoryEn);
      else next.add(categoryEn);
      return next;
    });
  };

  const baseProjects = PROJECTS.filter((project) => grid || !project.hideFromHome);
  const categories = useMemo(() => {
    const seen = new Map<string, Bi>();
    baseProjects.forEach((project) => {
      if (!seen.has(project.category.en)) seen.set(project.category.en, project.category);
    });
    return Array.from(seen.values());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- PROJECTS/grid are static per render
  }, [grid]);
  const visibleProjects =
    activeCategories.size === 0
      ? baseProjects
      : baseProjects.filter((project) => activeCategories.has(project.category.en));

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
                className="heading-lg"
              >
                {t(HEADING)}
              </SplitText>
              <FadeIn delay={0.15}>
                <p className="subtext mt-5 max-w-md">{t(SUBHEADING)}</p>
              </FadeIn>
            </div>

            <div className={`mb-2 flex-shrink-0 gap-2 ${mobileSlider ? 'flex' : 'hidden md:flex'}`}>
              <button
                type="button"
                data-cursor
                aria-label="Previous"
                onClick={() => scrollByCards(-1)}
                className="pointer-events-auto flex h-10 w-14 items-center justify-center rounded-full border-2 border-transparent bg-white/10 transition-colors duration-300 hover:bg-white/20"
              >
                <ArrowRight className="h-4 w-4 rotate-180 text-white" />
              </button>
              <button
                type="button"
                data-cursor
                aria-label="Next"
                onClick={() => scrollByCards(1)}
                className="pointer-events-auto flex h-10 w-14 items-center justify-center rounded-full border-2 border-transparent bg-white/10 transition-colors duration-300 hover:bg-white/20"
              >
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {grid && (
        <div className="mb-8 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:mb-10 [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            data-cursor
            onClick={() => setActiveCategories(new Set())}
            className={cn(
              'flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-normal transition-colors duration-300',
              activeCategories.size === 0 ? 'bg-[#6367FF] text-white' : 'bg-white/10 text-white'
            )}
          >
            {t(ALL_FILTER_LABEL)}
          </button>
          {categories.map((category) => {
            const active = activeCategories.has(category.en);
            return (
              <button
                key={category.en}
                type="button"
                data-cursor
                onClick={() => toggleCategory(category.en)}
                className={cn(
                  'flex flex-shrink-0 items-center overflow-hidden rounded-full px-3.5 py-1.5 text-xs font-normal transition-colors duration-300',
                  active ? 'bg-[#6367FF] text-white' : 'bg-white/10 text-white'
                )}
              >
                {t(category)}
                {/* X to clear this filter — slides/fades in only when active,
                    same accordion-reveal trick as the nav burger's X. */}
                <span
                  aria-hidden
                  className="overflow-hidden transition-[max-width,margin,opacity] duration-300 ease-out"
                  style={{
                    maxWidth: active ? '14px' : '0px',
                    marginLeft: active ? '6px' : '0px',
                    opacity: active ? 1 : 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    className="h-2.5 w-2.5 flex-shrink-0"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className={grid ? 'w-full' : mobileSlider ? 'w-full md:px-12' : 'w-full px-1.5 md:px-12'}>
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
          {visibleProjects.map((project) => (
            <li
              key={project.name}
              data-work-card
              className={
                grid
                  ? 'flex w-full'
                  : mobileSlider
                  ? 'flex w-full shrink-0 snap-center md:w-[40rem] md:snap-start'
                  : 'md:flex md:w-[34rem] md:flex-shrink-0 md:snap-start'
              }
            >
              {grid ? (
                <div
                  className="flex w-full flex-col overflow-hidden rounded-2xl bg-white px-5 pt-5 md:flex-row md:items-center md:justify-center md:gap-10 md:rounded-[28px] md:p-7"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(75,85,99,0.25) 0.75px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                >
                  {/* image */}
                  <div className="order-2 mx-auto mt-6 aspect-[1101/1200] w-[85%] rounded-t-2xl md:order-none md:mx-0 md:mt-0 md:aspect-[512/585] md:w-[22rem] md:flex-shrink-0">
                    {project.image ? (
                      <div className="flex h-full items-center justify-center pt-6 md:items-end md:pt-0">
                        <div className="h-full w-full overflow-hidden rounded-t-2xl border-x border-t border-white/10 shadow-[0_35px_70px_-10px_rgba(55,65,81,0.9)] md:rounded-t-xl md:shadow-[0_25px_50px_-10px_rgba(55,65,81,0.6)]">
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
                  <div className="order-1 flex flex-col items-center text-center md:order-none md:items-start md:text-left">
                    <span className="inline-block w-fit rounded-full bg-black/5 px-3 py-1 text-[0.7rem] font-medium text-black/60">
                      {t(project.category)}
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-medium text-black md:text-4xl">
                      {project.name}
                      {project.isPrototype && (
                        <span className="text-sm font-normal opacity-30 md:text-base"> (Prototype)</span>
                      )}
                    </h3>
                    {project.description && (
                      <p className="subtext mt-3 hidden max-w-md text-xs text-black/60 md:block md:text-sm">
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
                      className="pointer-events-auto mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-black px-4 py-2 font-body text-sm font-medium tracking-normal text-white transition-colors duration-300 hover:bg-black/80"
                    >
                      <span className="md:hidden">{t(EXPLORE_WORK_LABEL)}</span>
                      <span className="hidden md:inline">{t(VIEW_MORE_LABEL)}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className={mobileSlider ? 'flex h-full w-full flex-col' : 'md:flex md:h-full md:w-full md:flex-col'}>
                  <div
                    className={
                      mobileSlider
                        ? 'flex h-full flex-col overflow-hidden rounded-2xl bg-white px-5 pt-5 md:px-7 md:pt-7'
                        : 'overflow-hidden rounded-2xl bg-white px-5 pt-5 md:flex md:h-full md:flex-col md:px-4 md:pt-7'
                    }
                    style={{
                      backgroundImage: 'radial-gradient(rgba(75,85,99,0.25) 0.75px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="inline-block w-fit rounded-full bg-black/5 px-3 py-1 text-[0.7rem] font-medium text-black/60">
                        {t(project.category)}
                      </span>
                      <h3 className="mt-2 font-display text-3xl font-medium text-black md:text-2xl">
                        {project.name}
                        {project.isPrototype && (
                          <span className="text-sm font-normal opacity-30 md:text-sm"> (Prototype)</span>
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
                        className="pointer-events-auto mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2 font-body text-sm font-medium tracking-normal text-white transition-colors duration-300 hover:bg-black/80"
                      >
                        {t(EXPLORE_WORK_LABEL)}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mx-auto mt-6 aspect-[1101/1200] w-[85%] rounded-t-2xl md:aspect-auto md:h-80 md:w-[55%] md:overflow-hidden md:rounded-t-2xl md:border-x md:border-t md:border-white/10 md:shadow-[0_35px_70px_-10px_rgba(55,65,81,0.9)]">
                      {project.image ? (
                        <div className="flex h-full items-center justify-center pt-6 md:h-full md:w-full md:items-stretch md:justify-stretch md:p-0">
                          <div className="h-full w-full overflow-hidden rounded-t-2xl border-x border-t border-white/10 shadow-[0_35px_70px_-10px_rgba(55,65,81,0.9)] md:h-full md:w-full md:rounded-none md:border-0 md:shadow-none">
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
