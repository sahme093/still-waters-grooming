import { salon } from "../config.js";
import { getWeekRows } from "../utils/hours.js";

export default function Visit() {
  const rows = getWeekRows(salon.hours);
  const fullAddress = `${salon.address.line1}, ${salon.address.city}, ${salon.address.state} ${salon.address.zip}`;
  const encodedAddress = encodeURIComponent(fullAddress);

  return (
    <section id="visit" className="container visit-section">
      <div className="visit-info">
        <span className="section-label">Hours &amp; location</span>
        <h2 className="section-title">Come see us</h2>

        <div className="hours-list">
          {rows.map((row) => (
            <div
              key={row.day}
              className={
                "hours-row" +
                (row.isToday ? " hours-row--today" : "") +
                (row.isClosed ? " hours-row--closed" : "")
              }
            >
              <span>{row.day}</span>
              <span>{row.hoursLabel}</span>
            </div>
          ))}
        </div>

        <div className="visit-contact">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener"
          >
            {salon.address.line1}
            <br />
            {salon.address.city}, {salon.address.state} {salon.address.zip}
          </a>
          <a href={`tel:${salon.phone}`} className="visit-contact__phone">
            {salon.phoneDisplay}
          </a>
        </div>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
          target="_blank"
          rel="noopener"
          className="btn btn-outline"
        >
          Get directions
        </a>
      </div>

      <div className="map-frame">
        <iframe
          title={`Map to ${salon.name}`}
          src={`https://maps.google.com/maps?q=${encodedAddress}&z=14&output=embed`}
          loading="lazy"
        />
      </div>
    </section>
  );
}
