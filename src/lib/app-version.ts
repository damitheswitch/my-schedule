/**
 * Single source of truth for the app version, release notes, the deployed
 * site, and the Android APK the site serves. Bump `APP_VERSION` per release —
 * the what's-new dialog re-announces itself once per version (tracked in
 * localStorage), and the APK filename is derived here so the download link
 * never drifts.
 *
 * Keep `versionName`/`versionCode` in `android/app/build.gradle` in sync.
 */
export const APP_VERSION = "1.2.0";
export const APK_VERSION_CODE = 3;
export const APK_FILENAME = `north-south-${APP_VERSION}.apk`;
export const APK_PATH = `/${APK_FILENAME}`;

/**
 * The deployed site the APK calls for AI. The WebView bundle has no backend,
 * so it posts to this origin's `/api/ai` (allowlisted in the endpoint's CORS).
 */
export const PUBLIC_SITE_URL = "https://my-schedule-xi-one.vercel.app";

export const WHATS_NEW: { title: string; detail: string }[] = [
  {
    title: "Craft your schedule with AI",
    detail:
      "Describe your classes in plain words — or paste a school notice — and the assistant builds your schedule for you. Works on the website and the Android app, no account or API key needed.",
  },
  {
    title: "Ask your schedule anything",
    detail:
      "\"What do I have next Monday?\" — the new Ask mode answers questions about your classes without changing anything.",
  },
  {
    title: "Sync when you want it",
    detail:
      "Everything works anonymously and offline. Sign in only if you want your schedule to follow you across devices.",
  },
];
