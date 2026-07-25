'use client';

import { useRef, type ReactNode } from 'react';
import ArrowRight from '@/components/ui/ArrowRight';
import SplitText from '@/components/ui/SplitText';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const EYEBROW: Bi = { en: 'What we do', sq: 'Çfarë ofrojmë' };
const HEADING: Bi = { en: 'Everything your business needs online.', sq: 'Gjithçka që i duhet biznesit tënd online.' };
const LEARN_MORE: Bi = { en: 'Learn more', sq: 'Mëso më shumë' };
const HOT_LABEL: Bi = { en: 'Popular', sq: 'Popullor' };

/* ── frosted-glass illustrations swapped in for these service tiles,
 *  in place of the plain line icon below ── */
const IMAGE_ICONS: Record<string, string> = {
  websites: '/images/frosted-glass-website-icon.png',
  booking: '/images/frosted-glass-calendar-icon.png',
  whatsapp: '/images/frosted-glass-chat-icon.png',
  email: '/images/frosted-glass-email-icon.png',
  multilang: '/images/frosted-glass-heart-icon.png',
  maintenance: '/images/frosted-glass-settings-icon.png',
};

/* ── custom line icons: just the inner paths, drawn with currentColor ── */
const ICON_PATHS: Record<string, ReactNode> = {
  websites: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r="0.4" fill="currentColor" />
      <circle cx="9" cy="6.5" r="0.4" fill="currentColor" />
    </>
  ),
  chatbot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2.5" />
      <path d="M12 8V4.5" />
      <circle cx="12" cy="3.4" r="1.1" />
      <circle cx="9.2" cy="13.5" r="0.5" fill="currentColor" />
      <circle cx="14.8" cy="13.5" r="0.5" fill="currentColor" />
      <path d="M9.5 16.5h5" />
    </>
  ),
  booking: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7.5l8.5 5.5 8.5-5.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M21 11.4a8.4 8.4 0 0 1-12.3 7.4L3.5 20.2l1.5-5.1A8.4 8.4 0 1 1 21 11.4z" />
      <path
        d="M8.8 8.7c-.2.5-.2 1.4.3 2.4a7 7 0 0 0 3.6 3.2c1 .3 1.7.2 2.1-.1l.6-.7-1.6-1-.7.7c-.9-.3-1.7-1-2.2-1.9l.6-.8-1-1.6z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  multilang: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18" />
    </>
  ),
  maintenance: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.6-3.6a6 6 0 0 1-7.9 7.7l-6.7 6.7a2.1 2.1 0 0 1-3-3l6.7-6.7a6 6 0 0 1 7.7-7.9l-3.4 3.8z" />
  ),
};

function Icon({
  id,
  className,
  style,
}: {
  id: string;
  className: string;
  style?: React.CSSProperties;
}) {
  const image = IMAGE_ICONS[id];
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" aria-hidden style={style} className={`${className} object-contain`} />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={style}
      className={className}
    >
      {ICON_PATHS[id]}
    </svg>
  );
}

interface Service {
  id: string;
  title: Bi;
  desc: Bi;
  /** glyph tint, also used for the colored drop-shadow under the tile */
  iconColor: string;
  /** 3D tile gradient [lighter, deeper]; omitted for the glassy hot tile */
  grad?: [string, string];
  /** playful tilt in degrees so the tiles feel hand-placed, not rigid */
  rotate: number;
  /** desktop bento span classes */
  span: string;
  /** route this card links to */
  href: string;
  /** the AI-chatbot card is the featured/"hot" one and links to its page */
  hot?: boolean;
}

const SERVICES: Service[] = [
  {
    id: 'websites',
    title: { en: 'Business Websites', sq: 'Faqe Biznesi' },
    desc: {
      en: 'Fast, unique sites that make your brand look premium.',
      sq: 'Faqe të shpejta e unike që i japin markës tënde pamje premium.',
    },
    iconColor: '#3B6BFF',
    grad: ['#6E9BFF', '#2F5FE0'],
    rotate: -7,
    span: 'md:col-span-2',
    href: '/business-websites',
  },
  {
    id: 'chatbot',
    title: { en: 'AI Chatbot', sq: 'AI Chatbot' },
    desc: {
      en: 'A smart assistant that answers guests and books tables 24/7 — in any language.',
      sq: 'Një asistent i zgjuar që u përgjigjet mysafirëve dhe rezervon tavolina 24/7 — në çdo gjuhë.',
    },
    iconColor: '#6367FF',
    rotate: -4,
    span: 'md:col-span-2 md:row-span-2',
    href: '/ai-chatbots',
    hot: true,
  },
  {
    id: 'booking',
    title: { en: 'Booking & Reservations', sq: 'Rezervime Online' },
    desc: {
      en: 'Let customers book and reserve straight from your site.',
      sq: 'Klientët rezervojnë drejtpërdrejt nga faqja jote.',
    },
    iconColor: '#2FA76A',
    grad: ['#57CE8B', '#219155'],
    rotate: 6,
    span: 'md:col-span-2',
    href: '/booking-systems',
  },
  {
    id: 'email',
    title: { en: 'Email Automation', sq: 'Automatizim Email-i' },
    desc: {
      en: 'Automatic follow-ups and confirmations, hands-free.',
      sq: 'Përgjigje e konfirmime automatike, pa dorë.',
    },
    iconColor: '#D99500',
    grad: ['#F5BE55', '#D08A00'],
    rotate: -5,
    span: 'md:col-span-2',
    href: '/email-automation',
  },
  {
    id: 'whatsapp',
    title: { en: 'WhatsApp Automation', sq: 'Automatizim WhatsApp' },
    desc: {
      en: 'Reach customers where they already chat — automatically.',
      sq: 'Arri klientët aty ku bisedojnë tashmë — automatikisht.',
    },
    iconColor: '#16A97C',
    grad: ['#41CE9A', '#128F69'],
    rotate: 7,
    span: 'md:col-span-2',
    href: '/whatsapp-automation',
  },
  {
    id: 'multilang',
    title: { en: 'Multi-Language Websites', sq: 'Faqe Shumëgjuhëshe' },
    desc: {
      en: 'One site, every visitor — in the language they speak.',
      sq: 'Një faqe, çdo vizitor — në gjuhën që flet.',
    },
    iconColor: '#D25C8C',
    grad: ['#EC85AF', '#C24C7E'],
    rotate: -4,
    span: 'md:col-span-3',
    href: '/multi-language-websites',
  },
  {
    id: 'maintenance',
    title: { en: 'Maintenance & Support', sq: 'Mirëmbajtje & Suport' },
    desc: {
      en: 'We keep everything fast, secure and up to date.',
      sq: 'E mbajmë gjithçka të shpejtë, të sigurt e të përditësuar.',
    },
    iconColor: '#E07B34',
    grad: ['#F29E63', '#D06A22'],
    rotate: 5,
    span: 'md:col-span-3',
    href: '/maintenance-support',
  },
];

export default function WorkServices() {
  const t = useT();
  const pageNavigate = useStore((s) => s.pageNavigate);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-service-card]');
    const amount = (card?.offsetWidth ?? 300) + 16;
    // Clamp to the real scroll range — otherwise requesting past the last
    // (or before the first) card fights the scroll-snap and glitches.
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.min(Math.max(el.scrollLeft + dir * amount, 0), maxScroll);
    el.scrollTo({ left: target, behavior: 'smooth' });
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

  const goToService = (href: string, accent: string) => {
    if (dragRef.current.moved) return;
    pageNavigate(href, { accent, bg: '#0b0a16' });
  };

  return (
    <div className="mt-28 md:mt-36">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-12">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <span className="inline-block rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
            {t(EYEBROW)}
          </span>
          <SplitText
            as="h2"
            className="mt-3 font-display text-[clamp(2.1rem,5.5vw,4.6rem)] font-semibold leading-[0.95] [text-wrap:balance] md:[text-wrap:normal]"
          >
            {t(HEADING)}
          </SplitText>
        </div>
      </div>

      {/* mobile: horizontal snap slider · desktop: bento grid */}
      <div className="mx-auto mt-10 w-full max-w-6xl md:mt-14 md:px-12">
        {/* mobile slider arrows — above the cards, right-aligned; same style as the Work slider */}
        <div className="mb-4 flex justify-end px-[5%] md:hidden">
          <div className="flex gap-2">
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

        <ul
          ref={scrollerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={handleClickCapture}
          className="pointer-events-auto flex gap-4 overflow-x-auto px-[5%] snap-x snap-mandatory cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:cursor-default md:auto-rows-[15rem] md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0"
        >
          {SERVICES.map((s, i) => {
            const isHot = s.hot;
            const content = (
              <>
                {isHot ? (
                  <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3 w-3">
                      <path d="M12 2c1 3-1 4-1 6a3 3 0 0 0 6 0c0-1 0-2-1-3 2 1 4 4 4 8a8 8 0 0 1-16 0c0-3 2-5 3-7 1 2 3 2 3 4 1-1 2-4 -1-8z" />
                    </svg>
                    {t(HOT_LABEL)}
                  </span>
                ) : null}

                <h3
                  className={
                    isHot
                      ? 'relative z-10 order-1 font-display text-5xl font-semibold text-white md:order-2 md:mt-5 md:text-3xl'
                      : 'relative z-10 order-1 font-display text-4xl font-bold text-black md:order-2 md:mt-5 md:text-xl md:font-semibold'
                  }
                >
                  {t(s.title)}
                </h3>

                <Icon
                  id={s.id}
                  style={{ ['--rot' as string]: `${s.rotate}deg`, color: isHot ? '#fff' : s.iconColor }}
                  className={`svc-icon-tile relative z-10 order-2 mt-6 h-36 w-36 self-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] md:order-1 md:mt-0 md:h-14 md:w-14 ${
                    isHot ? '' : 'md:self-start'
                  }`}
                />

                <p
                  className={
                    isHot
                      ? 'relative z-10 order-3 mt-16 text-sm leading-relaxed text-white md:mt-2 md:text-xs'
                      : 'relative z-10 order-3 mt-10 text-sm leading-relaxed text-black md:mt-2 md:text-xs md:text-black'
                  }
                >
                  {t(s.desc)}
                </p>

                <span
                  className={`relative z-10 order-4 mt-5 inline-flex items-center gap-1 border-b pb-0 text-sm font-bold leading-none md:mt-4 ${
                    isHot ? 'border-white text-white' : 'border-black text-black'
                  }`}
                >
                  {t(LEARN_MORE)}
                  <ArrowRight
                    strokeWidth={2.75}
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </>
            );

            // hot card aligns left on mobile (icon stays centered via its own
            // self-center) but reverts to centered on desktop; the rest align
            // left at every breakpoint
            const align = isHot
              ? 'items-start justify-start text-left md:items-center md:justify-center md:text-center'
              : 'items-start justify-start text-left';
            const baseCard = `group relative flex min-h-[26rem] flex-col rounded-lg p-8 md:h-full md:min-h-0 md:p-6 ${align}`;
            const cardStyle = isHot
              ? {
                  // three-stop: sky-blue → purple → coral, with a soft radial
                  // highlight lifting the top-left corner
                  backgroundImage:
                    'radial-gradient(120% 120% at 15% 12%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 42%), linear-gradient(140deg, #2BB8F0 0%, #7A3CE0 50%, #FF6FA5 100%)',
                }
              : // non-hot cards get the site's soft lavender wash, no border
                { backgroundColor: '#EEF0FF' };

            return (
              <li
                key={s.id}
                data-service-card
                className={`shrink-0 basis-[90%] snap-center md:basis-auto ${s.span}`}
              >
                <div className="h-full">
                  {isHot ? (
                    <button
                      type="button"
                      data-cursor
                      onClick={() => goToService(s.href, s.iconColor)}
                      aria-label={t(s.title)}
                      style={cardStyle}
                      className={`${baseCard} pointer-events-auto h-full w-full overflow-hidden`}
                    >
                      <span aria-hidden className="pointer-events-none absolute inset-0 z-0">
                        <span
                          className="chatbot-blob"
                          style={{ left: '-18%', top: '-22%', background: 'radial-gradient(circle at center, #5FD2FF 0%, rgba(95,210,255,0) 62%)' }}
                        />
                        <span
                          className="chatbot-blob"
                          style={{ right: '-18%', top: '-14%', background: 'radial-gradient(circle at center, #FF64A6 0%, rgba(255,100,166,0) 62%)' }}
                        />
                        <span
                          className="chatbot-blob"
                          style={{ left: '6%', bottom: '-26%', background: 'radial-gradient(circle at center, #A57BFF 0%, rgba(165,123,255,0) 62%)' }}
                        />
                        <span
                          className="chatbot-blob"
                          style={{ right: '-14%', bottom: '-20%', background: 'radial-gradient(circle at center, #FFC46B 0%, rgba(255,196,107,0) 60%)' }}
                        />
                      </span>
                      {content}
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cursor
                      onClick={() => goToService(s.href, s.iconColor)}
                      aria-label={t(s.title)}
                      style={cardStyle}
                      className={`${baseCard} pointer-events-auto h-full w-full transition-colors duration-300 hover:bg-[#F3EEFF]`}
                    >
                      {content}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
