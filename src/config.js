// ============================================================================
// SALON CONFIG — everything specific to THIS business lives here.
//
// To reuse this whole site for a different grooming salon: change the values
// in this file (and swap the files in /public/assets), then update the two
// SEO tags at the top of index.html. You should not need to touch any file
// inside src/components/ or src/utils/.
// ============================================================================

export const salon = {
  name: "Your Salon Name",
  shortName: "Your Salon",

  // Used in the hero heading as: "Pet grooming {highlight} {city}"
  heroKicker: "Pet grooming",
  heroHighlight: "in",
  heroCity: "Your City",

  tagline: "Dogs & cats · Your City, ST",

  description:
    "Add a short introduction here — what makes your grooming salon different, which pets you welcome, and why new clients should book with you.",

  // E.164 format — used for tel: / sms: links. +1 555 555 0100 is a reserved
  // fictional number block, safe to leave in place until you add a real one.
  phone: "+15555550100",
  phoneDisplay: "(555) 555-0100",

  email: "", // leave blank to hide the "send by email" fallback link

  address: {
    line1: "123 Main Street",
    city: "Your City",
    state: "ST",
    zip: "00000",
  },

  // Google Maps embed + link query. Kept separate from the address object
  // so you can hand-tune the query string without reformatting the address.
  mapsQuery: "123 Main Street, Your City, ST 00000",

  // 0 = Sunday ... 6 = Saturday, matching Date#getDay().
  hours: [
    { day: "Sunday", open: null, close: null },
    { day: "Monday", open: "9:00 am", close: "5:00 pm" },
    { day: "Tuesday", open: "9:00 am", close: "5:00 pm" },
    { day: "Wednesday", open: "9:00 am", close: "5:00 pm" },
    { day: "Thursday", open: "9:00 am", close: "5:00 pm" },
    { day: "Friday", open: "9:00 am", close: "5:00 pm" },
    { day: "Saturday", open: "9:00 am", close: "2:00 pm" },
  ],
  hoursSummary: "Mon–Fri, 9am–5pm · Sat 9am–2pm",

  // Toggle to show/hide "from $X" price labels next to each service.
  // Prices below are placeholder sample values — replace with your own.
  showPrices: false,

  services: {
    dog: [
      { name: "Full service grooming", price: 80 },
      { name: "Bathing and blow dry", price: 40 },
      { name: "Nail trimming", price: 15 },
      { name: "Ear cleaning", price: 10 },
      { name: "Teeth brushing", price: 10 },
      { name: "Anal gland expression", price: 15 },
      { name: "Flea and tick treatment", price: 20 },
    ],
    cat: [
      { name: "Cat grooming", price: 65 },
      { name: "Cat bathing", price: 50 },
      { name: "Cat nail trimming", price: 15 },
      { name: "Cat ear cleaning", price: 10 },
    ],
  },

  // [label, sublabel] pairs shown as size-picker buttons in the booking form.
  sizes: {
    dog: [
      ["Small", "under 20 lb"],
      ["Medium", "20–50 lb"],
      ["Large", "50–90 lb"],
      ["XL", "90+ lb"],
    ],
    cat: [
      ["Small", "under 8 lb"],
      ["Medium", "8–12 lb"],
      ["Large", "12+ lb"],
    ],
  },

  // Sample gallery — swap these files in /public/assets and update the alt
  // text to describe each real photo.
  gallery: [
    { src: "/assets/p5.webp", alt: "Sample gallery photo — replace with your own grooming photos" },
    { src: "/assets/p1.webp", alt: "Sample gallery photo — replace with your own grooming photos" },
    { src: "/assets/p3.webp", alt: "Sample gallery photo — replace with your own grooming photos" },
  ],

  // Sample reviews — fictional names and quotes. Replace with your own
  // reviews (e.g. copied from Google) before publishing.
  reviews: [
    {
      name: "Jordan P.",
      when: "3 years ago",
      text: "Wonderful experience from start to finish! The groomer was so patient with my pup and did an amazing job with the cut. Highly recommend!",
    },
    {
      name: "Sam R.",
      when: "a year ago",
      text: "Such a great job on both of our pets! Very patient with them and takes the time to get every detail right. They also send lots of update photos during the appointment, which we love.",
    },
    {
      name: "Taylor M.",
      when: "a year ago",
      text: "Great job with our almost one-year-old puppy. Pricing was reasonable and they were very patient with our hyper little guy.",
    },
    {
      name: "Casey L.",
      when: "2 years ago",
      text: "An incredible groomer — my dog was completely comfortable the whole time. Loved getting text updates with cute photos throughout the appointment. Highly recommend!",
    },
    {
      name: "Morgan T.",
      when: "3 weeks ago",
      text: "Did an amazing job on our dog and left him looking great. We'll definitely be returning customers!",
    },
    {
      name: "Alex W.",
      when: "2 years ago",
      text: "We love bringing our dogs here — the team is so good with them, even with tricky coats and big personalities. Incredible work every time!",
    },
    {
      name: "Riley M.",
      when: "a year ago",
      text: "I've been taking my dog here weekly and I'm so happy with how great they always look. Wouldn't go anywhere else.",
    },
    {
      name: "Amanda P.",
      when: "2 years ago",
      text: "Always responds promptly and my pet leaves happier and looking better every time. Highly recommend!",
    },
  ],

  // Sample neutral palette — not tied to any brand. Applied at runtime as
  // CSS custom properties (see src/main.jsx), so this object is the ONE
  // place that defines the site's color palette. Swap these for your own
  // brand colors; keep accentStrong/accentDeep/accentLabel dark enough to
  // clear WCAG AA contrast against the light backgrounds they sit on.
  colors: {
    bg: "#FAF6EF",
    surface: "#FFFFFF",
    surfaceAlt: "#F3EDE3",
    ink: "#1D1B18",
    inkSoft: "#4F4A43",
    inkMute: "#6B655C",
    border: "rgba(29,27,24,.1)",
    borderStrong: "rgba(29,27,24,.18)",
    accent: "#EFA73C",
    accentHover: "#F3B657",
    // Darkened slightly from the source design's #C98323 / #B06F14 so text
    // set in these colors clears WCAG AA contrast against the cream/white
    // backgrounds they sit on (large hero text needs 3:1, the small eyebrow
    // labels need 4.5:1) — same hue, just a touch deeper.
    accentStrong: "#B8741A",
    accentDeep: "#9A5F0E",
    accentLabel: "#8A5A10",
    highlight: "#FDF1DC",
    selection: "#F4D49B",
    onDark: "#FAF6EF",
    error: "#B3261E",
    openDot: "#3E9B5A",
    closedDot: "#C9A27A",
  },

  fonts: {
    display: "'Josefin Sans', sans-serif",
    body: "'Jost', system-ui, sans-serif",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&family=Jost:wght@400;500;600&display=swap",
  },
};
