/**
 * Core schedule model — fully generic. No school, term, campus list or
 * timetable shape is baked in: the term (label, week-1 Monday, week count)
 * travels inside ScheduleData, days cover the whole week, and "campus" is a
 * free-form location string the user (or the AI) supplies.
 */

export type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export type MeetingFlag = "biweekly" | "once";
/**
 * A free-form place label — a campus, a building, a site, anything the user
 * calls it. "" means "no location given". Colors are assigned automatically
 * per distinct value (see `campusTone` on ScheduleData).
 */
export type Campus = string;

export const DAYS: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DAY_LABEL: Record<DayKey, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export const MAX_TERM_WEEKS = 52;
export const DEFAULT_TERM_WEEKS = 16;

/**
 * A term = a label, the Monday of week 1 (ISO date), and how many weeks it
 * runs. Stored with the schedule so every user keeps their own calendar.
 */
export type TermConfig = {
  label: string;
  /** ISO date (YYYY-MM-DD) of the Monday of week 1. */
  startMonday: string;
  weeks: number;
};

export type Course = {
  id: string;
  name: string;
  short: string;
  code: string;
  credits: number;
  teachers: string[];
};

export type Meeting = {
  id: string;
  courseId: string;
  campus: Campus;
  day: DayKey;
  sectionStart: number;
  sectionEnd: number;
  start: string;
  end: string;
  weeks: number[];
  weeksLabel: string;
  room: string;
  flag?: MeetingFlag;
};

export type Block = {
  id: string;
  course: Course;
  campus: Campus;
  day: DayKey;
  sectionStart: number;
  sectionEnd: number;
  start: string;
  end: string;
  room: string;
  meetings: Meeting[];
  flags: MeetingFlag[];
};

/**
 * The schedule data a view is built from. `term` describes the calendar the
 * week numbers refer to; `campusTone` maps each distinct location label to a
 * stable palette index (0..LOC_TONES-1) in first-seen order.
 */
export type ScheduleData = {
  courses: Course[];
  meetings: Meeting[];
  courseById: Record<string, Course>;
  term: TermConfig;
  campusTone: Record<string, number>;
};

/** Number of distinct location colors available (see styles.css --color-loc-*). */
export const LOC_TONES = 8;

/** Fallback course for a meeting whose courseId is missing from the catalog. */
function makeStubCourse(id: string): Course {
  return {
    id,
    name: id,
    short: id,
    code: id,
    credits: 0,
    teachers: [],
  };
}

export function emptyScheduleData(term: TermConfig = defaultTerm()): ScheduleData {
  return { courses: [], meetings: [], courseById: {}, term, campusTone: {} };
}

/** Monday of the week containing `date` (device-local), as YYYY-MM-DD. */
export function mondayOf(date: Date): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dow = (d.getDay() + 6) % 7; // Mon=0 … Sun=6
  d.setDate(d.getDate() - dow);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function defaultTerm(): TermConfig {
  return { label: "", startMonday: mondayOf(new Date()), weeks: DEFAULT_TERM_WEEKS };
}

/** Normalize a possibly-user-entered term: snap start to its Monday, bound weeks. */
export function normalizeTerm(term: Partial<TermConfig> | undefined): TermConfig {
  const fallback = defaultTerm();
  let startMonday = fallback.startMonday;
  if (term?.startMonday && /^\d{4}-\d{2}-\d{2}$/.test(term.startMonday)) {
    const parsed = new Date(`${term.startMonday}T12:00:00`);
    if (!Number.isNaN(parsed.getTime())) startMonday = mondayOf(parsed);
  }
  const weeks = Math.min(
    MAX_TERM_WEEKS,
    Math.max(1, Math.round(term?.weeks ?? fallback.weeks) || fallback.weeks),
  );
  const label = (term?.label ?? "").trim().slice(0, 60) || autoTermLabel(startMonday);
  return { label, startMonday, weeks };
}

function autoTermLabel(startMonday: string): string {
  const start = new Date(`${startMonday}T12:00:00`);
  const season =
    start.getMonth() >= 7 ? "Autumn" : start.getMonth() <= 1 ? "Spring" : "Term";
  return `${season} ${start.getFullYear()}`;
}

export const DEFAULT_DAY_SPAN = { start: "08:00", end: "18:00" } as const;

export type Daypart = "Morning" | "Afternoon" | "Evening" | "Night";

/** Generic clock-based part of day — no school-specific band boundaries. */
export function daypartOf(start: string): Daypart {
  const t = toMinutes(start);
  if (t < 12 * 60) return "Morning";
  if (t < 17 * 60) return "Afternoon";
  if (t < 21 * 60) return "Evening";
  return "Night";
}

export function expandWeeks(spec: string): number[] {
  const weeks: number[] = [];
  for (const part of spec.split(",")) {
    const token = part.trim();
    const range = /^(\d+)-(\d+)$/.exec(token);
    if (range) {
      const from = Number(range[1]);
      const to = Number(range[2]);
      for (let w = from; w <= to; w += 1) weeks.push(w);
    } else {
      weeks.push(Number(token));
    }
  }
  return weeks;
}

/** Turn a weeks array like [2,3,4,6,7] into a compact label like "2–4, 6–7". */
export function compressWeeks(weeks: number[]): string {
  const sorted = [...new Set(weeks)].sort((a, b) => a - b);
  if (sorted.length === 0) return "";
  const parts: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i <= sorted.length; i += 1) {
    const cur = sorted[i];
    if (cur === prev + 1) {
      prev = cur;
      continue;
    }
    parts.push(start === prev ? `${start}` : `${start}–${prev}`);
    start = cur;
    prev = cur;
  }
  return parts.join(", ");
}

/**
 * The distinct class start times observed in a schedule, sorted — a stand-in
 * for a school's numbered "periods", derived from the user's own data so it
 * works for any institution without configuration.
 */
export function periodTable(data: ScheduleData): string[] {
  return [...new Set(data.meetings.map((m) => m.start))].sort(
    (a, b) => toMinutes(a) - toMinutes(b),
  );
}

/**
 * Best-fit period numbers for a meeting's start/end against the schedule's
 * own period table. Only used for grouping/labels — blocks render real times.
 */
export function sectionsForTime(
  start: string,
  end: string,
  data: ScheduleData,
): { sectionStart: number; sectionEnd: number } {
  const table = periodTable(data);
  const nearest = (hhmm: string) => {
    const t = toMinutes(hhmm);
    let best = 0;
    for (let i = 0; i < table.length; i += 1) {
      if (Math.abs(toMinutes(table[i]) - t) < Math.abs(toMinutes(table[best]) - t)) {
        best = i;
      }
    }
    return best + 1;
  };
  if (table.length === 0) return { sectionStart: 1, sectionEnd: 1 };
  const s = nearest(start);
  const e = Math.max(s, nearest(minutesToHhmm(Math.max(toMinutes(end) - 1, 0))));
  return { sectionStart: s, sectionEnd: e };
}

function minutesToHhmm(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function minutesToLabel(mins: number): string {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function durationMinutes(start: string, end: string): number {
  return toMinutes(end) - toMinutes(start);
}

export function formatDuration(mins: number): string {
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  if (hours && rest) return `${hours}h ${rest}m`;
  if (hours) return `${hours}h`;
  return `${rest}m`;
}

/**
 * The time span the day columns should cover: from the earliest class start
 * (or 08:00, whichever is earlier) to the latest end (or 18:00, whichever is
 * later), rounded outward to whole hours. Adapts to any timetable.
 */
export function daySpan(data: ScheduleData): { startMin: number; endMin: number } {
  let startMin = toMinutes(DEFAULT_DAY_SPAN.start);
  let endMin = toMinutes(DEFAULT_DAY_SPAN.end);
  for (const m of data.meetings) {
    startMin = Math.min(startMin, toMinutes(m.start));
    endMin = Math.max(endMin, toMinutes(m.end));
  }
  return {
    startMin: Math.floor(startMin / 60) * 60,
    endMin: Math.ceil(endMin / 60) * 60,
  };
}

/** Vertical position (percent) of a block within a day column of `span`. */
export function dayPosition(
  start: string,
  end: string,
  span: { startMin: number; endMin: number },
): { top: number; height: number } {
  const total = span.endMin - span.startMin;
  const s = toMinutes(start) - span.startMin;
  const e = toMinutes(end) - span.startMin;
  const pad = 0.6;
  const top = (s / total) * 100 + pad;
  const height = ((e - s) / total) * 100 - pad * 2;
  return { top: Math.max(0, top), height: Math.max(height, 3.5) };
}

/** Device-local clock parts (replaces the old fixed-timezone helper). */
export function localParts(date = new Date()) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: (["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const)[
      date.getDay()
    ] as DayKey,
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
}

/** Back-compat alias for older callers. */
export const shanghaiParts = localParts;

function utcCivil(year: number, month: number, day: number) {
  return Date.UTC(year, month - 1, day);
}

function termStartCivil(term: TermConfig): number {
  const [y, m, d] = term.startMonday.split("-").map(Number);
  return utcCivil(y, m, d);
}

function weekMonday(week: number, term: TermConfig) {
  const base = termStartCivil(term) + (week - 1) * 7 * 86400000;
  const d = new Date(base);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
}

export function dateOf(week: number, day: DayKey, term: TermConfig) {
  const offset = DAYS.indexOf(day);
  const mon = weekMonday(week, term);
  const ms = utcCivil(mon.year, mon.month, mon.day) + offset * 86400000;
  const d = new Date(ms);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const date = d.getUTCDate();
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
  return { year, month, day: date, iso };
}

/** Which term week contains `date`, or null when outside the term. */
export function termWeekFromDate(
  date: Date,
  term: TermConfig,
): number | null {
  const p = localParts(date);
  const diff = Math.round(
    (utcCivil(p.year, p.month, p.day) - termStartCivil(term)) / 86400000,
  );
  const week = Math.floor(diff / 7) + 1;
  if (week < 1 || week > term.weeks) return null;
  return week;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDayMonth(year: number, month: number, day: number) {
  const thisYear = new Date().getFullYear();
  return `${day} ${MONTHS[month - 1]}${year !== thisYear ? ` ${year}` : ""}`;
}

export function formatWeekRange(week: number, term: TermConfig): string {
  const mon = dateOf(week, "Mon", term);
  const sun = dateOf(week, "Sun", term);
  if (mon.month === sun.month && mon.year === sun.year) {
    return `${mon.day}–${sun.day} ${MONTHS[mon.month - 1]}${mon.year !== new Date().getFullYear() ? ` ${mon.year}` : ""}`;
  }
  return `${formatDayMonth(mon.year, mon.month, mon.day)} – ${formatDayMonth(sun.year, sun.month, sun.day)}`;
}

export function formatShortDate(week: number, day: DayKey, term: TermConfig): string {
  const d = dateOf(week, day, term);
  return `${d.day} ${MONTHS[d.month - 1]}`;
}

/**
 * Merge a week's meetings into display blocks: same course + day + place +
 * room, time-adjacent (≤ 25 min gap between one meeting's end and the next's
 * start — covers back-to-back periods with a short break).
 */
const MERGE_GAP_MINUTES = 25;

function mergeMeetings(meetings: Meeting[], data: ScheduleData): Block[] {
  const groups = new Map<string, Meeting[]>();
  for (const meeting of meetings) {
    const key = `${meeting.courseId}|${meeting.day}|${meeting.campus}|${meeting.room}`;
    const list = groups.get(key) ?? [];
    list.push(meeting);
    groups.set(key, list);
  }

  const blocks: Block[] = [];
  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    let run: Meeting[] = [sorted[0]];
    const flush = () => {
      const first = run[0];
      const last = run[run.length - 1];
      const course = data.courseById[first.courseId] ?? makeStubCourse(first.courseId);
      const flags = (["biweekly", "once"] as MeetingFlag[]).filter((flag) =>
        run.every((m) => m.flag === flag),
      );
      blocks.push({
        id: run.map((m) => m.id).join("+"),
        course,
        campus: first.campus,
        day: first.day,
        sectionStart: first.sectionStart,
        sectionEnd: last.sectionEnd,
        start: first.start,
        end: last.end,
        room: first.room,
        meetings: run,
        flags,
      });
    };
    for (let i = 1; i < sorted.length; i += 1) {
      const next = sorted[i];
      const prev = run[run.length - 1];
      if (toMinutes(next.start) - toMinutes(prev.end) <= MERGE_GAP_MINUTES) {
        run.push(next);
      } else {
        flush();
        run = [next];
      }
    }
    flush();
  }

  return blocks.sort((a, b) => {
    const day = DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
    if (day) return day;
    return toMinutes(a.start) - toMinutes(b.start);
  });
}

function meetingsInWeek(week: number, data: ScheduleData): Meeting[] {
  return data.meetings.filter((m) => m.weeks.includes(week));
}

export function blocksForWeek(week: number, data: ScheduleData): Block[] {
  return mergeMeetings(meetingsInWeek(week, data), data);
}

export function weekHasClasses(week: number, data: ScheduleData): boolean {
  return data.meetings.some((m) => m.weeks.includes(week));
}

export function weekLoad(
  week: number,
  data: ScheduleData,
): { total: number; count: number; byCampus: Record<string, number> } {
  const blocks = blocksForWeek(week, data);
  const byCampus: Record<string, number> = {};
  let total = 0;
  for (const block of blocks) {
    const mins = durationMinutes(block.start, block.end);
    byCampus[block.campus] = (byCampus[block.campus] ?? 0) + mins;
    total += mins;
  }
  return { total, count: blocks.length, byCampus };
}

export function maxWeekLoad(data: ScheduleData): number {
  let max = 1;
  for (let w = 1; w <= data.term.weeks; w += 1) {
    max = Math.max(max, weekLoad(w, data).total);
  }
  return max;
}

/** Days that have classes at two or more distinct locations. */
export function commuteDays(week: number, data: ScheduleData): DayKey[] {
  const byDay = new Map<DayKey, Set<Campus>>();
  for (const block of blocksForWeek(week, data)) {
    if (!block.campus) continue;
    const set = byDay.get(block.day) ?? new Set<Campus>();
    set.add(block.campus);
    byDay.set(block.day, set);
  }
  return DAYS.filter((day) => (byDay.get(day)?.size ?? 0) > 1);
}

export function commuteCopy(
  week: number,
  day: DayKey,
  data: ScheduleData,
): string | null {
  const blocks = blocksForWeek(week, data).filter((b) => b.day === day && b.campus);
  const places = [...new Set(blocks.map((b) => b.campus))];
  if (places.length < 2) return null;
  const first = [...blocks].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0];
  const rest = places.filter((p) => p !== first.campus);
  return `${DAY_LABEL[day]} starts at ${first.campus}, then ${rest.join(" & ")}`;
}

export function firstBusyDay(week: number, data: ScheduleData): DayKey {
  const blocks = blocksForWeek(week, data);
  return blocks[0]?.day ?? "Mon";
}

export function defaultWeek(date: Date, data: ScheduleData): number {
  const term = data.term;
  const current = termWeekFromDate(date, term);
  if (current && weekHasClasses(current, data)) return current;
  if (current) {
    for (let w = current; w <= term.weeks; w += 1) {
      if (weekHasClasses(w, data)) return w;
    }
    for (let w = current; w >= 1; w -= 1) {
      if (weekHasClasses(w, data)) return w;
    }
  }
  const p = localParts(date);
  const now = utcCivil(p.year, p.month, p.day);
  if (now < termStartCivil(term)) {
    for (let w = 1; w <= term.weeks; w += 1) {
      if (weekHasClasses(w, data)) return w;
    }
  }
  for (let w = 1; w <= term.weeks; w += 1) {
    if (weekHasClasses(w, data)) return w;
  }
  return 1;
}

export type NextUp =
  | { status: "now"; block: Block; week: number; ends: string }
  | { status: "later"; block: Block; week: number };

export function nextUp(date: Date, data: ScheduleData): NextUp | null {
  const parts = localParts(date);
  const currentWeek = termWeekFromDate(date, data.term);
  const nowMins = parts.hour * 60 + parts.minute;
  const dayIndex = DAYS.indexOf(parts.weekday);

  let startWeek: number;
  if (currentWeek) {
    startWeek = currentWeek;
  } else {
    const now = utcCivil(parts.year, parts.month, parts.day);
    if (now < termStartCivil(data.term)) startWeek = 1;
    else return null;
  }

  for (let week = startWeek; week <= data.term.weeks; week += 1) {
    const blocks = blocksForWeek(week, data);
    for (const block of blocks) {
      const bDay = DAYS.indexOf(block.day);
      if (week === currentWeek) {
        if (bDay < dayIndex) continue;
        if (bDay === dayIndex && nowMins >= toMinutes(block.end)) continue;
        if (bDay === dayIndex && nowMins >= toMinutes(block.start)) {
          return { status: "now", block, week, ends: block.end };
        }
      }
      return { status: "later", block, week };
    }
  }
  return null;
}

export function courseHours(courseId: string, data: ScheduleData): number {
  let mins = 0;
  for (const meeting of data.meetings) {
    if (meeting.courseId !== courseId) continue;
    mins += durationMinutes(meeting.start, meeting.end) * meeting.weeks.length;
  }
  return mins;
}

export function courseMeetings(courseId: string, data: ScheduleData): Meeting[] {
  return data.meetings.filter((m) => m.courseId === courseId);
}

export function serializeWeek(week: number, data: ScheduleData): string {
  const blocks = blocksForWeek(week, data);
  const lines = [
    `Schedule · ${data.term.label}`,
    `Week ${week} · ${formatWeekRange(week, data.term)}`,
    "",
  ];
  if (blocks.length === 0) {
    lines.push("No classes this week.");
    return lines.join("\n");
  }
  let lastDay: DayKey | null = null;
  for (const block of blocks) {
    if (block.day !== lastDay) {
      if (lastDay) lines.push("");
      lines.push(`${DAY_LABEL[block.day]} ${formatShortDate(week, block.day, data.term)}`);
      lastDay = block.day;
    }
    lines.push(
      `  ${block.start}–${block.end}  ${block.course.short}  ${block.campus ? `${block.campus} ` : ""}${block.room}`,
    );
  }
  const commutes = commuteDays(week, data);
  if (commutes.length) {
    lines.push("");
    lines.push(`Multiple locations: ${commutes.map((d) => DAY_LABEL[d]).join(", ")}`);
  }
  return lines.join("\n");
}

export function clampWeek(week: number, weeks = MAX_TERM_WEEKS): number {
  return Math.min(weeks, Math.max(1, Math.round(week)));
}

export function sectionsLabel(start: number, end: number): string {
  return start === end ? `P${start}` : `P${start}–${end}`;
}

/** Sorted distinct location labels present in a week ("" excluded). */
export function weekCampuses(week: number, data: ScheduleData): string[] {
  const set = new Set<string>();
  for (const b of blocksForWeek(week, data)) {
    if (b.campus) set.add(b.campus);
  }
  return [...set].sort(
    (a, b) => (data.campusTone[a] ?? 0) - (data.campusTone[b] ?? 0),
  );
}
