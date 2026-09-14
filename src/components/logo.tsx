/**
 * Kebiao seal-stamp logo — a Chinese seal (印章) holding 课表 ("class
 * schedule") in rice on seal red, with the gold line motif shared with
 * therealchina.net. `size` is the rendered edge in px.
 */
export function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kebiao"
    >
      <rect x="6" y="6" width="36" height="36" rx="5" fill="#A6192E" />
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="3"
        fill="none"
        stroke="#FAF6EF"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <text
        x="24"
        y="28.5"
        textAnchor="middle"
        fill="#FAF6EF"
        fontFamily="'Noto Serif SC', 'Songti SC', serif"
        fontWeight="900"
        fontSize="14"
        letterSpacing="-0.5"
      >
        课表
      </text>
      <path
        d="M15 33.5c2-2.4 4-2.4 6-0.8s4 1.6 6-0.8 4-2.4 6 0"
        stroke="#C9A227"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}
