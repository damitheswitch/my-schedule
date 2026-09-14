//#region node_modules/.nitro/vite/services/ssr/assets/schedule-B0yyZU-a.js
var DAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri"
];
var DAY_LABEL = {
	Mon: "Monday",
	Tue: "Tuesday",
	Wed: "Wednesday",
	Thu: "Thursday",
	Fri: "Friday"
};
var TERM = {
	label: "Autumn 2026",
	weeks: 17,
	tz: "Asia/Shanghai",
	week1Monday: "2026-09-07"
};
var COURSES = [
	{
		id: "chinese",
		name: "Comprehensive Chinese I",
		short: "Chinese I",
		code: "X2FL1095",
		credits: 4,
		teachers: ["Han Dong", "Jin Yuchen"]
	},
	{
		id: "imip",
		name: "Intelligent Medical Information Processing",
		short: "Med. Info",
		code: "X2AI2052",
		credits: 2,
		teachers: ["Wang Rongfang"]
	},
	{
		id: "optim",
		name: "Data-Driven Optimization Learning",
		short: "Optimization",
		code: "X2AI2010",
		credits: 2,
		teachers: ["Wang Handing"]
	},
	{
		id: "cv",
		name: "Computer Vision and Its Applications",
		short: "Vision",
		code: "X2EE2170",
		credits: 2,
		teachers: ["Han Hong", "Li Cuiyun"]
	},
	{
		id: "ml",
		name: "Machine Learning",
		short: "Machine Learning",
		code: "X2CS1026",
		credits: 3,
		teachers: [
			"Zhang Junying",
			"Xu Si",
			"Lu Yiheng"
		]
	},
	{
		id: "algo",
		name: "Algorithm Analysis and Design",
		short: "Algorithms",
		code: "X2AI1100",
		credits: 3,
		teachers: ["Zhu Hao"]
	},
	{
		id: "conditions",
		name: "China National Conditions Education 1",
		short: "National Conditions",
		code: "X2FL2097",
		credits: 1,
		teachers: ["Li Feng"]
	},
	{
		id: "overview",
		name: "China Overview",
		short: "China Overview",
		code: "X2IE0001",
		credits: 3,
		teachers: [
			"Li Shihua",
			"Yong Hong",
			"Lian Hong"
		]
	}
];
var COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c]));
COURSES.reduce((sum, c) => sum + c.credits, 0);
/** Fallback course for a meeting whose courseId is missing from the catalog. */
function makeStubCourse(id) {
	return {
		id,
		name: id,
		short: id,
		code: id,
		credits: 0,
		teachers: []
	};
}
var MEETINGS = [
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
		room: "G-514"
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
		flag: "once"
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
		room: "A-105"
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
		weeks: [
			9,
			14,
			16
		],
		weeksLabel: "9, 14, 16",
		room: "A-105",
		flag: "biweekly"
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
		room: "C-416"
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
		room: "C-416"
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
		room: "West-204"
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
		room: "B-528"
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
		room: "A-105"
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
		flag: "once"
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
		room: "J-110"
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
		room: "West-204"
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
		room: "B-528"
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
		room: "West-113"
	}
];
var DEFAULT_SCHEDULE = {
	courses: COURSES,
	meetings: MEETINGS,
	courseById: COURSE_BY_ID
};
var BANDS = [
	{
		id: "morning",
		label: "Morning",
		start: "08:30",
		end: "12:00"
	},
	{
		id: "afternoon",
		label: "Afternoon",
		start: "14:00",
		end: "17:30"
	},
	{
		id: "evening",
		label: "Evening",
		start: "19:00",
		end: "21:30"
	}
];
var HOLIDAY_DATES = {
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
	"2027-01-01": "New Year"
};
var MONTHS = [
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
	"Dec"
];
function expandWeeks(spec) {
	const weeks = [];
	for (const part of spec.split(",")) {
		const token = part.trim();
		const range = /^(\d+)-(\d+)$/.exec(token);
		if (range) {
			const from = Number(range[1]);
			const to = Number(range[2]);
			for (let w = from; w <= to; w += 1) weeks.push(w);
		} else weeks.push(Number(token));
	}
	return weeks;
}
function toMinutes(hhmm) {
	const [h, m] = hhmm.split(":").map(Number);
	return h * 60 + m;
}
function durationMinutes(start, end) {
	return toMinutes(end) - toMinutes(start);
}
function formatDuration(mins) {
	const hours = Math.floor(mins / 60);
	const rest = mins % 60;
	if (hours && rest) return `${hours}h ${rest}m`;
	if (hours) return `${hours}h`;
	return `${rest}m`;
}
function bandOf(start) {
	const t = toMinutes(start);
	if (t < toMinutes("13:00")) return BANDS[0];
	if (t < toMinutes("18:00")) return BANDS[1];
	return BANDS[2];
}
function bandPosition(start, end, band) {
	const b0 = toMinutes(band.start);
	const span = toMinutes(band.end) - b0;
	const s = toMinutes(start);
	const e = toMinutes(end);
	const pad = 1.2;
	const top = (s - b0) / span * 100 + pad;
	const height = (e - s) / span * 100 - pad * 2;
	return {
		top,
		height: Math.max(height, 14)
	};
}
function shanghaiParts(date = /* @__PURE__ */ new Date()) {
	const fmt = new Intl.DateTimeFormat("en-GB", {
		timeZone: TERM.tz,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	});
	const bag = {};
	for (const part of fmt.formatToParts(date)) if (part.type !== "literal") bag[part.type] = part.value;
	return {
		year: Number(bag.year),
		month: Number(bag.month),
		day: Number(bag.day),
		weekday: bag.weekday,
		hour: Number(bag.hour),
		minute: Number(bag.minute)
	};
}
function utcCivil(year, month, day) {
	return Date.UTC(year, month - 1, day);
}
function weekMonday(week) {
	const base = utcCivil(2026, 9, 7) + (week - 1) * 7 * 864e5;
	const d = new Date(base);
	return {
		year: d.getUTCFullYear(),
		month: d.getUTCMonth() + 1,
		day: d.getUTCDate()
	};
}
function dateOf(week, day) {
	const offset = DAYS.indexOf(day);
	const mon = weekMonday(week);
	const ms = utcCivil(mon.year, mon.month, mon.day) + offset * 864e5;
	const d = new Date(ms);
	const year = d.getUTCFullYear();
	const month = d.getUTCMonth() + 1;
	const date = d.getUTCDate();
	return {
		year,
		month,
		day: date,
		iso: `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`
	};
}
function holidayName(iso) {
	return HOLIDAY_DATES[iso];
}
function termWeekFromDate(date = /* @__PURE__ */ new Date()) {
	const p = shanghaiParts(date);
	const diff = Math.round((utcCivil(p.year, p.month, p.day) - utcCivil(2026, 9, 7)) / 864e5);
	const week = Math.floor(diff / 7) + 1;
	if (week < 1 || week > TERM.weeks) return null;
	return week;
}
function formatDayMonth(year, month, day) {
	return `${day} ${MONTHS[month - 1]}${year !== 2026 ? ` ${year}` : ""}`;
}
function formatWeekRange(week) {
	const mon = dateOf(week, "Mon");
	const fri = dateOf(week, "Fri");
	if (mon.month === fri.month) return `${mon.day}–${fri.day} ${MONTHS[mon.month - 1]}`;
	return `${formatDayMonth(mon.year, mon.month, mon.day)} – ${formatDayMonth(fri.year, fri.month, fri.day)}`;
}
function formatShortDate(week, day) {
	const d = dateOf(week, day);
	return `${d.day} ${MONTHS[d.month - 1]}`;
}
function mergeMeetings(meetings, data = DEFAULT_SCHEDULE) {
	const groups = /* @__PURE__ */ new Map();
	for (const meeting of meetings) {
		const key = `${meeting.courseId}|${meeting.day}|${meeting.campus}|${meeting.room}`;
		const list = groups.get(key) ?? [];
		list.push(meeting);
		groups.set(key, list);
	}
	const blocks = [];
	for (const group of groups.values()) {
		const sorted = [...group].sort((a, b) => a.sectionStart - b.sectionStart);
		let run = [sorted[0]];
		const flush = () => {
			const first = run[0];
			const last = run[run.length - 1];
			const course = data.courseById[first.courseId] ?? makeStubCourse(first.courseId);
			const flags = ["biweekly", "once"].filter((flag) => run.every((m) => m.flag === flag));
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
				flags
			});
		};
		for (let i = 1; i < sorted.length; i += 1) {
			const next = sorted[i];
			const prev = run[run.length - 1];
			if (next.sectionStart <= prev.sectionEnd + 1) run.push(next);
			else {
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
function meetingsInWeek(week, data = DEFAULT_SCHEDULE) {
	return data.meetings.filter((m) => m.weeks.includes(week));
}
function blocksForWeek(week, data = DEFAULT_SCHEDULE) {
	return mergeMeetings(meetingsInWeek(week, data), data);
}
function weekHasClasses(week, data = DEFAULT_SCHEDULE) {
	return data.meetings.some((m) => m.weeks.includes(week));
}
function weekLoad(week, data = DEFAULT_SCHEDULE) {
	const blocks = blocksForWeek(week, data);
	let south = 0;
	let north = 0;
	for (const block of blocks) {
		const mins = durationMinutes(block.start, block.end);
		if (block.campus === "South") south += mins;
		else north += mins;
	}
	return {
		south,
		north,
		total: south + north,
		count: blocks.length
	};
}
function maxWeekLoad(data = DEFAULT_SCHEDULE) {
	let max = 1;
	for (let w = 1; w <= TERM.weeks; w += 1) max = Math.max(max, weekLoad(w, data).total);
	return max;
}
function commuteDays(week, data = DEFAULT_SCHEDULE) {
	const byDay = /* @__PURE__ */ new Map();
	for (const block of blocksForWeek(week, data)) {
		const set = byDay.get(block.day) ?? /* @__PURE__ */ new Set();
		set.add(block.campus);
		byDay.set(block.day, set);
	}
	return DAYS.filter((day) => (byDay.get(day)?.size ?? 0) > 1);
}
function commuteCopy(week, day, data = DEFAULT_SCHEDULE) {
	const blocks = blocksForWeek(week, data).filter((b) => b.day === day);
	if (new Set(blocks.map((b) => b.campus)).size < 2) return null;
	const first = [...blocks].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0];
	const later = first.campus === "North" ? "South" : "North";
	return `${DAY_LABEL[day]} starts on ${first.campus}, then ${later}`;
}
function firstBusyDay(week, data = DEFAULT_SCHEDULE) {
	return blocksForWeek(week, data)[0]?.day ?? "Mon";
}
function defaultWeek(date = /* @__PURE__ */ new Date(), data = DEFAULT_SCHEDULE) {
	const current = termWeekFromDate(date);
	if (current && weekHasClasses(current, data)) return current;
	if (current) {
		for (let w = current; w <= TERM.weeks; w += 1) if (weekHasClasses(w, data)) return w;
		for (let w = current; w >= 1; w -= 1) if (weekHasClasses(w, data)) return w;
	}
	const parts = shanghaiParts(date);
	const start = utcCivil(2026, 9, 7);
	if (utcCivil(parts.year, parts.month, parts.day) < start) {
		for (let w = 1; w <= TERM.weeks; w += 1) if (weekHasClasses(w, data)) return w;
	}
	return 2;
}
function nextUp(date = /* @__PURE__ */ new Date(), data = DEFAULT_SCHEDULE) {
	const parts = shanghaiParts(date);
	const currentWeek = termWeekFromDate(date);
	const nowMins = parts.hour * 60 + parts.minute;
	const weekday = parts.weekday;
	const dayIndex = DAYS.includes(weekday) ? DAYS.indexOf(weekday) : 5;
	let startWeek;
	if (currentWeek) startWeek = currentWeek;
	else {
		const start = utcCivil(2026, 9, 7);
		if (utcCivil(parts.year, parts.month, parts.day) < start) startWeek = 1;
		else return null;
	}
	for (let week = startWeek; week <= TERM.weeks; week += 1) {
		const blocks = blocksForWeek(week, data);
		for (const block of blocks) {
			const bDay = DAYS.indexOf(block.day);
			if (week === currentWeek) {
				if (bDay < dayIndex) continue;
				if (bDay === dayIndex && nowMins >= toMinutes(block.end)) continue;
				if (bDay === dayIndex && nowMins >= toMinutes(block.start)) return {
					status: "now",
					block,
					week,
					ends: block.end
				};
			}
			return {
				status: "later",
				block,
				week
			};
		}
	}
	return null;
}
function courseHours(courseId, data = DEFAULT_SCHEDULE) {
	let mins = 0;
	for (const meeting of data.meetings) {
		if (meeting.courseId !== courseId) continue;
		mins += durationMinutes(meeting.start, meeting.end) * meeting.weeks.length;
	}
	return mins;
}
function courseMeetings(courseId, data = DEFAULT_SCHEDULE) {
	return data.meetings.filter((m) => m.courseId === courseId);
}
function serializeWeek(week, data = DEFAULT_SCHEDULE) {
	const blocks = blocksForWeek(week, data);
	const lines = [
		`North & South · ${TERM.label}`,
		`Week ${week} · ${formatWeekRange(week)}`,
		""
	];
	if (blocks.length === 0) {
		lines.push("No classes this week.");
		return lines.join("\n");
	}
	let lastDay = null;
	for (const block of blocks) {
		if (block.day !== lastDay) {
			if (lastDay) lines.push("");
			const holiday = holidayName(dateOf(week, block.day).iso);
			lines.push(`${DAY_LABEL[block.day]} ${formatShortDate(week, block.day)}${holiday ? ` · ${holiday}` : ""}`);
			lastDay = block.day;
		}
		lines.push(`  ${block.start}–${block.end}  ${block.course.short}  ${block.campus} ${block.room}`);
	}
	const commutes = commuteDays(week, data);
	if (commutes.length) {
		lines.push("");
		lines.push(`Both campuses: ${commutes.map((d) => DAY_LABEL[d]).join(", ")}`);
	}
	return lines.join("\n");
}
function clampWeek(week) {
	return Math.min(TERM.weeks, Math.max(1, Math.round(week)));
}
function sectionsLabel(start, end) {
	return start === end ? `S${start}` : `S${start}–${end}`;
}
//#endregion
export { toMinutes as A, holidayName as C, serializeWeek as D, sectionsLabel as E, weekLoad as M, shanghaiParts as O, formatWeekRange as S, nextUp as T, defaultWeek as _, DEFAULT_SCHEDULE as a, formatDuration as b, bandOf as c, clampWeek as d, commuteCopy as f, dateOf as g, courseMeetings as h, DAY_LABEL as i, weekHasClasses as j, termWeekFromDate as k, bandPosition as l, courseHours as m, COURSES as n, MEETINGS as o, commuteDays as p, DAYS as r, TERM as s, BANDS as t, blocksForWeek as u, durationMinutes as v, maxWeekLoad as w, formatShortDate as x, firstBusyDay as y };
