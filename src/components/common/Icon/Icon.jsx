import "./Icon.css";

const PATHS = {
  book: (
    <>
      <path d="M12 5.5C12 4.67 11.33 4 10.5 4H5.5C4.67 4 4 4.67 4 5.5v13c0 .83.67 1.5 1.5 1.5H12" />
      <path d="M12 5.5C12 4.67 12.67 4 13.5 4h5c.83 0 1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5H12" />
      <path d="M12 5.5v14" />
    </>
  ),
  cards: (
    <>
      <rect x="4.5" y="8" width="12" height="12" rx="1.5" transform="rotate(-8 10.5 14)" />
      <rect x="7.5" y="4" width="12" height="12" rx="1.5" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20l.9-3.6L15.6 5.7l2.7 2.7L7.6 19.1 4 20Z" />
      <path d="M13.4 7.9l2.7 2.7" />
    </>
  ),
  alphabet: (
    <>
      <path d="M3 17h18" />
      <path d="M3 12h18" strokeDasharray="1.5 3" />
      <path d="M8 17V9.2C8 7.7 9 6.5 10.5 6.5S13 7.7 13 9.2V17" />
      <path d="M8.4 12.5h4.2" />
    </>
  ),
  flame: (
    <path d="M12 3c.5 2.2-3.5 3.8-3.5 7.5A3.5 3.5 0 0 0 12 14a3.5 3.5 0 0 0 3.5-3.5c0-.9-.3-1.6-.7-2.2 1.6 1 2.7 2.9 2.7 5A5.5 5.5 0 0 1 12 19a5.5 5.5 0 0 1-5.5-5.5C6.5 9 10.5 7.5 12 3Z" />
  ),
  check: <path d="M5 13l4.5 4.5L19 7" />,
  x: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  "chevron-right": <path d="M9.5 5.5l7 6.5-7 6.5" />,
  "chevron-left": <path d="M14.5 5.5l-7 6.5 7 6.5" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  tab: (
    <>
      <path d="M4 6.5C4 5.7 4.7 5 5.5 5h13c.8 0 1.5.7 1.5 1.5V17H4V6.5Z" />
      <path d="M4 17l3.5 3h9L20 17" />
    </>
  ),
  chat: (
    <path d="M4 6.5C4 5.4 4.9 4.5 6 4.5h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H9l-4 3.5v-3.5H6c-1.1 0-2-.9-2-2v-8Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.2 2.2 3.3 5 3.3 8s-1.1 5.8-3.3 8c-2.2-2.2-3.3-5-3.3-8s1.1-5.8 3.3-8Z" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9.5 18h5" />
      <path d="M10.2 21h3.6" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
    </>
  ),
  list: (
    <>
      <path d="M9.5 6h10" />
      <path d="M9.5 12h10" />
      <path d="M9.5 18h10" />
      <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 16.5 16.5 3 21 7.5 7.5 21 3 16.5Z" />
      <path d="M12.7 7.3l1.5 1.5" />
      <path d="M9.7 10.3l1.5 1.5" />
      <path d="M6.7 13.3l1.5 1.5" />
    </>
  ),
  quote: (
    <>
      <path d="M5 9c0-1.7 1.3-3 3-3M5 9v3c0 1.1.9 2 2 2h1V9H5Z" />
      <path d="M13 9c0-1.7 1.3-3 3-3M13 9v3c0 1.1.9 2 2 2h1V9h-3Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9-4.3-4.1 5.9-.8L12 3.5Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3.2 2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9" rx="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M17 9a4 4 0 0 1 0 6" />
    </>
  ),
  link: (
    <>
      <path d="M15 7h3a5 5 0 0 1 0 10h-3" />
      <path d="M9 17H6a5 5 0 0 1 0-10h3" />
      <path d="M8 12h8" />
    </>
  ),
  shuffle: (
    <>
      <path d="M16 3h5v5" />
      <path d="M4 20 21 3" />
      <path d="M21 16v5h-5" />
      <path d="m15 15 6 6" />
      <path d="m4 4 5 5" />
    </>
  ),
  play: (
    <path d="M7 5.3c0-.9 1-1.5 1.8-1l10 6.7c.7.5.7 1.5 0 2l-10 6.7c-.8.5-1.8-.1-1.8-1V5.3Z" fill="currentColor" stroke="none" />
  ),
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5 3.5 3.5 0 0 0 6.5 10H7" />
      <path d="M17 5h2.5A1.5 1.5 0 0 1 21 6.5 3.5 3.5 0 0 1 17.5 10H17" />
      <path d="M12 14v3" />
      <path d="M9 20h6" />
      <path d="M10.5 17h3l.3 3h-3.6Z" />
    </>
  ),
  cup: (
    <>
      <path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
      <path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 5c0 .7-.9 1-.9 1.8" />
      <path d="M11.5 5c0 .7-.9 1-.9 1.8" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="8" r="2.3" />
      <circle cx="16" cy="9" r="1.8" />
      <path d="M4 19.5v-1A4.5 4.5 0 0 1 8.5 14h1A4.5 4.5 0 0 1 14 18.5v1" />
      <path d="M14.3 14.3A3.6 3.6 0 0 1 20 17.3v2.2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6.2 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.8 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="4" y="8.5" width="16" height="10" rx="1.5" />
      <path d="M9 8.5V6.8A1.8 1.8 0 0 1 10.8 5h2.4A1.8 1.8 0 0 1 15 6.8v1.7" />
      <path d="M4 13.3h16" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
      <path d="M4 9.5h16" />
      <path d="M8 3.5v3" />
      <path d="M16 3.5v3" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M4 20V13" />
      <path d="M10.5 20V6.5" />
      <path d="M17 20v-9.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11" />
      <path d="M7.5 11.5L12 16l4.5-4.5" />
      <path d="M5 20h14" />
    </>
  ),
  pause: (
    <>
      <path d="M9 5v14" />
      <path d="M15 5v14" />
    </>
  ),
  replay: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.5" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({ name, size = 20, className = "", ...rest }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  );
}
