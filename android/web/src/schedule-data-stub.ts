/**
 * Client-only stub for `@/lib/schedule-data`, aliased in `vite.config.ts`.
 *
 * The real module defines TanStack Start server functions that lazily import
 * `@/lib/db` (Neon/PGLite) and the auth middleware — none of which can exist
 * inside the Android WebView bundle. Here every export just rejects; callers
 * (`schedule-store.ts`, `ai-update-panel.tsx`) already catch failures and fall
 * back to localStorage / the user's own API key.
 */

const offline = (): Promise<never> =>
  Promise.reject(new Error("No server in the app build"));

export const getSchedule = () => offline();
export const saveSchedule = (..._args: unknown[]) => offline();
export const resetSchedule = (..._args: unknown[]) => offline();
export const parseScheduleUpdate = (..._args: unknown[]) => offline();

export type SavedSchedule = {
  courses: unknown[];
  meetings: unknown[];
  updatedAt: number;
};

export type ParseResult =
  | { ok: true; schedule: unknown; summary: string }
  | { ok: false; error: string };
