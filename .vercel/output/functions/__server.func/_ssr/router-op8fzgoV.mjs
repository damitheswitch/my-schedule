import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-op8fzgoV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-DAYanSSU.css";
var APP_NAME = "North & South";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Autumn 2026 timetable — eight courses, two campuses, twenty credits."
			},
			{
				name: "theme-color",
				content: "#f1eee6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
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
var TOTAL_CREDITS = COURSES.reduce((sum, c) => sum + c.credits, 0);
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
function mergeMeetings(meetings) {
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
			const course = COURSE_BY_ID[first.courseId];
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
function meetingsInWeek(week) {
	return MEETINGS.filter((m) => m.weeks.includes(week));
}
function blocksForWeek(week) {
	return mergeMeetings(meetingsInWeek(week));
}
function weekHasClasses(week) {
	return MEETINGS.some((m) => m.weeks.includes(week));
}
function weekLoad(week) {
	const blocks = blocksForWeek(week);
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
function maxWeekLoad() {
	let max = 1;
	for (let w = 1; w <= TERM.weeks; w += 1) max = Math.max(max, weekLoad(w).total);
	return max;
}
function commuteDays(week) {
	const byDay = /* @__PURE__ */ new Map();
	for (const block of blocksForWeek(week)) {
		const set = byDay.get(block.day) ?? /* @__PURE__ */ new Set();
		set.add(block.campus);
		byDay.set(block.day, set);
	}
	return DAYS.filter((day) => (byDay.get(day)?.size ?? 0) > 1);
}
function commuteCopy(week, day) {
	const blocks = blocksForWeek(week).filter((b) => b.day === day);
	if (new Set(blocks.map((b) => b.campus)).size < 2) return null;
	const first = [...blocks].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0];
	const later = first.campus === "North" ? "South" : "North";
	return `${DAY_LABEL[day]} starts on ${first.campus}, then ${later}`;
}
function firstBusyDay(week) {
	return blocksForWeek(week)[0]?.day ?? "Mon";
}
function defaultWeek(date = /* @__PURE__ */ new Date()) {
	const current = termWeekFromDate(date);
	if (current && weekHasClasses(current)) return current;
	if (current) {
		for (let w = current; w <= TERM.weeks; w += 1) if (weekHasClasses(w)) return w;
		for (let w = current; w >= 1; w -= 1) if (weekHasClasses(w)) return w;
	}
	const parts = shanghaiParts(date);
	const start = utcCivil(2026, 9, 7);
	if (utcCivil(parts.year, parts.month, parts.day) < start) {
		for (let w = 1; w <= TERM.weeks; w += 1) if (weekHasClasses(w)) return w;
	}
	return 2;
}
function nextUp(date = /* @__PURE__ */ new Date()) {
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
		const blocks = blocksForWeek(week);
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
function courseHours(courseId) {
	let mins = 0;
	for (const meeting of MEETINGS) {
		if (meeting.courseId !== courseId) continue;
		mins += durationMinutes(meeting.start, meeting.end) * meeting.weeks.length;
	}
	return mins;
}
function courseMeetings(courseId) {
	return MEETINGS.filter((m) => m.courseId === courseId);
}
function serializeWeek(week) {
	const blocks = blocksForWeek(week);
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
	const commutes = commuteDays(week);
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
var $$splitComponentImporter = () => import("./routes-CNIFPsKZ.mjs");
var Route = createFileRoute("/")({
	validateSearch: (search) => {
		const raw = Number(search.week);
		if (!Number.isFinite(raw)) return {};
		return { week: clampWeek(raw) };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = { IndexRoute: Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { termWeekFromDate as A, formatWeekRange as C, sectionsLabel as D, nextUp as E, weekHasClasses as M, weekLoad as N, serializeWeek as O, formatShortDate as S, maxWeekLoad as T, dateOf as _, DAYS as a, firstBusyDay as b, TOTAL_CREDITS as c, blocksForWeek as d, clampWeek as f, courseMeetings as g, courseHours as h, COURSES as i, toMinutes as j, shanghaiParts as k, bandOf as l, commuteDays as m, Route as n, DAY_LABEL as o, commuteCopy as p, BANDS as r, TERM as s, router_exports as t, bandPosition as u, defaultWeek as v, holidayName as w, formatDuration as x, durationMinutes as y };
