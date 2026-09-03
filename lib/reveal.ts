/**
 * Geometry shared by the home intro reveal (<IntroReveal>) and the route
 * transition (<PageWash>), so the two stay identical: a transparent window
 * whose enormous box-shadow paints the dark field around it, closed down to
 * a zero-width slit at the center of the screen and opened out to full-bleed.
 */
export const REVEAL_CLOSED = { width: 0, height: '50vh', borderRadius: 14 };
export const REVEAL_OPEN = { width: '100vw', height: '100vh', borderRadius: 0 };

/** The window element itself — the dark field is its box-shadow spread.
 *  Defined in globals.css (not as Tailwind utilities) so it doesn't depend
 *  on the class scanner reaching this file. */
export const REVEAL_WINDOW_CLASS = 'reveal-window';
