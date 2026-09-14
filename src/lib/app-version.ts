/**
 * Single source of truth for the app name, version, release notes, the
 * deployed site, and the Android APK the site serves. Bump `APP_VERSION` per
 * release — the what's-new dialog re-announces itself once per version
 * (tracked in localStorage), and the APK filename is derived here so the
 * download link never drifts.
 *
 * Keep `versionName`/`versionCode` in `android/app/build.gradle` in sync.
 */
export const APP_NAME = "Kebiao";
export const APP_VERSION = "1.3.0";
export const APK_VERSION_CODE = 4;
export const APK_FILENAME = `kebiao-${APP_VERSION}.apk`;
export const APK_PATH = `/${APK_FILENAME}`;

/**
 * The deployed site the APK calls for AI. The WebView bundle has no backend,
 * so it posts to this origin's `/api/ai` (allowlisted in the endpoint's CORS).
 */
export const PUBLIC_SITE_URL = "https://my-schedule-xi-one.vercel.app";

export const WHATS_NEW: { title: string; detail: string }[] = [
  {
    title: "Meet Kebiao",
    detail:
      "New name, new look — same app. Prompt your schedule into existence, then talk to it when the school moves things around.",
  },
  {
    title: "Edit classes by hand",
    detail:
      "Tap any class → Edit class to fix the room, time, day or weeks yourself. The + button in the header adds a class without touching the assistant.",
  },
  {
    title: "Ask your schedule anything",
    detail:
      "\"What do I have next Monday?\" — the assistant's Ask mode answers questions without changing anything.",
  },
];
