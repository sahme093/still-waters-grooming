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

      <div className="hero__art">
        <img
          className="hero__photo"
          src="/assets/salon-interior.webp"
          alt="Inside the Still Waters Grooming Salon grooming suite"
          loading="eager"
        />
      </div>
    </section>
  );
}
