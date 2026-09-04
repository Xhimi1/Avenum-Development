'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';
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
  business: string;
  intro: Bi;
  chips: Chip[];
}

const SCENARIO: Scenario = {
  business: 'Bella Tavola',
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
};

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

/** The bot reply currently being revealed character-by-character — kept
 *  separate from `messages` so the growing text doesn't need its own array
 *  entry mutated every tick. */
interface TypingMsg {
  full: string;
  visible: string;
}

const ONLINE_STATUS = { en: 'online · replies in seconds', sq: 'online · përgjigjet për sekonda' };
const FOOTER_NOTE = {
  en: 'Live demo with scripted answers — the real product connects to your bookings.',
  sq: 'Demo live me përgjigje të skriptuara — produkti real lidhet me rezervimet e tua.',
};

// Pacing for the self-playing conversation — tuned to read like a screen
// recording, not a slideshow.
const USER_BUBBLE_DELAY = 600; // pause before the "guest" question appears
const THINK_DELAY = 900; // typing-dots duration before Nova starts typing
const CHAR_DELAY = 22; // ms per character while a reply types itself out
const NEXT_STEP_DELAY = 1600; // pause after a reply finishes, before the next question
const LOOP_PAUSE = 3800; // pause after the last exchange before the demo resets and replays

/**
 * Self-playing chat mock: once it scrolls into view, a scripted guest
 * conversation plays out on its own — questions appear, Nova "thinks", then
 * types her reply out letter by letter, including booking-confirmation
 * cards — then loops back to the start, like a looping screen recording.
 * Timers are tracked so unmounts never leave a reply typing into the void.
 */
export default function ChatDemo() {
  const t = useT();
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, from: 'bot', text: t(SCENARIO.intro) }]);
  const [thinking, setThinking] = useState(false);
  const [typingMsg, setTypingMsg] = useState<TypingMsg | null>(null);

  const idRef = useRef(1);
  const timers = useRef<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const after = (ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  // Types one reply into `typingMsg` a character at a time, finalizes it
  // into `messages` (with its confirmation card, if any) once complete, then
  // hands off to `onDone`.
  const typeReply = (chip: Chip, onDone: () => void) => {
    const full = t(chip.reply);
    setTypingMsg({ full, visible: '' });
    let i = 0;
    const tick = () => {
      i += 1;
      setTypingMsg({ full, visible: full.slice(0, i) });
      if (i < full.length) {
        after(CHAR_DELAY, tick);
        return;
      }
      const card = chip.card
        ? { title: t(chip.card.title), line: t(chip.card.line), status: t(chip.card.status) }
        : undefined;
      setMessages((m) => [...m, { id: idRef.current++, from: 'bot', text: full, card }]);
      setTypingMsg(null);
      onDone();
    };
    after(CHAR_DELAY, tick);
  };

  const playStep = (index: number) => {
    if (index >= SCENARIO.chips.length) {
      after(LOOP_PAUSE, () => {
        idRef.current = 1;
        setMessages([{ id: 0, from: 'bot', text: t(SCENARIO.intro) }]);
        playStep(0);
      });
      return;
    }
    const chip = SCENARIO.chips[index];
    after(USER_BUBBLE_DELAY, () => {
      setMessages((m) => [...m, { id: idRef.current++, from: 'user', text: t(chip.label) }]);
      after(THINK_DELAY, () => {
        setThinking(true);
        after(THINK_DELAY, () => {
          setThinking(false);
          typeReply(chip, () => after(NEXT_STEP_DELAY, () => playStep(index + 1)));
        });
      });
    });
  };

  // Start the loop once the demo scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || playedRef.current) return;
        playedRef.current = true;
        io.disconnect();
        after(900, () => playStep(0));
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest content in view as replies type themselves out.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking, typingMsg]);

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
    <div ref={rootRef} className="mx-auto w-full max-w-xl md:max-w-3xl">
      {/* the chat screen sits inside a framed backdrop image */}
      <div
        className="rounded-2xl bg-cover bg-center p-3 shadow-2xl md:p-4"
        style={{ backgroundImage: "url('/images/chatbotBg.webp')" }}
      >
        <div className="w-full rounded-2xl border border-white/10 bg-white p-4 text-black shadow-2xl md:mx-auto md:max-w-xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full">
              <BotAvatar className="h-9 w-9" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </span>
            <div>
              <p className="text-sm font-medium text-black">Nova — {SCENARIO.business}</p>
              <p className="text-[10px] text-white/50">{t(ONLINE_STATUS)}</p>
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

            {thinking && (
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

            {typingMsg && (
              <div className="flex max-w-[85%] items-end gap-2 self-start">
                <BotAvatar className="h-6 w-6 flex-shrink-0" />
                <div className="rounded-2xl rounded-bl-md bg-black/5 px-4 py-2.5 text-sm leading-relaxed text-black">
                  {typingMsg.visible}
                  <span className="ml-0.5 inline-block h-[1em] w-[2px] -mb-[2px] animate-pulse bg-black/50" />
                </div>
              </div>
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
