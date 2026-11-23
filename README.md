# CUB³D funnel

Static pages for the free guide **Save Hours: AI Shortcuts for Contractors**.

CUB³D is an AI back office for contractors. The tagline is "Your AI partner behind the build." These pages are plain HTML, CSS, and JavaScript. There is no build step and no server. GitHub Pages can host them from the main branch, at the root of this repo.

The .nojekyll file tells GitHub Pages to publish the files as they are.

## The pages

1. `index.html` is the hook: hours back each week, where the time goes, and the kitchen-photo shortcut.
2. `inside.html` lists the five shortcuts, who the guide is for, and a short note from Nataly Vidales.
3. `signup.html` asks for a name, an email, and the kind of contractor.
4. `thank-you.html` has the download and a link to book a call at [cubedbots.com](https://cubedbots.com).

The button path is Home, then What's inside, then the form, then thank you.

## Preview on your computer

From this folder, run:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Click **Get the free guide**, read the shortcuts, open the form, and submit it. You should land on the thank-you page.

Until `config.js` is filled in, the form does not send anything to Google. A real email shape is still required. `name@example.com` continues. `not-an-email` stays on the form and asks you to fix it.

## (a) Turn on GitHub Pages

1. Open this repo on GitHub.
2. Go to **Settings**.
3. Open **Pages** in the left sidebar.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Set the branch to **main** and the folder to **/ (root)**.
6. Save.

Give it a minute. The site will be at:

`https://naty3lo2.github.io/cubed-funnel/`

The share-preview links in the four HTML files point at that address. If you later put the funnel on your own domain, update the `canonical`, `og:url`, and `og:image` lines in `index.html`, `inside.html`, `signup.html`, and `thank-you.html`.

## (b) Create the Google Form and connect it

The form has three questions. The website already asks the same three things.

1. Go to [forms.google.com](https://forms.google.com) and start a blank form. The title can be "Save Hours guide".
2. Add a **Short answer** question named **Name**.
3. Add a **Short answer** question named **Email**. Leave Google's "Collect email addresses" switch off. The Email question is the one the site fills in.
4. Add a **Dropdown** question named **What kind of contractor are you?** Use these choices, spelled the same way, in this order:
   - General contractor
   - Remodel
   - Electrical
   - Plumbing
   - HVAC
   - Roofing
   - Landscaping
   - Other
5. Confirm the form is **Accepting responses**.
6. Click the three dots at the top of the form and choose **Get pre-filled link**.
7. Type a sample name, a sample email, and any contractor type. Click **Get link** and copy that link.
8. In the link, find the pieces that look like `entry.1234567890`. Each question has its own number.
9. Open `config.js` in this repo. Replace each `entry.XXXX`:
   - `name` gets the entry ID from the Name answer in the link
   - `email` gets the entry ID from the Email answer
   - `contractorType` gets the entry ID from the dropdown answer
10. The same link contains `/viewform`. The action URL is that address with `/formResponse` instead of `/viewform` and everything after it. It looks like this:

    `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`

    Paste it between the quotes, replacing the words `GOOGLE_FORM_ACTION_URL`.
11. Save `config.js`, commit, and push to **main**.

A pre-filled link pasted into `GOOGLE_FORM_ACTION_URL` also works. The page turns `/viewform?...` into `/formResponse` before it sends.

Submit once on the live site, then open the form's **Responses** tab. You should see the test. If the thank-you page appears but the response does not, check three things: the action URL ends in `formResponse`, each entry ID is the numeric one from the pre-filled link, and the dropdown choices match the list above. If Google is slow to record the response, raise `POST_WAIT_MS` at the top of `js/signup.js`.

While the placeholders are still in `config.js`, the signup page skips Google and still opens the thank-you page.

## (c) Swap in the real photos and the PDF

**Photos.** Replace these two files. Keep the names:

- `assets/before.jpg` is the kitchen as it is
- `assets/after.jpg` is the same angle with only the cabinet color changed

The page crops both to a 4:3 frame, so a normal phone photo is fine. The drawings there now are placeholders, not a client's kitchen.

**PDF.** Put the guide in the `guide` folder with this exact filename:

`CUBED-Save-Hours-AI-Shortcuts-for-Contractors.pdf`

The **Download your guide** button on the thank-you page points at that file. More detail is in `guide/README.md`.

Push to **main** after the swap. GitHub Pages updates from that branch. If a phone still shows the old photo, refresh the page.
