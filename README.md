# Connor Brinkley Bookkeeping

The official website for Connor Brinkley's bookkeeping services in San Antonio, TX, with a
specialty in bars, restaurants and hospitality businesses.

A fast, professional, fully responsive static website built with plain HTML, CSS and
JavaScript — no build step and no frameworks, so it can be hosted anywhere (GitHub Pages,
Netlify, or any web host).

## Project structure

```
.
├── index.html        # Homepage (services, process, FAQ, contact)
├── about.html        # About Connor: story, experience, credentials
├── pricing.html      # Services & Pricing: packages, add-ons, FAQ
├── css/styles.css    # All styling, including responsive breakpoints
├── js/main.js        # Mobile menu, scroll effects, contact form validation
└── images/           # Free stock photography (see images/CREDITS.md)
```

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Live site

Hosted free on GitHub Pages: https://mithrilcode.github.io/connor-brinkley-bookkeeping/

Every push to `main` automatically redeploys the site within a minute or two.

## Customizing before launch

Contact details (email and San Antonio location) are already filled in. One placeholder remains:

| Placeholder | Where | Replace with |
| --- | --- | --- |
| `YOUR_FORM_ID` | `index.html` (contact form `action`) | Your Formspree form ID |

Also confirm the claims in the copy match how you work, e.g. "Mon-Fri, 9 AM - 5 PM",
"answered within one business day", and flat-rate pricing.

### Setting up the contact form (free)

1. Create a free account at [formspree.io](https://formspree.io) and create a new form.
2. Copy the form ID (the part after `/f/` in the endpoint, e.g. `xyzabcd`).
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` attribute.

Until this is done, submitting the form opens the visitor's email app with their message
pre-filled and addressed to `FALLBACK_EMAIL` in `js/main.js`.

## Images

Free stock photography from Unsplash — see [images/CREDITS.md](images/CREDITS.md).
