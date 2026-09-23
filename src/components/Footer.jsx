import { salon } from "../config.js";
import BrandMark from "./BrandMark.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <BrandMark className="site-footer__mark" />
          <span className="site-footer__name">{salon.name}</span>
        </div>
        <div className="site-footer__meta">
          <span>{salon.hoursSummary} · Closed Sunday</span>
          <span>
            {salon.address.line1}, {salon.address.city}, {salon.address.state} {salon.address.zip} ·{" "}
            {salon.phoneDisplay}
          </span>
        </div>
      </div>
    </footer>
  );
}
