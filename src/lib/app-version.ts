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
export const APP_VERSION = "2.0.0";
export const APK_VERSION_CODE = 5;
export const APK_FILENAME = `kebiao-${APP_VERSION}.apk`;
export const APK_PATH = `/${APK_FILENAME}`;

/**
 * The deployed site the APK calls for AI. The WebView bundle has no backend,
 * so it posts to this origin's `/api/ai` (allowlisted in the endpoint's CORS).
 */
export const PUBLIC_SITE_URL = "https://my-schedule-xi-one.vercel.app";

export const WHATS_NEW: { title: string; detail: string }[] = [
  {
    title: "Import your timetable file",
    detail:
      "Drop in the school's export — PDF, Word, Excel, CSV, text — or a screenshot of it. The assistant reads it and drafts your whole term.",
  },
  {
    title: "Your term, your way",
    detail:
      "Set your own term name, start date and length in Settings — and schedules can now include Saturday and Sunday classes.",
  },
  {
    title: "Class reminders + home-screen widget",
    detail:
      "Get nudged before class (in Settings), and on Android add the Kebiao widget to your home screen for your next class at a glance.",
  },
];
