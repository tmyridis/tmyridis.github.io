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

The site is a single page with a terminal look (monospace type, purple on near-black). `app/page.tsx` stacks the sections from `app/components/`:

- `nav.tsx`: fixed shell-prompt nav with a scroll progress bar
- `hero.tsx`: headline over `code-rain.tsx` (falling code drawn on a 2D canvas) next to `terminals.tsx` (three terminal windows at different depths using CSS 3D; the stack tilts with the pointer)
- `stack.tsx`: skills as a `neofetch`-style readout
- `work.tsx`: projects as a `git log --graph` timeline, rendered from `app/data/projects.json`
- `contact.tsx`: contact links and footer
- `cursor.tsx`: the blinking block cursor

`app/not-found.tsx` redirects every unknown route to `/`.

To add a project, add an entry to `app/data/projects.json` and put its screenshot in `public/images/`. `techStack` entries are display labels.

## Styling

- Tailwind 4 is configured in CSS (`@theme` in `app/globals.css`). There is no `tailwind.config.ts`.
- Use the theme colors (`bg`, `panel`, `line`, `ink`, `muted`, `violet`, `deep`, `pink`) instead of raw values. Violet is the main color and pink is a small accent. All text is JetBrains Mono (`font-mono`).
- Tailwind only generates classes it finds as complete literal strings, so don't build class names from variables.

## Gotchas

- The 3D is CSS transforms, not WebGL. There is no three.js in the project.
- Animations must respect `prefers-reduced-motion` (see `code-rain.tsx` and the media query in `globals.css`).
- `typescript` is held at `~6.0` because typescript-eslint doesn't support TS 7 yet (peer `<6.1`). `eslint` is held at 9 because `eslint-config-next`'s react/import/jsx-a11y plugins don't support ESLint 10 yet. Recheck both before bumping.
- `AGENTS.md` is generated and kept up to date by `next dev`. Don't edit it by hand.
