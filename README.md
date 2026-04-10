# Andy Cheng — Portfolio

Tactical HUD-style personal portfolio. NASA-punk / dark terminal aesthetic.
Dark theme — burn orange `#E84B1A`, teal `#00C4B4`, void black `#050505`.

---

## File Structure

```
portfolio/
├── index.html                    ← Home page
├── robots.txt
├── css/
│   ├── style.css                 ← All styles (tokens, layout, components)
│   ├── project.css               ← Project detail page styles (pages/projects/*)
│   └── construction.css          ← Under-construction page styles
├── js/
│   ├── config.js                 ← Site-wide content config (edit this first)
│   ├── auth.js                   ← Password gate (session-based)
│   └── main.js                   ← Menu, page-top collapse, scramble, skill bars
├── pages/
│   ├── about.html
│   ├── resume.html
│   ├── projects.html
│   ├── interests.html
│   ├── contact.html
│   ├── construction.html
│   └── projects/                 ← Individual project detail pages
│       ├── ...
│   └── img/
│       └── projects/             ← Project screenshot images
└── pages/templates/
    └── project.html              ← Template for new project detail pages
```

---

## Common Edits

### Update name, role, location, bio, or stats
Open `js/config.js`. All site-wide content is defined in the `SITE_CONFIG` object —
name, role, years of experience, cloud platform, availability status, hero tagline,
bio, and the data feed labels on the home page.

### Change a color or font
Open `css/style.css`. Design tokens are at the very top under `:root` —
`--burn`, `--teal`, `--void`, font families, nav height, etc.

### Add a project detail page
1. Copy `pages/templates/project.html` to `pages/projects/NN-project-name.html`
2. Fill in the content
3. Add a project card linking to it in `pages/projects.html`
4. Drop any screenshot into `assets/img/projects/`

### Change the password
`js/auth.js` contains a SHA-256 hash of the password in the `HASH` constant.
Generate a new hash and replace it. The gate is session-based — authenticated
users stay unlocked until the browser tab closes.

---

## Design Tokens (css/style.css `:root`)

| Token | Value | Use |
|---|---|---|
| `--burn` | `#E84B1A` | Primary accent (orange) |
| `--teal` | `#00C4B4` | Secondary accent |
| `--void` | `#050505` | Page background |
| `--txt` | `#EDE7DB` | Body text |
| `--font-display` | DM Sans | Headings |
| `--font-mono` | Share Tech Mono | HUD labels, readouts |

---

## Deploy to GitHub Pages

1. Create a repo named `yourusername.github.io`
2. Push the repo contents to the `main` branch root
3. Go to **Settings → Pages → Source**: `main` branch, `/ (root)`
4. Live at `https://yourusername.github.io` within ~60 seconds

### Contact form
The contact form requires a backend to send email. For a static site use
[Formspree](https://formspree.io) — add your form key to the `<form>` action
attribute in `pages/contact.html`.
