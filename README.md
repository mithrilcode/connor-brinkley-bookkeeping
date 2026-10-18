# Connor Brinkley Bookkeeping & Tax

The official website for Connor Brinkley's bookkeeping and tax preparation services.

A fast, professional, fully responsive static website built with plain HTML, CSS and
JavaScript — no build step and no frameworks, so it can be hosted anywhere (GitHub Pages,
Netlify, or any web host).

## Project structure

```
.
├── index.html        # Single-page site (all sections)
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

Search the project for these placeholders and replace them with real details:

| Placeholder | Where | Replace with |
| --- | --- | --- |
| `(555) 555-0123` / `tel:+15555550123` | `index.html` (contact section + footer) | Your business phone |
| `hello@example.com` | `index.html` and `js/main.js` (`FALLBACK_EMAIL`) | Your business email |
| `Your City, State` | `index.html` (contact section) | Your city/service area |
| `YOUR_FORM_ID` | `index.html` (contact form `action`) | Your Formspree form ID |

Also review the copy for claims you want to keep — e.g. "encrypted client portal", "answered
within one business day", and the list of supported software.

### Setting up the contact form (free)

1. Create a free account at [formspree.io](https://formspree.io) and create a new form.
2. Copy the form ID (the part after `/f/` in the endpoint, e.g. `xyzabcd`).
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` attribute.

Until this is done, submitting the form opens the visitor's email app with their message
pre-filled and addressed to `FALLBACK_EMAIL` in `js/main.js`.

## Images

Free stock photography from Unsplash — see [images/CREDITS.md](images/CREDITS.md).
