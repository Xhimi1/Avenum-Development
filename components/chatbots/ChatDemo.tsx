'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { useT, type Bi } from '@/lib/i18n';
import BotAvatar from './BotAvatar';

interface BotCard {
  title: Bi;
  line: Bi;
  status: Bi;
}

interface Chip {
  id: string;
  label: Bi;
  reply: Bi;
  card?: BotCard;
}

interface Scenario {
  id: 'restaurant' | 'gym';
  business: string;
  tag: Bi;
  intro: Bi;
  chips: Chip[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'restaurant',
    business: 'Bella Tavola',
    tag: { en: 'Restaurant', sq: 'Restorant' },
    intro: {
      en: "Ciao! I'm Nova, Bella Tavola's assistant 🍝 I can book you a table, walk you through the menu or answer anything.",
      sq: "Ciao! Jam Nova, asistentja e Bella Tavola 🍝 Mund të rezervoj një tavolinë për ty, të të tregoj menunë ose t'i përgjigjem çdo pyetjeje.",
    },
    chips: [
      {
        id: 'table-tonight',
        label: { en: 'Book a table for 2 tonight', sq: 'Rezervo një tavolinë për 2 sonte' },
        reply: {
          en: 'Con piacere! Tonight we have 19:30 or 21:00 free for two — I went ahead and held 21:00 for you.',
          sq: 'Con piacere! Sonte kemi të lira orën 19:30 ose 21:00 për dy veta — ta kam mbajtur orën 21:00.',
        },
        card: {
          title: { en: 'Table reserved', sq: 'Tavolina u rezervua' },
          line: { en: '2 guests · Tonight · 21:00', sq: '2 mysafirë · Sonte · 21:00' },
          status: { en: 'Confirmed', sq: 'Konfirmuar' },
        },
      },
      {
        id: 'vegan-options',
        label: { en: 'Do you have vegan options?', sq: 'A keni opsione vegane?' },
        reply: {
          en: "Absolutely — the chef's vegan tasting menu has five courses, and most of the pasta list can be made vegan. Want me to send it over?",
          sq: 'Sigurisht — menuja vegane e shefit ka pesë pjata, dhe shumica e listës së pastave mund të bëhet vegane. Të dua ta dërgoj?',
        },
      },
      {
        id: 'closing-time',
        label: { en: 'What time do you close?', sq: "Në ç'orë mbyllni?" },
        reply: {
          en: "We're open until 23:00 tonight — the kitchen takes last orders at 22:15. On Sundays we close at 22:00.",
          sq: 'Sonte jemi hapur deri në 23:00 — kuzhina merr porositë e fundit në 22:15. Të dielave mbyllim në 22:00.',
        },
      },
    ],
  },
  {
    id: 'gym',
    business: 'IronWorks',
    tag: { en: 'Gym', sq: 'Palestër' },
    intro: {
      en: "Hey! I'm Nova, IronWorks' assistant 💪 Memberships, classes, opening hours — ask away.",
      sq: 'Hej! Jam Nova, asistentja e IronWorks 💪 Anëtarësime, klasa, orare hapjeje — pyet çfarë të duash.',
    },
    chips: [
      {
        id: 'trial-session',
        label: { en: 'Book a free trial session', sq: 'Rezervo një seancë provë falas' },
        reply: {
          en: 'Done in ten seconds — tomorrow I have 10:00 or 18:30 free. I booked you 18:30 with coach Ana.',
          sq: 'U bë për dhjetë sekonda — nesër kam të lira orën 10:00 ose 18:30. Të rezervova orën 18:30 me trajneren Ana.',
        },
        card: {
          title: { en: 'Trial session booked', sq: 'Seanca provë u rezervua' },
          line: { en: 'Tomorrow · 18:30 · Coach Ana', sq: 'Nesër · 18:30 · Trajnerja Ana' },
          status: { en: 'Confirmed', sq: 'Konfirmuar' },
        },
      },
      {
        id: 'membership-price',
        label: { en: 'How much is a membership?', sq: 'Sa kushton anëtarësimi?' },
        reply: {
          en: 'Monthly is €39, or €29/month on the annual plan. Students get 20% off — want me to sign you up?',
          sq: 'Mujor është €39, ose €29/muaj me planin vjetor. Studentët përfitojnë 20% zbritje — të dua të të regjistroj?',
        },
      },
      {
        id: 'gym-busy',
        label: { en: 'Is the gym busy right now?', sq: 'A është plot palestra tani?' },
        reply: {
          en: "Right now it's quiet — 12 people checked in. Today's peak was 18:00–20:00, mornings are your best bet.",
          sq: 'Tani për tani është qetë — 12 persona kanë hyrë. Piku i sotëm ishte 18:00–20:00, mëngjeset janë zgjedhja më e mirë.',
        },
      },
    ],
  },
];

interface ResolvedCard {
  title: string;
  line: string;
  status: string;
}

interface Msg {
  id: number;
  from: 'user' | 'bot';
  text: string;
  card?: ResolvedCard;
}

const ONLINE_STATUS = { en: 'online · replies in seconds', sq: 'online · përgjigjet për sekonda' };
const DEMO_DONE = {
  en: "That's the demo — yours would keep going.",
  sq: 'Kjo është demo — e jotja do të vazhdonte.',
};
const FOOTER_NOTE = {
  en: 'Live demo with scripted answers — the real product connects to your bookings.',
  sq: 'Demo live me përgjigje të skriptuara — produkti real lidhet me rezervimet e tua.',
};

/**
 * Scripted, tappable chat mock: pick a business, tap a message, watch the
 * bot "type" and answer — including booking-confirmation cards. Timers are
 * tracked so scenario switches and unmounts never leave replies dangling.
 */
export default function ChatDemo() {
  const locale = useStore((s) => s.locale);
  const t = useT();
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, from: 'bot', text: t(SCENARIOS[0].intro) },
  ]);
  const [usedChips, setUsedChips] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);

  const idRef = useRef(1);
  const timers = useRef<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const autoSendRef = useRef<() => void>(() => {});

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  // If the user switches language before the demo has been touched, refresh
  // the still-untouched intro bubble to match — once real messages exist,
  // history stays in whatever language it was actually sent in.
  useEffect(() => {
    if (messages.length === 1 && usedChips.length === 0) {
      setMessages([{ id: 0, from: 'bot', text: t(scenario.intro) }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const send = (chip: Chip) => {
    if (typing || usedChips.includes(chip.id)) return;
    playedRef.current = true;
    setUsedChips((u) => [...u, chip.id]);
    setMessages((m) => [...m, { id: idRef.current++, from: 'user', text: t(chip.label) }]);
    setTyping(true);
    const timeout = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: idRef.current++,
          from: 'bot',
          text: t(chip.reply),
          card: chip.card
            ? { title: t(chip.card.title), line: t(chip.card.line), status: t(chip.card.status) }
            : undefined,
        },
      ]);
    }, 1200);
    timers.current.push(timeout);
  };
  autoSendRef.current = () => send(scenario.chips[0]);

  const switchScenario = (s: Scenario) => {
    if (s.id === scenario.id) return;
    clearTimers();
    setScenario(s);
    setTyping(false);
    setUsedChips([]);
    setMessages([{ id: idRef.current++, from: 'bot', text: t(s.intro) }]);
  };

  // Auto-play the first exchange once the demo scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || playedRef.current) return;
        io.disconnect();
        const timeout = window.setTimeout(() => {
          if (!playedRef.current) autoSendRef.current();
        }, 700);
        timers.current.push(timeout);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  // Pop each new bubble in.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const nodes = listRef.current?.querySelectorAll('[data-msg]');
    const last = nodes?.[nodes.length - 1];
    if (last) {
      gsap.fromTo(
        last,
        { y: 16, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [messages.length]);

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-xl md:max-w-[70vw]">
      {/* business toggle */}
      <div className="mb-5 flex justify-center gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            data-cursor
            onClick={() => switchScenario(s)}
            className={cn(
              'rounded-full border px-4 py-2 text-xs tracking-normal transition-colors duration-300',
              scenario.id === s.id
                ? 'border-white bg-white text-black'
                : 'border-white/20 text-white/70 hover:border-white/50 hover:text-white'
            )}
          >
            {s.business} · {t(s.tag)}
          </button>
        ))}
      </div>

      {/* the chat screen sits inside a framed backdrop image */}
      <div
        className="rounded-2xl bg-cover bg-center p-3 shadow-2xl md:p-4"
        style={{ backgroundImage: "url('/images/chatbotBg.webp')" }}
      >
        <div className="mx-auto max-w-xs rounded-2xl border border-black/10 bg-white p-4 text-black shadow-2xl md:max-w-sm">
          <div className="flex items-center gap-3 border-b border-black/10 pb-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full">
              <BotAvatar className="h-9 w-9" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </span>
            <div>
              <p className="text-sm font-medium text-black">Nova — {scenario.business}</p>
              <p className="text-[10px] text-black/50">{t(ONLINE_STATUS)}</p>
            </div>
          </div>

          <div
            ref={listRef}
            className="flex h-[360px] flex-col gap-3 overflow-y-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] md:h-[400px] [&::-webkit-scrollbar]:hidden"
          >
            {messages.map((m) =>
              m.from === 'user' ? (
                <div
                  key={m.id}
                  data-msg
                  className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-black px-4 py-2.5 text-sm text-white"
                >
                  {m.text}
                </div>
              ) : (
                <div key={m.id} data-msg className="flex max-w-[85%] items-end gap-2 self-start">
                  <BotAvatar className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <div className="rounded-2xl rounded-bl-md bg-black/5 px-4 py-2.5 text-sm leading-relaxed text-black">
                      {m.text}
                    </div>
                    {m.card && (
                      <div
                        className="mt-2 rounded-xl border px-4 py-3"
                        style={{ borderColor: '#ff3d6e' }}
                      >
                        <p className="text-xs font-semibold text-[#ff3d6e]">{m.card.title}</p>
                        <p className="mt-1 text-sm text-black">{m.card.line}</p>
                        <p className="mt-1 text-xs text-emerald-600">✓ {m.card.status}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-end gap-2 self-start">
                <BotAvatar className="h-6 w-6 flex-shrink-0" />
                <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-black/5 px-4 py-3.5">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/40"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* tappable "user input" chips */}
          <div className="flex flex-wrap gap-2 border-t border-black/10 pt-3">
            {scenario.chips
              .filter((c) => !usedChips.includes(c.id))
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  data-cursor
                  onClick={() => send(c)}
                  disabled={typing}
                  className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/70 transition-colors duration-300 hover:border-[#ff3d6e] hover:text-[#ff3d6e] disabled:opacity-40"
                >
                  {t(c.label)}
                </button>
              ))}
            {scenario.chips.every((c) => usedChips.includes(c.id)) && !typing && (
              <p className="px-1 py-1.5 text-xs text-black/40">
                {t(DEMO_DONE)}
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-white/40">
        {t(FOOTER_NOTE)}
      </p>
    </div>
  );
}
