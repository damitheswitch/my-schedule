/**
 * Client-only stub for `@/lib/schedule-data`, aliased in `vite.config.ts`.
 *
 * The real module defines TanStack Start server functions that lazily import
 * `@/lib/db` (Neon/PGLite) and the auth middleware — none of which can exist
 * inside the Android WebView bundle. Here every export just rejects; callers
 * (`schedule-store.ts`) already catch failures and stay on the local copy.
 *
 * AI doesn't go through this module at all — the panel and onboarding call the
 * hosted site's public `/api/ai` endpoint via `src/lib/ai-client.ts`.
 */

const offline = (): Promise<never> =>
  Promise.reject(new Error("No server in the app build"));

export const getSchedule = () => offline();
export const saveSchedule = (..._args: unknown[]) => offline();
export const resetSchedule = (..._args: unknown[]) => offline();

export type SavedSchedule = {
  courses: unknown[];
  meetings: unknown[];
  updatedAt: number;
};
