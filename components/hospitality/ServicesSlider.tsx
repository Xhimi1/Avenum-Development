'use client';

import { useRef } from 'react';
import { useT, type Bi } from '@/lib/i18n';

type Service = { id: string; title: Bi; image: string };

const SERVICES: Service[] = [
  {
    id: 'website',
    title: { en: 'Website design', sq: 'Faqe interneti' },
    image: 'https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'booking',
    title: { en: 'Online booking', sq: 'Rezervime online' },
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'menu',
    title: { en: 'Digital menus', sq: 'Menu digjitale' },
    image: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'photo',
    title: { en: 'Photography', sq: 'Fotografi' },
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'brand',
    title: { en: 'Branding', sq: 'Identitet vizual' },
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'social',
    title: { en: 'Social media', sq: 'Rrjete sociale' },
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80&auto=format&fit=crop',
  },
];

/** Draggable, snap-scrolling strip of service cards — a hospitality photo on
 *  top (sourced from Unsplash) with a title underneath each. Pointer
 *  drag-to-scroll mirrors the WorkGallery pattern used elsewhere on the site. */
export default function ServicesSlider() {
  const t = useT();
  const scrollerRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

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

  return (
    <section id="services" className="pb-32 pt-8 md:pb-48 md:pt-16">
      <ul
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="flex cursor-grab gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {SERVICES.map((s) => (
          <li key={s.id} className="flex w-[70vw] shrink-0 snap-center flex-col sm:w-[22rem] md:w-[24rem]">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-black/[0.04]">
              <img
                src={s.image}
                alt=""
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </div>
            <p className="mt-4 text-center font-[family-name:var(--font-general-sans)] text-[clamp(1.8rem,4.5vw,3.2rem)] font-normal leading-[1.05] tracking-[-0.035em] text-white">
              {t(s.title)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
