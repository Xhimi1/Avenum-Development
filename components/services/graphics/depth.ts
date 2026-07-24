/**
 * Shared color + depth helpers for the service-page 2D graphics.
 * Tuned for light coming from the top: surfaces get a bright top edge and a
 * soft, stacked shadow beneath so the flat shapes read as layered / 3D.
 */

/** blend accent toward white (soft pastel fills) */
export const soft = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, white)`;
/** blend accent toward black (deeper edges) */
export const deep = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, black)`;
/** accent at partial opacity */
export const tint = (pct: number) => `color-mix(in srgb, var(--svc-accent) ${pct}%, transparent)`;

/** Multi-layer elevation shadows — stacked falloff reads as real depth. */
export const ELEV_SM =
  '0 1px 2px rgba(0,0,0,0.05), 0 4px 10px -4px rgba(0,0,0,0.12)';
export const ELEV_MD =
  '0 2px 4px rgba(0,0,0,0.05), 0 8px 18px -6px rgba(0,0,0,0.14), 0 22px 44px -20px rgba(0,0,0,0.22)';
export const ELEV_LG =
  '0 3px 6px rgba(0,0,0,0.06), 0 16px 32px -12px rgba(0,0,0,0.18), 0 44px 90px -30px rgba(0,0,0,0.3)';

/** Glossy white surface: crisp top highlight + faint inner bottom shadow. */
export const GLOSS =
  'inset 0 1.5px 0 rgba(255,255,255,0.85), inset 0 -5px 12px rgba(0,0,0,0.05)';

/** Raised colored chip, lit from the top, with a matching soft glow. */
export const chip = (color: string) =>
  `inset 0 1.5px 0 rgba(255,255,255,0.5), inset 0 -3px 7px rgba(0,0,0,0.18), 0 10px 22px -8px ${color}99`;

/** A subtle 1px light border for glass/white panels. */
export const HAIRLINE = 'rgba(0,0,0,0.08)';
