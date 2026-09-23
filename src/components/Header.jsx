import { useState } from "react";
import { salon } from "../config.js";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Hours & location" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <a href="#top" className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">{salon.name}</span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#book" className="nav-desktop__cta">
            Request appointment
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="nav-mobile" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#book" className="nav-mobile__cta" onClick={() => setMenuOpen(false)}>
            Request appointment
          </a>
        </nav>
      )}
    </header>
  );
}
