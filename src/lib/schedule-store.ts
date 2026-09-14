import { buildScheduleData } from "@/lib/schedule-ai";
import { type Course, type Meeting, type ScheduleData } from "@/lib/schedule";
import { getSchedule, saveSchedule, resetSchedule } from "@/lib/schedule-data";

/**
 * Client-side schedule persistence. `localStorage` is the source of truth on
 * every device — it works on the hosted site, the APK, and offline. When the
 * user is signed in on the hosted app, the Neon DB acts as a best-effort sync
 * layer so the same schedule follows them across browsers. The APK never
 * reaches the server functions, so it stays a purely local copy.
 *
 * A brand-new visitor has no stored schedule: they get an empty base and the
 * onboarding flow, not a seeded timetable.
 */

const STORAGE_KEY = "my-schedule";
const ONBOARDED_KEY = "my-schedule-onboarded";

export type LocalSchedule = {
  courses: Course[];
  meetings: Meeting[];
  /** Epoch ms when this copy was last written. 0 = never saved. */
  updatedAt: number;
};

function safeParse(raw: string | null): LocalSchedule | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<LocalSchedule>;
    if (!Array.isArray(p.courses) || !Array.isArray(p.meetings)) return null;
    return {
      courses: p.courses as Course[],
      meetings: p.meetings as Meeting[],
      updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : 0,
    };
  } catch {
    return null;
  }
}

export function readLocalSchedule(): LocalSchedule | null {
  if (typeof window === "undefined") return null;
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function writeLocalSchedule(
  courses: Course[],
  meetings: Meeting[],
  updatedAt = Date.now(),
): LocalSchedule {
  const next: LocalSchedule = { courses, meetings, updatedAt };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function clearLocalSchedule(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Whether this device has finished the first-run onboarding. Tracked
 * separately from the schedule itself so "start empty" counts as onboarded,
 * while a reset clears both flags and re-runs onboarding.
 */
export function hasOnboarded(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ONBOARDED_KEY) === "1";
}

export function markOnboarded(): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ONBOARDED_KEY, "1");
  }
}

export function clearOnboarded(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(ONBOARDED_KEY);
  }
}

/** A new device starts from an empty schedule — the user builds their own. */
export const BASE_SCHEDULE: LocalSchedule = { courses: [], meetings: [], updatedAt: 0 };

/**
 * One-shot reconciliation on app load for a signed-in user. Returns the
 * winning schedule (newest of local/server) and writes it to whichever side is
 * stale, so the two copies converge. Never throws — sync is best-effort and
 * must not break the local app when offline or on the APK.
 */
export async function syncSchedule(canSync: boolean): Promise<LocalSchedule> {
  const local = readLocalSchedule() ?? BASE_SCHEDULE;
  if (!canSync) return local;

  try {
    const server = await getSchedule();
    if (!server) {
      // No cloud copy yet — upload the local one so it follows the user.
      await saveSchedule({ data: { courses: local.courses, meetings: local.meetings } });
      return local;
    }
    if (server.updatedAt > local.updatedAt) {
      // Adopt the cloud copy; keep its timestamp so the two sides agree.
      return writeLocalSchedule(server.courses, server.meetings, server.updatedAt);
    }
    if (local.updatedAt > server.updatedAt) {
      await saveSchedule({ data: { courses: local.courses, meetings: local.meetings } });
    }
    return local;
  } catch {
    return local;
  }
}

/** Persist a new schedule locally and to the cloud when signed in. */
export async function applySchedule(
  courses: Course[],
  meetings: Meeting[],
  canSync: boolean,
): Promise<ScheduleData> {
  writeLocalSchedule(courses, meetings);
  if (canSync) {
    try {
      await saveSchedule({ data: { courses, meetings } });
    } catch {
      /* keep the local copy; sync can retry on next load */
    }
  }
  return buildScheduleData(courses, meetings);
}

/** Clear the schedule everywhere and send the user back through onboarding. */
export async function resetScheduleEverywhere(canSync: boolean): Promise<ScheduleData> {
  clearLocalSchedule();
  clearOnboarded();
  if (canSync) {
    try {
      await resetSchedule();
    } catch {
      /* best-effort */
    }
  }
  return buildScheduleData([], []);
}
