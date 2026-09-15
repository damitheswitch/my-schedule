import { buildScheduleData } from "@/lib/schedule-ai";
import {
  defaultTerm,
  normalizeTerm,
  type Course,
  type Meeting,
  type ScheduleData,
  type TermConfig,
} from "@/lib/schedule";
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
  /** The user's own term calendar; absent on schedules saved before terms existed. */
  term?: TermConfig;
  /** Epoch ms when this copy was last written. 0 = never saved. */
  updatedAt: number;
};

/**
 * Schedules stored before terms became per-user carried a fixed calendar.
 * Upgrade them to that same calendar so existing installs don't shift.
 */
const LEGACY_TERM: TermConfig = {
  label: "Autumn 2026",
  startMonday: "2026-09-07",
  weeks: 17,
};

function safeParse(raw: string | null): LocalSchedule | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<LocalSchedule>;
    if (!Array.isArray(p.courses) || !Array.isArray(p.meetings)) return null;
    const term = p.term
      ? normalizeTerm(p.term)
      : (p.meetings.length ? LEGACY_TERM : defaultTerm());
    return {
      courses: p.courses as Course[],
      meetings: p.meetings as Meeting[],
      term,
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
  term?: TermConfig,
  updatedAt = Date.now(),
): LocalSchedule {
  const existing = readLocalSchedule();
  const next: LocalSchedule = {
    courses,
    meetings,
    term: term ?? existing?.term ?? defaultTerm(),
    updatedAt,
  };
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
      await saveSchedule({ data: { courses: local.courses, meetings: local.meetings, term: local.term } });
      return local;
    }
    if (server.updatedAt > local.updatedAt) {
      // Adopt the cloud copy; keep its timestamp so the two sides agree.
      return writeLocalSchedule(server.courses, server.meetings, server.term, server.updatedAt);
    }
    if (local.updatedAt > server.updatedAt) {
      await saveSchedule({ data: { courses: local.courses, meetings: local.meetings, term: local.term } });
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
  term?: TermConfig,
): Promise<ScheduleData> {
  const local = writeLocalSchedule(courses, meetings, term);
  if (canSync) {
    try {
      await saveSchedule({ data: { courses, meetings, term: local.term } });
    } catch {
      /* keep the local copy; sync can retry on next load */
    }
  }
  return buildScheduleData(courses, meetings, local.term);
}

/** Persist just the term settings (schedule untouched). */
export async function applyTerm(term: TermConfig, canSync: boolean): Promise<ScheduleData> {
  const local = readLocalSchedule() ?? BASE_SCHEDULE;
  const next = writeLocalSchedule(local.courses, local.meetings, term);
  if (canSync) {
    try {
      await saveSchedule({ data: { courses: next.courses, meetings: next.meetings, term } });
    } catch {
      /* best-effort */
    }
  }
  return buildScheduleData(next.courses, next.meetings, term);
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
  return buildScheduleData([], [], defaultTerm());
}
