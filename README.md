# ~/tmyridis/portfolio

Hi, I'm Teo, and this is my personal portfolio: a single page styled like a terminal, live at [tmyridis.github.io](https://tmyridis.github.io).

## Tech Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4 and framer-motion, exported as a static site.

## What's on the page

- **Hero**: falling code drawn on a canvas behind three terminal windows stacked in CSS 3D that tilt with the pointer
- **Stack**: skills as a `neofetch` readout
- **Career** and **Work**: jobs and projects as `git log --graph` timelines
- **Contact**: links and footer

All animations respect `prefers-reduced-motion`.

## Running locally

Requires Node 24.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Editing content

- Projects: add an entry to `app/data/projects.json` and put its screenshot in `public/images/`.
- Jobs: edit `app/data/career.json`. Use `"end": null` for the current job.

## Deployment

Pushing to `master` builds a static export and deploys it to GitHub Pages via `.github/workflows/nextjs.yml`.
