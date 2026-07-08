import type Lenis from 'lenis';
import { clamp, smoothstep01 } from './utils';

export interface Anchor {
  /** scroll y where the section's top hits the viewport top */
  top: number;
  /** scroll y where the section's sticky content releases */
  pinEnd: number;
}

/**
 * Transient scroll data, mutated every frame. Kept outside React state so the
 * canvas and GSAP tickers can read it without triggering re-renders.
 */
export const scrollState = {
  y: 0,
  progress: 0,
  /** lenis velocity, ~px per frame (signed) */
  velocity: 0,
  /** damped camera path parameter: 0..SECTIONS.length-1 (written by CameraRig) */
  t: 0,
  anchors: [] as Anchor[],
  maxScroll: 1,
  lenis: null as Lenis | null,
};

/**
 * Maps a scroll position to the camera path parameter.
 * The camera rests at waypoint i while section i is pinned, and travels
 * (smoothstepped) to waypoint i+1 across the gap between sections.
 */
export function cameraT(y: number): number {
  const a = scrollState.anchors;
  if (a.length < 2) return 0;
  if (y <= a[0].pinEnd) return 0;
  for (let i = 0; i < a.length - 1; i++) {
    const cur = a[i];
    const next = a[i + 1];
    if (y < next.top) {
      const span = Math.max(next.top - cur.pinEnd, 1);
      return i + smoothstep01((y - cur.pinEnd) / span);
    }
    if (y <= next.pinEnd) return i + 1;
  }
  return a.length - 1;
}

/** 0..1 progress through section i's pinned range (e.g. rotates the work gallery). */
export function sectionLocal(i: number, y = scrollState.y): number {
  const a = scrollState.anchors[i];
  if (!a) return 0;
  return clamp((y - a.top) / Math.max(a.pinEnd - a.top, 1), 0, 1);
}

/** How "present" section i's 3D objects are (1 at the waypoint, 0 far away). */
export function presence(i: number, t = scrollState.t): number {
  return 1 - smoothstep01((Math.abs(t - i) - 0.35) / 0.75);
}
