import { salon } from "../config.js";

// Hidden on desktop by CSS (see .mobile-cta media query in index.css) —
// always rendered so there's no layout jump when the viewport crosses the
// breakpoint.
export default function MobileCta() {
  return (
    <div className="mobile-cta">
      <a href={`tel:${salon.phone}`} className="btn btn-accent">
        Call
      </a>
      <a href="#book" className="btn btn-dark">
        Request appointment
      </a>
    </div>
  );
}
