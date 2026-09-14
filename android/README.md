# My Schedule — Android wrapper

Native Android shell that packages the `my-schedule` web app ("North & South")
into an installable APK. No server needed: the app is fully client-side, so the
WebView serves the built bundle straight from app assets.

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

## No server, no sign-in

The APK bundles the client only. `web/vite.config.ts` aliases
`@/lib/schedule-data` to `web/src/schedule-data-stub.ts` so server functions,
`@/lib/db` and the auth middleware never reach the WebView bundle. Consequences:

- The schedule lives in the WebView's `localStorage` — edits persist on-device
  but do not sync to the hosted app's database.
- "AI update" skips the server-side call and asks for your own xAI API key
  (stored on-device), calling `api.x.ai` directly. On the hosted site the
  built-in key is used instead when signed in.
- Sign-in controls are hidden — the app detects the
  `appassets.androidplatform.net` origin.
