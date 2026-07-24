'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import ArrowRight from '@/components/ui/ArrowRight';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import { useStore } from '@/lib/store';
import { prefersReducedMotion } from '@/lib/utils';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const EYEBROW: Bi = { en: 'What we do', sq: 'Çfarë ofrojmë' };
const HEADING: Bi = { en: 'Everything your business needs online.', sq: 'Gjithçka që i duhet biznesit tënd online.' };
const LEARN_MORE: Bi = { en: 'Learn more', sq: 'Mëso më shumë' };
const HOT_LABEL: Bi = { en: 'Popular', sq: 'Popullor' };

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

function Icon({ id, className }: { id: string; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
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

  const goToService = (href: string, accent: string) => {
    if (dragRef.current.moved) return;
    pageNavigate(href, { accent, bg: '#0b0a16' });
  };

  // Pop each card's icon as it swipes/scrolls into view (mobile slider and
  // desktop grid both — IntersectionObserver against the viewport covers
  // horizontal scroll too). Class is pulled off on animation end so a card
  // that leaves and returns pops again.
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || prefersReducedMotion()) return;
    const icons = Array.from(root.querySelectorAll<HTMLElement>('[data-svc-icon]'));
    const clear = (e: AnimationEvent) => (e.currentTarget as HTMLElement).classList.remove('pop');
    icons.forEach((el) => el.addEventListener('animationend', clear));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add('pop');
          else el.classList.remove('pop');
        });
      },
      { threshold: 0.6 }
    );
    icons.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      icons.forEach((el) => el.removeEventListener('animationend', clear));
    };
  }, []);

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

                {isHot ? (
                  <span
                    data-svc-icon
                    className="svc-icon-tile relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.4rem] border border-white/40 bg-white/20 text-white backdrop-blur-sm md:h-[4rem] md:w-[4rem]"
                    style={{
                      ['--rot' as string]: `${s.rotate}deg`,
                      boxShadow:
                        'inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.2), 0 10px 22px -8px rgba(0,0,0,0.4)',
                    }}
                  >
                    <Icon
                      id={s.id}
                      className="h-9 w-9 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] md:h-8 md:w-8"
                    />
                  </span>
                ) : (
                  <span
                    data-svc-icon
                    className="svc-icon-tile relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.4rem] border border-white/30 text-white md:h-[3.75rem] md:w-[3.75rem] md:rounded-[1.15rem]"
                    style={{
                      ['--rot' as string]: `${s.rotate}deg`,
                      background: `linear-gradient(150deg, ${s.grad![0]}, ${s.grad![1]})`,
                      boxShadow: `inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.18), 0 12px 22px -8px ${s.iconColor}99`,
                    }}
                  >
                    <Icon
                      id={s.id}
                      className="h-9 w-9 drop-shadow-[0_1px_1px_rgba(0,0,0,0.28)] md:h-7 md:w-7"
                    />
                  </span>
                )}

                <div className="relative z-10 mt-6 md:mt-5">
                  <h3
                    className={
                      isHot
                        ? 'font-display text-3xl font-semibold text-white md:text-3xl'
                        : 'font-display text-2xl font-semibold text-black md:text-xl'
                    }
                  >
                    {t(s.title)}
                  </h3>
                  <p
                    className={
                      isHot
                        ? 'mt-2 text-sm leading-relaxed text-white/90 md:text-white/85'
                        : 'mt-2 text-sm leading-relaxed text-black md:text-black/55'
                    }
                  >
                    {t(s.desc)}
                  </p>
                </div>

                <span
                  className="relative z-10 mt-5 inline-flex items-center gap-2 pt-1 text-sm font-medium md:mt-4"
                  style={isHot ? { color: 'white' } : { color: s.iconColor }}
                >
                  {t(LEARN_MORE)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </>
            );

            // hot card stays centered everywhere; the rest center on mobile
            // and align left in the desktop bento
            const align = isHot
              ? 'items-center justify-center text-center'
              : 'items-center justify-center text-center md:items-start md:justify-start md:text-left';
            const baseCard = `group relative flex min-h-[26rem] flex-col rounded-2xl p-8 md:h-full md:min-h-0 md:p-6 ${align}`;
            const skin = isHot ? 'shadow-xl shadow-[#7a3ce0]/25' : 'border';
            const cardStyle = isHot
              ? {
                  // three-stop: sky-blue → purple → coral, with a soft radial
                  // highlight lifting the top-left corner
                  backgroundImage:
                    'radial-gradient(120% 120% at 15% 12%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 42%), linear-gradient(140deg, #2BB8F0 0%, #7A3CE0 50%, #FF6FA5 100%)',
                }
              : // non-hot cards get a soft wash of their own icon color
                { backgroundColor: `${s.iconColor}16`, borderColor: `${s.iconColor}33` };

            return (
              <li
                key={s.id}
                data-service-card
                className={`shrink-0 basis-[90%] snap-center md:basis-auto ${s.span}`}
              >
                <FadeIn delay={0.05 * i} className="h-full">
                  {isHot ? (
                    <button
                      type="button"
                      data-cursor
                      onClick={() => goToService(s.href, s.iconColor)}
                      aria-label={t(s.title)}
                      style={cardStyle}
                      className={`${baseCard} ${skin} pointer-events-auto h-full w-full overflow-hidden transition-shadow duration-300 hover:shadow-2xl`}
                    >
                      <span aria-hidden className="pointer-events-none absolute inset-0 z-0">
                        <span
                          className="chatbot-blob chatbot-blob-1"
                          style={{ left: '-18%', top: '-22%', background: 'radial-gradient(circle at center, #5FD2FF 0%, rgba(95,210,255,0) 62%)' }}
                        />
                        <span
                          className="chatbot-blob chatbot-blob-2"
                          style={{ right: '-18%', top: '-14%', background: 'radial-gradient(circle at center, #FF64A6 0%, rgba(255,100,166,0) 62%)' }}
                        />
                        <span
                          className="chatbot-blob chatbot-blob-3"
                          style={{ left: '6%', bottom: '-26%', background: 'radial-gradient(circle at center, #A57BFF 0%, rgba(165,123,255,0) 62%)' }}
                        />
                        <span
                          className="chatbot-blob chatbot-blob-1"
                          style={{ right: '-14%', bottom: '-20%', animationDelay: '-9s', animationDuration: '27s', background: 'radial-gradient(circle at center, #FFC46B 0%, rgba(255,196,107,0) 60%)' }}
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
                      className={`${baseCard} ${skin} pointer-events-auto h-full w-full transition-shadow duration-300 hover:shadow-lg`}
                    >
                      {content}
                    </button>
                  )}
                </FadeIn>
              </li>
            );
          })}
        </ul>

        {/* mobile slider arrows — below the cards, right-aligned; same style as the Work slider */}
        <div className="mt-6 flex justify-end px-[5%] md:hidden">
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
      </div>
    </div>
  );
}
