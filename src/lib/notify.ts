import {
  blocksForWeek,
  localParts,
  termWeekFromDate,
  DAYS,
  type ScheduleData,
} from "@/lib/schedule";

/**
 * Class reminders. On the web app they fire while the app is open (browsers
 * don't allow a page-free scheduled local notification); the Android APK gets
 * true always-on reminders natively through the `Kebiao` bridge — this module
 * mirrors the same prefs to it so both stay in sync.
 */

const PREFS_KEY = "my-schedule-reminders";

export type ReminderPrefs = {
  enabled: boolean;
  /** Minutes before class start to fire. */
  leadMin: number;
};

export const LEAD_OPTIONS = [5, 10, 15, 30] as const;

export function readReminderPrefs(): ReminderPrefs {
  if (typeof window === "undefined") return { enabled: false, leadMin: 10 };
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return { enabled: false, leadMin: 10 };
    const p = JSON.parse(raw) as Partial<ReminderPrefs>;
    return {
      enabled: Boolean(p.enabled),
      leadMin: typeof p.leadMin === "number" ? p.leadMin : 10,
    };
  } catch {
    return { enabled: false, leadMin: 10 };
  }
}

export function writeReminderPrefs(prefs: ReminderPrefs): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function notificationsSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

/** Ask for the notification permission — must be called from a user gesture. */
export async function ensureNotificationPermission(): Promise<boolean> {
  if (!notificationsSupported()) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

type PendingReminder = { at: number; title: string; body: string };

let timers: number[] = [];

/** Compute every upcoming class start within the next 7 days. */
function upcomingReminders(data: ScheduleData, leadMin: number): PendingReminder[] {
  const now = new Date();
  const week = termWeekFromDate(now, data.term);
  if (!week) return [];
  const parts = localParts(now);
  const dayIndex = DAYS.indexOf(parts.weekday);
  const out: PendingReminder[] = [];

  const blocks = blocksForWeek(week, data);
  for (const block of blocks) {
    const bDay = DAYS.indexOf(block.day);
    if (bDay < dayIndex) continue;
    const daysAhead = bDay - dayIndex;
    const fire = new Date(now);
    fire.setDate(fire.getDate() + daysAhead);
    const [h, m] = block.start.split(":").map(Number);
    fire.setHours(h, m - leadMin, 0, 0);
    if (fire.getTime() <= now.getTime()) continue;
    const where = [block.campus, block.room].filter(Boolean).join(" ");
    out.push({
      at: fire.getTime(),
      title: `${block.course.short} in ${leadMin} min`,
      body: `${block.start}–${block.end}${where ? ` · ${where}` : ""}`,
    });
  }
  // Beyond today: also next week's remaining days are covered by the next
  // app open — keep the window tight so timers stay few.
  return out;
}

/**
 * (Re)schedule in-page timers for upcoming class reminders. Call on load, on
 * schedule change, and when the tab becomes visible again.
 */
export function syncReminders(data: ScheduleData): void {
  for (const t of timers) window.clearTimeout(t);
  timers = [];
  const prefs = readReminderPrefs();
  if (!prefs.enabled || !notificationsSupported()) return;
  if (Notification.permission !== "granted") return;

  for (const r of upcomingReminders(data, prefs.leadMin)) {
    const delay = r.at - Date.now();
    if (delay < 0 || delay > 7 * 86400000) continue;
    timers.push(
      window.setTimeout(() => {
        try {
          new Notification(r.title, { body: r.body, tag: `kebiao-${r.at}` });
        } catch {
          /* some platforms need a service worker — reminders still fire in-app */
        }
      }, delay),
    );
  }
}
