import { useEffect } from "react";
import { salon } from "../config.js";
import { to24Hour } from "../utils/hours.js";

const SCRIPT_ID = "local-business-jsonld";

function timeString(hour) {
  return `${String(hour).padStart(2, "0")}:00`;
}

/**
 * Injects LocalBusiness JSON-LD (and keeps the meta description in sync)
 * from config.js. This is a no-op invisible component — it never renders
 * anything itself, it just manages a <script> tag in <head>.
 *
 * Google renders JavaScript before reading structured data, so injecting
 * this at runtime is fine for search. The base <title>/<meta description>
 * still live as static tags in index.html so they're correct even for
 * crawlers/tools that don't execute JS at all.
 */
export default function Seo() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: salon.name,
      image: `${window.location.origin}/assets/logo.webp`,
      telephone: salon.phoneDisplay,
      description: salon.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: salon.address.line1,
        addressLocality: salon.address.city,
        addressRegion: salon.address.state,
        postalCode: salon.address.zip,
        addressCountry: "US",
      },
      openingHoursSpecification: salon.hours
        .filter((h) => h.open && h.close)
        .map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: timeString(to24Hour(h.open)),
          closes: timeString(to24Hour(h.close)),
        })),
      url: window.location.origin,
    };

    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      // Leave the tag in place across re-renders; only real unmounts of the
      // whole app (never happens here) would need cleanup.
    };
  }, []);

  return null;
}
