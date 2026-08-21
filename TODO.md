# TODO — Dependency modernization

Status as of 2026-08-19. Version data verified against the live npm registry and the
installed `frontend-v2/node_modules` tree, not from memory.

Nothing in this list has been started. `frontend-v2/.env.local` was created and
`frontend-v2/npm install` was run; no source or `package.json` has been modified.

---

## Phase 1 — Drop `next-sanity` for `@sanity/client`

**Do this before any version bumps.** It deletes most of the upgrade surface instead of
upgrading it.

`next-sanity` declares `sanity`, `styled-components`, and `@sanity/cli` as *required*
peers, so npm installs the entire Sanity Studio into the website's tree. That is where
essentially every current vulnerability lives — none of it is shipped code.

Measured on an otherwise identical dependency set:

| | packages | vulnerabilities |
| --- | --- | --- |
| current (`next-sanity`) | 1210 | 28 (1 critical, 15 high) |
| same deps via `@sanity/client` | 385 | 0 |

The project uses exactly one export from it (confirmed by two independent searches):
`createClient` at `frontend-v2/lib/sanity.js:1`. No `PortableText`, `defineLive`,
`sanityFetch`, `NextStudio`, `draftMode`, visual editing, or `revalidate` anywhere.

- [ ] `cd frontend-v2 && npm uninstall next-sanity && npm install @sanity/client`
- [ ] `lib/sanity.js:1` — change `from 'next-sanity'` to `from '@sanity/client'`
      (same call signature; rest of the file unchanged)
- [ ] Confirm `npm audit` reports 0 vulnerabilities
- [ ] Confirm `sanity`, `@sanity/cli`, `vite` are gone from `frontend-v2/node_modules`

**What this gives up:** only dormant capability. Visual editing, draft preview, the Live
Content API, and an embedded `/studio` all require server components, and every page here
is `'use client'` fetching in `useEffect` — so none of them work today either way.
Reversing is `npm i next-sanity` plus one import line.

**Reconsider if** draft preview for content editors ("let me see it before it goes live")
is wanted soon. That argues for keeping `next-sanity` and migrating pages to server
components — a much larger project. See Decisions below.

## Phase 2 — `frontend-v2` version bumps

- [ ] **`next` 16.2.4 → 16.3.1** — the one that actually matters. The installed version
      carries advisories for cache poisoning, middleware/proxy bypass, SSRF, and XSS via
      CSP nonces. npm confirms 16.3.1 fixes them and it is **not** semver-major.
- [ ] `@netlify/plugin-nextjs` 5.15.9 → 5.15.13
- [ ] `@reduxjs/toolkit` 2.11.2 → 2.12.0
- [ ] `react` / `react-dom` 19.2.4 → 19.2.8
- [ ] `react-redux` 9.2.0 → 9.3.0
- [ ] `tailwindcss` + `@tailwindcss/postcss` 4.2.4 → 4.3.3
- [ ] `eslint` 9.39.4 → 10.8.1 (safe: `eslint-config-next@16.3.1` peers `eslint >=9.0.0`)
- [ ] `eslint-config-next` 16.2.4 → 16.3.1
- [ ] `@types/node` 20 → 26 (match the installed Node 24)
- [ ] `@types/react` 19.2.14 → 19.2.18, `@types/react-dom` 19.2.3 → 19.2.4
- [ ] `typescript` 5.9.3 → 7.0.2 — **optional and inert.** There are 0 `.ts`/`.tsx` source
      files; all 22 are `.js`/`.jsx`. Bumping or removing it changes nothing.

> ⚠️ **Never run `npm audit fix --force` here.** npm's proposed "fix" for `next-sanity` is
> a *downgrade* to 11.6.13, flagged `isSemVerMajor: true`. It moves the project backwards.

## Phase 3 — Verify in a real browser

Server-side checks are not sufficient. `curl` and HTTP 200s on page routes prove only that
the HTML shell rendered; because pages fetch Sanity **from the browser**, a broken data
path still returns 200. This already caused one false "verified" during setup.

- [ ] Load `/`, `/sermons`, `/beliefs`, `/about`, `/book-studies`, `/outreach` in a browser
- [ ] Check the console for errors (0 expected) and the network tab for the GROQ request
      returning 200
- [ ] Confirm rendered content, not just an empty shell — e.g. 3 carousel images from
      `cdn.sanity.io`, sermon rows populated

## Phase 4 — `cms`: Sanity 3 → 6 (separate branch)

The real work, and independent of the site. `cms/node_modules` is not currently installed,
so nothing here is verified working today.

Installed vs latest: `sanity` 3.x → **6.10.1**; `@sanity/client` 3.4.1 → **8.1.0**.

Requirements for Sanity 6 (from the registry):

- Node `>=22.12` — satisfied (24.11.1)
- React 18 → 19 (peer `^19.2.2`)
- `styled-components` 5 → 6 (peer `^6.1.15`)
- `@sanity/vision` 3 → 6, `sanity-plugin-media` 2 → 6,
  `sanity-plugin-asset-source-unsplash` 1 → 7

Code changes:

- [ ] `cms/sanity.config.js:2` — `deskTool` from `sanity/desk` → `structureTool` from
      `sanity/structure`. (`./desk` is still exported in v6, so this won't hard-break, but
      it should be migrated.)
- [ ] `cms/uploadAssets.js:1` — v3 default export → named `createClient`. **Will break
      otherwise.**
- [ ] `cms/deleteDocsByFilter.js:1` — same change. **Will break otherwise.**
- [ ] Smoke-test the Studio: each schema loads, an edit publishes, the site reflects it

Both maintenance scripts are destructive and need a write token pasted in; treat any test
run with care. `deleteDocsByFilter.js` currently targets `*[_type == "sermons"]`.

## Decisions needed

- [ ] **Draft preview for content editors** — wanted in the near term? If yes, Phase 1
      changes shape (keep `next-sanity`, plan a server-component migration instead).
- [ ] **Delete `frontend/`?** The legacy Gatsby 5 site, superseded by the Next migration
      (`634709d`). Recommendation: delete rather than upgrade — it is recoverable from git
      history. Not touched without a decision.
- [ ] **Sanity CORS allowlist** — `http://localhost:3000` and `:3333` are allowlisted;
      `:3001` is not, and an unlisted origin gets a bare 403 with no
      `Access-Control-Allow-Origin`, surfacing as "Request error while attempting to
      reach…". Docker (`open-webui`) occupies port 3000, so `next dev` falls back to 3001
      and breaks. Current workaround: run on 3333 (`npm run dev -- -p 3333`), which
      collides with `sanity dev` if both are needed at once. Durable fix, needs admin on
      project `4ufj1fpw`:
      `cd cms && npx sanity login && npx sanity cors add http://localhost:3001 --no-credentials`

## Minor cleanups (unrelated, pre-existing)

- [ ] `lib/sanity.js:11` — `@sanity/image-url` default export is deprecated; use the named
      `createImageUrlBuilder`
- [ ] Home carousel images use `fill` without a `sizes` prop (performance warning)
- [ ] `public/Logo_Blue.png` sets one of width/height but not the other; it is also the LCP
      element and wants `loading="eager"`
