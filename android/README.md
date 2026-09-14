# My Schedule — Android wrapper

Native Android shell that packages the `my-schedule` web app ("North & South")
into an installable APK. The WebView serves the built bundle straight from app
assets; the only network call it makes is to the hosted site's public AI
endpoint.

## Layout

- `web/` — minimal Vite SPA that re-exports the real app. It mounts
  `ScheduleApp` from `../my-schedule/src` through the `@` alias with a
  hash-based TanStack Router, and builds into `app/src/main/assets/www`.
- `app/` — plain-Java Android app (no Kotlin): a single `MainActivity` hosting a
  `WebView` fed by `WebViewAssetLoader` on `https://appassets.androidplatform.net`.

## Build

```sh
cd web
npm install
npx vite build          # emits app/src/main/assets/www
cd ..
gradle assembleDebug    # needs JDK 17 + Android SDK (platform 35, build-tools 35)
```

Output: `app/build/outputs/apk/debug/app-debug.apk` — debug-signed, sideloads
on any Android 8.0+ device.

The Vite config resolves app sources from a sibling `../my-schedule` checkout
(or `../src` when this folder lives inside the my-schedule repo on the
`android-apk` branch).

## Local data, hosted AI

The APK bundles the client only. `web/vite.config.ts` aliases
`@/lib/schedule-data` to `web/src/schedule-data-stub.ts` so server functions,
`@/lib/db` and the auth middleware never reach the WebView bundle. Consequences:

- The schedule lives in the WebView's `localStorage` — edits persist on-device
  but do not sync to the hosted app's database.
- AI goes through the same public endpoint every client uses:
  `https://my-schedule-xi-one.vercel.app/api/ai` (see `PUBLIC_SITE_URL` in
  `src/lib/app-version.ts`). The WebView's `appassets.androidplatform.net`
  origin is allowlisted in that endpoint's CORS, and requests are rate-limited
  server-side. No API key is ever stored on the device or embedded in the APK.
- Sign-in controls are hidden — the app detects the
  `appassets.androidplatform.net` origin.
