# Haidar Fiaz — Portfolio

An animated, scroll-driven portfolio. White (or deep navy) canvas, blue + teal
accents, pattern lines with skill icons riding them, a counting intro, a
scroll-drawn experience timeline and a pinned **horizontal** projects rail.

## Stack

| Layer      | Choice                                                 |
| ---------- | ------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, TypeScript, Turbopack)         |
| Styling    | Tailwind CSS v4 (OKLCH CSS-variable theme)             |
| Components | shadcn/ui (button, card, badge, tooltip, separator)    |
| Animation  | GSAP + ScrollTrigger, plus native CSS/IO where cheaper |
| Scrolling  | Lenis smooth scroll, driven by the GSAP ticker         |
| Icons      | react-icons (Simple Icons) + lucide-react              |
| Theming    | next-themes (light / dark, class strategy)             |
| Fonts      | Geist Sans + Geist Mono, self-hosted                   |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Scroll choreography

1. **Vertical** — Hero → About → Skills
2. **Vertical, scrubbed** — experience timeline; the rail fills and a dial
   tracks progress as you read
3. **Horizontal, pinned** — `#work` pins to the viewport and the project rail
   translates on X for its full length, then releases
4. **Vertical again** — Credentials → Contact → Footer

## Performance notes

This site was profiled and rebuilt around one rule: **nothing expensive runs on
the scroll thread.** Measured in headless Chromium (mobile figures at 4× CPU
throttle), before → after:

| Metric             | Before  | After    |
| ------------------ | ------- | -------- |
| LCP (desktop)      | 1776 ms | ~570 ms  |
| Median frame (dsk) | 300 ms  | 17–33 ms |
| Median frame (mob) | 167 ms  | 16.7 ms  |
| Janky frames (mob) | 98 %    | ~32 %    |
| Time to usable     | 5.6 s   | ~2.1 s   |

What actually moved the needle, in rough order:

- **No `backdrop-filter`.** A blurred surface over a moving page is
  re-rasterised every frame. Cards use a translucent solid fill (`.surface`)
  instead — visually near-identical over the soft background, free to composite.
- **No blur filters for glow.** Three `blur-[120px]` blobs became plain
  `radial-gradient`s painted once into one promoted layer.
- **No `setState` on scroll.** The timeline dial and the rail progress bar
  wrote React state on every scroll frame, re-rendering whole sections ~60×/s.
  They now write to the DOM through refs.
- **Reveals are IntersectionObserver + CSS transition**, not ~60 ScrollTriggers.
  The old `Reveal` also called `ScrollTrigger.refresh()` on every unmount.
- **The cursor stopped allocating a tween per mousemove.** One rAF loop that
  parks itself when the pointer stops.
- **Deferred init.** The pinned rail (which forces layout to build) is created
  only when the section is within ~1.5 screens; `SmoothScroll` and `Cursor` are
  `next/dynamic` so they leave the hydration path.
- `optimizePackageImports` for the icon barrels.

Keep these in mind before adding effects — a single stray `backdrop-blur` on a
repeated card will undo a good chunk of it.

## Where things live

```
src/
├─ app/
│  ├─ layout.tsx          # fonts, metadata, providers
│  ├─ globals.css         # tokens (light + dark), utilities, keyframes
│  └─ page.tsx            # section composition (the scroll order above)
├─ components/
│  ├─ ui/                 # shadcn primitives
│  ├─ effects/            # preloader, pattern background, reveal, cursor,
│  │                      # magnetic, spotlight, count-up, scramble, local-time
│  ├─ layout/             # navbar, theme toggle, footer
│  ├─ providers/          # theme, loader gate, tooltip
│  └─ sections/           # hero, about, skills, timeline, projects,
│                         # certifications, contact
├─ hooks/use-media-query.ts   # SSR-safe media queries (cached MediaQueryList)
└─ lib/
   ├─ data.ts             # ALL content lives here — edit this, not components
   └─ gsap.ts             # the one place ScrollTrigger is registered
```

## Editing content

Everything textual — profile, stats, skills, signature stack, timeline,
projects, certifications, nav — is in `src/lib/data.ts`. Add a project object
and it appears in the horizontal rail with the right counter and progress bar.

To add a tool, import its icon from `react-icons/si` and add an entry to
`skills`. If the brand mark is near-black (Next.js, shadcn, LangChain), set
`mono: true` so it follows the theme instead of vanishing in dark mode.

`signatureStack` is the four-item feature tile; each entry lists the real
products that tech shipped in, so keep those attributions truthful.

## Colour system

OKLCH CSS variables in `globals.css` (`:root` and `.dark`): `--primary` (blue),
`--accent` (teal), plus `--grid-line`, `--glow-*` and the `--surface` fills.
Change primary and accent and the whole site re-skins.

## Accessibility

- Every animation is gated behind `prefers-reduced-motion`: the intro skips,
  the rail becomes a normal swipeable scroller, transitions are disabled.
- The intro only plays once per session (`sessionStorage`).
- Reveal classes are applied by JS, so with JS disabled content stays visible.
- All controls are real buttons and links; the tool filter is a proper tablist.

## Deploy

No environment variables, no server runtime — push to GitHub and import to
Vercel, or `vercel deploy`. Output is fully static (`○ prerendered`).
