'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'avenum-pricing-deadline';
const DURATION_MS = 2 * 24 * 60 * 60 * 1000;

/** Reads the persisted deadline, or starts a fresh one if missing/expired. */
function readDeadline(): number {
  const stored = Number(window.localStorage.getItem(STORAGE_KEY));
  if (stored && stored > Date.now()) return stored;
  const next = Date.now() + DURATION_MS;
  window.localStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/**
 * Classic countdown-offer timer. When it hits zero it doesn't disappear —
 * it just starts a fresh window immediately, so the urgency never goes away.
 */
export default function PricingCountdown({ className }: { className?: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let deadline = readDeadline();
    const tick = () => {
      const left = deadline - Date.now();
      if (left <= 0) {
        deadline = Date.now() + DURATION_MS;
        window.localStorage.setItem(STORAGE_KEY, String(deadline));
      }
      setRemaining(Math.max(deadline - Date.now(), 0));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) return null;

  const d = Math.floor(remaining / 86400000);
  const h = Math.floor((remaining % 86400000) / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  return (
    <span className={className}>
      {d > 0 ? `${d}d ` : ''}
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
