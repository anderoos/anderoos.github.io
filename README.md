# Andy Nguyen — Portfolio

Tactical HUD-style portfolio site. Valorant / Marathon aesthetic.
Dark theme — burn orange (#E84B1A), teal (#00C4B4), void black (#050505).

---

## File Structure

```
portfolio/
├── index.html          ← Entry point. All pages live here as <section> stubs.
├── css/
│   ├── tokens.css      ← DESIGN TOKENS. Edit colors, fonts, spacing here.
│   ├── base.css        ← Global reset, scanlines, HUD chrome, nav, menu overlay.
│   ├── components.css  ← Reusable patterns: cards, skill bars, tags, forms.
│   ├── home.css        ← Home page only styles.
│   ├── about.css       ← (add when building About)
│   ├── resume.css      ← (add when building Resume)
│   ├── projects.css    ← (add when building Projects)
│   └── contact.css     ← (add when building Contact)
└── js/
    └── main.js         ← Navigation, page transitions, date stamp, skill bars.
```

---

## Common Edits

### Change a color
Open `css/tokens.css`. Every color is a CSS variable at the top. Changing
`--burn` will update every element that uses the orange accent sitewide.

### Update your name / headline
Open `index.html`, find the `<!-- EDIT: hero copy -->` comment in `#page-home`.

### Update menu sidebar stats
Find `<!-- EDIT: menu sidebar stats -->` comment in the menu overlay section.

### Update kill feed labels (top-left on home)
Find `<!-- EDIT: kill feed labels -->` in `#page-home`.

### Add a new page
1. Add a `<section id="page-{name}" hidden>` in `index.html`
2. Add a menu link `<li><a onclick="goTo('{name}')">...</a></li>`
3. Add `'{name}'` to the `PAGES` array in `js/main.js`
4. Create `css/{name}.css` and link it in `<head>`

---

## Deploy to GitHub Pages

1. Create a repo named `yourusername.github.io`
2. Push this entire `portfolio/` folder contents to the repo root
3. Go to Settings → Pages → Source: `main` branch, `/ (root)`
4. Live at `https://yourusername.github.io` within ~60s

### Contact form
The form needs a backend to actually send email. Easiest option for a static
site: [Formspree](https://formspree.io). Add your form key to the `<form>`
action attribute when building the Contact page.

---

## Fonts
Loaded from Google Fonts:
- **Barlow Condensed** — display / headings (weights 300–900, italic variants)
- **Share Tech Mono** — HUD labels, monospace readouts
- **Barlow** — body copy (weights 300, 400)
