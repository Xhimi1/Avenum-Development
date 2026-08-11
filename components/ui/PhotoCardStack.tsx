'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useStore } from '@/lib/store';
import { prefersReducedMotion } from '@/lib/utils';

interface Card {
  color: string;
  label: string;
  size: string;
  rotateY: number;
  overlap: string;
  src?: string;
}

/** Solid-color inline SVG stand-ins — swap `src` for real photos later. */
function placeholder(color: string, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" font-family="sans-serif" font-size="28" fill="rgba(255,255,255,0.85)" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const CARDS: Card[] = [
  { color: '#7fa8c9', label: 'Photo 1', size: 'w-[56%] sm:w-64 md:w-96', rotateY: -25, overlap: '', src: '/images/atom-mockup.webp' },
  { color: '#4b7a3f', label: 'Photo 2', size: 'w-[42%] sm:w-48 md:w-72', rotateY: -52, overlap: '-ml-[16%] sm:-ml-20 md:-ml-28', src: '/images/kroni-mockup.webp' },
  { color: '#c98f7b', label: 'Photo 3', size: 'w-[35%] sm:w-40 md:w-60', rotateY: -65, overlap: '-ml-[16%] sm:-ml-20 md:-ml-28', src: '/images/riva-restaurant-card.webp' },
];

/** Row of photo cards, à la Bumble's hero — each card is tilted in 3D
 *  (rotateY) so its left edge recedes and looks smaller than its right
 *  edge. The front card keeps a shallow tilt so it stays fully visible;
 *  cards further back get progressively steeper tilts, so they read as
 *  smaller/receding rather than competing with the front card. Perspective
 *  is set on the row, shared by all cards. Swap CARDS' `color` placeholders
 *  for real photo `src`s when ready. */
export default function PhotoCardStack({ className }: { className?: string }) {
  const ready = useStore((s) => s.ready);
  const cardRefs = useRef<(HTMLImageElement | null)[]>([]);
  const played = useRef(false);

  useLayoutEffect(() => {
    const els = cardRefs.current.filter((el): el is HTMLImageElement => !!el);
    if (!els.length) return;

    // tilt is applied via gsap (not inline style) so it survives the
    // entrance tween below without being clobbered by transform writes
    gsap.set(els, { rotationY: (i) => CARDS[i].rotateY });

    if (!ready || played.current) return;
    played.current = true;

    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      els,
      { opacity: 0, y: -60 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }
    );
  }, [ready]);

  return (
    <div className={`flex items-center [perspective:450px] sm:[perspective:600px] md:[perspective:900px] ${className ?? ''}`}>
      {CARDS.map((card, i) => (
        <img
          key={card.label}
          ref={(el) => { cardRefs.current[i] = el; }}
          src={card.src ?? placeholder(card.color, card.label)}
          alt=""
          className={`aspect-[2/3] rounded-[8px] object-cover object-top opacity-0 sm:rounded-[16px] ${card.size} ${card.overlap}`}
          style={{ zIndex: CARDS.length - i }}
        />
      ))}
    </div>
  );
}
