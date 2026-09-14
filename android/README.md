# Kebiao — Android wrapper

Native Android shell that packages the Kebiao web app into an installable APK.
The WebView serves the built bundle straight from app assets; the only network
call it makes is to the hosted site's public AI endpoint.

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
(or `../src` when this folder lives inside the repo).

## Local data, hosted AI

The APK bundles the client only. `web/vite.config.ts` aliases
`@/lib/schedule-data` to `web/src/schedule-data-stub.ts` so server functions,
`@/lib/db` and the auth middleware never reach the WebView bundle. Consequences:

- The schedule lives in the WebView's `localStorage` — edits persist on-device
  but do not sync to the hosted app's database.
- AI calls go to the hosted site's `/api/ai` — no key entry, ever.

Keep `versionName`/`versionCode` in `app/build.gradle` in sync with
`src/lib/app-version.ts`; the site serves the APK at `/kebiao-<version>.apk`.
