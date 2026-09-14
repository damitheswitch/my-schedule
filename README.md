# North & South

A class schedule you never have to type twice — for students whose timetable
spans campuses, weeks, and endless group-chat notices.

This started as a hobby project: my own schedule at Xidian University was a
mess of screenshots and forwarded notices, and I got tired of retyping it
every time the school moved a class. Then I realized everyone's schedule is
like this — so it grew into a product anyone can use.

**Live:** https://my-schedule-xi-one.vercel.app

## What it does

- **Describe it, get a schedule** — on first run, tell the assistant your
  courses in plain words (type *or dictate* — voice input where the browser
  supports it), or paste the school's notice. It builds your whole term and
  shows a preview before anything is saved.
- **Update from notices** — when the group chat says "Monday's ML moved to
  B-120", paste it in. **Merge** applies just the change; **Rebuild** recreates
  the schedule from a fresh description. Understands English and Chinese
  (`周一`, `南区`/`北区`, week ranges).
- **Ask your schedule anything** — "what do I have next Monday?" — a read-only
  mode that answers questions without touching your data.
- **Anonymous by default** — no account, no API key, works offline. Your
  schedule lives on the device.
- **Sign in when you want sync** — optional sign-in keeps the schedule
  following you across browsers (last-write-wins through Postgres).
- **Two-campus aware** — warm blocks for South, cool for North, with commute
  warnings on weeks that span both.
- **Android app** — a WebView APK that does everything the site does, calling
  the hosted AI like any other client.
- **What's-new notice** — releases announce themselves once per version.

## Architecture

```
browser / APK  ──►  POST /api/ai  ──►  xAI (Grok)
                      │                  ▲ owner key, server-side only
                      ├─ input validation + size caps
                      ├─ per-IP burst + daily rate limits
                      ├─ global daily cap + AI_DISABLED kill-switch
                      └─ scoped prompt + strict JSON schema out

signed-in browser ──►  server fns ──►  Postgres (user_schedules)
                      authMiddleware + verified userId
```

- **The owner key never leaves the server.** Every client — website, signed
  out browser, APK — calls the public `/api/ai` route, which is the only code
  path that can read `XAI_API_KEY`.
- **Local-first data.** `localStorage` is the source of truth everywhere; the
  DB is a best-effort sync layer for signed-in users only.
- **APK = just another API client.** The Android bundle is served from
  `appassets.androidplatform.net`, so it calls the site's `/api/ai` directly
  (allowlisted in the endpoint's CORS).

## Security & abuse guardrails

A public AI endpoint funded by the owner is a faucet without limits, so:

- **Rate limits** — per-IP: 6/minute burst + 30/day. Global: 400/day across
  all visitors. Counters live in Postgres (`ai_usage` table) so they hold
  across serverless instances; in-memory fallback for local dev. Tunable via
  `AI_IP_MINUTE_LIMIT`, `AI_IP_DAY_LIMIT`, `AI_GLOBAL_DAY_LIMIT`, and the
  `AI_DISABLED=1` kill-switch.
- **Scoped prompts** — the model is instructed to only build, update, or
  answer questions about schedules; pasted text is treated as untrusted data,
  never instructions.
- **Structured output** — the only response shapes are schedule JSON or a
  short answer string. Anything malformed is dropped before it can be stored.
- **Bounded input** — 4 KB text cap, 64 KB body cap, capped schedule arrays.
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
`.grok/app-env.json`. On Windows that wrapper can't spawn `vite` — run
`node node_modules/vite/bin/vite.js dev --host 0.0.0.0 --port 8080` instead.

Other scripts: `npm run build` · `npm run typecheck` · `npm run lint` ·
`npm test` · `npm run check:auth`.

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
`/north-south-<version>.apk` (see `src/lib/app-version.ts`; keep it in sync
with `versionName`/`versionCode` in `android/app/build.gradle`).

In the APK there is no server: `@/lib/schedule-data` is stubbed
(`android/web/src/schedule-data-stub.ts`), data stays in the WebView's
`localStorage`, and AI calls go to the hosted site's `/api/ai` — no key entry,
ever.

**Play Store status:** the shipped APK is debug-signed for sideloading.
Publishing needs a release keystore (kept out of the repo), a signed AAB,
Play App Signing, a privacy policy, and data-safety declarations — planned.

## Tech

TanStack Start (React 19) · TanStack Router · Better Auth · Kysely → Neon /
PGLite · Tailwind v4 · Radix · zod · xAI (`grok-4.5`) · Vercel.
