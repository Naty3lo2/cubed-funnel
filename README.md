# CUB³D funnel

Static site for the free guide, **Save Hours: AI Shortcuts for Contractors**. Plain HTML, CSS, and JavaScript. No build step.

Live URL, once GitHub Pages is on: [https://naty3lo2.github.io/cubed-funnel/](https://naty3lo2.github.io/cubed-funnel/)

The signup form and the “Let’s Talk About Your Business.” buttons read [`config.js`](config.js). Until that file is filled in, the site still works, but it does not store signups and it does not open a calendar.

## Preview locally

From this folder:

```bash
python3 -m http.server 8080
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/). Paths are relative, so the same files work at the site root of a project site (`/cubed-funnel/`).

## Enable GitHub Pages

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to **`/ (root)`**.
4. Save.

GitHub will publish [https://naty3lo2.github.io/cubed-funnel/](https://naty3lo2.github.io/cubed-funnel/). The first deploy can take a minute. `.nojekyll` is already in the repo, so Pages serves the files as they are and does not run Jekyll.

## Connect the signup form

The form collects first name, email, and trade. It does not ask for a phone number. Create the Google Form, then paste its address and field IDs into `config.js`.

1. Create a form at [forms.google.com](https://forms.google.com).
2. Add three questions:
   - **First name** — Short answer
   - **Email address** — Short answer. Turn on response validation → Text → Email.
   - **Your trade** — Dropdown. Use these options, spelled the same way as the website: General Contractor, Remodeling, Electrical, Plumbing, HVAC, Painting, Other.
3. Leave the form open to anyone with the link. Do not require sign-in. Responses should be on. In **Responses**, link the form to a Google Sheet so you can read new rows. Only that Google account should have access to the sheet.
4. Find the entry IDs with **Get pre-filled link**:
   - In the form editor, open the three-dot menu and choose **Get pre-filled link**.
   - Fill in a sample answer for each question (for example Mike, you@example.com, Plumbing).
   - Click **Get link** and copy it.
   - The link looks like this:

     `https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxx/viewform?usp=pp_url&entry.1111111111=Mike&entry.2222222222=you%40example.com&entry.3333333333=Plumbing`

   - Each `entry.` number is one question, in the order you filled them in.
5. In `config.js`, replace the four `TODO` values:
   - `GOOGLE_FORM_ACTION` is the same link, cut down to the form id and ending in `formResponse`:

     `https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxx/formResponse`

   - `ENTRY_FIRST_NAME`, `ENTRY_EMAIL`, and `ENTRY_TRADE` are the matching ids, including the `entry.` prefix, such as `entry.1111111111`.
6. Commit `config.js` and push to `main` (or merge the pull request). Pages serves the new file. There is nothing to build.

Then submit a test from the live page and confirm a new row in the Sheet. The thank-you page only means the visitor can download the guide. It does not mean a row was stored. If the browser console shows the warning below, nothing was saved.

### Before `config.js` is filled in

A valid signup still continues to `thank-you.html`, where the guide can be downloaded. The site does **not** post the form, does **not** store the name or email, and does **not** send an email. The console warning is:

```text
CUB³D: signup was not saved. config.js still has placeholder Google Form settings, so nothing was sent. Opening the thank-you page anyway. No email was sent. See README.md for how to connect the form.
```

The same thing happens if the action URL or any entry ID is missing or still a placeholder. The page never tells the visitor that an email was sent. The guide is the download on the thank-you page. Follow-up email is a separate step, below.

## Set the booking link

`BOOKING_URL` in `config.js` is the Google Calendar appointment-schedule link.

1. In Google Calendar, create an appointment schedule for intro calls.
2. Copy the booking page link (it starts with `https://`).
3. Paste it as `BOOKING_URL` and push `config.js`.

While `BOOKING_URL` is empty, both **Let’s Talk About Your Business.** buttons open `mailto:natalyvidales@gmail.com?subject=Intro%20call`. After it is set, those buttons open the calendar link in a new tab.

## Follow-up emails

[`docs/emails.md`](docs/emails.md) holds three draft follow-up emails. They are not linked from the site and nothing here sends them. When you want them to go out, connect an email service (the draft mentions MailerLite, Kit, or a similar tool), include an unsubscribe link and your business mailing address, and only then turn the sequence on.

## Still needs configuration

- [ ] Create the Google Form and replace the `TODO` values in `config.js` (action URL and the three entry IDs).
- [ ] Paste the Google Calendar appointment link into `BOOKING_URL`.
- [ ] Turn on GitHub Pages: **Settings → Pages → Deploy from a branch → main / (root)**.
- [ ] Optional: connect an email service before using the drafts in `docs/emails.md`.
