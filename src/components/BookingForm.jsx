import { useState } from "react";
import { salon } from "../config.js";
import { buildSmsHref, buildMailHref, isMobileDevice } from "../utils/sms.js";

const EMPTY_FIELDS = {
  pet: "",
  breed: "",
  date: "",
  time: "Any time",
  owner: "",
  phone: "",
  email: "",
  notes: "",
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isClosedOn(dateStr) {
  const day = new Date(`${dateStr}T12:00:00`).getDay();
  const entry = salon.hours[day];
  return !entry || !entry.open;
}

function dayName(dateStr) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" });
}

export default function BookingForm() {
  const [species, setSpecies] = useState("dog");
  const [selected, setSelected] = useState({});
  const [sizeIndex, setSizeIndex] = useState(null);
  const [firstVisit, setFirstVisit] = useState(null);
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const setField = (key, value) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (key) => {
    setSelected((s) => ({ ...s, [key]: !s[key] }));
    setErrors((e) => ({ ...e, services: undefined }));
  };

  const chosenServices = salon.services[species].filter(
    (s) => selected[`${species}:${s.name}`]
  );

  function buildMessage() {
    const size = sizeIndex != null ? salon.sizes[species][sizeIndex] : null;
    const dateLabel = fields.date
      ? new Date(`${fields.date}T12:00:00`).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : "";

    return [
      `Appointment request – ${salon.name}`,
      `Owner: ${fields.owner}`,
      `Phone: ${fields.phone}`,
      fields.email && `Email: ${fields.email}`,
      `Pet: ${fields.pet} (${species === "dog" ? "Dog" : "Cat"}${fields.breed ? ", " + fields.breed : ""})`,
      size && `Size: ${size[0]} (${size[1]})`,
      firstVisit != null && `First visit: ${firstVisit ? "Yes" : "No"}`,
      `Services: ${chosenServices.map((s) => s.name).join(", ")}`,
      `Preferred: ${dateLabel}, ${fields.time}`,
      fields.notes && `Notes: ${fields.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    if (!fields.pet.trim()) nextErrors.pet = "Add your pet’s name";
    if (!fields.owner.trim()) nextErrors.owner = "Add your name";
    if (fields.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a 10-digit phone number";
    }
    if (fields.email && !/^\S+@\S+\.\S+$/.test(fields.email)) {
      nextErrors.email = "Check your email address";
    }
    if (!fields.date) {
      nextErrors.date = "Pick a date";
    } else if (isClosedOn(fields.date)) {
      nextErrors.date = `We’re closed ${dayName(fields.date)}s`;
    }
    if (chosenServices.length === 0) {
      nextErrors.services = "Choose at least one service";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const msg = buildMessage();
    setMessage(msg);
    setSubmitted(true);
    setErrors({});

    // Fire the SMS handoff immediately, inside this same click/submit
    // handler, so browsers still treat it as a direct result of the user's
    // action (see src/utils/sms.js for why the link itself differs by OS).
    // Desktop machines have no Messages app to catch this, so we skip the
    // redirect there and show the "call/copy" fallback in the confirmation
    // card instead.
    if (isMobileDevice()) {
      window.location.href = buildSmsHref(salon.phone, msg);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function resetForm() {
    setSubmitted(false);
  }

  if (submitted) {
    const smsHref = buildSmsHref(salon.phone, message);
    const mailHref = buildMailHref(
      salon.email,
      `Appointment request – ${fields.pet}`,
      message
    );

    return (
      <div className="confirmation-card">
        <h3>Almost done</h3>
        {isMobileDevice() ? (
          <>
            <p>
              Your message to {salon.name} is ready. Tap send in your messages app.
              If it didn’t open, use the button below.
            </p>
            <pre>{message}</pre>
            <div className="confirmation-actions">
              <a href={smsHref} className="btn btn-dark">
                Open text message
              </a>
              {salon.email && (
                <a href={mailHref} className="btn btn-outline">
                  Send by email
                </a>
              )}
            </div>
          </>
        ) : (
          <>
            <p>
              Text messages can only be sent from a phone. Call us, or copy this
              message and paste it into a text to {salon.phoneDisplay}.
            </p>
            <pre>{message}</pre>
            <div className="desktop-send">
              <span className="desktop-send__phone">{salon.phoneDisplay}</span>
              <div className="confirmation-actions">
                <a href={`tel:${salon.phone}`} className="btn btn-outline">
                  Call instead
                </a>
                <button
                  type="button"
                  className="btn btn-dark copy-btn"
                  data-copied={copied}
                  onClick={handleCopy}
                >
                  {copied ? "Copied!" : "Copy message"}
                </button>
              </div>
              {salon.email && (
                <a href={mailHref} className="btn btn-outline">
                  Send by email
                </a>
              )}
            </div>
          </>
        )}
        <button type="button" className="edit-request" onClick={resetForm}>
          Edit request
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <div className="toggle-group">
          <span className="toggle-group__label">Your pet is a</span>
          <div className="toggle-group__row">
            <button
              type="button"
              className="toggle-btn"
              aria-pressed={species === "dog"}
              onClick={() => {
                setSpecies("dog");
                setSizeIndex(null);
              }}
            >
              Dog
            </button>
            <button
              type="button"
              className="toggle-btn"
              aria-pressed={species === "cat"}
              onClick={() => {
                setSpecies("cat");
                setSizeIndex(null);
              }}
            >
              Cat
            </button>
          </div>
        </div>

        <div className="toggle-group">
          <span className="toggle-group__label">First visit with us?</span>
          <div className="toggle-group__row">
            <button
              type="button"
              className="toggle-btn"
              aria-pressed={firstVisit === true}
              onClick={() => setFirstVisit(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className="toggle-btn"
              aria-pressed={firstVisit === false}
              onClick={() => setFirstVisit(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="field-grid">
        <label className="field-label" htmlFor="pet-name">
          Pet’s name *
          <input
            id="pet-name"
            value={fields.pet}
            onChange={(e) => setField("pet", e.target.value)}
            className={errors.pet ? "has-error" : ""}
            aria-invalid={Boolean(errors.pet)}
            aria-describedby="pet-name-error"
          />
          <span className="field-error" id="pet-name-error">
            {errors.pet || ""}
          </span>
        </label>

        <label className="field-label" htmlFor="breed">
          Breed
          <input
            id="breed"
            value={fields.breed}
            onChange={(e) => setField("breed", e.target.value)}
            placeholder={species === "dog" ? "Goldendoodle" : "Persian"}
          />
        </label>
      </div>

      <div className="toggle-group">
        <span className="toggle-group__label">Size / weight</span>
        <div className="size-grid">
          {salon.sizes[species].map(([label, sub], i) => (
            <button
              key={label}
              type="button"
              className="size-btn"
              aria-pressed={sizeIndex === i}
              onClick={() => setSizeIndex(i)}
            >
              <span className="size-btn__label">{label}</span>
              <span className="size-btn__sub">{sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="toggle-group">
        <span className="toggle-group__label" id="services-label">
          Services *
        </span>
        <div className="chip-group" role="group" aria-labelledby="services-label">
          {salon.services[species].map((s) => {
            const key = `${species}:${s.name}`;
            return (
              <button
                key={key}
                type="button"
                className="chip"
                aria-pressed={Boolean(selected[key])}
                onClick={() => toggleService(key)}
              >
                {s.name}
              </button>
            );
          })}
        </div>
        <span className="field-error">{errors.services || ""}</span>
      </div>

      <div className="field-grid">
        <label className="field-label" htmlFor="date">
          Preferred date *
          <input
            id="date"
            type="date"
            min={todayIso()}
            value={fields.date}
            onChange={(e) => setField("date", e.target.value)}
            className={errors.date ? "has-error" : ""}
            aria-invalid={Boolean(errors.date)}
            aria-describedby="date-error"
          />
          <span className="field-error" id="date-error">
            {errors.date || ""}
          </span>
        </label>

        <label className="field-label" htmlFor="time">
          Preferred drop-off
          <select id="time" value={fields.time} onChange={(e) => setField("time", e.target.value)}>
            <option value="Any time">Any time</option>
            <option value="8–10 am">8–10 am</option>
            <option value="10 am–12 pm">10 am–12 pm</option>
            <option value="12–2 pm">12–2 pm</option>
            <option value="2–4 pm">2–4 pm</option>
          </select>
        </label>
      </div>

      <div className="field-divider" />

      <div className="field-grid">
        <label className="field-label" htmlFor="owner">
          Your name *
          <input
            id="owner"
            value={fields.owner}
            onChange={(e) => setField("owner", e.target.value)}
            autoComplete="name"
            className={errors.owner ? "has-error" : ""}
            aria-invalid={Boolean(errors.owner)}
            aria-describedby="owner-error"
          />
          <span className="field-error" id="owner-error">
            {errors.owner || ""}
          </span>
        </label>

        <label className="field-label" htmlFor="phone">
          Mobile phone *
          <input
            id="phone"
            type="tel"
            value={fields.phone}
            onChange={(e) => setField("phone", e.target.value)}
            autoComplete="tel"
            placeholder="(951) 555-0123"
            className={errors.phone ? "has-error" : ""}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="phone-error"
          />
          <span className="field-error" id="phone-error">
            {errors.phone || ""}
          </span>
        </label>
      </div>

      <label className="field-label" htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
          autoComplete="email"
          className={errors.email ? "has-error" : ""}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-error"
        />
        <span className="field-error" id="email-error">
          {errors.email || ""}
        </span>
      </label>

      <label className="field-label" htmlFor="notes">
        Temperament &amp; notes
        <textarea
          id="notes"
          rows={3}
          value={fields.notes}
          onChange={(e) => setField("notes", e.target.value)}
          placeholder="Nervous with dryers, matting behind ears, the cut you want…"
        />
      </label>

      <button type="submit" className="btn btn-dark">
        Continue to text message
      </button>
      <span className="form-note">
        This is a request. Your appointment is confirmed once we reply.
      </span>
    </form>
  );
}
