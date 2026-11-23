/**
 * CUB³D site settings. This is the only file to edit when connecting
 * the signup form and the booking button. See README.md.
 *
 * While the Google Form values are still "TODO", a signup is NOT saved.
 * The visitor still goes to thank-you.html, and the browser console logs
 * a warning. This site never sends email.
 *
 * While BOOKING_URL is empty, the booking buttons open an email to
 * newlandgc@gmail.com instead of a calendar page.
 */
window.CUBED_CONFIG = {
  // TODO: Google Form response URL, for example
  // "https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxx/formResponse"
  GOOGLE_FORM_ACTION: "TODO",

  // TODO: entry IDs from the form's "Get pre-filled link".
  // Keep the entry. prefix, for example "entry.1234567890".
  ENTRY_FIRST_NAME: "TODO",
  ENTRY_EMAIL: "TODO",
  ENTRY_TRADE: "TODO",

  // TODO: Google Calendar appointment-schedule link.
  // Leave this empty until the link exists.
  BOOKING_URL: ""
};
