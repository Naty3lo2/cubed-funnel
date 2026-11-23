/*
  CUB³D signup form — paste your Google Form details here.

  Until these placeholders are replaced, signup.html does not contact
  Google. It still sends the visitor to thank-you.html so you can test
  the pages.

  Replace:
    GOOGLE_FORM_ACTION_URL  with your form's address, ending in /formResponse
    entry.XXXX              with each question's real entry ID, like entry.1234567890

  The dropdown on signup.html must match the Google Form choices exactly:
    General contractor, Remodel, Electrical, Plumbing, HVAC,
    Roofing, Landscaping, Other

  Full click-by-click steps are in README.md under "Connect the Google Form".
*/
window.CUBED_CONFIG = {
  GOOGLE_FORM_ACTION_URL: "GOOGLE_FORM_ACTION_URL",

  entries: {
    name: "entry.XXXX",
    email: "entry.XXXX",
    contractorType: "entry.XXXX"
  },

  thankYouPath: "thank-you.html"
};
