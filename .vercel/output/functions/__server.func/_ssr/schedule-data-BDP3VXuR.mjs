import { D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { d as buildScheduleData } from "./schedule-ai-owSWeblb.mjs";
import { t as authMiddleware } from "./middleware-BWLq4NPP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-data-BDP3VXuR.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function toMillis(v) {
	if (typeof v === "number") return v;
	const t = Date.parse(String(v));
	return Number.isFinite(t) ? t : 0;
}
var getSchedule_createServerFn_handler = createServerRpc({
	id: "da68ad683b6506403824f4548aa048531cf35a6ff6c597ce4068c249747161de",
	name: "getSchedule",
	filename: "src/lib/schedule-data.ts"
}, (opts) => getSchedule.__executeServer(opts));
var getSchedule = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getSchedule_createServerFn_handler, async ({ context }) => {
	const { getSql } = await import("./db-D8CXEjvD.mjs").then((n) => n.t).then((n) => n.t);
	const rows = await (await getSql())`
      select user_id, courses, meetings, updated_at from user_schedules where user_id = ${context.userId}
    `;
	if (rows.length === 0) return null;
	const row = rows[0];
	const courses = row.courses ?? [];
	const meetings = row.meetings ?? [];
	return {
		...buildScheduleData(courses, meetings),
		updatedAt: toMillis(row.updated_at)
	};
});
var saveInput = object({
	courses: array(object({
		id: string().max(80),
		name: string().max(200),
		short: string().max(80),
		code: string().max(40),
		credits: number(),
		teachers: array(string().max(120)).max(12)
	})).max(60),
	meetings: array(object({
		id: string().max(120),
		courseId: string().max(80),
		campus: _enum(["South", "North"]),
		day: _enum([
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri"
		]),
		sectionStart: number(),
		sectionEnd: number(),
		start: string().max(8),
		end: string().max(8),
		weeks: array(number()).max(30),
		weeksLabel: string().max(60),
		room: string().max(80),
		flag: _enum(["biweekly", "once"]).optional()
	})).max(400)
});
/** Persist the signed-in user's schedule (sync layer for the hosted app). */
var saveSchedule_createServerFn_handler = createServerRpc({
	id: "0ed26409b7181a11164c7c16fa6a998c8ca2ba41d2eac28f760e4712291f1938",
	name: "saveSchedule",
	filename: "src/lib/schedule-data.ts"
}, (opts) => saveSchedule.__executeServer(opts));
var saveSchedule = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveInput).handler(saveSchedule_createServerFn_handler, async ({ data, context }) => {
	const { getSql } = await import("./db-D8CXEjvD.mjs").then((n) => n.t).then((n) => n.t);
	const rows = await (await getSql())`
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
		updatedAt: toMillis(rows[0]?.updated_at)
	};
});
var resetSchedule_createServerFn_handler = createServerRpc({
	id: "ec8769b0d06b23951eb6cb1ea2e21c41812962d203589200f97e70b6cc4cd1b3",
	name: "resetSchedule",
	filename: "src/lib/schedule-data.ts"
}, (opts) => resetSchedule.__executeServer(opts));
var resetSchedule = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(resetSchedule_createServerFn_handler, async ({ context }) => {
	const { getSql } = await import("./db-D8CXEjvD.mjs").then((n) => n.t).then((n) => n.t);
	await (await getSql())`delete from user_schedules where user_id = ${context.userId}`;
	return { ok: true };
});
//#endregion
export { getSchedule_createServerFn_handler, resetSchedule_createServerFn_handler, saveSchedule_createServerFn_handler };
