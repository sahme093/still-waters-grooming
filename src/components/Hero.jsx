import { useEffect, useState } from "react";
import { salon } from "../config.js";
import { getStatusLabel, isOpenNow } from "../utils/hours.js";

export default function Hero() {
  // Open/closed status depends on the current time, so it's computed after
  // mount (useState + useEffect) rather than during render, to avoid a
  // server/client mismatch if this is ever pre-rendered.
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const update = () =>
      setStatus({ open: isOpenNow(salon.hours), label: getStatusLabel(salon.hours) });
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="container hero">
      <div className="hero__copy">
        <div className="hero__badges">
          <span className="pill">
            <span
              className="status-dot"
              style={{
                background: status
                  ? status.open
                    ? "var(--color-openDot)"
                    : "var(--color-closedDot)"
                  : "transparent",
              }}
              aria-hidden="true"
            />
            {status ? status.label : "Checking hours…"}
          </span>
          <span className="pill">{salon.tagline}</span>
        </div>

        <h1>
          {salon.heroKicker} <em>{salon.heroHighlight}</em> {salon.heroCity}
        </h1>

        <p className="hero__description">{salon.description}</p>

        <div className="hero__actions">
          <a href="#book" className="btn btn-dark">
            Request appointment
          </a>
          <a href={`tel:${salon.phone}`} className="btn btn-accent">
            Call {salon.phoneDisplay}
          </a>
        </div>

        <p className="hero__fine-print">
          {salon.hoursSummary} · {salon.address.line1}
        </p>
      </div>

      <div className="hero__art" aria-hidden="true">
        <div className="hex" style={{ left: "8%", top: "6%", width: "62%", background: "var(--color-accent)" }} />
        <div
          className="hex hex--photo"
          style={{ left: "17%", top: "14%", width: "52%", backgroundImage: `url(${salon.gallery[0].src})`, backgroundPosition: "center 30%" }}
        />
        <svg viewBox="0 0 86.6 100" className="hex-outline">
          <polygon
            points="43.3,1.5 85.1,25.5 85.1,74.5 43.3,98.5 1.5,74.5 1.5,25.5"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className="hex hex--photo"
          style={{ right: "4%", top: "44%", width: "40%", backgroundImage: `url(${salon.gallery[1].src})`, backgroundPosition: "center 25%" }}
        />
        <div className="hex" style={{ left: 0, bottom: "2%", width: "26%", background: "var(--color-highlight)" }} />
        <div
          className="hex hex--photo"
          style={{ left: "30%", bottom: 0, width: "30%", backgroundImage: `url(${salon.gallery[2].src})`, backgroundPosition: "center 40%" }}
        />
      </div>
    </section>
  );
}
