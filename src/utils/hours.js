// Small helpers that turn config.js's `hours` array into the "Open now",
// "Closed · opens tomorrow 8am" style copy and the week list on the page.
// Index in the `hours` array matches Date#getDay() (0 = Sunday).

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// "8:00 am" -> 8, "6:00 pm" -> 18. Salon hours are always on the hour, so we
// don't need to carry minutes through.
export function to24Hour(label) {
  const match = /^(\d+):(\d+)\s*(am|pm)$/i.exec(String(label).trim());
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const period = match[3].toLowerCase();
  if (period === "pm" && hour !== 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;
  return hour;
}

// "8:00 am" -> "8am" (matches the short style used in the hero/footer copy).
function formatShort(label) {
  return String(label).replace(":00", "").replace(" ", "");
}

export function isOpenNow(hours, now = new Date()) {
  const today = hours[now.getDay()];
  if (!today || !today.open || !today.close) return false;
  const openHour = to24Hour(today.open);
  const closeHour = to24Hour(today.close);
  const h = now.getHours();
  return h >= openHour && h < closeHour;
}

export function getStatusLabel(hours, now = new Date()) {
  const day = now.getDay();
  const today = hours[day];

  if (isOpenNow(hours, now)) {
    return `Open now · until ${formatShort(today.close)}`;
  }

  if (today && today.open && now.getHours() < to24Hour(today.open)) {
    return `Closed · opens today ${formatShort(today.open)}`;
  }

  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7;
    const entry = hours[nextDay];
    if (entry && entry.open) {
      const when = i === 1 ? "tomorrow" : DAY_NAMES[nextDay];
      return `Closed · opens ${when} ${formatShort(entry.open)}`;
    }
  }
  return "Closed";
}

// Rows for the "Hours & location" section, Monday-first with Sunday last
// (matches how most people expect a weekly hours list to read).
export function getWeekRows(hours, now = new Date()) {
  const today = now.getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  return order.map((d) => {
    const entry = hours[d] || {};
    return {
      day: DAY_NAMES[d],
      hoursLabel: entry.open ? `${entry.open} – ${entry.close}` : "Closed",
      isToday: d === today,
      isClosed: !entry.open,
    };
  });
}
