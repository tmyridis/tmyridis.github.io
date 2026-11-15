@AGENTS.md

# tmyridis portfolio

Personal portfolio site. Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + GSAP + three.js, deployed as a static site to GitHub Pages.

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: production build
- `npm run lint`: ESLint 9 flat config (`eslint.config.mjs`)
- `npx tsc --noEmit`: typecheck

There are no tests. Before calling a change done, run typecheck, lint and build, and check the page in the browser.

## Deployment

Pushing to `master` runs `.github/workflows/nextjs.yml`. At CI time, `actions/configure-pages` injects `output: "export"` and `images.unoptimized` into `next.config.mjs`, so the site must stay fully static. That rules out API routes, middleware, server actions, dynamic rendering and on-demand image optimization. A plain local `npm run build` is not a static export. To reproduce CI, temporarily set those two options and check that `out/` is produced.

## Layout

The site is a single page whose sections animate with scroll, around a 3D avatar. `app/page.tsx` stacks the sections from `app/components/`:

- `scroll-fx.tsx`: Lenis smooth scrolling, plus the text reveal for any element with `data-reveal="chars"` or `data-reveal="words"`
- `cursor.tsx` / `fluid.ts`: coloured smoke that trails the pointer, a WebGL2 fluid simulation on a fixed canvas behind the page (mouse only). The loop stops 10 seconds after the last pointer event
- `nav.tsx`: fixed header with a pill of links that highlights the section on screen
- `landing.tsx`: the name set edge to edge across the avatar's chest, the role and a line that retypes its last word, and `character.tsx`
- `character.tsx` / `character-scene.ts` / `avatar.ts` / `desk.ts` / `ide.ts` / `toon.ts`: the three.js scene. `avatar.ts` builds the avatar from primitives (no model file) and poses it each frame; `desk.ts` builds the desk, monitor, PC and chair the same way; `ide.ts` draws the glass code editor that stands behind the desk on a canvas, typing and deleting the code in its `FILES` while he types; `toon.ts` holds the cel shading and ink outline the models share; `character-scene.ts` adds the lights and camera. On desktop the canvas is fixed and three scrubbed timelines move it through Landing, About and What I do; elsewhere it sits in the landing
- `about.tsx`, `what-i-do.tsx`: bio, and the editor-style panel the camera pulls back to, with a tab per side of the stack that switches on a timer (the `.what-timer` CSS animation; its `animationend` opens the next tab)
- `career.tsx`: jobs as rows that reveal on scroll, beside a line that grows with scroll, rendered from `app/data/career.json` (`end: null` means the current job)
- `work.tsx`: project cards in a row that scrolls sideways while the section is pinned, rendered from `app/data/projects.json`
- `stack.tsx`: tech icons from `public/images/` in two rows that drift sideways with scroll
- `contact.tsx`: email and social links as rows, and the footer

`app/not-found.tsx` redirects every unknown route to `/`.

To add a project, add an entry to `app/data/projects.json` and put its screenshot in `public/images/`. `techStack` entries are display labels.

## Styling

- Tailwind 4 is configured in CSS (`@theme` in `app/globals.css`). There is no `tailwind.config.ts`.
- Use the theme colors (`bg`, `panel`, `line`, `ink`, `muted`, `violet`, `deep`, `pink`) instead of raw values. Violet is the main color and pink is a small accent. All text is JetBrains Mono (`font-mono`).
- Tailwind only generates classes it finds as complete literal strings, so don't build class names from variables.

## Gotchas

- Import GSAP from `app/lib/gsap.ts`, which registers the plugins. Create every animation inside `gsap.matchMedia()` with its `MOTION` or `DESKTOP` query, so nothing moves under `prefers-reduced-motion` and the page still reads without JS animation. CSS animations are switched off in the media query in `globals.css`.
- GSAP finds elements by id and by a few plain class names (`.landing-container`, `.about-me`, `.what-cards`, `.character-model`, `.character-rim`), some from another component's timeline. Search for a hook before renaming it.
- The pinned Work section adds scroll height, so ScrollTriggers must be created in page order. Each section creates its own in its effect.
- three.js is loaded with a dynamic `import()` in `character.tsx` to keep it out of the first bundle.
- `typescript` is held at `~6.0` because typescript-eslint doesn't support TS 7 yet (peer `<6.1`). `eslint` is held at 9 because `eslint-config-next`'s react/import/jsx-a11y plugins don't support ESLint 10 yet. Recheck both before bumping.
- `AGENTS.md` is generated and kept up to date by `next dev`. Don't edit it by hand.
