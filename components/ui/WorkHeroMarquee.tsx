'use client';

import { cn } from '@/lib/utils';

interface WorkHeroMarqueeProps {
  images: string[];
  className?: string;
  /** Applies the diagonal tilt (desktop). Straight/untilted when omitted. */
  rotateDeg?: number;
  /** Seconds for one full loop of the (single) image list. */
  duration?: number;
  /** Fades the leading/trailing edges to transparent via a mask, so images
   *  scroll in/out softly instead of getting a hard crop at the box edge —
   *  top/bottom for 'vertical', left/right for 'horizontal'. */
  fade?: boolean;
  /** Scroll axis — vertical (default, for the tall diagonal ribbon) or
   *  horizontal (for a short, wide box). */
  direction?: 'vertical' | 'horizontal';
  /** Rounds each image's own corners. Off for a box that already has its
   *  own border/rounding, so images sit flush with no double edge. */
  imageRounded?: boolean;
}

/** Continuous, seamless vertical marquee of project hero shots — the list is
 *  rendered twice back to back and scrolled by exactly one copy's height
 *  (translateY 0 -> -50%), so the loop point is invisible. Rotating the
 *  outer wrapper (not the animated track) gives the diagonal ribbon look on
 *  desktop while the scroll itself stays a plain vertical slide in the
 *  ribbon's own rotated coordinate space. */
export default function WorkHeroMarquee({
  images,
  className,
  rotateDeg = 0,
  duration = 32,
  fade = false,
  direction = 'vertical',
  imageRounded = true,
}: WorkHeroMarqueeProps) {
  const track = [...images, ...images];
  const isVertical = direction === 'vertical';
  const maskImage = fade
    ? isVertical
      ? 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
      : 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
    : undefined;

  return (
    <div
      aria-hidden
      className={cn('relative', className)}
      style={{
        transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined,
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    >
      {/* No `gap` on the track itself — Tailwind's flex gap sits *between*
          items, so translating by -50% of the track's total width (which
          includes those gaps unevenly relative to a half-way point) lands
          slightly short of the true one-copy offset and shows as a small
          jump at the loop point. Giving each image its own trailing margin
          instead makes every item (image + margin) an identical repeating
          unit, so -50% always lands exactly on an item boundary. */}
      <div
        className={cn(
          'flex',
          isVertical
            ? 'flex-col animate-[work-marquee-y_var(--marquee-duration)_linear_infinite]'
            : 'h-full flex-row animate-[work-marquee-x_var(--marquee-duration)_linear_infinite]'
        )}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {track.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className={cn(
              'aspect-video flex-shrink-0 select-none border border-white/10 object-cover saturate-150',
              isVertical ? 'mb-[2px] w-full' : 'mr-[2px] h-full',
              imageRounded && 'rounded'
            )}
          />
        ))}
      </div>

      {/* Solid black gradient overlays on top of the mask, so the edges
          blend into the hero's own black background instead of just going
          transparent. */}
      {fade &&
        (isVertical ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent" />
          </>
        ))}
    </div>
  );
}
