# North & South

A timetable app for a master's schedule split across two campuses — **South**
(warm blocks) and **North** (cool blocks) — for the Autumn 2026 term (17 weeks,
Asia/Shanghai).

## Features

- **Week grid + day agenda** — desktop grid and a mobile day view, with a
  per-week load heatmap and commute warnings when a week spans both campuses.
- **Update with AI** — paste a schedule notice from a class group chat; the AI
  (Grok) reads it, shows a structured preview, and applies it on confirm.
  - **Merge** applies only the notice's changes and keeps everything else.
  - **Replace** rebuilds the schedule from the notice.
  - Understands English and Chinese notices (`周一`, `南区`/`北区`, week ranges).
  - One-tap **reset to default** restores the built-in schedule.
- **Local-first storage** — the schedule lives in the device's `localStorage`,
  so it works fully offline and signed out.
- **Optional sign-in sync** — signing in on the hosted app syncs the schedule
  through Postgres so it follows you across browsers (last-write-wins).
- **Android APK** — a WebView shell packages the app for sideloading. The
  schedule is stored on-device; AI updates there use your own xAI key.
- **What's-new notice** — the app announces each release once per version.

## Tech

TanStack Start (React 19) · TanStack Router · Better Auth · Kysely → Neon /
PGLite · Tailwind v4 · Radix · zod · xAI (`grok-4.5`) for parsing · Vercel.

## Develop

```sh
npm install
npm run dev        # serves on 0.0.0.0:8080
```

`npm run dev` runs Vite through `scripts/with-app-env.mjs`, which applies
`.grok/app-env.json`. On Windows that wrapper can't spawn `vite` — run
`node node_modules/vite/bin/vite.js dev --host 0.0.0.0 --port 8080` instead.

Other scripts: `npm run build` · `npm run typecheck` · `npm run lint` ·
`npm test` · `npm run check:auth`.

## Deploy (Vercel)

The repo carries a prebuilt `.vercel/output`; a normal Git-linked Vercel deploy
rebuilds it. Server features need env vars on the project:

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon Postgres — schedule sync + auth sessions |
| `XAI_API_KEY` | Server-side AI parsing (never exposed to the browser) |
| `GROK_AUTH_ISSUER`, `GROK_AUTH_CLIENT_ID`, `GROK_AUTH_CLIENT_SECRET`, `BETTER_AUTH_URL` | Federated sign-in via the Grok auth broker |

Sign-in is brokered by the Grok platform — on a plain Vercel deploy the broker
won't accept this origin, so sign-in quietly stays unavailable and the app runs
local-first (which is fully functional). `XAI_API_KEY` absent → the AI panel
asks for the user's own key instead. Nothing breaks either way.

## Android

```sh
cd android/web && npm install && npx vite build   # emits app/src/main/assets/www
cd .. && gradle assembleDebug                     # JDK 17 + Android SDK 35
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk` — debug-signed,
sideloads on Android 8.0+. The latest built APK is also served from the site at
`/north-south-<version>.apk` (see `src/lib/app-version.ts`, keep it in sync
with `versionName`/`versionCode` in `android/app/build.gradle`).

In the APK there is no server: `@/lib/schedule-data` is stubbed
(`android/web/src/schedule-data-stub.ts`), so data stays in the WebView's
`localStorage` and AI calls go straight to `api.x.ai` with a key the user enters
once on the device.

## Security notes

- No secrets in the repo — `.env*` is gitignored and never created.
- `XAI_API_KEY` is read server-side only; the APK/preview path uses a key the
  user enters, stored in their own `localStorage`.
- Every server function is behind `authMiddleware` and scopes data by the
  verified `context.userId` — never a client-sent id.
- The distributed APK is **debug-signed** — fine for personal sideloading; use a
  real keystore before publishing anywhere public.
