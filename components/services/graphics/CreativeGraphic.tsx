/**
 * A soft morphing blob with orbiting shapes — flat 2D motion graphic hinting
 * at shader/motion work without pretending to be a 3D render.
 */
export default function CreativeGraphic() {
  return (
    <div aria-hidden className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
      <div
        className="svc-blob absolute inset-6 opacity-90"
        style={{
          background:
            'linear-gradient(135deg, var(--svc-accent), var(--svc-accent2) 60%, #ffffff 100%)',
          filter: 'blur(2px)',
        }}
      />
      <div
        className="svc-float absolute left-2 top-4 h-10 w-10 rounded-full border-2 border-black/10 bg-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.3)]"
        style={{ animationDelay: '0.3s' }}
      />
      <div
        className="svc-float absolute bottom-6 right-4 h-14 w-14 rounded-2xl border-2 border-black/10 bg-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.3)]"
        style={{ ['--svc-rot' as string]: '18deg', animationDelay: '0.9s' } as React.CSSProperties}
      />
      <div className="svc-float absolute right-8 top-8 h-6 w-6 rounded-full bg-[var(--svc-accent)]" style={{ animationDelay: '1.3s' }} />
    </div>
  );
}
