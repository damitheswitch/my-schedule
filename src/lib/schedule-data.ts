import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { type ScheduleData } from "@/lib/schedule";
import { buildScheduleData } from "@/lib/schedule-ai";

/**
 * Server-side schedule persistence — the optional cloud-sync layer for signed
 * in users. Runs only on the hosted app; the APK and signed-out browsers stay
 * local. AI requests do NOT go through here: they hit the public `/api/ai`
 * route (rate-limited, owner key, no sign-in required). Every function is
 * behind `authMiddleware` and scoped to the verified `context.userId`.
 */

/** Rows stored as JSON; the DB shape the server reads/writes. */
type ScheduleRow = {
  user_id: string;
  courses: unknown;
  meetings: unknown;
  updated_at: unknown;
};

function toMillis(v: unknown): number {
  if (typeof v === "number") return v;
  const t = Date.parse(String(v));
  return Number.isFinite(t) ? t : 0;
}

export type SavedSchedule = ScheduleData & { updatedAt: number };

/** Read the signed-in user's saved schedule. Returns null when none is saved —
 *  the client keeps its localStorage copy in that case. */
export const getSchedule = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<SavedSchedule | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<ScheduleRow>`
      select user_id, courses, meetings, updated_at from user_schedules where user_id = ${context.userId}
    `;
    if (rows.length === 0) return null;
    const row = rows[0];
    const courses = (row.courses as ScheduleData["courses"]) ?? [];
    const meetings = (row.meetings as ScheduleData["meetings"]) ?? [];
    return { ...buildScheduleData(courses, meetings), updatedAt: toMillis(row.updated_at) };
  });

const saveInput = z.object({
  courses: z
    .array(
      z.object({
        id: z.string().max(80),
        name: z.string().max(200),
        short: z.string().max(80),
        code: z.string().max(40),
        credits: z.number(),
        teachers: z.array(z.string().max(120)).max(12),
      }),
    )
    .max(60),
  meetings: z
    .array(
      z.object({
        id: z.string().max(120),
        courseId: z.string().max(80),
        campus: z.enum(["South", "North"]),
        day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri"]),
        sectionStart: z.number(),
        sectionEnd: z.number(),
        start: z.string().max(8),
        end: z.string().max(8),
        weeks: z.array(z.number()).max(30),
        weeksLabel: z.string().max(60),
        room: z.string().max(80),
        flag: z.enum(["biweekly", "once"]).optional(),
      }),
    )
    .max(400),
});

/** Persist the signed-in user's schedule (sync layer for the hosted app). */
export const saveSchedule = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(saveInput)
  .handler(async ({ data, context }): Promise<SavedSchedule> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Pick<ScheduleRow, "updated_at">>`
      insert into user_schedules (user_id, courses, meetings, updated_at)
      values (${context.userId}, ${JSON.stringify(data.courses)}::jsonb, ${JSON.stringify(data.meetings)}::jsonb, now())
      on conflict (user_id) do update
        set courses = excluded.courses,
            meetings = excluded.meetings,
            updated_at = now()
      returning updated_at
    `;
    return {
      ...buildScheduleData(data.courses, data.meetings),
      updatedAt: toMillis(rows[0]?.updated_at),
    };
  });

/** Drop the saved schedule so the hosted app falls back to localStorage/base. */
export const resetSchedule = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`delete from user_schedules where user_id = ${context.userId}`;
    return { ok: true as const };
  });
