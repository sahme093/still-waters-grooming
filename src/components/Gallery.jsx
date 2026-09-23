import { useState } from "react";
import { salon } from "../config.js";
import Lightbox from "./Lightbox.jsx";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const active = openIndex === null ? null : salon.gallery[openIndex];

  return (
    <section id="gallery" className="container gallery-section">
      <div className="section-heading__text">
        <span className="section-label">Gallery</span>
        <h2 className="section-title">Fresh cuts</h2>
      </div>

      <div className="gallery-grid">
        {salon.gallery.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className="gallery-item"
            aria-label={`View larger photo: ${photo.alt}`}
            onClick={() => setOpenIndex(index)}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {active && (
        <Lightbox src={active.src} alt={active.alt} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}
