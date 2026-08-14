# Brand Guidelines v1.0 — Haidar Fiaz Portfolio

> Last updated: 2026-08-15
> Status: Draft (derived from existing `src/app/globals.css` + site content)

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #0F67E0 (blue) |
| Accent Color | #00B1A7 (teal) |
| Primary Font | Geist Sans |
| Mono Font | Geist Mono |
| Voice | Confident, concrete, no-fluff engineering |

---

## 1. Color Palette

Site uses OKLCH tokens in `src/app/globals.css` with light/dark variants (Tailwind v4, CSS-first `@theme inline`, shadcn/ui token names). Hex values below are the sRGB conversion for reference outside CSS.

### Primary Colors

| Name | OKLCH (light) | Hex (light) | OKLCH (dark) | Hex (dark) | Usage |
|------|------|------|------|------|-------|
| Primary Blue | oklch(0.54 0.2 259) | #0F67E0 | oklch(0.71 0.15 254) | #59A4FC | CTAs, links, ring, focus states |
| Accent Teal | oklch(0.68 0.13 188) | #00B1A7 | oklch(0.77 0.12 188) | #3CCDC2 | Highlights, glow, secondary accents |

### Neutral Palette

| Name | OKLCH (light) | Hex (light) | OKLCH (dark) | Hex (dark) | Usage |
|------|------|------|------|------|-------|
| Background | oklch(0.995 0.002 250) | #FCFDFF | oklch(0.155 0.022 260) | #070C16 | Page background |
| Foreground | oklch(0.19 0.03 255) | #0A1421 | oklch(0.96 0.01 250) | #EDF2F8 | Body text, headings |
| Card | oklch(1 0 0) | #FFFFFF | oklch(0.196 0.024 260) | — | Cards, popovers |
| Secondary / Muted | oklch(0.965 0.008 250) | — | oklch(0.25 0.024 260) | — | Subtle surfaces |
| Muted Foreground | oklch(0.5 0.02 256) | #5C646F | oklch(0.7 0.02 256) | — | Captions, secondary text |
| Border / Input | oklch(0.915 0.012 252) | — | oklch(1 0 0 / 0.1) | — | Dividers, form borders |

### Semantic Colors

| State | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| Destructive | oklch(0.58 0.22 27) | #DF2225 | Errors, destructive actions |
| Ring / Focus | = Primary Blue | #0F67E0 | Focus outlines |

Theme color meta tags (`layout.tsx` viewport): light `#ffffff`, dark `#0b1220`.

### Accessibility

- Foreground vs. background exceeds WCAG AAA in both themes (near-black on near-white; near-white on near-black).
- Primary blue on white/card surfaces meets AA for large text and UI components; verify AA for small body text before using primary as a text color on light backgrounds.
- `--surface` tokens are intentionally solid (not `backdrop-filter`) to avoid scroll jank — keep this constraint when adding new glass/blur effects.

---

## 2. Typography

### Font Stack

Loaded via `geist/font/sans` and `geist/font/mono` (Vercel's Geist, self-hosted through `next/font`), exposed as `--font-geist-sans` / `--font-geist-mono` and mapped to `--font-sans` / `--font-mono`.

```css
--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, monospace;
```

No serif in use — keep it that way; the site's voice is technical, not editorial.

### Type Scale

Not yet formalized in code beyond Tailwind's default scale. Recommended scale to standardize on (matches current heading sizes seen in hero/about sections):

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 48–56px | 32px | 700 | 1.1 |
| H2 | 32px | 26px | 600 | 1.2 |
| H3 | 24px | 20px | 600 | 1.3 |
| Body | 16px | 16px | 400 | 1.6 |
| Body Large | 18px | 17px | 400 | 1.6 |
| Small / Caption | 14px | 13px | 400 | 1.5 |

---

## 3. Logo Usage

No custom logo or favicon artwork exists yet — only the default `src/app/favicon.ico` and Next.js placeholder SVGs (`next.svg`, `vercel.svg`, etc.) in `public/`. Also no dedicated `og-image`.

**Open item:** if a wordmark/monogram is wanted (e.g. "HF" mark), generate it against Primary Blue (#0F67E0) / Accent Teal (#00B1A7) and add it here once created, along with a proper OG image for social shares.

---

## 4. Voice & Tone

Derived from existing copy in `src/components/sections/` (hero, about, skills) and `layout.tsx` metadata.

### Brand Personality

| Trait | Description |
|-------|--------------|
| **Concrete** | Leads with shipped, verifiable work ("Two apps live on the App Store, a marketplace in production") over vague claims |
| **Confident** | States capability directly, no hedging |
| **Technical** | Names the actual stack (Next.js, TypeScript, React Native, GraphQL, PostgreSQL, RAG/LangChain) rather than generic buzzwords |
| **Direct** | Short, declarative sentences; no filler |

### Voice Chart

| Trait | We Are | We Are Not |
|-------|--------|------------|
| Concrete | Specific outcomes, real numbers ("40-person team") | Vague ("many happy clients") |
| Confident | Assured, evidence-backed | Arrogant, overselling |
| Technical | Named tools and real architecture | Buzzword soup |
| Direct | Short, plain sentences | Wordy, marketing-speak |

### Tone by Context

| Context | Tone | Example (from site) |
|---------|------|----------------------|
| Hero / positioning | Direct, outcome-first | "Full-Stack React Developer building fast, scalable web and mobile products" |
| Proof / credibility | Concrete, specific | "Not a notebook experiment — code the next engineer can actually pick up" |
| Metadata / SEO | Plain, keyword-honest | "Next.js, TypeScript, React Native, GraphQL and AI-powered search" |

### Prohibited Terms

| Avoid | Reason |
|-------|--------|
| Revolutionary | Overused, unverifiable |
| Best-in-class | Vague claim |
| Seamless | Overused |
| Synergy / Leverage | Corporate jargon — use plain verbs |
| Rockstar / Ninja / Guru | Cliché developer self-titles |

---

## 5. Design Components

Sourced from `src/app/globals.css` custom properties — reuse these tokens rather than hardcoding new values.

### Radius

| Token | Value |
|-------|-------|
| `--radius` | 0.875rem (14px), scaled via `--radius-sm/md/lg/xl` in `@theme inline` |

### Effects

| Token | Purpose |
|-------|---------|
| `--grid-line` | Subtle background grid, primary-tinted |
| `--glow-a` / `--glow-b` | Primary/accent glow accents (blue → teal) |
| `--surface` / `--surface-strong` | Solid (non-blurred) translucent-look surfaces — deliberately avoids `backdrop-filter` for scroll performance |

---

## AI Image Generation

### Base Prompt Template

```
Clean, technical, modern developer-portfolio aesthetic. Primary blue #0F67E0, teal accent #00B1A7,
near-white background #FCFDFF (or near-black #070C16 for dark mode). Soft ambient glow gradients
blue-to-teal, subtle grid-line texture, generous whitespace, sharp geometric shapes, no clutter.
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| **Lighting** | Soft ambient glow, subtle gradient light, no harsh shadows |
| **Mood** | Confident, precise, technical, calm |
| **Composition** | Minimal, grid-aligned, generous negative space |
| **Treatment** | High clarity, low noise, sharp edges |
| **Aesthetic** | Modern SaaS/dev-tool aesthetic, not playful or whimsical |

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Stock-photo "coder in hoodie" clichés | Generic, doesn't match concrete/technical voice |
| Bright rainbow gradients | Off-palette — stick to blue/teal |
| Skeuomorphic textures, drop shadows | Conflicts with clean, flat token system |
| Blur-heavy glassmorphism | Site explicitly avoids `backdrop-filter` for performance |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-15 | Initial guidelines, derived from existing `globals.css` tokens, Geist fonts, and site copy |
