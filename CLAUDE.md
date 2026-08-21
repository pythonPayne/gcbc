# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for Grace Covenant Baptist Church (Birmingham, AL), served at gracecovenantbaptist.org. Content lives in Sanity; the site is a static-ish Next.js app deployed to Netlify.

Four top-level directories, only two of which are live:

- `frontend-v2/` — **the live site** (Next.js 16 / React 19 App Router). All frontend work goes here.
- `cms/` — Sanity Studio v3 (project `4ufj1fpw`, dataset `production`). Owns the content schemas.
- `frontend/` — **legacy Gatsby 5 site**, superseded by `frontend-v2` (commit `634709d migrate to Next.js`). Kept for reference; do not develop here unless asked. Pages/redux in `frontend-v2` are direct ports of `frontend/src`, so it is a useful diff target when behavior looks off.
- `notebooks/` — one-off Jupyter/pandas scripts that scraped the old WordPress site, SermonAudio, and the 1689 Baptist Confession, then emitted the `.ndjson` files used to seed Sanity. Not part of any build; they read/write `data/` and `mp3s/` (both gitignored and absent).

## Commands

Each project is an independent npm package — `cd` into it first; there is no root package.json or workspace.

```bash
# frontend-v2 (live site)
npm run dev      # next dev on :3000
npm run build    # next build
npm run lint     # eslint (flat config, next/core-web-vitals + typescript)

# cms (Sanity Studio)
npm run dev      # sanity dev on :3333
npm run deploy   # publish Studio to Sanity's hosting
```

There are no tests in this repo.

### Environment

`frontend-v2` needs `NEXT_PUBLIC_SANITY_PROJECT_ID=4ufj1fpw` and `NEXT_PUBLIC_SANITY_DATASET=production` in `frontend-v2/.env.local` (gitignored, so it will not exist in a fresh clone — `lib/sanity.js` fails silently-ish without it and pages render empty). `cms/.env` holds the equivalent `SANITY_STUDIO_*` vars and is committed.

### Deploy

Netlify builds `frontend-v2` (`netlify.toml`: `npm run build`, publish `.next`, `@netlify/plugin-nextjs`). Pushing to `main` deploys.

## Architecture

**Every page is a client component, except `beliefs`.** `app/**/page.jsx` start with `'use client'` and fetch Sanity data in a `useEffect` via the shared browser client, rather than using server components / `async` page functions. This is a carry-over from the Gatsby port. Keep the pattern unless deliberately migrating a page — mixing server-fetched props into these pages means untangling the Redux/`Layout` chain below.

`app/beliefs/**` is the one deliberate exception: it is server-rendered and statically prerendered (see **Beliefs** below). It is the model to copy if another page needs real URLs or SEO.

**Data flow:** `lib/sanity.js` exports a single `next-sanity` client (`useCdn: true`, apiVersion `2024-01-01`) plus `urlFor()` for `@sanity/image-url`. Each page declares its own GROQ query inline as a local `getX()` function — there is no shared query module. Sanity image CDN (`cdn.sanity.io`) is whitelisted in `next.config.js` for `next/image`.

**Redux (classic, hand-written):** `redux/` uses `configureStore` from RTK but plain action-creator/reducer files and a `types.js` of string constants — no `createSlice`, no thunks, no async state. It holds only **UI** state: nav-menu open/closed and the sermon/Sunday-school filter selections. Fetched content stays in local `useState`. `components/Providers.js` (`'use client'`) wraps the tree in `app/layout.js`.

Note: the `sundayschool` slice is wired into the root reducer but no page consumes it — the Sunday School page was never ported from the old site, though the `sundaySchool` Sanity schema and `cms/sundayschool.ndjson` exist.

**`components/Layout.js`** is the only shared component: fixed header, hover-dropdown desktop nav, and the mobile menu. Pages wrap their content in `<Layout>` and independently read `showMenu` from Redux to apply the blur/pointer-events-none treatment while the menu is open — so a new page must `dispatch(toggleShowMenu(false))` on mount (all existing pages do this in their first `useEffect`) and replicate that wrapper, or navigation will leave the menu stuck open.

**Content model** (`cms/schemas/index.js` → page that renders it):

| Sanity `_type` | Rendered by |
| --- | --- |
| `carouselPictures` | `app/page.jsx` (home carousel, ordered by `sortOrder`) |
| `sermons` | `app/sermons/page.jsx` |
| `confession` | `app/beliefs/**` (1689 London Baptist Confession — see below) |
| `aboutGCBC`, `aboutElders` | `app/about/page.jsx` |
| `bookStudies` | `app/book-studies/page.jsx` |
| `outreach` | `app/outreach/page.jsx` |
| `sundaySchool` | *(no page)* |
| `calendar` | *(no page — see below)* |

`app/calendar/page.jsx` ignores the `calendar` schema entirely and embeds a Google Calendar iframe on desktop, with a plain link on mobile (iframes render badly on small screens). `app/church-covenant/page.jsx` is hardcoded prose.

### Beliefs (the 1689 Confession)

The only server-rendered area. Routes:

| Route | Renders |
| --- | --- |
| `/beliefs` | chapter menu + client-side search across all 32 chapters |
| `/beliefs/[chapter]` | one chapter, 32 prerendered |
| `/beliefs/[chapter]/[paragraph]` | same chapter, scrolled to and highlighting one paragraph, 160 prerendered |

`generateStaticParams` derives both param sets from Sanity, so 202 pages prerender at
build time; `dynamicParams = false` makes anything outside that set a 404, and
`revalidate = 3600` refreshes content hourly without a redeploy. **Content edits are no
longer instant here** — up to an hour, or a redeploy.

Because it is server-rendered, this area does *not* follow the "dispatch
`toggleShowMenu(false)` in each page" rule. `app/beliefs/layout.jsx` is a client layout
holding `EditionProvider` (Original/Modern, kept in `localStorage`, deliberately not in
the URL) and `BeliefsShell` (the `Layout` wrapper + menu dispatch, keyed off `pathname`
because a layout does not remount between its own children).

⚠️ `lib/confession.js` fetches with `order(_id asc)` and this is load-bearing. Text
segments within a paragraph are ordered *only* by document id — the seed import created
them sequentially, so id order is reading order. `referenceNum` is **not** per-paragraph
(it runs 1..n across a whole chapter) and `99` means "segment with no reference", so
ordering by it scrambles the text. Adding a `confession` document through the Studio
gives it a fresh UUID that will not sort into the right place.

**Sermon/filter pages** duplicate hardcoded lists of Bible books and speaker names in the page file, and the `sermons` schema duplicates the full book list again as a dropdown `options.list`. Changing available speakers or books means editing both sides. (The schema list contains typos in a few `value`s — e.g. `1 Chronciles`, `Malachia` — which are the values actually stored in Sanity; don't "fix" them without migrating documents.)

## Styling

Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config.js` — configuration lives in `app/globals.css`). The legacy `frontend/` still uses Tailwind v3 with a config file; don't copy config between them. Brand navy is the literal `#09314C`, written inline as arbitrary values (`text-[#09314C]`) throughout rather than as a theme token.

## Sanity CMS

Schemas are plain default-exported objects (`.jsx` because `preview.prepare` returns JSX for `media`), registered in `cms/schemas/index.js`. Adding a type means adding the file and the entry there.

`cms/uploadAssets.js` (bulk sermon MP3 upload) and `cms/deleteDocsByFilter.js` (bulk delete by GROQ) are ad-hoc maintenance scripts, not wired to npm scripts, and both need a write token pasted into the commented-out `token` field. `uploadAssets.js` also expects a hardcoded absolute mp3 path and a gitignored `mp3List.js`. Treat both as destructive; `deleteDocsByFilter.js` currently targets `*[_type == "sermons"]`.

The `.ndjson` files in `cms/` are seed exports for `sanity dataset import`.

## Next.js version

Next.js 16 has breaking changes relative to most training data — `params` is a Promise
and must be awaited, among others. The installed version ships its own docs at
`frontend-v2/node_modules/next/dist/docs/`; consult those before writing App Router code
rather than relying on recall.
