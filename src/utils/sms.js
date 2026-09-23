// ============================================================================
// sms: link helpers
//
// There is no real standard for pre-filling the body of a text message from
// a link. Both major mobile platforms support *something*, but they expect
// different punctuation between the phone number and the "body" parameter:
//
//   iOS (Safari/Messages) : sms:+15551234567&body=Hello
//   Android (Chrome/SMS)  : sms:+15551234567?body=Hello
//
// Notice iOS wants "&" where a normal URL would use "?" to start the query
// string. This comes from a long-standing Apple quirk (Apple never fixed it
// because too many existing links depend on it). If you send an Android
// device the "&" form, or an iPhone the "?" form, the number opens correctly
// but the body text is silently dropped — the user would have to type the
// whole message by hand, which defeats the point of this form.
//
// So we sniff the platform from the user agent and build the right link for
// it. This is one of the few places sniffing the UA is actually justified:
// there is no feature to detect ("does this browser support ?body=") — it's
// a matter of which of two non-standard, undetectable behaviors the OS's
// Messages app happens to implement.
// ============================================================================

export function isIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  // iPadOS 13+ reports itself as "MacIntel" with touch support, so a plain
  // UA check for "iPad|iPhone|iPod" misses modern iPads — we also check for
  // a touch-capable Mac.
  const isAppleTouch =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isAppleTouch;
}

export function isAndroid() {
  if (typeof navigator === "undefined") return false;
  return /Android/.test(navigator.userAgent || "");
}

// Any device we'd expect to have a Messages app capable of handling sms:
// links at all. Desktop browsers generally don't, so callers use this to
// decide whether to offer the sms: link or a "copy this message" fallback.
export function isMobileDevice() {
  return isIOS() || isAndroid();
}

/**
 * Build an sms: link that pre-fills the message body on both platforms.
 * @param {string} phone E.164 phone number, e.g. "+15555550100"
 * @param {string} message Plain-text message body (not yet URL-encoded)
 */
export function buildSmsHref(phone, message) {
  const encoded = encodeURIComponent(message);
  const separator = isIOS() ? "&" : "?";
  return `sms:${phone}${separator}body=${encoded}`;
}

export function buildMailHref(email, subject, message) {
  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  return `mailto:${email || ""}?${params}`;
}
