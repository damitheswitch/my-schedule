export type Campus = "South" | "North";
export type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
export type MeetingFlag = "biweekly" | "once";

export const DAYS: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const DAY_LABEL: Record<DayKey, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
};

export const TERM = {
  label: "Autumn 2026",
  weeks: 17,
  tz: "Asia/Shanghai",
  week1Monday: "2026-09-07",
} as const;

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

export const COURSES: Course[] = [];

export const COURSE_BY_ID: Record<string, Course> = Object.fromEntries(
  COURSES.map((c) => [c.id, c]),
);


/**
 * The schedule data a view is built from. Defaults to the hardcoded base
 * schedule below; the AI/persistence layer swaps in a user's saved courses +
 * meetings (see `src/lib/schedule-data.ts`). Threading this through the
 * data functions keeps a per-user schedule isolated server-side (no shared
 * module state) while leaving the static call sites working unchanged.
 */
export type ScheduleData = {
  courses: Course[];
  meetings: Meeting[];
  courseById: Record<string, Course>;
};

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

export const MEETINGS: Meeting[] = [];

export const DEFAULT_SCHEDULE: ScheduleData = {
  courses: COURSES,
  meetings: MEETINGS,
  courseById: COURSE_BY_ID,
};

export const BANDS = [
  { id: "morning", label: "Morning", start: "08:30", end: "12:00" },
  { id: "afternoon", label: "Afternoon", start: "14:00", end: "17:30" },
  { id: "evening", label: "Evening", start: "19:00", end: "21:30" },
] as const;

export type Band = (typeof BANDS)[number];

const HOLIDAY_DATES: Record<string, string> = {
  "2026-09-25": "Mid-Autumn",
  "2026-09-26": "Mid-Autumn",
  "2026-09-27": "Mid-Autumn",
  "2026-10-01": "National Day",
  "2026-10-02": "National Day",
  "2026-10-03": "National Day",
  "2026-10-04": "National Day",
  "2026-10-05": "National Day",
  "2026-10-06": "National Day",
  "2026-10-07": "National Day",
  "2027-01-01": "New Year",
};

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

/** Typical section start times (11 sections across the three daily bands). */
const SECTION_STARTS = [
  "08:30", "09:20", "10:15", "11:10",
  "14:00", "14:50", "15:45", "16:40",
  "19:00", "19:50", "20:40",
] as const;

/**
 * Best-fit section numbers for a manual entry. Only used to group/label
 * meetings — the block renders real start/end times, so approximation is fine.
 */
export function sectionsForTime(start: string, end: string): {
  sectionStart: number;
  sectionEnd: number;
} {
  const nearest = (hhmm: string) => {
    const t = toMinutes(hhmm);
    let best = 0;
    for (let i = 0; i < SECTION_STARTS.length; i += 1) {
      if (Math.abs(toMinutes(SECTION_STARTS[i]) - t) < Math.abs(toMinutes(SECTION_STARTS[best]) - t)) {
        best = i;
      }
    }
    return best + 1;
  };
  const s = nearest(start);
  // The end lands past the last section's start — nudge back one minute so a
  // class ending at a boundary still maps to the section it occupied.
  const e = Math.max(s, nearest(minutesToHhmm(toMinutes(end) - 1)));
  return { sectionStart: s, sectionEnd: e };
}

function minutesToHhmm(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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

export function bandOf(start: string): Band {
  const t = toMinutes(start);
  if (t < toMinutes("13:00")) return BANDS[0];
  if (t < toMinutes("18:00")) return BANDS[1];
  return BANDS[2];
}

export function bandPosition(start: string, end: string, band: Band) {
  const b0 = toMinutes(band.start);
  const span = toMinutes(band.end) - b0;
  const s = toMinutes(start);
  const e = toMinutes(end);
  const pad = 1.2;
  const top = ((s - b0) / span) * 100 + pad;
  const height = ((e - s) / span) * 100 - pad * 2;
  return { top, height: Math.max(height, 14) };
}

export function shanghaiParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TERM.tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const bag: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    weekday: bag.weekday as DayKey | "Sat" | "Sun",
    hour: Number(bag.hour),
    minute: Number(bag.minute),
  };
}

function utcCivil(year: number, month: number, day: number) {
  return Date.UTC(year, month - 1, day);
}

export function weekMonday(week: number) {
  const base = utcCivil(2026, 9, 7) + (week - 1) * 7 * 86400000;
  const d = new Date(base);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
}

export function dateOf(week: number, day: DayKey) {
  const offset = DAYS.indexOf(day);
  const mon = weekMonday(week);
  const ms = utcCivil(mon.year, mon.month, mon.day) + offset * 86400000;
  const d = new Date(ms);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const date = d.getUTCDate();
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
  return { year, month, day: date, iso };
}

export function holidayName(iso: string): string | undefined {
  return HOLIDAY_DATES[iso];
}

export function termWeekFromDate(date = new Date()): number | null {
  const p = shanghaiParts(date);
  const diff = Math.round((utcCivil(p.year, p.month, p.day) - utcCivil(2026, 9, 7)) / 86400000);
  const week = Math.floor(diff / 7) + 1;
  if (week < 1 || week > TERM.weeks) return null;
  return week;
}

function formatDayMonth(year: number, month: number, day: number) {
  return `${day} ${MONTHS[month - 1]}${year !== 2026 ? ` ${year}` : ""}`;
}

export function formatWeekRange(week: number): string {
  const mon = dateOf(week, "Mon");
  const fri = dateOf(week, "Fri");
  if (mon.month === fri.month) {
    return `${mon.day}–${fri.day} ${MONTHS[mon.month - 1]}`;
  }
  return `${formatDayMonth(mon.year, mon.month, mon.day)} – ${formatDayMonth(fri.year, fri.month, fri.day)}`;
}

export function formatShortDate(week: number, day: DayKey): string {
  const d = dateOf(week, day);
  return `${d.day} ${MONTHS[d.month - 1]}`;
}

export function mergeMeetings(
  meetings: Meeting[],
  data: ScheduleData = DEFAULT_SCHEDULE,
): Block[] {
  const groups = new Map<string, Meeting[]>();
  for (const meeting of meetings) {
    const key = `${meeting.courseId}|${meeting.day}|${meeting.campus}|${meeting.room}`;
    const list = groups.get(key) ?? [];
    list.push(meeting);
    groups.set(key, list);
  }

  const blocks: Block[] = [];
  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => a.sectionStart - b.sectionStart);
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
      if (next.sectionStart <= prev.sectionEnd + 1) {
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

export function meetingsInWeek(
  week: number,
  data: ScheduleData = DEFAULT_SCHEDULE,
): Meeting[] {
  return data.meetings.filter((m) => m.weeks.includes(week));
}

export function blocksForWeek(
  week: number,
  data: ScheduleData = DEFAULT_SCHEDULE,
): Block[] {
  return mergeMeetings(meetingsInWeek(week, data), data);
}

export function weekHasClasses(
  week: number,
  data: ScheduleData = DEFAULT_SCHEDULE,
): boolean {
  return data.meetings.some((m) => m.weeks.includes(week));
}

export function weekLoad(week: number, data: ScheduleData = DEFAULT_SCHEDULE) {
  const blocks = blocksForWeek(week, data);
  let south = 0;
  let north = 0;
  for (const block of blocks) {
    const mins = durationMinutes(block.start, block.end);
    if (block.campus === "South") south += mins;
    else north += mins;
  }
  return { south, north, total: south + north, count: blocks.length };
}

export function maxWeekLoad(data: ScheduleData = DEFAULT_SCHEDULE): number {
  let max = 1;
  for (let w = 1; w <= TERM.weeks; w += 1) {
    max = Math.max(max, weekLoad(w, data).total);
  }
  return max;
}

export function commuteDays(week: number, data: ScheduleData = DEFAULT_SCHEDULE): DayKey[] {
  const byDay = new Map<DayKey, Set<Campus>>();
  for (const block of blocksForWeek(week, data)) {
    const set = byDay.get(block.day) ?? new Set<Campus>();
    set.add(block.campus);
    byDay.set(block.day, set);
  }
  return DAYS.filter((day) => (byDay.get(day)?.size ?? 0) > 1);
}

export function commuteCopy(
  week: number,
  day: DayKey,
  data: ScheduleData = DEFAULT_SCHEDULE,
): string | null {
  const blocks = blocksForWeek(week, data).filter((b) => b.day === day);
  const campuses = new Set(blocks.map((b) => b.campus));
  if (campuses.size < 2) return null;
  const first = [...blocks].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0];
  const later = first.campus === "North" ? "South" : "North";
  return `${DAY_LABEL[day]} starts on ${first.campus}, then ${later}`;
}

export function firstBusyDay(week: number, data: ScheduleData = DEFAULT_SCHEDULE): DayKey {
  const blocks = blocksForWeek(week, data);
  return blocks[0]?.day ?? "Mon";
}

export function defaultWeek(date = new Date(), data: ScheduleData = DEFAULT_SCHEDULE): number {
  const current = termWeekFromDate(date);
  if (current && weekHasClasses(current, data)) return current;
  if (current) {
    for (let w = current; w <= TERM.weeks; w += 1) {
      if (weekHasClasses(w, data)) return w;
    }
    for (let w = current; w >= 1; w -= 1) {
      if (weekHasClasses(w, data)) return w;
    }
  }
  const parts = shanghaiParts(date);
  const start = utcCivil(2026, 9, 7);
  const now = utcCivil(parts.year, parts.month, parts.day);
  if (now < start) {
    for (let w = 1; w <= TERM.weeks; w += 1) {
      if (weekHasClasses(w, data)) return w;
    }
  }
  return 2;
}

export type NextUp =
  | { status: "now"; block: Block; week: number; ends: string }
  | { status: "later"; block: Block; week: number };

export function nextUp(date = new Date(), data: ScheduleData = DEFAULT_SCHEDULE): NextUp | null {
  const parts = shanghaiParts(date);
  const currentWeek = termWeekFromDate(date);
  const nowMins = parts.hour * 60 + parts.minute;
  const weekday = parts.weekday;
  const dayIndex = DAYS.includes(weekday as DayKey) ? DAYS.indexOf(weekday as DayKey) : 5;

  let startWeek: number;
  if (currentWeek) {
    startWeek = currentWeek;
  } else {
    const start = utcCivil(2026, 9, 7);
    const now = utcCivil(parts.year, parts.month, parts.day);
    if (now < start) startWeek = 1;
    else return null;
  }

  for (let week = startWeek; week <= TERM.weeks; week += 1) {
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

export function courseHours(courseId: string, data: ScheduleData = DEFAULT_SCHEDULE): number {
  let mins = 0;
  for (const meeting of data.meetings) {
    if (meeting.courseId !== courseId) continue;
    mins += durationMinutes(meeting.start, meeting.end) * meeting.weeks.length;
  }
  return mins;
}

export function courseMeetings(courseId: string, data: ScheduleData = DEFAULT_SCHEDULE): Meeting[] {
  return data.meetings.filter((m) => m.courseId === courseId);
}

export function serializeWeek(week: number, data: ScheduleData = DEFAULT_SCHEDULE): string {
  const blocks = blocksForWeek(week, data);
  const lines = [
    `Kebiao · ${TERM.label}`,
    `Week ${week} · ${formatWeekRange(week)}`,
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
      const holiday = holidayName(dateOf(week, block.day).iso);
      lines.push(
        `${DAY_LABEL[block.day]} ${formatShortDate(week, block.day)}${holiday ? ` · ${holiday}` : ""}`,
      );
      lastDay = block.day;
    }
    lines.push(
      `  ${block.start}–${block.end}  ${block.course.short}  ${block.campus} ${block.room}`,
    );
  }
  const commutes = commuteDays(week, data);
  if (commutes.length) {
    lines.push("");
    lines.push(
      `Both campuses: ${commutes.map((d) => DAY_LABEL[d]).join(", ")}`,
    );
  }
  return lines.join("\n");
}

export function clampWeek(week: number): number {
  return Math.min(TERM.weeks, Math.max(1, Math.round(week)));
}

export function sectionsLabel(start: number, end: number): string {
  return start === end ? `S${start}` : `S${start}–${end}`;
}
