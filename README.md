# Kebiao 课表

Your class schedule, one file away. Drop in the school's timetable — a PDF,
Word doc, spreadsheet, CSV, or just a screenshot of it — and the assistant
reads it into your whole term. When things move, talk to it: "Monday's ML
moved to B-120" merges the change. Tap any class to edit it by hand.

**Live:** https://my-schedule-xi-one.vercel.app ·
**Sister site:** https://therealchina.net

## Get the app

- **Web** — https://my-schedule-xi-one.vercel.app (installable as a PWA)
- **Android (APK)** — [Download kebiao-2.0.0.apk](https://my-schedule-xi-one.vercel.app/kebiao-2.0.0.apk) —
  sideloads on Android 8.0+. Or grab it in-app: smartphone icon →
  **Download APK**. Also mirrored in this repo at
  [`kebiao-2.0.0.apk`](./kebiao-2.0.0.apk).

## What it does

- **Import your timetable file** — drop in the school's export (PDF, Word,
  Excel, CSV, text) or a screenshot/photo of it; the assistant parses the
  whole thing. Type, paste or dictate also work — English and Chinese.
- **Your term, your way** — set the term name, week-1 start and length in
  Settings; schedules cover all seven days and any institution's timetable.
- **Talk to update** — paste the group-chat notice; **Merge** applies just the
  change, **Rebuild** recreates the term from a fresh description or file.
- **Edit by hand too** — every class is tappable: fix the room, time, day,
  place or weeks yourself. The `+` button adds a class without the assistant.
- **Ask, read-only** — "what do I have next Monday?" answers without touching
  your data.
- **Class reminders** — opt in and the app nudges you before class; on Android
  the reminders are native alarms that fire even with the app closed.
- **Android home-screen widget** — your next class at a glance, the actual
  replacement for the screenshot-as-wallpaper habit.
- **Anonymous by default** — no account, no API key, works offline. Your
  schedule lives on the device.
- **Sign in when you want sync** — optional sign-in keeps the schedule
  following you across browsers (last-write-wins through Postgres).
- **Location-aware** — each distinct place (campus, site, online…) gets its
  own color automatically, with multi-location day warnings.

## Brand

Shares its identity with [therealchina.net](https://therealchina.net): seal red
`#A6192E`, gold `#C9A227`, rice `#FAF6EF`, ink `#1A1613`; Noto Serif SC display
+ Inter body; the 课表 seal-stamp mark. `node scripts/render-brand-assets.mjs`
regenerates the favicon-adjacent PNG icons, Android launcher icons and
`public/og.jpg`.

## Architecture

```
browser / APK  ──►  POST /api/ai  ──►  xAI (Grok, text + vision)
                      │                  ▲ owner key, server-side only
                      ├─ input validation + size caps (text & images)
                      ├─ per-IP burst + daily rate limits
                      ├─ global daily cap + AI_DISABLED kill-switch
                      └─ scoped prompt + strict JSON schema out

file import  ──►  client-side extraction (pdf.js / mammoth / SheetJS / canvas)
                  ──►  text or downscaled image data URL ──► /api/ai

signed-in browser ──►  server fns ──►  Postgres (user_schedules)
                      authMiddleware + verified userId

APK WebView ──►  window.Kebiao bridge ──►  SharedPreferences
                  ──►  home-screen widget + AlarmManager reminders
```

- **The owner key never leaves the server.** Every client — website, signed
  out browser, APK — calls the public `/api/ai` route, which is the only code
  path that can read `XAI_API_KEY`.
- **Local-first data.** `localStorage` is the source of truth everywhere; the
  DB is a best-effort sync layer for signed-in users only.
- **APK = just another API client.** The Android bundle is served from
  `appassets.androidplatform.net`, so it calls the site's `/api/ai` directly
  (allowlisted in the endpoint's CORS).
- **File parsing happens on the device.** PDFs (pdf.js), Word docs (mammoth)
  and spreadsheets (SheetJS) are extracted to text in the browser; images are
  downscaled to ≤1600px JPEG data URLs for the vision model. A scanned PDF
  falls back to a rendered-page image automatically.

## Security & abuse guardrails

A public AI endpoint funded by the owner is a faucet without limits, so:

- **Rate limits** — per-IP: 6/minute burst + 30/day. Global: 400/day across
  all visitors. Counters live in Postgres (`ai_usage` table) so they hold
  across serverless instances; in-memory fallback for local dev. Tunable via
  `AI_IP_MINUTE_LIMIT`, `AI_IP_DAY_LIMIT`, `AI_GLOBAL_DAY_LIMIT`, and the
  `AI_DISABLED=1` kill-switch.
- **Scoped prompts** — the model is instructed to only build, update, or
  answer questions about schedules; pasted text and attached images are
  treated as untrusted data, never instructions.
- **Structured output** — the only response shapes are schedule JSON or a
  short answer string. Anything malformed is dropped before it can be stored.
- **Bounded input** — 19k-char text cap, ~6.5MB image cap, capped schedule
  arrays.
- **CORS allowlist** — browsers may only call it from the site itself or the
  APK's WebView origin.
- **User data isolation** — sync rows are scoped by the verified server-side
  `userId`, never a client-supplied id. Rate-limit buckets hash the IP so raw
  addresses aren't stored.
- **No secrets in the repo** — `.env*` is gitignored; signing keys stay local.

Honest limit: prompt-injection can't be 100 % prevented — the worst case is a
weird schedule preview or a refusal, bounded by the structured output schema.
Rate limits bound quota burn but can't stop a determined actor with many IPs;
the global daily cap + kill-switch is the ceiling.

## Develop

```sh
npm install
npm run dev        # serves on 0.0.0.0:8080
```

`npm run dev` runs Vite through `scripts/with-app-env.mjs`, which applies
`.grok/app-env.json` — works on POSIX and Windows.

Other scripts: `npm run build` · `npm run typecheck` · `npm run lint` ·
`npm test` · `npm run check:auth` · `node scripts/render-brand-assets.mjs`.

## Deploy (Vercel)

The repo carries a prebuilt `.vercel/output`; a normal Git-linked Vercel
deploy rebuilds it. Server features need env vars on the project:

| Var | Purpose |
| --- | --- |
| `XAI_API_KEY` | **Required for AI** — read only inside `/api/ai` |
| `DATABASE_URL` | Neon Postgres — sync + auth sessions + rate limits |
| `GROK_AUTH_ISSUER`, `GROK_AUTH_CLIENT_ID`, `GROK_AUTH_CLIENT_SECRET`, `BETTER_AUTH_URL` | Optional sign-in via the Grok auth broker |
| `AI_IP_MINUTE_LIMIT` / `AI_IP_DAY_LIMIT` / `AI_GLOBAL_DAY_LIMIT` / `AI_DISABLED` | Optional rate-limit tuning |

Without `XAI_API_KEY` the assistant answers "isn't configured on this
deployment" and everything else still works. Without `DATABASE_URL`, rate
limits fall back to per-process memory and sync simply doesn't persist.
Sign-in is brokered by the Grok platform — a plain Vercel deploy won't be
accepted by that broker, so sign-in stays quietly unavailable and the app
remains fully functional anonymous/local-first.

## Android

```sh
cd android/web && npm install && npx vite build   # emits app/src/main/assets/www
cd .. && gradle assembleDebug                     # JDK 17 + Android SDK 35
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk` — debug-signed,
sideloads on Android 8.0+. The latest build is also served from the site at
`/kebiao-<version>.apk` (see `src/lib/app-version.ts`; keep it in sync with
`versionName`/`versionCode` in `android/app/build.gradle`).

In the APK there is no server: `@/lib/schedule-data` is stubbed
(`android/web/src/schedule-data-stub.ts`), data stays in the WebView's
`localStorage`, and AI calls go to the hosted site's `/api/ai` — no key entry,
ever. A `window.Kebiao` JS bridge mirrors the schedule + reminder prefs into
SharedPreferences, which powers the home-screen widget and the
AlarmManager-based class reminders.

**Play Store status:** the shipped APK is debug-signed for sideloading.
Publishing needs a release keystore (kept out of the repo), a signed AAB,
Play App Signing, a privacy policy, and data-safety declarations — planned.

## Tech

TanStack Start (React 19) · TanStack Router · Better Auth · Kysely → Neon /
PGLite · Tailwind v4 · Radix · zod · xAI (`grok-4.5`) · pdf.js · mammoth ·
SheetJS · Vercel.
