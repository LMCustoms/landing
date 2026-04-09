# LMCustoms Landing Page — Design Spec

**Domain:** lmcustoms.cc  
**Type:** Organization portfolio / project hub  
**Date:** 2026-04-09

## Overview

A clean, modern landing page for LMCustoms that showcases the organization's projects and serves as a hub for navigating to individual services. Built with Next.js to support a future configuration hub. Deployed on Schrombus behind Traefik.

Project data is modeled as a typed interface backed by a static JSON file initially, designed to swap to a Project Registry API when that service is built.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)
- **Deployment:** Docker on Schrombus, reverse-proxied via Traefik

## Brand System

All visual decisions follow the LMCustoms branding repository (`/branding/`).

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Royal Blue | `#3B82F6` | Primary brand color, CTAs, links |
| Indigo | `#6366F1` | Gradient anchor |
| Sky Blue | `#0EA5E9` | Gradient endpoint |
| Teal | `#06B6D4` | Accent gradient start |
| Emerald | `#10B981` | Accent gradient end |
| Midnight Slate | `#0F172A` | Page background |
| Surface | `#1E293B` | Cards, panels |
| Steel | `#334155` | Borders |

### Brand Gradient

```css
background: linear-gradient(135deg, #6366F1, #3B82F6, #0EA5E9);
```

### Typography

- **Font:** Inter via Google Fonts
- **Headings:** weight 800, tight letter-spacing
- **Body:** weight 400, 16px
- **Taglines:** weight 600, uppercase, letter-spacing 5px
- **Wordmark:** "LM" (weight 800, text gradient #3B82F6 → #0EA5E9) + "Customs" (weight 300, #E2E8F0)

### Logo

Use the exact SVG monogram from `branding/assets/logo-icon-only.svg`. The logo consists of an interlocking LM monogram with L foot bar, M chevron peaks, and floating diamond accent with teal-to-emerald gradient.

## Page Structure

### 1. Sticky Navigation

- Appears after scrolling past the hero (hidden at top)
- Glassmorphic bar: `rgba(15,23,42,0.9)` background with `backdrop-filter: blur(12px)`
- Border bottom: `#1E293B`
- Left: Small LM monogram (24px) + wordmark
- Right: Section links — Projects, About, Contact
- Smooth scroll to sections on click

### 2. Hero Section

- Full viewport height (100vh)
- Centered layout:
  1. LM monogram (~100px) with subtle ambient glow (radial gradient behind, slow pulse animation)
  2. Wordmark: "LMCustoms" with brand typography
  3. Tagline: uppercase, letter-spaced, muted color (e.g., "Crafting Digital Tools & Experiences" — copy to be finalized)
  4. Scroll indicator at bottom: "Explore" text + fading vertical line
- Background: Midnight Slate (#0F172A) with soft radial gradient glow centered behind the logo

### 3. Projects Section

- Section label: "What We're Building" (uppercase, blue, letter-spaced)
- Section title: "Projects" (weight 800)

**Card Grid:**
- Responsive: 3 columns desktop, 2 tablet, 1 mobile
- Gap: 1.25rem
- Max-width container: ~900px centered

**Each Card Shows:**
- Project icon (Lucide React icon in a small gradient-filled rounded square)
- Status badge (top-right of card header):
  - In Development: purple bg (`rgba(99,102,241,0.15)`), purple text (`#818CF8`)
  - Beta: amber bg (`rgba(245,158,11,0.15)`), amber text (`#F59E0B`)
  - Released: green bg (`rgba(16,185,129,0.15)`), green text (`#34D399`)
- Project name (weight 700)
- One-line description
- Tech stack tags (small pills, muted)
- Hover: subtle border glow + slight lift (`translateY(-2px)`)

**Expanded Detail View (on card click):**
- Panel slides open below the card grid, pushing content down
- 4px brand gradient bar at top
- Project name + status badge
- Full description paragraph
- Feature highlights in a 3-column sub-grid (label + description each)
- Full tech stack tags
- Action links: "GitHub" (secondary, text link with arrow) + "Open App" (primary, gradient button) — only show "Open App" if the project has a live URL

### 4. About Section

- Section label: "Behind the Code"
- Section title: "About"
- Card layout:
  - Left: Avatar (gradient circle placeholder with initials "AS" — can swap for real photo later)
  - Right: Name ("Anian Sollinger"), role ("Founder & Developer"), short bio/mission statement
- Copy is placeholder in implementation — to be written by owner

### 5. Contact / Footer

**Contact Area:**
- Section label: "Get In Touch"
- Section title: "Let's Connect"
- Subtitle: "Have a question or want to collaborate?"
- Two pill-style buttons: Email (anian@lmcustoms.cc) + GitHub
  - Icons from Lucide React (Mail, Github)
  - Style: Surface background, steel border, rounded

**Footer Bar:**
- Separated by `#1E293B` border
- Left: Small wordmark
- Right: "© 2026 LMCustoms. All rights reserved."

## Project Data Model

```typescript
interface Project {
  slug: string;
  name: string;
  description: string;         // one-liner for card
  longDescription: string;     // full description for detail view
  icon: string;                // Lucide icon name
  iconGradient: [string, string]; // gradient colors for icon background
  status: 'in-development' | 'beta' | 'released' | 'deprecated';
  version?: string;
  techStack: string[];
  features: {
    label: string;
    description: string;
  }[];
  links: {
    github?: string;
    app?: string;
    docs?: string;
  };
}
```

**Initial data source:** Static JSON file (`data/projects.json`) imported at build time.

**Future data source:** Project Registry API (`GET /projects`). When the registry is ready, swap the static import for a fetch call. The component interface stays identical.

## Animations

Keep animations subtle and purposeful:

- **Hero glow:** Slow pulsing radial gradient behind the monogram (CSS animation, ~4s cycle)
- **Scroll fade-in:** Sections fade in + slight upward slide as they enter viewport (Intersection Observer)
- **Card hover:** `translateY(-2px)` lift + border color transition to brand blue
- **Nav appearance:** Fade in when scrolling past hero threshold
- **Detail expand:** Smooth height transition when opening/closing project details

No heavy libraries — CSS transitions + Intersection Observer are sufficient.

## Responsive Breakpoints

- **Desktop:** ≥1024px — 3-column project grid, max-width container
- **Tablet:** 640px–1023px — 2-column project grid
- **Mobile:** <640px — single column, stacked layout, smaller type scale

## Deployment

- Dockerized Next.js app (standalone output)
- Deployed on Schrombus server (89.58.44.64)
- Reverse-proxied via Traefik for lmcustoms.cc
- Standard LMCustoms CI pipeline (ci-node.yml reusable workflow)

## Future Considerations

- **Project Registry API:** Separate microservice that becomes the source of truth for project data. Landing page swaps static JSON for API calls. Versioning and status derived from GitHub releases via automation. This is a separate brainstorm → plan → implementation cycle.
- **Configuration Hub:** Next.js App Router is chosen to support future authenticated pages for managing services. Not in scope for this spec.
