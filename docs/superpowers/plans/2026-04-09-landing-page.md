# LMCustoms Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the lmcustoms.cc landing page — a dark-themed org portfolio showcasing projects with expandable detail views, about section, and contact footer.

**Architecture:** Next.js App Router with static project data from a JSON file. Server Components by default, `'use client'` only for interactive pieces (nav scroll detection, project card expansion, scroll animations). Tailwind CSS with custom brand tokens. Logo SVGs served from `public/`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Lucide React, Inter (Google Fonts), Docker (standalone output)

---

## File Structure

```
landing/
├── app/
│   ├── layout.tsx          # Root layout: Inter font, metadata, body styling
│   ├── page.tsx            # Home page: composes all sections
│   └── globals.css         # Tailwind directives + custom animations
├── components/
│   ├── Navbar.tsx          # Sticky nav (client: scroll detection)
│   ├── Hero.tsx            # Hero section (server)
│   ├── Wordmark.tsx        # Reusable LM wordmark (server)
│   ├── ProjectsSection.tsx # Section wrapper + grid (server)
│   ├── ProjectCard.tsx     # Individual project card (client: click to expand)
│   ├── ProjectDetail.tsx   # Expanded detail panel (server)
│   ├── AboutSection.tsx    # About section (server)
│   ├── ContactFooter.tsx   # Contact + footer (server)
│   ├── SectionFadeIn.tsx   # Scroll fade-in wrapper (client: IntersectionObserver)
│   └── StatusBadge.tsx     # Status badge pill (server)
├── data/
│   └── projects.ts         # Project data + getter function
├── types/
│   └── project.ts          # Project interface
├── public/
│   ├── logo-icon-only.svg  # Monogram (copied from branding)
│   ├── logo-primary.svg    # Full logo (copied from branding)
│   └── favicon.svg         # Favicon (copied from branding)
├── tailwind.config.ts      # Brand tokens
├── Dockerfile              # Standalone Next.js production image
├── docker-compose.yml      # Docker Compose with Traefik labels
└── package.json
```

---

### Task 1: Project Scaffolding & Tailwind Config

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Copy: `public/logo-icon-only.svg`, `public/logo-primary.svg`, `public/favicon.svg`

- [ ] **Step 1: Initialize Next.js project**

Run from the `landing/` directory. Since we already have files (`.gitignore`, `README.md`, docs), use `--no-git` to avoid reinitializing:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-git --use-npm
```

When prompted, accept defaults. This creates the base Next.js structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install lucide-react
```

- [ ] **Step 3: Copy brand assets to public/**

```bash
cp ../branding/assets/logo-icon-only.svg public/logo-icon-only.svg
cp ../branding/assets/logo-primary.svg public/logo-primary.svg
cp ../branding/assets/favicon.svg public/favicon.svg
cp ../branding/assets/favicon.png public/favicon.png
```

- [ ] **Step 4: Configure Tailwind with brand tokens**

Replace the generated `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0F172A",
        surface: "#1E293B",
        steel: "#334155",
        royal: "#3B82F6",
        indigo: "#6366F1",
        sky: "#0EA5E9",
        teal: "#06B6D4",
        emerald: "#10B981",
        "text-primary": "#E2E8F0",
        "text-secondary": "#94A3B8",
        "text-muted": "#64748B",
        "text-dim": "#475569",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Write globals.css**

Replace the generated `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-midnight: #0F172A;
  --color-surface: #1E293B;
  --color-steel: #334155;
  --color-royal: #3B82F6;
  --color-indigo: #6366F1;
  --color-sky: #0EA5E9;
  --color-teal: #06B6D4;
  --color-emerald: #10B981;
  --color-text-primary: #E2E8F0;
  --color-text-secondary: #94A3B8;
  --color-text-muted: #64748B;
  --color-text-dim: #475569;

  --font-sans: var(--font-inter), system-ui, sans-serif;

  --animate-glow-pulse: glow-pulse 4s ease-in-out infinite;
  --animate-fade-in-up: fade-in-up 0.6s ease-out forwards;

  @keyframes glow-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-midnight);
  color: var(--color-text-primary);
}
```

- [ ] **Step 6: Write root layout**

Replace `app/layout.tsx`:

```tsx
import { Inter } from "next/font/google";
import "./globals.css";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "LMCustoms — Custom Dev Tools",
  description:
    "LMCustoms is a software studio building thoughtful developer tools and self-hosted solutions.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Write placeholder page**

Replace `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-extrabold text-text-primary">
        <span className="bg-gradient-to-r from-royal to-sky bg-clip-text text-transparent">
          LM
        </span>
        <span className="font-light">Customs</span>
      </h1>
    </main>
  );
}
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server starts at `http://localhost:3000`, shows the LMCustoms wordmark centered on a dark background.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind brand tokens"
```

---

### Task 2: Project Data Layer

**Files:**
- Create: `types/project.ts`
- Create: `data/projects.ts`

- [ ] **Step 1: Create the Project interface**

Create `types/project.ts`:

```typescript
export interface ProjectFeature {
  label: string;
  description: string;
}

export interface ProjectLinks {
  github?: string;
  app?: string;
  docs?: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  iconGradient: [string, string];
  status: "in-development" | "beta" | "released" | "deprecated";
  version?: string;
  techStack: string[];
  features: ProjectFeature[];
  links: ProjectLinks;
}
```

- [ ] **Step 2: Create the project data**

Create `data/projects.ts`:

```typescript
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "neo-dock",
    name: "Neo-Dock",
    description:
      "Self-hosted monitoring dashboard for homelabs with a cyberpunk aesthetic.",
    longDescription:
      "A self-hosted monitoring dashboard for homelabs and private infrastructure. Features real-time server metrics, Docker container management, GitHub integration, and a cyberpunk-inspired interface.",
    icon: "Monitor",
    iconGradient: ["#6366F1", "#3B82F6"],
    status: "in-development",
    techStack: ["React 19", "TypeScript", "Fastify", "Tailwind CSS", "WebSocket"],
    features: [
      {
        label: "Monitoring",
        description: "CPU, RAM, disk, network via WebSocket",
      },
      {
        label: "Containers",
        description: "Docker status, stats, logs, and actions",
      },
      {
        label: "Integrations",
        description: "GitHub, email inbox, cron jobs",
      },
    ],
    links: {
      github: "https://github.com/LMCustoms/neo-dock",
    },
  },
  {
    slug: "wrapped",
    name: "Wrapped",
    description:
      "Native macOS email client for JMAP servers. Clean three-pane interface built with Tauri.",
    longDescription:
      "A native macOS email client built with Tauri and React, designed for use with any JMAP-compatible mail server. Features a clean three-pane layout with sidebar, message list, and detail view.",
    icon: "Mail",
    iconGradient: ["#3B82F6", "#0EA5E9"],
    status: "in-development",
    techStack: ["Tauri", "React 18", "TypeScript", "Zustand", "JMAP"],
    features: [
      {
        label: "Native App",
        description: "macOS-native via Tauri with minimal footprint",
      },
      {
        label: "JMAP Protocol",
        description: "Full RFC 8620/8621 support, works with Stalwart",
      },
      {
        label: "Three-Pane UI",
        description: "Folders, message list, and detail view",
      },
    ],
    links: {
      github: "https://github.com/LMCustoms/wrapped",
    },
  },
  {
    slug: "vaultwarden-mcp-server",
    name: "Vaultwarden MCP",
    description:
      "MCP server for managing your Vaultwarden vault through AI assistants.",
    longDescription:
      "An MCP (Model Context Protocol) server for managing a self-hosted Vaultwarden/Bitwarden vault. Wraps the official Bitwarden CLI with native encryption handling for secure vault operations through AI assistants.",
    icon: "Lock",
    iconGradient: ["#06B6D4", "#10B981"],
    status: "released",
    version: "1.0.0",
    techStack: ["Node.js", "MCP", "Bitwarden CLI", "TypeScript"],
    features: [
      {
        label: "Vault Management",
        description: "Search, retrieve, create, and edit vault items",
      },
      {
        label: "Security",
        description: "Native Bitwarden CLI encryption, TOTP generation",
      },
      {
        label: "AI Integration",
        description: "Works with Claude Desktop and MCP-compatible clients",
      },
    ],
    links: {
      github: "https://github.com/LMCustoms/vaultwarden-mcp-server",
    },
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add types/project.ts data/projects.ts
git commit -m "feat: add project data model and initial project entries"
```

---

### Task 3: Shared Components (Wordmark, StatusBadge, SectionFadeIn)

**Files:**
- Create: `components/Wordmark.tsx`
- Create: `components/StatusBadge.tsx`
- Create: `components/SectionFadeIn.tsx`

- [ ] **Step 1: Create the Wordmark component**

Create `components/Wordmark.tsx`:

```tsx
interface WordmarkProps {
  size?: "sm" | "lg";
}

export function Wordmark({ size = "lg" }: WordmarkProps) {
  const lmClass =
    size === "lg"
      ? "text-5xl font-extrabold tracking-[-3px]"
      : "text-sm font-extrabold";
  const customsClass =
    size === "lg"
      ? "text-5xl font-light tracking-[-2px] text-text-primary"
      : "text-sm font-light text-text-muted";

  return (
    <span className="inline-flex items-baseline">
      <span
        className={`${lmClass} bg-gradient-to-r from-royal to-sky bg-clip-text text-transparent`}
      >
        LM
      </span>
      <span className={customsClass}>Customs</span>
    </span>
  );
}
```

- [ ] **Step 2: Create the StatusBadge component**

Create `components/StatusBadge.tsx`:

```tsx
import { Project } from "@/types/project";

interface StatusBadgeProps {
  status: Project["status"];
}

const statusConfig: Record<
  Project["status"],
  { label: string; className: string }
> = {
  "in-development": {
    label: "In Development",
    className: "bg-indigo/15 text-[#818CF8]",
  },
  beta: {
    label: "Beta",
    className: "bg-[#F59E0B]/15 text-[#F59E0B]",
  },
  released: {
    label: "Released",
    className: "bg-emerald/15 text-[#34D399]",
  },
  deprecated: {
    label: "Deprecated",
    className: "bg-steel/15 text-text-muted",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${config.className}`}
    >
      {config.label}
    </span>
  );
}
```

- [ ] **Step 3: Create the SectionFadeIn component**

Create `components/SectionFadeIn.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface SectionFadeInProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionFadeIn({ children, className = "" }: SectionFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add components/Wordmark.tsx components/StatusBadge.tsx components/SectionFadeIn.tsx
git commit -m "feat: add shared Wordmark, StatusBadge, and SectionFadeIn components"
```

---

### Task 4: Navbar

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create the Navbar component**

Create `components/Navbar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wordmark } from "@/components/Wordmark";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-surface bg-midnight/90 backdrop-blur-xl transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo-icon-only.svg"
            alt="LMCustoms"
            width={24}
            height={24}
          />
          <Wordmark size="sm" />
        </a>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add sticky navbar with scroll-triggered visibility"
```

---

### Task 5: Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create the Hero component**

Create `components/Hero.tsx`:

```tsx
import Image from "next/image";
import { Wordmark } from "@/components/Wordmark";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,rgba(59,130,246,0.08)_40%,transparent_70%)] animate-glow-pulse" />

      {/* Logo */}
      <div className="relative mb-8">
        <Image
          src="/logo-icon-only.svg"
          alt="LMCustoms monogram"
          width={100}
          height={100}
          priority
          className="drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
        />
      </div>

      {/* Wordmark */}
      <div className="relative mb-6">
        <Wordmark size="lg" />
      </div>

      {/* Tagline */}
      <p className="text-sm font-semibold uppercase tracking-[5px] text-text-secondary">
        Crafting Digital Tools & Experiences
      </p>

      {/* Scroll indicator */}
      <a
        href="#projects"
        className="absolute bottom-8 flex flex-col items-center gap-2 text-text-dim transition-colors hover:text-text-secondary"
      >
        <span className="text-[0.7rem] uppercase tracking-[3px]">Explore</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add hero section with animated glow and scroll indicator"
```

---

### Task 6: Project Card & Detail Components

**Files:**
- Create: `components/ProjectCard.tsx`
- Create: `components/ProjectDetail.tsx`
- Create: `components/ProjectsSection.tsx`

- [ ] **Step 1: Create the ProjectDetail component**

Create `components/ProjectDetail.tsx`:

```tsx
import { Project } from "@/types/project";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowUpRight } from "lucide-react";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-steel bg-surface">
      {/* Gradient accent bar */}
      <div className="h-1 bg-gradient-to-r from-indigo via-royal to-sky" />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-2xl font-extrabold text-text-primary">
                {project.name}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
              {project.longDescription}
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {project.features.map((feature) => (
            <div key={feature.label} className="rounded-lg bg-midnight p-4">
              <p className="mb-1 text-[0.7rem] uppercase tracking-wider text-text-muted">
                {feature.label}
              </p>
              <p className="text-sm text-text-primary">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Tech stack + actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-midnight px-2.5 py-1 text-[0.65rem] text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.links.app && (
              <a
                href={project.links.app}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo to-royal px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Open App
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the ProjectCard component**

Create `components/ProjectCard.tsx`:

```tsx
"use client";

import { Project } from "@/types/project";
import { StatusBadge } from "@/components/StatusBadge";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
  const Icon = (LucideIcons[project.icon as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Box;

  return (
    <button
      onClick={onClick}
      className={`group w-full cursor-pointer rounded-xl border bg-surface p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
        isSelected
          ? "border-royal shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          : "border-steel hover:border-royal/50"
      }`}
    >
      {/* Icon + badge */}
      <div className="mb-3 flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${project.iconGradient[0]}, ${project.iconGradient[1]})`,
          }}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Name + description */}
      <h3 className="mb-1.5 text-lg font-bold text-text-primary">
        {project.name}
      </h3>
      <p className="mb-3 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded bg-midnight px-2 py-0.5 text-[0.6rem] text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </button>
  );
}
```

- [ ] **Step 3: Create the ProjectsSection component**

Create `components/ProjectsSection.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetail } from "@/components/ProjectDetail";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.slug === selectedSlug);

  const handleCardClick = (slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id="projects" className="border-t border-surface px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[5px] text-royal">
            What We&apos;re Building
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary">
            Projects
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isSelected={selectedSlug === project.slug}
              onClick={() => handleCardClick(project.slug)}
            />
          ))}
        </div>

        {/* Expanded detail */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            selectedProject
              ? "mt-6 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {selectedProject && <ProjectDetail project={selectedProject} />}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add components/ProjectCard.tsx components/ProjectDetail.tsx components/ProjectsSection.tsx
git commit -m "feat: add project card grid with expandable detail panel"
```

---

### Task 7: About Section

**Files:**
- Create: `components/AboutSection.tsx`

- [ ] **Step 1: Create the AboutSection component**

Create `components/AboutSection.tsx`:

```tsx
export function AboutSection() {
  return (
    <section id="about" className="border-t border-surface px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        {/* Section header */}
        <p className="mb-1 text-xs font-semibold uppercase tracking-[5px] text-royal">
          Behind the Code
        </p>
        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-text-primary">
          About
        </h2>

        {/* Profile card */}
        <div className="flex items-center gap-6 rounded-2xl border border-steel bg-surface p-6 text-left">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo via-royal to-sky">
            <span className="text-2xl font-extrabold text-white">AS</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-text-primary">
              Anian Sollinger
            </h3>
            <p className="mb-2 text-sm text-royal">Founder & Developer</p>
            <p className="text-sm leading-relaxed text-text-secondary">
              LMCustoms is a one-person software studio based in Germany,
              focused on building thoughtful developer tools and self-hosted
              solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/AboutSection.tsx
git commit -m "feat: add about section with profile card"
```

---

### Task 8: Contact & Footer

**Files:**
- Create: `components/ContactFooter.tsx`

- [ ] **Step 1: Create the ContactFooter component**

Create `components/ContactFooter.tsx`:

```tsx
import { Mail, Github } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-surface px-6">
      {/* Contact */}
      <div className="mx-auto max-w-5xl py-20 text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[5px] text-royal">
          Get In Touch
        </p>
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-text-primary">
          Let&apos;s Connect
        </h2>
        <p className="mb-8 text-sm text-text-secondary">
          Have a question or want to collaborate?
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:anian@lmcustoms.cc"
            className="flex items-center gap-2 rounded-lg border border-steel bg-surface px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-royal/50"
          >
            <Mail className="h-4 w-4 text-text-secondary" />
            anian@lmcustoms.cc
          </a>
          <a
            href="https://github.com/LMCustoms"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-steel bg-surface px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-royal/50"
          >
            <Github className="h-4 w-4 text-text-secondary" />
            GitHub
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between border-t border-surface py-6">
        <Wordmark size="sm" />
        <p className="text-xs text-text-dim">
          &copy; {new Date().getFullYear()} LMCustoms. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/ContactFooter.tsx
git commit -m "feat: add contact section and footer"
```

---

### Task 9: Assemble the Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Wire up all sections in page.tsx**

Replace `app/page.tsx`:

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactFooter } from "@/components/ContactFooter";
import { SectionFadeIn } from "@/components/SectionFadeIn";
import { getProjects } from "@/data/projects";

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionFadeIn>
          <ProjectsSection projects={projects} />
        </SectionFadeIn>
        <SectionFadeIn>
          <AboutSection />
        </SectionFadeIn>
        <SectionFadeIn>
          <ContactFooter />
        </SectionFadeIn>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify the full page builds**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output shows the root page as a static page.

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Expected: All sections render correctly at `http://localhost:3000`:
- Sticky nav appears on scroll
- Hero with monogram, wordmark, tagline, scroll indicator
- Project cards in 3-column grid, clickable with expanding detail panel
- About section with profile card
- Contact with email/GitHub buttons
- Footer with wordmark and copyright

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page with all sections"
```

---

### Task 10: Responsive Polish & Cleanup

**Files:**
- Modify: `components/Hero.tsx` (mobile adjustments)
- Modify: `components/ProjectDetail.tsx` (mobile feature grid)
- Modify: `components/AboutSection.tsx` (mobile stacking)

- [ ] **Step 1: Adjust Hero for mobile**

In `components/Hero.tsx`, update the wordmark container to scale down on small screens. Change:

```tsx
      <div className="relative mb-6">
        <Wordmark size="lg" />
      </div>
```

To:

```tsx
      <div className="relative mb-6 scale-75 sm:scale-100">
        <Wordmark size="lg" />
      </div>
```

- [ ] **Step 2: Adjust AboutSection for mobile stacking**

In `components/AboutSection.tsx`, change the profile card flex to stack on mobile. Change:

```tsx
        <div className="flex items-center gap-6 rounded-2xl border border-steel bg-surface p-6 text-left">
```

To:

```tsx
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-steel bg-surface p-6 text-center sm:flex-row sm:items-center sm:text-left">
```

- [ ] **Step 3: Verify responsive behavior**

```bash
npm run dev
```

Check at these widths in browser DevTools:
- **375px** (mobile): Single column cards, stacked about card, readable text
- **768px** (tablet): Two-column cards
- **1280px** (desktop): Three-column cards, full layout

- [ ] **Step 4: Run lint and typecheck**

```bash
npm run lint && npx tsc --noEmit
```

Expected: No errors or warnings.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/AboutSection.tsx
git commit -m "fix: responsive layout adjustments for mobile and tablet"
```

---

### Task 11: Dockerfile & Docker Compose

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Modify: `next.config.ts` (standalone output)

- [ ] **Step 1: Configure standalone output**

In `next.config.ts`, set the output mode:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 2: Create the Dockerfile**

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

- [ ] **Step 3: Create docker-compose.yml**

Create `docker-compose.yml`:

```yaml
services:
  landing:
    build: .
    container_name: lmcustoms-landing
    restart: unless-stopped
    expose:
      - "3000"
    networks:
      - traefik
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.lmcustoms-landing.rule=Host(`lmcustoms.cc`)"
      - "traefik.http.routers.lmcustoms-landing.entrypoints=websecure"
      - "traefik.http.routers.lmcustoms-landing.tls.certresolver=letsencrypt"
      - "traefik.http.services.lmcustoms-landing.loadbalancer.server.port=3000"

networks:
  traefik:
    external: true
```

- [ ] **Step 4: Verify Docker build**

```bash
docker build -t lmcustoms-landing .
```

Expected: Build completes successfully.

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml next.config.ts
git commit -m "feat: add Dockerfile and docker-compose with Traefik labels"
```

---

### Task 12: Final Build Verification

- [ ] **Step 1: Clean build from scratch**

```bash
rm -rf .next node_modules
npm ci
npm run build
```

Expected: Build succeeds, output shows standalone mode.

- [ ] **Step 2: Run lint and typecheck**

```bash
npm run lint && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Test production server locally**

```bash
node .next/standalone/server.js
```

Expected: Server starts on port 3000, all sections render correctly.

- [ ] **Step 4: Final commit if any remaining changes**

```bash
git status
```

If clean, done. If changes remain:

```bash
git add -A
git commit -m "chore: final build verification cleanup"
```
