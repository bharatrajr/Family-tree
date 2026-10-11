# నలబోలు వంశవృక్షం · Nalabolu Family Tree app

A simple family tree app for phones: big text, Telugu and English, works offline, and installs to the home screen.

## Put it online with GitHub Pages (one time, about 5 minutes)

1. Sign in at github.com and create a new **public** repository, for example `vamsam`.
2. Click **Add file → Upload files** and drag in everything from this folder:
   `index.html`, `data.json`, `manifest.webmanifest`, `sw.js` and the `icons` folder. Click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch" choose `main` and `/ (root)`, then **Save**.
4. After a minute the address appears at the top, for example `https://yourname.github.io/vamsam/`.
   Share that link on WhatsApp.

## Update the family details

The names live in `data.json`. To update:

1. Open the family tree editor (`nalabolu-family-tree.html`), make your changes, and use **⋯ → Download backup (JSON)**.
2. Rename the downloaded file to `data.json`.
3. In GitHub, upload it into the repository (it replaces the old one) and commit.

Everyone sees the new names the next time they open the app with internet.

## Optional: let relatives report corrections on WhatsApp

In `data.json`, find `"whatsapp":""` near the start and put your number with country code, for example `"whatsapp":"919876543210"`.
Every person's page then shows a button that opens WhatsApp with that person's name filled in.

## If you change index.html

Raise the version in `sw.js` (`vamsam-v1` → `vamsam-v2`) so phones pick up the new app.
