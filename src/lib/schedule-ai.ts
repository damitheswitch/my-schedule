import { z } from "zod";
import {
  TERM,
  type Course,
  type Meeting,
  type MeetingFlag,
  type Campus,
  type DayKey,
  type ScheduleData,
} from "@/lib/schedule";

/**
 * Shared, client-safe AI parse logic — the prompt builder, the loose output
 * schema, and the normalizer. Used by the server function (`schedule-data.ts`)
 * on the hosted app AND by the client-side fallback on the APK / signed-out
 * browsers, where there is no server to call. Nothing here touches the
 * filesystem, `process.env`, or `@/lib/db`.
 */

export type ParseMode = "merge" | "replace";

const DAY_ALIASES: Record<string, DayKey> = {
  mon: "Mon", monday: "Mon", "周一": "Mon",
  tue: "Tue", tues: "Tue", tuesday: "Tue", "周二": "Tue",
  wed: "Wed", wednesday: "Wed", "周三": "Wed",
  thu: "Thu", thurs: "Thu", thursday: "Thu", "周四": "Thu",
  fri: "Fri", friday: "Fri", "周五": "Fri",
};

const CAMPUS_ALIASES: Record<string, Campus> = {
  south: "South", "南校区": "South", "南区": "South", "南": "South",
  north: "North", "北校区": "North", "北区": "North", "北": "North",
};

function normDay(v: string): DayKey | null {
  return DAY_ALIASES[v.trim().toLowerCase()] ?? null;
}

function normCampus(v: string): Campus | null {
  const key = v.trim().toLowerCase();
  return CAMPUS_ALIASES[key] ?? (key === "south" ? "South" : key === "north" ? "North" : null);
}

/** Turn a weeks array like [2,3,4,6,7] into a compact label like "2–4, 6–7". */
function compressWeeks(weeks: number[]): string {
  const sorted = [...new Set(weeks)].sort((a, b) => a - b);
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

/** The loose shape we ask the model for; `normalizeAiOutput` makes it strict. */
export const aiOutputSchema = z.object({
  courses: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      short: z.string(),
      code: z.string(),
      credits: z.number(),
      teachers: z.array(z.string()),
    }),
  ),
  meetings: z.array(
    z.object({
      id: z.string(),
      courseId: z.string(),
      campus: z.string(),
      day: z.string(),
      sectionStart: z.number(),
      sectionEnd: z.number(),
      start: z.string(),
      end: z.string(),
      weeks: z.array(z.number()),
      weeksLabel: z.string().optional(),
      room: z.string(),
      flag: z.string().optional(),
    }),
  ),
  summary: z.string().optional(),
});

/** Coerce loosely-typed AI output into strict Meeting rows, dropping invalid ones. */
function normalizeMeetings(raw: z.infer<typeof aiOutputSchema>["meetings"]): Meeting[] {
  const out: Meeting[] = [];
  const seenIds = new Set<string>();
  for (const m of raw) {
    const day = normDay(m.day);
    const campus = normCampus(m.campus);
    if (!day || !campus) continue;
    const weeks = m.weeks.filter((w) => w >= 1 && w <= TERM.weeks);
    if (weeks.length === 0) continue;
    const flag = m.flag === "biweekly" || m.flag === "once" ? (m.flag as MeetingFlag) : undefined;
    let id = m.id;
    if (!id || seenIds.has(id)) {
      id = `${m.courseId}-${m.day}-${m.sectionStart}-${weeks[0]}`;
      let n = 1;
      while (seenIds.has(id)) {
        id = `${m.courseId}-${m.day}-${m.sectionStart}-${weeks[0]}-${n}`;
        n += 1;
      }
    }
    seenIds.add(id);
    out.push({
      id,
      courseId: m.courseId,
      campus,
      day,
      sectionStart: m.sectionStart,
      sectionEnd: m.sectionEnd,
      start: m.start,
      end: m.end,
      weeks,
      weeksLabel: m.weeksLabel ?? compressWeeks(weeks),
      room: m.room,
      flag,
    });
  }
  return out;
}

export function buildScheduleData(courses: Course[], meetings: Meeting[]): ScheduleData {
  const courseById: Record<string, Course> = {};
  for (const c of courses) courseById[c.id] = c;
  return { courses, meetings, courseById };
}

/** Build the system + user messages for the schedule-parse completion. */
export function buildParseMessages(
  text: string,
  mode: ParseMode,
  current: { courses: Course[]; meetings: Meeting[] },
): { system: string; user: string } {
  const system = [
    "You are a schedule parser for a Chinese university master's student.",
    `Term: ${TERM.label}, ${TERM.weeks} weeks. Week 1 Monday is ${TERM.week1Monday}.`,
    "Weekdays are Mon, Tue, Wed, Thu, Fri. Campuses are South or North.",
    "Class sections are numbered 1-11 per day. Time bands: morning 08:30-12:00 (sections 1-4), afternoon 14:00-17:30 (sections 5-8), evening 19:00-21:25 (sections 9-11).",
    "A meeting's `weeks` is an array of week numbers (1-17) the class occurs.",
    "`weeksLabel` is a short human label like \"2-4, 6-17\" or \"9\".",
    "`flag` is optional: \"biweekly\" for irregular/alternating weeks, \"once\" for a single make-up session, or omit for regular weekly meetings.",
    "Match course names loosely to the existing course catalog by meaning (abbreviations, Chinese names). Reuse existing course ids when a meeting belongs to a known course; only create a new course id when the notice names a genuinely new course.",
  ].join(" ");

  const task =
    mode === "merge"
      ? "Apply the notice below to the user's CURRENT schedule and return the FULL resulting schedule (all meetings, with the notice's changes applied). Keep unchanged meetings exactly as they are. If the notice cancels or moves a class, update or remove only the affected meetings."
      : "Rebuild the user's schedule from the notice below. Return the full schedule described by the notice (the current schedule is only context for course names).";

  const user = [
    task,
    "",
    "EXISTING COURSE CATALOG (reuse these ids when possible):",
    JSON.stringify(current.courses, null, 2),
    "",
    "CURRENT SCHEDULE (meetings):",
    JSON.stringify(current.meetings, null, 2),
    "",
    "NOTICE TO APPLY:",
    text,
    "",
    'Return ONLY a JSON object with this exact shape (no prose, no markdown fences):',
    '{"courses":[{"id","name","short","code","credits","teachers":[]}],"meetings":[{"id","courseId","campus","day","sectionStart","sectionEnd","start","end","weeks":[],"weeksLabel","room","flag?"}],"summary":"one sentence describing what changed"}',
    "Every meeting MUST have a unique `id` (e.g. \"<courseId>-<day>-<sectionStart>\"). `start`/`end` are \"HH:MM\". `weeks` must be integers 1-17.",
  ].join("\n");

  return { system, user };
}

/**
 * One xAI chat completion. Shared by the server function (platform key) and
 * the client fallback (user-supplied key on the APK / signed-out browsers).
 */
export async function requestCompletion(
  system: string,
  user: string,
  apiKey: string,
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  let res: Response;
  try {
    res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 4000,
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
  } catch {
    return { ok: false, error: "Could not reach the AI service. Try again." };
  }
  if (!res.ok) {
    return { ok: false, error: `AI service error (${res.status}). Try again.` };
  }
  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = body.choices?.[0]?.message?.content ?? "";
  if (!text) return { ok: false, error: "The AI returned an empty response." };
  return { ok: true, text };
}

/**
 * Turn the model's raw text into a validated ScheduleData. Returns null when the
 * JSON or schema doesn't parse so callers can surface a friendly error.
 */
export function normalizeAiOutput(raw: string): { schedule: ScheduleData; summary: string } | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  const validated = aiOutputSchema.safeParse(parsed);
  if (!validated.success) return null;
  const meetings = normalizeMeetings(validated.data.meetings);
  const courses = validated.data.courses;
  const summary = validated.data.summary ?? "Schedule updated.";
  return { schedule: buildScheduleData(courses, meetings), summary };
}
