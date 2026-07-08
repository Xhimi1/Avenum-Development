/**
 * Fixed, blurred color blobs drifting slowly behind the whole page — keeps
 * the white service pages from reading as flat black-and-white. Pure CSS,
 * no WebGL.
 */
export default function AuroraBackdrop({ accent, accent2 }: { accent: string; accent2: string }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="svc-drift-a absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full blur-3xl"
        style={{ background: accent, opacity: 0.18 }}
      />
      <div
        className="svc-drift-b absolute -right-44 top-1/4 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: accent2, opacity: 0.16 }}
      />
      <div
        className="svc-drift-c absolute -bottom-44 left-1/4 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ background: accent, opacity: 0.12 }}
      />
    </div>
  );
}
