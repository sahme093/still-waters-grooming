// ============================================================================
// SALON CONFIG — everything specific to THIS business lives here.
//
// To reuse this whole site for a different grooming salon: change the values
// in this file (and swap the files in /public/assets), then update the two
// SEO tags at the top of index.html. You should not need to touch any file
// inside src/components/ or src/utils/.
// ============================================================================

export const salon = {
  name: "Still Waters Grooming Salon",
  shortName: "Still Waters",

  // Used in the hero heading as: "Pet grooming {highlight} {city}"
  heroKicker: "Luxury Dog Spa",
  heroHighlight: "in",
  heroCity: "Menifee",

  description:
    "Still Waters Grooming is a Luxury dog spa in Menifee offering private 1:1 appointments with a professional Pet Stylist who has more than 20 years experience. If you are ready to upgrade your dogs grooming experience to a calm, quiet, peaceful environment with a groomer who truly loves her job. Book an appontment today.",

  // E.164 format — used for tel: / sms: links. +1 555 555 0100 is a reserved
  // fictional number block, safe to leave in place until you add a real one.
  phone: "+19512305608",
  phoneDisplay: "(951) 230-5608",

  email: "", // leave blank to hide the "send by email" fallback link

  address: {
    line1: "Lazy Creek Rd",
    city: "Menifee",
    state: "CA",
    zip: "92586",
  },

  // Google Maps embed + link query. Kept separate from the address object
  // so you can hand-tune the query string without reformatting the address.
  mapsQuery: "Lazy Creek Rd, Menifee, CA 92586",

  // 0 = Sunday ... 6 = Saturday, matching Date#getDay().
  hours: [
    { day: "Sunday", open: null, close: null },
    { day: "Monday", open: null, close: null },
    { day: "Tuesday", open: "9:00 am", close: "5:00 pm" },
    { day: "Wednesday", open: "9:00 am", close: "5:00 pm" },
    { day: "Thursday", open: "9:00 am", close: "5:00 pm" },
    { day: "Friday", open: "9:00 am", close: "5:00 pm" },
    { day: "Saturday", open: "9:00 am", close: "5:00 pm" },
  ],
  hoursSummary: "Tues–Sat, 9am–5pm, closed Sun & Mon",

  // Toggle to show/hide "from $X" price labels next to each service.
  // Prices below are placeholder sample values — replace with your own.
  showPrices: false,

  services: {
    dog: [
      { name: "Full service grooming", price: 80 },
      { name: "Bathing and blow dry", price: 40 },
      { name: "Nail trimming", price: 15 },
      { name: "Ear cleaning", price: 10 },
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
  },

  gallery: [
    {
      src: "/assets/g-pepper.webp",
      alt: "Pepper before and after grooming — shaggy schnauzer transformed into a neat, tidy trim",
    },
    {
      src: "/assets/g-moo-teddy.webp",
      alt: "Moo and Teddy after grooming, looking fluffy and freshly trimmed",
    },
    {
      src: "/assets/g-pomeranian.webp",
      alt: "Pomeranian before and after grooming — thick coat shaped into a neat rounded trim",
    },
    {
      src: "/assets/g-rosie.webp",
      alt: "Rosie before and after grooming — matted coat transformed into a clean, tidy cut",
    },
  ],

  reviews: [
    {
      name: "Cyrise Geiger",
      when: "8 months ago",
      text: "Dejah is an amazing groomer. She gives top quality grooms. I highly recommend her. Her facility is very clean and professional. I love that she does one dog at a time. She truly cares for the animals she grooms.",
    },
    {
      name: "Krissy",
      when: "8 months ago",
      text: "Dejah is the best!!! I have been taking my dog to her for 2 years and she has always greeted us with love. Dejah is knowledgeable and truly cares about my dog and gives her the best care possible. She is passionate about being groomer and it really shows in her work. My dog always looks amazing and leaves happy and beautiful each time. I'm so thankful for Dejah and I know that my dog is in the best hands! 10000% recommend her services! She's the greatest ❤️. Thank you, Dejah! You are so talented!",
    },
    {
      name: "Cortney Bunge",
      when: "8 months ago",
      text: "Dejah was so professional and it was amazing with her 1 on 1 appointment with my dog so no other dogs to worry about. My doggie looks amazing thank you",
    },
    {
      name: "Katelin Wass",
      when: "8 months ago",
      text: "We have been using Dejah for years! She is always so kind to our dog Gracie and always keeps her looking amazing. We are so thankful to have a groomer who has compassion and love towards our dog while also giving great results. I can not recommend her enough!",
    },
    {
      name: "Madelynn Hitt",
      when: "8 months ago",
      text: "Dejah is absolutely AMAZING!! She has been the only groomer who has cut our cavalier in the right cut! Claire always comes back from Dejah looking amazing and soooo soft!!",
    },
  ],

  // Sample neutral palette — not tied to any brand. Applied at runtime as
  // CSS custom properties (see src/main.jsx), so this object is the ONE
  // place that defines the site's color palette. Swap these for your own
  // brand colors; keep accentStrong/accentDeep/accentLabel dark enough to
  // clear WCAG AA contrast against the light backgrounds they sit on.
  colors: {
    bg: "#f9effa",
    surface: "#FFFFFF",
    surfaceAlt: "#F1E6F5",
    ink: "#231A2C",
    inkSoft: "#4A3A50",
    inkMute: "#6E5E74",
    border: "rgba(35,26,44,.1)",
    borderStrong: "rgba(35,26,44,.18)",
    accent: "#84287d",
    accentHover: "#561d4b",
    // Darker plum shades so text set in these colors clears WCAG AA contrast
    // against the lavender/white backgrounds they sit on (large hero text
    // needs 3:1, the small eyebrow labels need 4.5:1) — same hue family as
    // accent, just deeper.
    accentStrong: "#8c438d",
    accentDeep: "#6d2f66",
    accentLabel: "#5c2752",
    highlight: "#F5E6F3",
    selection: "#E3D0F0",
    onDark: "#FBF3FA",
    error: "#B3261E",
    openDot: "#3E9B5A",
    closedDot: "#B79CC0",
  },

  fonts: {
    display: "'Cormorant Garamond', serif",
    body: "'Poppins', system-ui, sans-serif",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@400;500;600&display=swap",
  },
};
