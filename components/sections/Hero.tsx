'use client';

import PhotoCardStack from '@/components/ui/PhotoCardStack';

/** Static hero — no 3D, no scroll-driven animation. A flat purple panel;
 *  still marks a `data-scene-section` so the shared camera path's
 *  scroll-to-position mapping keeps working for every section after it,
 *  even though nothing 3D is visible here anymore. */
export default function Hero() {
  return (
    <section
      id="hero"
      data-scene-section
      className="relative flex h-[70vh] items-end justify-center pb-10 md:h-screen md:items-center md:pb-0"
      style={{ backgroundColor: '#6367FF' }}
    >
      <h1
        className="font-display w-full text-center text-[clamp(6.5rem,24vw,20rem)] font-bold leading-none !tracking-[-0.07em] md:text-[clamp(8rem,23vw,24rem)]"
        style={{ color: '#061E29' }}
      >
        Avenum
      </h1>
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center px-6 pt-20 md:items-center md:pt-0">
        <PhotoCardStack />
      </div>
    </section>
  );
}
