// Hexagon-and-paw mark, drawn as inline SVG so it stays crisp at any size
// and picks up the theme colors from config.js automatically (no baked-in
// raster artwork to re-export every time the palette changes).
export default function BrandMark({ className }) {
  return (
    <svg viewBox="0 0 44 48" className={className} aria-hidden="true">
      <polygon
        points="22,2 40,13 40,35 22,46 4,35 4,13"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g fill="var(--color-accent)">
        <ellipse cx="22" cy="31" rx="7.5" ry="6.2" />
        <ellipse cx="12.5" cy="21" rx="3.6" ry="4.6" transform="rotate(-20 12.5 21)" />
        <ellipse cx="18.5" cy="15.5" rx="3.4" ry="4.6" transform="rotate(-8 18.5 15.5)" />
        <ellipse cx="25.5" cy="15.5" rx="3.4" ry="4.6" transform="rotate(8 25.5 15.5)" />
        <ellipse cx="31.5" cy="21" rx="3.6" ry="4.6" transform="rotate(20 31.5 21)" />
      </g>
    </svg>
  );
}
