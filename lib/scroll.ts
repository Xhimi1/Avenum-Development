import type Lenis from 'lenis';

export interface Anchor {
  /** scroll y where the section's top hits the viewport top */
  top: number;
  /** scroll y where the section's sticky content releases */
  pinEnd: number;
}

/**
 * Transient scroll data, mutated every frame. Kept outside React state so
 * GSAP tickers can read it without triggering re-renders.
 */
export const scrollState = {
  y: 0,
  progress: 0,
  /** lenis velocity, ~px per frame (signed) */
  velocity: 0,
  anchors: [] as Anchor[],
  maxScroll: 1,
  lenis: null as Lenis | null,
};
