# AGENTS.md

> Design system reference for AI agents, collaborators, and future contributors.
> Read this before making any edits to the portfolio.

---

## Purpose

This is the personal portfolio of **Andy Cheng**, a Data Engineer based in New York City.
It showcases his technical projects, work history, and governance expertise — built to
attract senior/staff data engineering roles and consulting opportunities.

The site is deployed via GitHub Pages as a static site with no backend dependencies
(except Formspree for the contact form).

---

## Aesthetic Direction

**Maximalist tactical HUD.** The site draws from two primary references:

- **Valorant** (Riot Games) — agent select screen, ability key layout (Q/E/C/X),
  kill feed readouts, rank pips, animated corner brackets, diagonal panel splits
- **Marathon** (Bungie) — terminal monospace overlays, data readout strips,
  clipped-corner cards, sparse angular geometry

The result is a dark, high-contrast interface that feels like a tactical game UI
repurposed as a professional portfolio. It should always feel *operational*, not decorative.

---

## Color Palette

| Token         | Hex       | Role                                              |
|---------------|-----------|---------------------------------------------------|
| `--burn`      | `#E84B1A` | Primary accent. Name logo, CTAs, rule segments    |
| `--heat`      | `#FF6B35` | Hover state for burn elements                     |
| `--teal`      | `#00C4B4` | Secondary accent. HUD chrome, labels, skill bars  |
| `--caution`   | `#FFD100` | Tertiary. Construction page only. Warning states  |
| `--void`      | `#050505` | Page background                                   |
| `--p1`        | `#0D0D0D` | Surface layer 1 (angled panels, card backgrounds) |
| `--p2`        | `#131313` | Surface layer 2 (deeper nested panels)            |
| `--dim`       | `#1A1A1A` | Borders, dividers, inactive elements              |
| `--ash`       | `#2A2A2A` | Muted borders, ability key borders                |
| `--steel`     | `#505050` | Secondary text, descriptions                      |
| `--muted`     | `#333333` | Tertiary text, placeholders                       |
| `--txt`       | `#EDE7DB` | Primary text — warm white, never pure white       |

All tokens live in `css/tokens.css`. Change a token once, it propagates everywhere.

---

## Typography

| Role             | Font                  | Weight      | Style  |
|------------------|-----------------------|-------------|--------|
| Display/headlines| Barlow Condensed      | 900         | Normal |
| Menu links       | Barlow Condensed      | 900         | Italic |
| HUD labels       | Share Tech Mono       | 400         | —      |
| Body copy        | Barlow                | 300–400     | —      |

**Rules:**
- Hero name (`ANDY / CHENG`) is always `font-style: normal` — never italic
- Menu nav links use italic condensed — this is intentional Valorant agent-select styling
- All HUD readouts, badges, tags, and mono labels use `Share Tech Mono`
- Body copy uses `Barlow` weight 300. Bump to 400 for emphasis, never bold
- Headline sizes use `clamp(min, vw, max)` — documented per component in each CSS file

---

## Layout Principles

- **Diagonal panel splits** on the home hero — angled `clip-path` background panels
  mimicking Valorant's asymmetric agent select composition
- **Left sidebar + main content grid** for About, Resume, Contact pages
- **2-column card grid** for Projects
- **No bottom navigation bar** — navigation is hamburger-only, top-right
- **Section height**: `calc(100vh - var(--nav-height))` — always full viewport minus nav

---

## Persistent HUD Chrome

These elements appear on every page and are defined in `css/base.css`:

| Element              | Description                                              |
|----------------------|----------------------------------------------------------|
| Corner brackets      | Animated teal L-shaped SVG brackets, all 4 corners      |
| Edge top line        | 2px gradient: burn → teal → transparent, top of viewport|
| Edge bottom line     | 1px teal gradient, bottom of viewport                   |
| Scanline overlay     | Subtle repeating CSS gradient, fixed, z-index 900       |
| Nav bar              | 48px fixed top bar, logo left, hamburger right          |
| Ping indicator       | Blinking teal dot + "40ms / NYC" label in nav           |

---

## Recurring Motifs

| Motif                | Where used                        | Purpose                              |
|----------------------|-----------------------------------|--------------------------------------|
| Kill feed rows       | Home page top-left                | Pipeline status readouts             |
| Vertical date strip  | Home page far-left                | Live `YYYY-MM-DD` + static markers   |
| Rotating crosshair   | Home, Construction pages          | Bg decoration, very low opacity      |
| Tac grid overlay     | Home, About main, Contact, UC     | Subtle 48px grid, teal 3% opacity    |
| Ghost watermark text | Menu, Resume, Contact, UC         | Large italic ghost text behind content|
| Clipped corner cards | Project cards, agent card         | `border-width: 0 20px 20px 0` trick  |
| Ability keys (Q/E/C/X)| About sidebar                   | Valorant agent select reference      |
| Charge pips          | About ability rows                | Horizontal pip bars below each skill |
| Rank pips            | Resume rows                       | Filled/empty squares = seniority     |
| Segmented rule       | Home, Contact, Construction       | burn segment + teal segments         |
| Diagonal slash panels| Home hero background              | Valorant asymmetric composition      |

---

## File Structure

```
portfolio/
├── index.html            ← Main entry. All primary pages as <section> stubs.
├── construction.html     ← Standalone under-construction page.
├── AGENTS.md             ← This file.
├── README.md             ← Deploy guide and quick-edit reference.
├── css/
│   ├── tokens.css        ← All CSS variables. Edit here to retheme globally.
│   ├── base.css          ← Reset, body, HUD chrome, nav, menu overlay.
│   ├── components.css    ← Shared patterns: cards, forms, skill bars, tags.
│   ├── home.css          ← Home page only.
│   ├── construction.css  ← Under construction page only.
│   ├── about.css         ← (add when building)
│   ├── resume.css        ← (add when building)
│   ├── projects.css      ← (add when building)
│   └── contact.css       ← (add when building)
└── js/
    └── main.js           ← Navigation, transitions, live date, skill bars.
```

---

## Content Hotspots

All editable content in HTML files is marked with `<!-- EDIT: ... -->` comments.
When updating content, never change class names or structural HTML — only the
text content between tags and `data-*` attribute values.

Key hotspots:

| File               | Comment tag                        | What it controls                  |
|--------------------|------------------------------------|------------------------------------|
| `index.html`       | `<!-- EDIT: hero copy -->`         | Name, tagline, sub-headline        |
| `index.html`       | `<!-- EDIT: home stats -->`        | 3 sidebar stat values              |
| `index.html`       | `<!-- EDIT: kill feed labels -->`  | Top-left pipeline status rows      |
| `index.html`       | `<!-- EDIT: menu sidebar stats -->` | Menu right-column metadata        |
| `construction.html`| `<!-- EDIT: body copy -->`         | Under construction message         |
| `construction.html`| `<!-- EDIT: status label -->`      | "ZONE RESTRICTED" tag              |

---

## Do Not

- Do not add gradients to backgrounds — use flat fills only
- Do not use `Inter`, `Roboto`, or `system-ui` fonts
- Do not use `font-weight: 600` or `700` — use 400 (regular) or 900 (display) only
- Do not add rounded corners (`border-radius`) to elements with single-sided borders
- Do not change `--txt` to pure white (`#FFFFFF`) — warmth is intentional
- Do not italicize the hero name — only menu links and section titles use italic
- Do not add new color variables without adding them to this document

---

## Agent Instructions

When asked to build a new page section:

1. Read this file first
2. Check `css/tokens.css` for all available design tokens
3. Check `css/components.css` for reusable patterns before writing new CSS
4. Create a new `css/{pagename}.css` file — do not write page-specific styles into `base.css`
5. Add the page as a `<section id="page-{name}" hidden>` in `index.html`
6. Add the page id to the `PAGES` array in `js/main.js`
7. Add a `<!-- EDIT: ... -->` comment above every block of user-editable content
8. Match all existing motifs listed in the Recurring Motifs table above
