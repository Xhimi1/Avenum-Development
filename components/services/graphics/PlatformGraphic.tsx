/**
 * A pulsing dashboard grid — flat 2D stand-in for design systems and admin
 * screens this service ships. No WebGL.
 */
export default function PlatformGraphic() {
  const cells = Array.from({ length: 16 });
  return (
    <div aria-hidden className="relative h-64 w-64 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.25)] md:h-80 md:w-80 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-2.5 w-16 rounded-full bg-black/10" />
        <div
          className="h-2.5 w-6 rounded-full"
          style={{ backgroundColor: 'color-mix(in srgb, var(--svc-accent) 40%, transparent)' }}
        />
      </div>
      <div className="grid grid-cols-4 gap-2.5 md:gap-3">
        {cells.map((_, i) => (
          <div
            key={i}
            className="svc-pulse aspect-square rounded"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--svc-accent) 25%, transparent)',
              animationDelay: `${(i % 4) * 0.25 + Math.floor(i / 4) * 0.15}s`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-8 flex-1 rounded-md bg-black/[0.06]" />
        <div
          className="h-8 w-8 rounded-md"
          style={{ backgroundColor: 'color-mix(in srgb, var(--svc-accent) 20%, transparent)' }}
        />
      </div>
    </div>
  );
}
