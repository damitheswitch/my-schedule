import { F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { n as createMiddleware } from "./ssr.mjs";
import { s as TERM } from "./schedule-B0yyZU-a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-ai-ThVoJL0j.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-CVqXY6bk.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-DqCMUwK_.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var DAY_ALIASES = {
	mon: "Mon",
	monday: "Mon",
	"周一": "Mon",
	tue: "Tue",
	tues: "Tue",
	tuesday: "Tue",
	"周二": "Tue",
	wed: "Wed",
	wednesday: "Wed",
	"周三": "Wed",
	thu: "Thu",
	thurs: "Thu",
	thursday: "Thu",
	"周四": "Thu",
	fri: "Fri",
	friday: "Fri",
	"周五": "Fri"
};
var CAMPUS_ALIASES = {
	south: "South",
	"南校区": "South",
	"南区": "South",
	"南": "South",
	north: "North",
	"北校区": "North",
	"北区": "North",
	"北": "North"
};
function normDay(v) {
	return DAY_ALIASES[v.trim().toLowerCase()] ?? null;
}
function normCampus(v) {
	const key = v.trim().toLowerCase();
	return CAMPUS_ALIASES[key] ?? (key === "south" ? "South" : key === "north" ? "North" : null);
}
/** Turn a weeks array like [2,3,4,6,7] into a compact label like "2–4, 6–7". */
function compressWeeks(weeks) {
	const sorted = [...new Set(weeks)].sort((a, b) => a - b);
	const parts = [];
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
var aiOutputSchema = object({
	courses: array(object({
		id: string(),
		name: string(),
		short: string(),
		code: string(),
		credits: number(),
		teachers: array(string())
	})),
	meetings: array(object({
		id: string(),
		courseId: string(),
		campus: string(),
		day: string(),
		sectionStart: number(),
		sectionEnd: number(),
		start: string(),
		end: string(),
		weeks: array(number()),
		weeksLabel: string().optional(),
		room: string(),
		flag: string().optional()
	})),
	summary: string().optional()
});
/** Coerce loosely-typed AI output into strict Meeting rows, dropping invalid ones. */
function normalizeMeetings(raw) {
	const out = [];
	const seenIds = /* @__PURE__ */ new Set();
	for (const m of raw) {
		const day = normDay(m.day);
		const campus = normCampus(m.campus);
		if (!day || !campus) continue;
		const weeks = m.weeks.filter((w) => w >= 1 && w <= TERM.weeks);
		if (weeks.length === 0) continue;
		const flag = m.flag === "biweekly" || m.flag === "once" ? m.flag : void 0;
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
			flag
		});
	}
	return out;
}
function buildScheduleData(courses, meetings) {
	const courseById = {};
	for (const c of courses) courseById[c.id] = c;
	return {
		courses,
		meetings,
		courseById
	};
}
/** Build the system + user messages for the schedule-parse completion. */
function buildParseMessages(text, mode, current) {
	return {
		system: [
			"You are a schedule parser for a Chinese university master's student.",
			`Term: ${TERM.label}, ${TERM.weeks} weeks. Week 1 Monday is ${TERM.week1Monday}.`,
			"Weekdays are Mon, Tue, Wed, Thu, Fri. Campuses are South or North.",
			"Class sections are numbered 1-11 per day. Time bands: morning 08:30-12:00 (sections 1-4), afternoon 14:00-17:30 (sections 5-8), evening 19:00-21:25 (sections 9-11).",
			"A meeting's `weeks` is an array of week numbers (1-17) the class occurs.",
			"`weeksLabel` is a short human label like \"2-4, 6-17\" or \"9\".",
			"`flag` is optional: \"biweekly\" for irregular/alternating weeks, \"once\" for a single make-up session, or omit for regular weekly meetings.",
			"Match course names loosely to the existing course catalog by meaning (abbreviations, Chinese names). Reuse existing course ids when a meeting belongs to a known course; only create a new course id when the notice names a genuinely new course."
		].join(" "),
		user: [
			mode === "merge" ? "Apply the notice below to the user's CURRENT schedule and return the FULL resulting schedule (all meetings, with the notice's changes applied). Keep unchanged meetings exactly as they are. If the notice cancels or moves a class, update or remove only the affected meetings." : "Rebuild the user's schedule from the notice below. Return the full schedule described by the notice (the current schedule is only context for course names).",
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
			"Return ONLY a JSON object with this exact shape (no prose, no markdown fences):",
			"{\"courses\":[{\"id\",\"name\",\"short\",\"code\",\"credits\",\"teachers\":[]}],\"meetings\":[{\"id\",\"courseId\",\"campus\",\"day\",\"sectionStart\",\"sectionEnd\",\"start\",\"end\",\"weeks\":[],\"weeksLabel\",\"room\",\"flag?\"}],\"summary\":\"one sentence describing what changed\"}",
			"Every meeting MUST have a unique `id` (e.g. \"<courseId>-<day>-<sectionStart>\"). `start`/`end` are \"HH:MM\". `weeks` must be integers 1-17."
		].join("\n")
	};
}
/**
* One xAI chat completion. Shared by the server function (platform key) and
* the client fallback (user-supplied key on the APK / signed-out browsers).
*/
async function requestCompletion(system, user, apiKey) {
	let res;
	try {
		res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 4e3,
				temperature: 0,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: user
				}]
			})
		});
	} catch {
		return {
			ok: false,
			error: "Could not reach the AI service. Try again."
		};
	}
	if (!res.ok) return {
		ok: false,
		error: `AI service error (${res.status}). Try again.`
	};
	const text = (await res.json()).choices?.[0]?.message?.content ?? "";
	if (!text) return {
		ok: false,
		error: "The AI returned an empty response."
	};
	return {
		ok: true,
		text
	};
}
/**
* Turn the model's raw text into a validated ScheduleData. Returns null when the
* JSON or schema doesn't parse so callers can surface a friendly error.
*/
function normalizeAiOutput(raw) {
	let parsed;
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
	return {
		schedule: buildScheduleData(courses, meetings),
		summary
	};
}
//#endregion
export { requestCompletion as a, normalizeAiOutput as i, buildParseMessages as n, buildScheduleData as r, authMiddleware as t };
