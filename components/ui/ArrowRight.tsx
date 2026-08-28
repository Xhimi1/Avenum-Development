export default function ArrowRight({
  className,
  strokeWidth = 2.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}
