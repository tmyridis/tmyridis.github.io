@AGENTS.md

# tmyridis portfolio

Personal portfolio site. Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + framer-motion, deployed as a static site to GitHub Pages.

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: production build
- `npm run lint`: ESLint 9 flat config (`eslint.config.mjs`)
- `npx tsc --noEmit`: typecheck

There are no tests. Before calling a change done, run typecheck, lint and build, and check the page in the browser.

## Deployment

Pushing to `master` runs `.github/workflows/nextjs.yml`. At CI time, `actions/configure-pages` injects `output: "export"` and `images.unoptimized` into `next.config.mjs`, so the site must stay fully static. That rules out API routes, middleware, server actions, dynamic rendering and on-demand image optimization. A plain local `npm run build` is not a static export. To reproduce CI, temporarily set those two options and check that `out/` is produced.

## Layout

- `app/layout.tsx`: shell (wavy canvas background, header, footer, local fonts in `app/fonts/`)
- `app/page.tsx`: "About me" home (`about-me`, `links`, `skills` components)
- `app/projects/page.tsx`: renders cards from `app/projects/projects.json`
- `app/components/UI/`: components adapted from Aceternity UI
- `app/not-found.tsx`: redirects every unknown route to `/`
- `public/images/`: project screenshots and tech icons

To add a project, add an entry to `projects.json` and put its screenshot in `public/images/`. Each `techStack` entry `x` loads `public/images/xIcon.png`, so the icon must exist under that exact name. `gradient` is an optional list of three Tailwind classes (`from-*`, `via-*`, `to-*`).

## Styling

- Tailwind 4 is configured in CSS (`@theme` in `app/globals.css`). There is no `tailwind.config.ts`.
- The `sm` breakpoint is customized to 480px, not Tailwind's default 640px.
- Tailwind only generates classes it finds as complete literal strings. Template-built classes like `` `col-start-${n}` `` only work if that exact class also appears literally somewhere in the source.

## Gotchas

- `RoughNotation` draws an absolutely positioned SVG. When it sits inside a `motion.*` element, give that parent `relative`. Otherwise the annotation is misplaced once framer-motion clears the element's transform after the slide-in.
- `typescript` is held at `~6.0` because typescript-eslint doesn't support TS 7 yet (peer `<6.1`). `eslint` is held at 9 because `eslint-config-next`'s react/import/jsx-a11y plugins don't support ESLint 10 yet. Recheck both before bumping.
- `AGENTS.md` is generated and kept up to date by `next dev`. Don't edit it by hand.
