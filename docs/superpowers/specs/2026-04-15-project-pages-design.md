# Dedicated Project Pages — Design Spec

**Date:** 2026-04-15  
**Extends:** `2026-04-09-landing-page-design.md`

## Overview

Add dedicated per-project pages at `/projects/[slug]` that serve as showcase pages for each project. The homepage project cards keep their expandable detail panel for quick preview, but gain a "View Project" link to the full page.

All project data comes from the existing Project Registry API — no new data sources or API changes needed.

## New Route: `/projects/[slug]`

A Server Component page using Next.js dynamic routes. Fetches a single project by slug from the registry API with the same ISR revalidation (60s) as the homepage.

Returns a 404 (Next.js `notFound()`) if the slug doesn't match any project.

### Page Layout (top to bottom)

#### 1. Back Navigation

- Top of page, above the hero
- "Back to Projects" text link with left-arrow icon
- Links to `/#projects` (homepage projects section)
- Muted color (`text-secondary`), no background

#### 2. Hero Section

- Project icon: large gradient square (matching `iconGradient`), same style as card icons but bigger (~16x16 / 64px)
- Project name: `text-4xl font-extrabold` heading
- Inline metadata next to (or below) the name:
  - Status badge (existing `StatusBadge` component)
  - Version badge: `v{version}` in a subtle pill (only if `version` is not null)
- `longDescription` as body text below the heading
- "Last updated X ago" muted line below description (computed from `updatedAt`, relative time like "3 days ago" or "2 months ago")
- Action buttons row:
  - "Open App" — brand gradient button with external-link icon (only if `links.app` exists)
  - "GitHub" — outline/secondary button with GitHub icon (only if `links.github` exists)
  - "Docs" — outline/secondary button with book icon (only if `links.docs` exists)

#### 3. Features Section

- Section heading: "Features"
- Grid of feature cards, same visual pattern as the existing `ProjectDetail` feature grid
- Each card: feature label (uppercase, muted, small) + feature description
- Responsive: 3 columns desktop (`lg:`), 2 tablet (`sm:`), 1 mobile
- Only render this section if `features.length > 0`

#### 4. Tech Stack Section

- Section heading: "Built With"
- All tech stack items as pills in a `flex-wrap` row
- Same pill style as existing tech stack pills on the homepage
- Only render this section if `techStack.length > 0`

### Visual Style

Follows the existing brand system exactly — no new colors, fonts, or design tokens.

- Page background: `midnight`
- Content sections on `surface` cards/panels with `steel` borders where appropriate
- Max-width container centered, consistent with homepage (`max-w-3xl` or `max-w-4xl`)
- Sections spaced with consistent vertical rhythm (`space-y-12` or similar)
- `SectionFadeIn` animation on each section for scroll-triggered entrance

## Homepage Changes

### ProjectDetail Component

Add a "View Project" link at the bottom of the existing expanded detail panel:

- Positioned after the existing action links (GitHub, Open App)
- Text: "View Full Project" with a right-arrow icon
- Links to `/projects/[slug]`
- Styled as a text link (brand color), not a button — visually distinct from the action buttons

No other homepage changes.

## Data Fetching

### New Function: `getProject(slug: string)`

Add to `data/projects.ts`:

- Fetches all projects via the existing `getProjects()` call
- Filters for the matching slug
- Returns `Project | undefined`
- Reuses the same ISR cache as the homepage (both call the same underlying URL, Next.js deduplicates)

Alternative: if the registry API supports `GET /projects/{slug}` in the future, this can be swapped to a direct fetch. For now, filtering from the list is sufficient and avoids needing API changes.

### Static Params

Use `generateStaticParams()` in the page to pre-render all known project pages at build time. Falls back to on-demand ISR for any new projects added between builds.

## Components

### New Components

- **`ProjectPage`** — main content component for `/projects/[slug]`, receives a `Project` as prop. Server Component.
- **`VersionBadge`** — small pill showing `v{version}`. Similar style to `StatusBadge` but neutral color (e.g., `surface` background, `text-secondary` text).
- **`RelativeTime`** — renders a date as relative time ("3 days ago"). Utility component, takes an ISO date string.

### Reused Components

- `StatusBadge` — unchanged
- `SectionFadeIn` — unchanged
- `Navbar` — unchanged (already sticky, works on all pages)

## Responsive Behavior

Same breakpoints as the rest of the site:

- **Desktop (lg):** Full layout, 3-column feature grid
- **Tablet (sm):** 2-column feature grid
- **Mobile:** Single column, stacked layout

## Edge Cases

- **Project with no features:** Skip the Features section entirely
- **Project with no tech stack:** Skip the Built With section entirely
- **Project with no links:** Show no action buttons (just the description)
- **Version is null:** Don't render the version badge
- **Unknown slug:** Return Next.js 404 page
- **API failure:** Next.js error boundary / error page (existing behavior)
