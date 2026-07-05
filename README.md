# World Cup 2026 Hub

**Author:** Maria Abi Nassif

A HTML/CSS/JavaScript site covering the FIFA World Cup 2026: live
team and fixture data from a public API, plus a curated history of every
World Cup since 1930.

## API used
[football-data.org](https://www.football-data.org/) — free tier, no credit
card required. Used via two small serverless functions (`api/teams.js`,
`api/matches.js`) that proxy `/v4/competitions/WC/teams` and
`/v4/competitions/WC/matches`. A proxy is needed because football-data.org
blocks direct browser requests via CORS, and because the API key must not be
exposed in client-side code.

## Project description
- **index.html (Home)** — intro and links to the three sections
- **teams.html (Teams)** — live team list from the API, with search and pagination
- **fixtures.html (Fixtures)** — live match data, filterable by status (scheduled / live / finished)
- **history.html (History)** — 16 curated, hand-written facts covering every
  World Cup from 1930 to 2026 (own content, not from the API), with search

All JavaScript is written as ES6 classes (`Sidebar`, `WorldCupApi`,
`TeamsPage`, `FixturesPage`, `HistoryPage`) in separate files under `js/`.
Navigation between pages uses plain anchor links to separate `.html` files.

## Custom UI requirement
**Collapsible sidebar with icons and labels** (`js/sidebar.js`, styled in
`css/style.css`). Expanded state shows icon + label for each nav item;
collapsed state shrinks to icon-only. See the code comment at the top of
`js/sidebar.js` for the full explanation.

## Structure
```
├── index.html / teams.html / fixtures.html / history.html
├── css/style.css       # hand-written CSS3 + Bootstrap 5 (via CDN)
├── js/
│   ├── sidebar.js      # Sidebar class — custom UI requirement
│   ├── api.js           # WorldCupApi class — calls our own /api proxy
│   ├── teams.js         # TeamsPage class
│   ├── fixtures.js      # FixturesPage class
│   └── history.js       # HistoryPage class — own curated content
└── api/
    ├── teams.js         # serverless function proxying football-data.org
    └── matches.js       # serverless function proxying football-data.org
```

## Setup / running locally
This is a static site with two serverless functions, best run locally with
the Vercel CLI so the `/api` routes work exactly as they will in production:

```bash
npm install -g vercel
vercel dev
```
On first run it'll ask you to log in/link the project — follow the prompts.
Set your API key as a local env var when prompted, or create a `.env` file:
```
FOOTBALL_DATA_API_KEY=your_key_here
```

Then open the local URL it gives you (usually http://localhost:3000).

## Deployment
Deploy free on **Vercel** (recommended, since it supports the serverless
`/api` functions) — import this repo, and set the environment variable
`FOOTBALL_DATA_API_KEY` in the project settings. No build step needed.

(Note: GitHub Pages cannot host this as-is, since it only serves static
files and can't run the `/api` proxy functions.)

## Engineering log / notes
- Started by scaffolding a React + Express + MongoDB full-stack app for a
  World Cup 2026 hub, using football-data.org as the API.
- Realized partway through that the assignment's actual JavaScript
  requirement (ES6 classes) and navigation requirement (manual anchor links
  between separate `.html` pages) didn't match a React SPA. Rebuilt the
  entire frontend as HTML/CSS/JS with ES6 classes, keeping the same
  content and API integration.
- While rebuilding, tested calling football-data.org directly from the
  browser and hit a CORS error, since their API key is locked to a specific
  origin. Solved this with two small serverless functions (`api/teams.js`,
  `api/matches.js`) deployed alongside the static site on Vercel, which proxy
  the requests server-side and keep the API key out of client-side code.
- Set up git with incremental commits (initial scaffold → API integration →
  custom UI requirement comment → rebuild → screenshots → README) and
  deployed live on Vercel.
- Verified the site loads with no console errors and works at mobile,
  tablet, and desktop widths (see /screenshots).

## AI-use appendix
**Tools used:** Claude (Anthropic), via claude.ai chat.

**What I used it for:**
- Initial project scaffolding, then a full rebuild after re-checking the
  assignment's JavaScript (ES6 classes) and navigation (anchor-based)
  requirements more carefully.
- Building the collapsible sidebar component (custom UI requirement).
- Researching and wiring up the football-data.org API integration, including
  diagnosing a CORS restriction that required a serverless proxy.
- Writing the curated World Cup history content.

**Example prompts used:**
1. "Use a collapsible sidebar with icons and labels — help me build this."
2. "Give me examples of what I can choose for the real content."
3. "Fix/discuss the ES6 classes question" — leading to a full rebuild once
   we realized the first version used React (functional components), which
   didn't match the assignment's ES6-class and manual-anchor-routing
   requirements.

**Things the AI got wrong and how I fixed them:**
1. The first build used React + Express + MongoDB without checking the
   assignment's specific JavaScript and navigation requirements closely
   enough. This didn't match "all JavaScript must be written using ES6
   classes" or "routing manually with anchors," so the whole frontend was
   rebuilt as HTML/CSS/JS with ES6 classes and separate `.html`
   pages.
2. When rebuilding as JS, the AI's first plan was to call
   football-data.org directly from the browser with `fetch()`. We tested
   this in the browser console and it failed with a CORS error (their API
   key is locked to a specific origin, and ours didn't match). I caught this
   by actually running the test the AI suggested rather than assuming it
   would work, and we fixed it by adding two small serverless functions
   (`api/teams.js`, `api/matches.js`) to proxy the requests server-side
   instead.

This appendix reflects what actually happened while building this project,
matching the commit history in this repo.

## Evidence
Screenshots of the site at mobile, tablet, and desktop widths, confirming
responsive layout and no console errors:

- Mobile: `screenshots/mobile screenshot .png`
- Tablet: `screenshots/Tablet screenshot.png`
- Desktop: `screenshots/Desktop screenshot.png`
