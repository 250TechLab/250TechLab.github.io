# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for 250techlab.rw — an Angular 16 single-page app styled with Tailwind CSS, deployed to GitHub Pages (repo: `250TechLab/250TechLab.github.io`, domain: `www.250techlab.rw`).

## Commands

- `npm start` — dev server at http://localhost:4200
- `npm run build` — production build to `dist/portfolio` (production is the default configuration)
- `npm test` — Karma/Jasmine tests in watch mode
- `npm test -- --watch=false --browsers=ChromeHeadless` — single test run (CI-style)
- `npm test -- --include='**/app.component.spec.ts'` — run a single spec file
- `./deploy.sh` — builds into `docs/` (the GitHub Pages source) and restores `docs/CNAME`, which the build would otherwise delete

## Deployment

GitHub Pages serves the `docs/` folder on `master`. The `docs/` directory contains committed build output — never edit those files by hand; regenerate them with `./deploy.sh` and commit the result. Always keep `docs/CNAME` intact.

## Architecture

Minimal single-module, single-component Angular app:

- `src/app/app.module.ts` bootstraps `AppComponent`; there is no routing — the entire site is one page (nav, hero, services, about, contact form, footer).
- All page content lives in `src/app/app.component.html`; editable data (nav links, services, stats, contact info, social links) is centralized in arrays in `src/app/app.component.ts`.
- Styling is Tailwind-only (`tailwind.config.js` scans `src/**/*.{html,ts}`). The design tokens are OKLCH CSS variables defined in `src/styles.css` and mapped to Tailwind color scales (`background-*`, `foreground-*`, `primary-*`, `accent-*`) in `tailwind.config.js`. Fonts (Inter, Space Grotesk) and Remix Icons load from CDNs in `src/index.html`.
- Prefer Tailwind classes or `src/styles.css` over per-component CSS: the build enforces a strict component-style budget (2kb warning / 4kb error).
- `src/app/reveal.directive.ts` (`appReveal`, `exportAs: 'reveal'`) drives the scroll-reveal animations via IntersectionObserver.
- The contact form POSTs to Formspree (endpoint in `app.component.ts`) with a honeypot field (`company_alt`) for spam.
- `src/index.html` carries Google Tag Manager and the Tawk.to chat widget — keep them when touching that file.

## Git Workflow (gitflow)

- `develop` is the working branch; `master` holds releases only.
- Releases go through `release/x.y.z` (or `hotfix/x.y.z`) branches, merged into `master`, tagged (e.g. `1.5.1`), then merged back into `develop`.
- Bump `version` in `package.json` as part of every release/hotfix branch.
