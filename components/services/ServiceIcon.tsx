const SERVICE_ICON_PATHS: Record<string, React.ReactNode> = {
  websites: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r="0.4" fill="currentColor" />
      <circle cx="9" cy="6.5" r="0.4" fill="currentColor" />
    </>
  ),
  chatbot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2.5" />
      <path d="M12 8V4.5" />
      <circle cx="12" cy="3.4" r="1.1" />
      <circle cx="9.2" cy="13.5" r="0.5" fill="currentColor" />
      <circle cx="14.8" cy="13.5" r="0.5" fill="currentColor" />
      <path d="M9.5 16.5h5" />
    </>
  ),
  booking: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7.5l8.5 5.5 8.5-5.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M21 11.4a8.4 8.4 0 0 1-12.3 7.4L3.5 20.2l1.5-5.1A8.4 8.4 0 1 1 21 11.4z" />
      <path
        d="M8.8 8.7c-.2.5-.2 1.4.3 2.4a7 7 0 0 0 3.6 3.2c1 .3 1.7.2 2.1-.1l.6-.7-1.6-1-.7.7c-.9-.3-1.7-1-2.2-1.9l.6-.8-1-1.6z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  multilang: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18" />
    </>
  ),
  maintenance: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.6-3.6a6 6 0 0 1-7.9 7.7l-6.7 6.7a2.1 2.1 0 0 1-3-3l6.7-6.7a6 6 0 0 1 7.7-7.9l-3.4 3.8z" />
  ),
};

/** Shared per-service line icon, keyed by NavService.id — used in the navbar's
 *  Services dropdown/submenu and the "Other Services" section on each service page. */
export default function ServiceIcon({
  id,
  className,
  style,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={style}
    >
      {SERVICE_ICON_PATHS[id]}
    </svg>
  );
}
