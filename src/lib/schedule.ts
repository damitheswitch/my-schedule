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

export const COURSES: Course[] = [
  {
    id: "chinese",
    name: "Comprehensive Chinese I",
    short: "Chinese I",
    code: "X2FL1095",
    credits: 4,
    teachers: ["Han Dong", "Jin Yuchen"],
  },
  {
    id: "imip",
    name: "Intelligent Medical Information Processing",
    short: "Med. Info",
    code: "X2AI2052",
    credits: 2,
    teachers: ["Wang Rongfang"],
  },
  {
    id: "optim",
    name: "Data-Driven Optimization Learning",
    short: "Optimization",
    code: "X2AI2010",
    credits: 2,
    teachers: ["Wang Handing"],
  },
  {
    id: "cv",
    name: "Computer Vision and Its Applications",
    short: "Vision",
    code: "X2EE2170",
    credits: 2,
    teachers: ["Han Hong", "Li Cuiyun"],
  },
  {
    id: "ml",
    name: "Machine Learning",
    short: "Machine Learning",
    code: "X2CS1026",
    credits: 3,
    teachers: ["Zhang Junying", "Xu Si", "Lu Yiheng"],
  },
  {
    id: "algo",
    name: "Algorithm Analysis and Design",
    short: "Algorithms",
    code: "X2AI1100",
    credits: 3,
    teachers: ["Zhu Hao"],
  },
  {
    id: "conditions",
    name: "China National Conditions Education 1",
    short: "National Conditions",
    code: "X2FL2097",
    credits: 1,
    teachers: ["Li Feng"],
  },
  {
    id: "overview",
    name: "China Overview",
    short: "China Overview",
    code: "X2IE0001",
    credits: 3,
    teachers: ["Li Shihua", "Yong Hong", "Lian Hong"],
  },
];

export const COURSE_BY_ID: Record<string, Course> = Object.fromEntries(
  COURSES.map((c) => [c.id, c]),
);

export const TOTAL_CREDITS = COURSES.reduce((sum, c) => sum + c.credits, 0);

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

export const MEETINGS: Meeting[] = [
  {
    id: "chinese-mon",
    courseId: "chinese",
    campus: "South",
    day: "Mon",
    sectionStart: 1,
    sectionEnd: 4,
    start: "08:30",
    end: "12:00",
    weeks: expandWeeks("2-4, 6-17"),
    weeksLabel: "2–4, 6–17",
    room: "G-514",
  },
  {
    id: "chinese-tue-w17",
    courseId: "chinese",
    campus: "South",
    day: "Tue",
    sectionStart: 5,
    sectionEnd: 8,
    start: "14:00",
    end: "17:30",
    weeks: [17],
    weeksLabel: "17",
    room: "C-416",
    flag: "once",
  },
  {
    id: "imip-mon-pm",
    courseId: "imip",
    campus: "South",
    day: "Mon",
    sectionStart: 5,
    sectionEnd: 6,
    start: "14:00",
    end: "15:35",
    weeks: expandWeeks("2-4, 6-14, 16"),
    weeksLabel: "2–4, 6–14, 16",
    room: "A-105",
  },
  {
    id: "imip-mon-late",
    courseId: "imip",
    campus: "South",
    day: "Mon",
    sectionStart: 7,
    sectionEnd: 8,
    start: "15:55",
    end: "17:30",
    weeks: [9, 14, 16],
    weeksLabel: "9, 14, 16",
    room: "A-105",
    flag: "biweekly",
  },
  {
    id: "optim-mon-eve",
    courseId: "optim",
    campus: "South",
    day: "Mon",
    sectionStart: 9,
    sectionEnd: 10,
    start: "19:00",
    end: "20:35",
    weeks: expandWeeks("2-4, 6-13"),
    weeksLabel: "2–4, 6–13",
    room: "C-416",
  },
  {
    id: "optim-mon-s11",
    courseId: "optim",
    campus: "South",
    day: "Mon",
    sectionStart: 11,
    sectionEnd: 11,
    start: "20:40",
    end: "21:25",
    weeks: expandWeeks("3-4, 6-13"),
    weeksLabel: "3–4, 6–13",
    room: "C-416",
  },
  {
    id: "cv-tue",
    courseId: "cv",
    campus: "North",
    day: "Tue",
    sectionStart: 1,
    sectionEnd: 2,
    start: "08:30",
    end: "10:05",
    weeks: expandWeeks("2-4, 6-10"),
    weeksLabel: "2–4, 6–10",
    room: "West-204",
  },
  {
    id: "ml-tue",
    courseId: "ml",
    campus: "South",
    day: "Tue",
    sectionStart: 5,
    sectionEnd: 8,
    start: "14:00",
    end: "17:30",
    weeks: expandWeeks("9-14"),
    weeksLabel: "9–14",
    room: "B-528",
  },
  {
    id: "algo-tue",
    courseId: "algo",
    campus: "South",
    day: "Tue",
    sectionStart: 9,
    sectionEnd: 11,
    start: "19:00",
    end: "21:25",
    weeks: expandWeeks("2-4, 6-17"),
    weeksLabel: "2–4, 6–17",
    room: "A-105",
  },
  {
    id: "algo-mon-w17",
    courseId: "algo",
    campus: "South",
    day: "Mon",
    sectionStart: 9,
    sectionEnd: 11,
    start: "19:00",
    end: "21:25",
    weeks: [17],
    weeksLabel: "17",
    room: "A-105",
    flag: "once",
  },
  {
    id: "conditions-wed",
    courseId: "conditions",
    campus: "North",
    day: "Wed",
    sectionStart: 5,
    sectionEnd: 8,
    start: "14:00",
    end: "17:30",
    weeks: expandWeeks("8-11"),
    weeksLabel: "8–11",
    room: "J-110",
  },
  {
    id: "cv-thu",
    courseId: "cv",
    campus: "North",
    day: "Thu",
    sectionStart: 1,
    sectionEnd: 2,
    start: "08:30",
    end: "10:05",
    weeks: expandWeeks("2-3, 5-10"),
    weeksLabel: "2–3, 5–10",
    room: "West-204",
  },
  {
    id: "ml-thu",
    courseId: "ml",
    campus: "South",
    day: "Thu",
    sectionStart: 5,
    sectionEnd: 8,
    start: "14:00",
    end: "17:30",
    weeks: expandWeeks("9-14"),
    weeksLabel: "9–14",
    room: "B-528",
  },
  {
    id: "overview-fri",
    courseId: "overview",
    campus: "North",
    day: "Fri",
    sectionStart: 5,
    sectionEnd: 8,
    start: "14:00",
    end: "17:30",
    weeks: expandWeeks("2, 5-15"),
    weeksLabel: "2, 5–15",
    room: "West-113",
  },
];

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
    `North & South · ${TERM.label}`,
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
