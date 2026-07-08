/**
 * Stacked "browser window" cards, gently floating — a flat 2D stand-in for
 * the story-driven sites this service builds. No WebGL.
 */
export default function ImmersiveGraphic() {
  return (
    <div aria-hidden className="relative h-64 w-64 md:h-80 md:w-80">
      <div
        className="svc-float absolute inset-x-6 inset-y-10 rounded-2xl border border-black/10 bg-white shadow-[0_25px_60px_-25px_rgba(0,0,0,0.25)]"
        style={{ ['--svc-rot' as string]: '-7deg', animationDelay: '0.6s' } as React.CSSProperties}
      />
      <div
        className="svc-float absolute inset-x-3 inset-y-4 flex flex-col rounded-2xl border border-black/10 bg-white p-4 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.3)]"
        style={{ ['--svc-rot' as string]: '4deg' } as React.CSSProperties}
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-black/15" />
          <span className="h-2 w-2 rounded-full bg-black/15" />
          <span className="h-2 w-2 rounded-full bg-[var(--svc-accent)]" />
        </div>
        <div className="mb-2 h-3 w-2/3 rounded-full bg-black/10" />
        <div className="mb-4 h-2 w-1/2 rounded-full bg-black/10" />
        <div className="mt-auto grid grid-cols-3 gap-2">
          <div
            className="h-10 rounded-lg"
            style={{ backgroundColor: 'color-mix(in srgb, var(--svc-accent) 15%, transparent)' }}
          />
          <div className="h-10 rounded-lg bg-black/[0.06]" />
          <div className="h-10 rounded-lg bg-black/[0.06]" />
        </div>
      </div>
    </div>
  );
}
