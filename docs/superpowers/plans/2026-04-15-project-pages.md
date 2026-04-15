# Project Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add dedicated showcase pages at `/projects/[slug]` and a "View Full Project" link in the homepage detail panel.

**Architecture:** New dynamic route using Next.js App Router. Server Component page fetches project by slug (filtering from existing `getProjects()`). Reuses existing components (`StatusBadge`, `SectionFadeIn`) and adds three small new components. Homepage `ProjectDetail` gets a single link addition.

**Tech Stack:** Next.js 16 (App Router, ISR), React 19, TypeScript, Tailwind CSS 4, Lucide React

**Conventions (from project skills):**
- Files: PascalCase for components (per CLAUDE.md project convention)
- Branch: `feature/project-pages`
- Commits: conventional commits, lowercase, imperative, no AI attribution
- TypeScript: `interface` for object shapes/props, explicit return types on exports, no `any`
- Testing: unit test utilities only, skip component render tests

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `app/projects/[slug]/page.tsx` | Dynamic route — fetches project, renders `ProjectPage`, handles 404 |
| Create | `components/ProjectPage.tsx` | Main content component for project showcase page |
| Create | `components/VersionBadge.tsx` | Small pill showing `v{version}` |
| Create | `lib/format-relative-time.ts` | Utility: ISO date string → "3 days ago" |
| Create | `lib/format-relative-time.test.ts` | Unit tests for relative time formatting |
| Modify | `data/projects.ts` | Add `getProject(slug)` function |
| Modify | `components/ProjectDetail.tsx` | Add "View Full Project →" link |

---

### Task 1: Create feature branch

- [ ] **Step 1: Create and switch to feature branch**

```bash
git checkout -b feature/project-pages
```

- [ ] **Step 2: Verify branch**

```bash
git branch --show-current
```

Expected: `feature/project-pages`

---

### Task 2: Add `getProject(slug)` data function

**Files:**
- Modify: `data/projects.ts`

- [ ] **Step 1: Add `getProject` function to `data/projects.ts`**

Add below the existing `getProjects` function:

```typescript
export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Run typecheck to verify**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add data/projects.ts
git commit -m "feat: add getProject(slug) data function"
```

---

### Task 3: Create `format-relative-time` utility (TDD)

**Files:**
- Create: `lib/format-relative-time.ts`
- Create: `lib/format-relative-time.test.ts`

**Note:** If Vitest is not yet set up in this project, install it first:

```bash
npm install -D vitest
```

And add a test script to `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 1: Write failing tests**

Create `lib/format-relative-time.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { formatRelativeTime } from "./format-relative-time";

describe("formatRelativeTime", () => {
  it("returns 'just now' for dates less than a minute ago", () => {
    const now = new Date();
    expect(formatRelativeTime(now.toISOString())).toBe("just now");
  });

  it("returns '1 minute ago' for dates 1 minute ago", () => {
    const date = new Date(Date.now() - 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 minute ago");
  });

  it("returns '5 minutes ago' for dates 5 minutes ago", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("5 minutes ago");
  });

  it("returns '1 hour ago' for dates 1 hour ago", () => {
    const date = new Date(Date.now() - 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 hour ago");
  });

  it("returns '3 hours ago' for dates 3 hours ago", () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("3 hours ago");
  });

  it("returns '1 day ago' for dates 1 day ago", () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 day ago");
  });

  it("returns '5 days ago' for dates 5 days ago", () => {
    const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("5 days ago");
  });

  it("returns '1 month ago' for dates 30 days ago", () => {
    const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 month ago");
  });

  it("returns '1 year ago' for dates 365 days ago", () => {
    const date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 year ago");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL — module `./format-relative-time` not found

- [ ] **Step 3: Implement the utility**

Create `lib/format-relative-time.ts`:

```typescript
export function formatRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return days === 1 ? "1 day ago" : `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;

  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: all 9 tests PASS

- [ ] **Step 5: Commit**

```bash
git add lib/format-relative-time.ts lib/format-relative-time.test.ts
git commit -m "feat: add formatRelativeTime utility with tests"
```

---

### Task 4: Create `VersionBadge` component

**Files:**
- Create: `components/VersionBadge.tsx`

- [ ] **Step 1: Create the component**

Create `components/VersionBadge.tsx`:

```tsx
interface VersionBadgeProps {
  version: string;
}

export function VersionBadge({ version }: VersionBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-surface px-2.5 py-0.5 text-[0.65rem] font-semibold text-text-secondary">
      v{version}
    </span>
  );
}
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/VersionBadge.tsx
git commit -m "feat: add VersionBadge component"
```

---

### Task 5: Create `ProjectPage` component

**Files:**
- Create: `components/ProjectPage.tsx`

This is the main content component for the `/projects/[slug]` route. Server Component — no `'use client'`.

- [ ] **Step 1: Create the component**

Create `components/ProjectPage.tsx`:

```tsx
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { LucideIcon, ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { Project } from "@/types/project";
import { StatusBadge } from "@/components/StatusBadge";
import { VersionBadge } from "@/components/VersionBadge";
import { SectionFadeIn } from "@/components/SectionFadeIn";
import { formatRelativeTime } from "@/lib/format-relative-time";

interface ProjectPageProps {
  project: Project;
}

export function ProjectPage({ project }: ProjectPageProps) {
  const Icon = (LucideIcons[project.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Box;

  return (
    <div className="min-h-screen bg-midnight">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <SectionFadeIn>
          <div className="mb-12">
            <div className="mb-5 flex items-start gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `linear-gradient(135deg, ${project.iconGradient[0]}, ${project.iconGradient[1]})` }}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
                    {project.name}
                  </h1>
                  <StatusBadge status={project.status} />
                  {project.version && <VersionBadge version={project.version} />}
                </div>
                <p className="text-sm text-text-muted">
                  Last updated {formatRelativeTime(project.updatedAt)}
                </p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-text-secondary">
              {project.longDescription}
            </p>
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.links.app && (
                <a
                  href={project.links.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo to-royal px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Open App <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-steel px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-royal/50 hover:text-text-primary"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-steel px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-royal/50 hover:text-text-primary"
                >
                  Docs <BookOpen className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </SectionFadeIn>

        {/* Features Section */}
        {project.features.length > 0 && (
          <SectionFadeIn>
            <div className="mb-12">
              <h2 className="mb-5 text-xl font-extrabold tracking-tight text-text-primary">Features</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature) => (
                  <div key={feature.label} className="rounded-xl border border-steel bg-surface p-5">
                    <p className="mb-1 text-[0.7rem] uppercase tracking-wider text-text-muted">
                      {feature.label}
                    </p>
                    <p className="text-sm text-text-primary">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionFadeIn>
        )}

        {/* Tech Stack Section */}
        {project.techStack.length > 0 && (
          <SectionFadeIn>
            <div className="mb-12">
              <h2 className="mb-5 text-xl font-extrabold tracking-tight text-text-primary">Built With</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-surface px-3 py-1.5 text-xs text-text-muted border border-steel"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </SectionFadeIn>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/ProjectPage.tsx
git commit -m "feat: add ProjectPage showcase component"
```

---

### Task 6: Create `/projects/[slug]` route

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create the route directory**

```bash
mkdir -p app/projects/\[slug\]
```

- [ ] **Step 2: Create the page**

Create `app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/data/projects";
import { ProjectPage } from "@/components/ProjectPage";

import type { Metadata } from "next";

interface ProjectRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found — LMCustoms" };
  }

  return {
    title: `${project.name} — LMCustoms`,
    description: project.description,
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 4: Run build to verify ISR and static generation**

```bash
npm run build
```

Expected: build succeeds, `/projects/[slug]` appears in the route list with static params

- [ ] **Step 5: Commit**

```bash
git add app/projects/\[slug\]/page.tsx
git commit -m "feat: add /projects/[slug] dynamic route with ISR"
```

---

### Task 7: Add "View Full Project" link to homepage detail panel

**Files:**
- Modify: `components/ProjectDetail.tsx`

- [ ] **Step 1: Add Link import and "View Full Project" link**

In `components/ProjectDetail.tsx`, add the `Link` import at the top alongside existing imports:

```typescript
import Link from "next/link";
```

Then add the link inside the action links `div` (the one with `className="flex items-center gap-3"`), after the existing GitHub and Open App links:

```tsx
<Link
  href={`/projects/${project.slug}`}
  className="flex items-center gap-1 text-sm font-semibold text-royal transition-colors hover:text-sky"
>
  View Full Project <ArrowUpRight className="h-3.5 w-3.5" />
</Link>
```

The full action links section becomes:

```tsx
<div className="flex items-center gap-3">
  {project.links.github && (
    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary">
      GitHub <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )}
  {project.links.app && (
    <a href={project.links.app} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo to-royal px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
      Open App <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )}
  <Link
    href={`/projects/${project.slug}`}
    className="flex items-center gap-1 text-sm font-semibold text-royal transition-colors hover:text-sky"
  >
    View Full Project <ArrowUpRight className="h-3.5 w-3.5" />
  </Link>
</div>
```

- [ ] **Step 2: Run typecheck and lint**

```bash
npm run typecheck && npm run lint
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/ProjectDetail.tsx
git commit -m "feat: add 'View Full Project' link to detail panel"
```

---

### Task 8: Visual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Test homepage**

Open `http://localhost:3000` in a browser. Verify:
- Project cards render as before
- Clicking a card expands the detail panel
- Detail panel now shows "View Full Project" link in brand blue
- Clicking "View Full Project" navigates to `/projects/[slug]`

- [ ] **Step 3: Test project page**

On any `/projects/[slug]` page, verify:
- Back navigation link at top ("Back to Projects") navigates to homepage `#projects`
- Hero section shows: large icon, project name, status badge, version badge (if present), "Last updated X ago"
- Long description displays below the heading
- Action buttons show correctly (Open App, GitHub, Docs — only when links exist)
- Features section renders as a grid (skip if no features)
- Tech stack section renders all pills (skip if empty)
- Responsive: check at mobile, tablet, and desktop widths

- [ ] **Step 4: Test 404**

Navigate to `http://localhost:3000/projects/nonexistent-slug`. Verify: Next.js 404 page renders.

- [ ] **Step 5: Run full checks**

```bash
npm run lint && npm run typecheck && npm test
```

Expected: all pass

- [ ] **Step 6: Final commit (if any visual tweaks were made)**

```bash
git add -A
git commit -m "style: polish project page layout"
```

Only commit if adjustments were made during visual verification. Skip if everything looked correct.
