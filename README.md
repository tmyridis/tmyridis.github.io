# ~/tmyridis/portfolio

Hi, I'm Teo, and this is my personal portfolio: a single scroll-animated page around a 3D avatar, live at [tmyridis.github.io](https://tmyridis.github.io).

## Tech Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, GSAP (ScrollTrigger, SplitText), Lenis and three.js, exported as a static site.

## What's on the page

- **Landing**: name and role next to a 3D avatar whose head follows the pointer
- **About** and **What I do**: as you scroll, the avatar turns, the camera pulls back and he sits typing at a desk
- **Career**: jobs along a line that grows with scroll
- **Work**: projects in a row that scrolls sideways while the section is pinned
- **Tech stack**: two rows of tools that drift sideways with scroll
- **Contact**

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
