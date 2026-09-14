/**
 * Single source of truth for the app version, release notes, and the Android
 * APK the site serves. Bump `APP_VERSION` per release — the what's-new dialog
 * re-announces itself once per version (tracked in localStorage), and the APK
 * filename is derived here so the download link never drifts.
 *
 * Keep `versionName`/`versionCode` in `android/app/build.gradle` in sync.
 */
export const APP_VERSION = "1.1.0";
export const APK_VERSION_CODE = 2;
export const APK_FILENAME = `north-south-${APP_VERSION}.apk`;
export const APK_PATH = `/${APK_FILENAME}`;

export const WHATS_NEW: { title: string; detail: string }[] = [
  {
    title: "Update with AI",
    detail:
      "Paste a schedule notice from your class group — the AI reads it, shows a preview, and applies it on confirm. Merge keeps untouched classes; Replace rebuilds the week plan.",
  },
  {
    title: "Sign in to sync",
    detail:
      "Optional sign-in keeps your schedule in sync across browsers via the cloud. Signed out (or on the Android app), everything still works — stored locally on the device.",
  },
  {
    title: "Android app",
    detail:
      "A sideloadable APK packages the whole schedule for your phone. The AI update works there too — bring your own xAI key.",
  },
];
