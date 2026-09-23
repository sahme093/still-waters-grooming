import { useRef } from "react";
import { salon } from "../config.js";

export default function Reviews() {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(354, el.clientWidth), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-heading__text">
            <span className="section-label">Google reviews</span>
            <h2 className="section-title">What pet parents say</h2>
          </div>
          <div className="reviews-nav">
            <button
              type="button"
              className="review-arrow"
              aria-label="Previous reviews"
              onClick={() => scroll(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className="review-arrow"
              aria-label="Next reviews"
              onClick={() => scroll(1)}
            >
              →
            </button>
          </div>
        </div>

        <div className="reviews-track" ref={trackRef}>
          {salon.reviews.map((review) => (
            <figure className="review-card" key={review.name + review.when}>
              <blockquote>
                <span className="review-stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="visually-hidden">5 out of 5 stars.</span>
                <span className="review-text">{review.text}</span>
              </blockquote>
              <figcaption>
                <span className="review-name">{review.name}</span>
                <span className="review-when">{review.when}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
