import { o as __toESM } from "../_runtime.mjs";
import { D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as signOut, t as authClient } from "./client-CVqXY6bk.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as hasGateSessionMarker } from "./server-BGzN9ETo.mjs";
import { A as sectionsLabel, C as formatWeekRange, E as nextUp, F as weekHasClasses, I as weekLoad, M as shanghaiParts, N as termWeekFromDate, P as toMinutes, S as formatShortDate, T as maxWeekLoad, _ as dateOf, a as TERM, b as firstBusyDay, c as blocksForWeek, d as buildScheduleData, f as clampWeek, g as courseMeetings, h as courseHours, i as DEFAULT_SCHEDULE, j as serializeWeek, m as commuteDays, n as DAYS, o as bandOf, p as commuteCopy, r as DAY_LABEL, s as bandPosition, t as BANDS, v as defaultWeek, w as holidayName, x as formatDuration, y as durationMinutes } from "./schedule-ai-BcRRaj_R.mjs";
import { _ as ChevronRight, a as Smartphone, c as Printer, d as MessageCircleQuestion, f as MapPin, g as Clock, h as Download, i as Sparkles, l as Mic, m as GraduationCap, n as Users, o as Share2, p as LoaderCircle, s as RotateCcw, t as X, u as MicOff, v as ChevronLeft, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as Route$3 } from "./router-Dr_npMIy.mjs";
import { t as authMiddleware } from "./middleware-BWLq4NPP.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { _ as Slot, a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-O36NfBVb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-ink text-paper hover:bg-ink/90",
			outline: "bg-paper-elevated text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-ink-muted hover:bg-ink/5 hover:text-ink"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Dialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, { ...props });
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, { ...props });
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-ink/25 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 flex max-h-[88vh] flex-col overflow-hidden bg-paper-elevated shadow-[var(--shadow-border)]", "inset-x-0 bottom-0 rounded-t-xl", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-4", "md:inset-auto md:top-4 md:right-4 md:bottom-4 md:w-[26rem] md:rounded-xl", "md:data-[state=open]:slide-in-from-right-4 md:data-[state=closed]:slide-out-to-right-4", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 flex size-11 items-center justify-center rounded-md text-ink-muted transition-colors duration-150 hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-serif text-2xl leading-tight text-ink", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-ink-muted", className),
		...props
	});
}
function DialogTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$1, { ...props });
}
/**
* Single source of truth for the app version, release notes, the deployed
* site, and the Android APK the site serves. Bump `APP_VERSION` per release —
* the what's-new dialog re-announces itself once per version (tracked in
* localStorage), and the APK filename is derived here so the download link
* never drifts.
*
* Keep `versionName`/`versionCode` in `android/app/build.gradle` in sync.
*/
var APP_VERSION = "1.2.0";
var APK_FILENAME = `north-south-${APP_VERSION}.apk`;
var APK_PATH = `/${APK_FILENAME}`;
/**
* The deployed site the APK calls for AI. The WebView bundle has no backend,
* so it posts to this origin's `/api/ai` (allowlisted in the endpoint's CORS).
*/
var PUBLIC_SITE_URL = "https://my-schedule-xi-one.vercel.app";
var WHATS_NEW = [
	{
		title: "Craft your schedule with AI",
		detail: "Describe your classes in plain words — or paste a school notice — and the assistant builds your schedule for you. Works on the website and the Android app, no account or API key needed."
	},
	{
		title: "Ask your schedule anything",
		detail: "\"What do I have next Monday?\" — the new Ask mode answers questions about your classes without changing anything."
	},
	{
		title: "Sync when you want it",
		detail: "Everything works anonymously and offline. Sign in only if you want your schedule to follow you across devices."
	}
];
/**
* Client for the public `/api/ai` endpoint. Every surface — hosted site,
* signed-out browser, and the Android WebView — goes through here, so the
* owner key stays server-side and nobody ever pastes an API key.
*
* The APK is bundled and served from `appassets.androidplatform.net`, so it
* has no same-origin backend: it calls the deployed site directly (allowed by
* the endpoint's CORS allowlist).
*/
function isApkRuntime() {
	return typeof window !== "undefined" && window.location.host.includes("appassets");
}
function aiEndpoint() {
	return isApkRuntime() ? `${PUBLIC_SITE_URL}/api/ai` : "/api/ai";
}
async function requestAi(mode, text, current) {
	let res;
	try {
		res = await fetch(aiEndpoint(), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				mode,
				text,
				schedule: {
					courses: current.courses,
					meetings: current.meetings
				}
			})
		});
	} catch {
		return {
			ok: false,
			error: "Couldn't reach the assistant — check your connection."
		};
	}
	let body = {};
	try {
		body = await res.json();
	} catch {}
	if (!res.ok || body.ok === false) return {
		ok: false,
		error: typeof body.error === "string" ? body.error : `Something went wrong (${res.status}).`
	};
	if (mode === "ask") return typeof body.answer === "string" ? {
		ok: true,
		kind: "answer",
		answer: body.answer
	} : {
		ok: false,
		error: "The assistant returned something unreadable. Try again."
	};
	const schedule = body.schedule;
	if (!schedule) return {
		ok: false,
		error: "The assistant returned something unreadable. Try again."
	};
	return {
		ok: true,
		kind: "schedule",
		schedule,
		summary: typeof body.summary === "string" ? body.summary : "Schedule ready."
	};
}
var MODES = [
	{
		id: "merge",
		label: "Merge",
		hint: "Apply a notice to your current schedule"
	},
	{
		id: "replace",
		label: "Rebuild",
		hint: "Recreate the schedule from a description"
	},
	{
		id: "ask",
		label: "Ask",
		hint: "Answer a question about your schedule"
	}
];
var PLACEHOLDERS = {
	merge: "e.g. Tomorrow's Machine Learning class is moved to room B-120, and next week's Computer Vision is cancelled.",
	replace: "e.g. Full schedule for this semester: Monday 08:30 Comprehensive Chinese in G-514, weeks 2-4 and 6-17…",
	ask: "e.g. What do I have next Monday? When is my Machine Learning exam week?"
};
function AiUpdatePanel({ schedule, onApply, onReset }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("merge");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [resetting, setResetting] = (0, import_react.useState)(false);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [answer, setAnswer] = (0, import_react.useState)(null);
	const [summary, setSummary] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	function reset() {
		setPreview(null);
		setAnswer(null);
		setSummary("");
		setError(null);
	}
	async function handleSubmit() {
		if (!text.trim()) {
			setError(mode === "ask" ? "Ask a question about your schedule first." : "Paste the school's notice or describe your schedule first.");
			return;
		}
		setBusy(true);
		setError(null);
		setPreview(null);
		setAnswer(null);
		try {
			const result = await requestAi(mode, text.trim(), {
				courses: schedule.courses,
				meetings: schedule.meetings
			});
			if (!result.ok) setError(result.error);
			else if (result.kind === "answer") setAnswer(result.answer);
			else {
				setPreview(buildPreview(result.schedule));
				setSummary(result.summary);
			}
		} catch {
			setError("Something went wrong talking to the assistant. Try again.");
		} finally {
			setBusy(false);
		}
	}
	async function handleApply() {
		if (!preview) return;
		setBusy(true);
		setError(null);
		try {
			await onApply(preview.courses, preview.meetings);
			setOpen(false);
			setText("");
			reset();
		} catch {
			setError("Could not save the schedule. Try again.");
		} finally {
			setBusy(false);
		}
	}
	async function handleResetClick() {
		setResetting(true);
		setError(null);
		try {
			await onReset();
			setOpen(false);
			setText("");
			reset();
		} catch {
			setError("Could not reset the schedule. Try again.");
		} finally {
			setResetting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (!next) reset();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "AI assistant"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-6 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-serif text-2xl",
						children: "AI assistant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-2",
						children: "Merge a group-chat notice into your schedule, rebuild it from a description, or just ask a question — the assistant only works on schedules, and you review every change before it's saved."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 rounded-md bg-paper-elevated p-1 shadow-[var(--shadow-border)]",
								children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
									active: mode === m.id,
									onClick: () => {
										setMode(m.id);
										reset();
									},
									label: m.label,
									hint: m.hint
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: PLACEHOLDERS[mode],
								rows: mode === "ask" ? 3 : 6,
								maxLength: 4e3,
								className: "w-full resize-y rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-ink/30"
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-md bg-south-fill px-3 py-2 text-sm text-south-fg",
								children: error
							}) : null,
							answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-line bg-paper-elevated p-4 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-xs font-medium tracking-wide text-ink-muted uppercase",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleQuestion, { className: "size-3.5" }), "Answer"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-ink",
									children: answer
								})]
							}) : null,
							preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCard, {
								schedule: preview,
								summary
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: resetting,
									onClick: () => void handleResetClick(),
									className: "inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted underline-offset-2 hover:underline disabled:opacity-50",
									children: [resetting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Start over"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: reset,
										disabled: busy,
										children: "Discard"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => void handleApply(),
										disabled: busy,
										children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Apply changes"]
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => void handleSubmit(),
										disabled: busy || !text.trim(),
										children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), mode === "ask" ? "Ask" : "Preview changes"]
									})
								})]
							})
						]
					})
				]
			})
		})]
	});
}
function ModeButton({ active, onClick, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		title: hint,
		className: cn("flex-1 cursor-pointer rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150", active ? "bg-ink text-paper shadow-[var(--shadow-border)]" : "text-ink-muted hover:text-ink"),
		children: label
	});
}
/** Rebuild ScheduleData (with courseById) from the API's plain arrays. */
function buildPreview(raw) {
	const courseById = {};
	for (const c of raw.courses) courseById[c.id] = c;
	return {
		courses: raw.courses,
		meetings: raw.meetings,
		courseById
	};
}
function PreviewCard({ schedule, summary }) {
	const byDay = /* @__PURE__ */ new Map();
	for (const m of schedule.meetings) {
		const list = byDay.get(m.day) ?? [];
		list.push(m);
		byDay.set(m.day, list);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-paper-elevated p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-ink",
				children: summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-ink-muted",
				children: [
					schedule.courses.length,
					" courses · ",
					schedule.meetings.length,
					" meetings"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 max-h-64 overflow-y-auto pr-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: [
						"Mon",
						"Tue",
						"Wed",
						"Thu",
						"Fri"
					].map((d) => {
						const list = (byDay.get(d) ?? []).slice().sort((a, b) => a.start.localeCompare(b.start));
						if (list.length === 0) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium tracking-wide text-ink-muted uppercase",
								children: DAY_LABEL[d]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-1 pl-3",
								children: list.map((m) => {
									const course = schedule.courseById[m.courseId];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-baseline gap-2 text-xs text-ink",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "tabular-nums text-ink-muted",
												children: [
													m.start,
													"–",
													m.end
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: course?.short ?? m.courseId
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-ink-faint",
												children: [
													m.campus,
													" ",
													m.room,
													" · wks ",
													m.weeksLabel
												]
											})
										]
									}, m.id);
								})
							})]
						}, d);
					})
				})
			})
		]
	});
}
var SEEN_KEY = "my-schedule-seen-version";
/**
* "What's new" + Android-app dialog. Announces itself once per app version
* (tracked in localStorage) — the standard post-update notice — and doubles as
* the "Get the app" entry point from the header. On the APK itself the download
* section is replaced with a you're-on-the-app note.
*/
function AppInfo({ isApk }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let seen = null;
		try {
			seen = window.localStorage.getItem(SEEN_KEY);
		} catch {
			return;
		}
		if (seen === "1.2.0") return;
		const t = window.setTimeout(() => setOpen(true), 900);
		return () => window.clearTimeout(t);
	}, []);
	function handleOpenChange(next) {
		setOpen(next);
		if (!next) try {
			window.localStorage.setItem(SEEN_KEY, APP_VERSION);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "App info and Android download",
				title: "App info & Android download",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 pt-6 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-ink-muted uppercase",
					children: ["North & South · v", APP_VERSION]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "mt-2 font-serif text-2xl",
					children: "What's new"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1.5",
					children: "A few things landed since you last looked."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 flex flex-col gap-4",
					children: WHATS_NEW.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-ink",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-ink-muted",
							children: item.detail
						})]
					}, item.title))
				}),
				isApk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 rounded-md bg-paper px-3 py-2 text-xs text-ink-faint shadow-[var(--shadow-border)]",
					children: "You're running the Android app — updates ship as new APKs on the website."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-md border border-line bg-paper p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-ink",
							children: "Get the Android app"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-ink-muted",
							children: "Sideloads on Android 8.0+ — tap download, open the file, allow install from your browser. Debug-signed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-3 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: APK_PATH,
								download: APK_FILENAME,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }),
									"Download APK (v",
									APP_VERSION,
									")"
								]
							})
						})
					]
				})
			]
		}) })]
	});
}
function DayAgenda({ week, day, blocks, focusCourseId, onSelect, onDayChange, schedule }) {
	const dayBlocks = blocks.filter((b) => b.day === day);
	const date = dateOf(week, day);
	const holiday = holidayName(date.iso);
	const commute = commuteCopy(week, day, schedule);
	const busyDays = new Set(blocks.map((b) => b.day));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto pb-1",
				children: DAYS.map((d) => {
					const active = d === day;
					const busy = busyDays.has(d);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onDayChange(d),
						className: cn("flex h-11 min-w-14 flex-1 flex-col items-center justify-center rounded-md px-2 transition-colors duration-150", active ? "bg-ink text-paper" : "text-ink-muted hover:bg-ink/5 hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium",
							children: d
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-0.5 size-1 rounded-full", active ? "bg-paper" : busy ? "bg-ink-muted" : "bg-transparent") })]
					}, d);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-3xl leading-none text-ink",
					children: DAY_LABEL[day]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-ink-muted",
					children: [formatShortDate(week, day), holiday ? ` · ${holiday}` : ""]
				}),
				commute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-south",
					children: commute
				}) : null
			] }),
			dayBlocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg bg-paper-elevated px-4 py-8 text-center text-sm text-ink-muted shadow-[var(--shadow-border)]",
				children: holiday ? `${holiday} — no classes.` : "Free day."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-3",
				children: dayBlocks.map((block) => {
					const dimmed = focusCourseId !== null && focusCourseId !== block.course.id;
					const band = bandOf(block.start);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(block),
						className: cn("flex w-full gap-4 rounded-lg p-4 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow,opacity] duration-150 ease-out", "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink", block.campus === "South" ? "bg-south-fill" : "bg-north-fill", dimmed && "opacity-35"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-16 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium tabular-nums text-ink",
									children: block.start
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs tabular-nums text-ink-muted",
									children: block.end
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-xs tracking-wide text-ink-faint",
									children: band.label
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-base font-medium text-ink",
									children: block.course.short
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-1.5 text-sm text-ink-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										block.campus,
										" · ",
										block.room
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-xs text-ink-faint",
									children: [
										sectionsLabel(block.sectionStart, block.sectionEnd),
										block.flags.includes("once") ? " · this week only" : "",
										block.flags.includes("biweekly") ? " · irregular" : ""
									]
								})
							]
						})]
					}) }, block.id);
				})
			})
		]
	});
}
function MeetingPanel({ week, block, open, schedule, onOpenChange }) {
	const course = block?.course;
	const hours = course ? courseHours(course.id, schedule) : 0;
	const others = course ? courseMeetings(course.id, schedule) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: block && course ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("text-xs font-medium tracking-wide uppercase", block.campus === "South" ? "text-south" : "text-north"),
					children: [block.campus, " campus"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "mt-2 pr-8",
					children: course.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "mt-2",
					children: [
						course.code,
						" · ",
						course.credits,
						" ",
						course.credits === 1 ? "credit" : "credits"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 flex flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							icon: MapPin,
							label: "Where",
							children: [block.room, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-ink-muted",
								children: [" · ", block.campus]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							icon: Clock,
							label: "When",
							children: [
								DAY_LABEL[block.day],
								" ",
								block.start,
								"–",
								block.end,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-ink-muted",
									children: sectionsLabel(block.sectionStart, block.sectionEnd)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: Users,
							label: "Teachers",
							children: course.teachers.join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							icon: GraduationCap,
							label: "This term",
							children: [formatDuration(hours), " in class"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-ink-muted uppercase",
							children: "Weeks it meets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekDots, {
							weeks: [...new Set(block.meetings.flatMap((m) => m.weeks))],
							current: week
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-ink-muted",
							children: [
								block.meetings.map((m) => m.weeksLabel).join(" · "),
								block.flags.includes("biweekly") ? " · biweekly pattern" : "",
								block.flags.includes("once") ? " · single week" : ""
							]
						})
					]
				}),
				others.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-medium tracking-wide text-ink-muted uppercase",
						children: "All meetings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-2",
						children: others.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("rounded-md px-3 py-2.5 text-sm shadow-[var(--shadow-border)]", block.meetings.some((x) => x.id === m.id) ? m.campus === "South" ? "bg-south-fill" : "bg-north-fill" : "bg-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium text-ink",
								children: [
									DAY_LABEL[m.day],
									" ",
									m.start,
									"–",
									m.end
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-ink-muted",
								children: [
									m.campus,
									" ",
									m.room,
									" · weeks ",
									m.weeksLabel
								]
							})]
						}, m.id))
					})]
				}) : null
			]
		}) : null })
	});
}
function Row({ icon: Icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 shrink-0 text-ink-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs tracking-wide text-ink-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 text-sm text-ink",
			children
		})] })]
	});
}
function WeekDots({ weeks, current }) {
	const set = new Set(weeks);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 grid gap-1",
		style: { gridTemplateColumns: "repeat(17, minmax(0, 1fr))" },
		children: Array.from({ length: TERM.weeks }, (_, i) => {
			const w = i + 1;
			const on = set.has(w);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				title: `Week ${w}`,
				className: cn("h-6 rounded-xs", on ? "bg-ink" : "bg-line", w === current && on && "ring-2 ring-ink ring-offset-2 ring-offset-paper-elevated")
			}, w);
		})
	});
}
function getSpeechRecognition() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
var EXAMPLE = "Machine Learning Mon 08:30–10:05 G-514 South weeks 2–17, Computer Vision Tue 14:00–15:35 A-203 North, Algorithms Thu 10:25–12:00 …";
function Onboarding({ onDone }) {
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [summary, setSummary] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	const SpeechRecognition = getSpeechRecognition();
	function toggleListening() {
		if (!SpeechRecognition) return;
		if (listening) {
			recognitionRef.current?.stop();
			setListening(false);
			return;
		}
		const rec = new SpeechRecognition();
		rec.lang = "en-US";
		rec.interimResults = false;
		rec.continuous = false;
		rec.onresult = (e) => {
			const transcript = Array.from(e.results).map((r) => r[0]?.transcript ?? "").join(" ");
			setText((t) => t ? `${t.trim()} ${transcript}` : transcript);
		};
		rec.onend = () => setListening(false);
		rec.onerror = () => setListening(false);
		recognitionRef.current = rec;
		setListening(true);
		rec.start();
	}
	async function handleCreate() {
		if (!text.trim()) {
			setError("Describe your schedule first — or paste the school's notice.");
			return;
		}
		setBusy(true);
		setError(null);
		setPreview(null);
		try {
			const result = await requestAi("replace", text.trim(), {
				courses: [],
				meetings: []
			});
			if (!result.ok) setError(result.error);
			else if (result.kind === "schedule") {
				setPreview(buildScheduleData(result.schedule.courses, result.schedule.meetings));
				setSummary(result.summary);
			} else setError("The assistant returned something unexpected. Try again.");
		} catch {
			setError("Something went wrong talking to the assistant. Try again.");
		} finally {
			setBusy(false);
		}
	}
	async function finish(courses, meetings) {
		setBusy(true);
		setError(null);
		try {
			await onDone(courses, meetings);
		} catch {
			setError("Could not save the schedule. Try again.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-paper px-4 py-10 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-ink-muted uppercase",
					children: [
						TERM.label,
						" · ",
						TERM.weeks,
						" weeks"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-serif text-4xl leading-none sm:text-5xl",
					children: [
						"North ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-ink-muted",
							children: "&"
						}),
						" South"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-ink-muted",
					children: "A class schedule you never have to type twice. Describe your courses in plain words — or paste the notice your school dropped in the group chat — and the assistant builds the whole term for you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-xl bg-paper-elevated p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "onboarding-text",
							className: "text-xs font-medium tracking-wide text-ink-muted uppercase",
							children: "Your schedule, in your own words"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "onboarding-text",
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: EXAMPLE,
								rows: 5,
								maxLength: 4e3,
								className: "w-full resize-y rounded-md border border-line bg-paper px-3 py-2 pr-10 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-ink/30"
							}), SpeechRecognition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: toggleListening,
								title: listening ? "Stop dictating" : "Dictate your schedule",
								"aria-label": listening ? "Stop dictating" : "Dictate your schedule",
								className: listening ? "absolute top-2 right-2 rounded-md p-1.5 text-south-fg bg-south-fill" : "absolute top-2 right-2 rounded-md p-1.5 text-ink-faint hover:text-ink",
								children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
							}) : null]
						}),
						listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-south-fg",
							children: "Listening… speak your schedule."
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 rounded-md bg-south-fill px-3 py-2 text-sm text-south-fg",
							children: error
						}) : null,
						preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCard, {
								schedule: preview,
								summary
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy,
								onClick: () => void finish([], []),
								className: "inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline disabled:opacity-50",
								children: ["Start empty", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							}), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => setPreview(null),
									disabled: busy,
									children: "Discard"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => void finish(preview.courses, preview.meetings),
									disabled: busy,
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Use this schedule"]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void handleCreate(),
								disabled: busy || !text.trim(),
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Create my schedule"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs leading-relaxed text-ink-faint",
					children: "No account needed — your schedule lives on this device and works offline. Sign in later if you want it synced across devices."
				})
			]
		})
	});
}
function TooltipProvider({ delayDuration = 200, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, { ...props });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function TooltipContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 rounded-sm bg-ink px-2.5 py-1.5 text-xs text-paper shadow-[var(--shadow-border)]", "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95", className),
		...props
	}) });
}
var BAND_HEIGHT = {
	morning: "h-52",
	afternoon: "h-52",
	evening: "h-36"
};
function WeekGrid({ week, blocks, focusCourseId, onSelect, schedule }) {
	const now = shanghaiParts();
	const isCurrentWeek = termWeekFromDate() === week;
	const today = isCurrentWeek && DAYS.includes(now.weekday) ? now.weekday : null;
	const commute = new Set(commuteDays(week, schedule));
	const nowMins = now.hour * 60 + now.minute;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-[56rem]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[4.25rem_repeat(5,minmax(0,1fr))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					DAYS.map((day) => {
						const date = dateOf(week, day);
						const holiday = holidayName(date.iso);
						const isToday = today === day;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("border-b border-line px-3 pb-3", isToday && "bg-paper-elevated"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-sm font-medium", isToday ? "text-ink" : "text-ink-muted"),
									children: day
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm tabular-nums text-ink-faint",
									children: formatShortDate(week, day)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex min-h-5 items-center gap-2",
								children: [
									isToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium tracking-wide text-ink",
										children: "Today"
									}) : null,
									holiday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-south",
										children: holiday
									}) : null,
									commute.has(day) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-muted",
										children: "Both campuses"
									}) : null
								]
							})]
						}, day);
					}),
					BANDS.map((band, bandIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandRow, {
						band,
						blocks,
						focusCourseId,
						today,
						nowMins: isCurrentWeek ? nowMins : null,
						showRule: bandIndex > 0,
						onSelect
					}, band.id))
				]
			})
		})
	});
}
function BandRow({ band, blocks, focusCourseId, today, nowMins, showRule, onSelect }) {
	const gutterLabel = band.id === "afternoon" ? "Lunch" : band.id === "evening" ? "Dinner" : null;
	const gutterTime = band.id === "afternoon" ? "12:00" : band.id === "evening" ? "17:30" : null;
	const nowTop = nowMins !== null && nowMins >= toMinutes(band.start) && nowMins < toMinutes(band.end) && nowMins !== null ? (nowMins - toMinutes(band.start)) / (toMinutes(band.end) - toMinutes(band.start)) * 100 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		showRule && gutterLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-9 items-center justify-end pr-3 text-xs tabular-nums text-ink-faint",
			children: gutterTime
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "col-span-5 flex h-9 items-center gap-3 px-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tracking-wide text-ink-faint",
					children: gutterLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" })
			]
		})] }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("pr-3 pt-1 text-right", BAND_HEIGHT[band.id]),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium tabular-nums text-ink",
				children: band.start
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs tracking-wide text-ink-faint",
				children: band.label
			})]
		}),
		DAYS.map((day) => {
			const cellBlocks = blocks.filter((b) => b.day === day && bandOf(b.start).id === band.id);
			const isToday = today === day;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative border-l border-line", BAND_HEIGHT[band.id], isToday && "bg-paper-elevated"),
				children: [nowTop !== null && isToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute right-0 left-0 z-10 h-px bg-ink",
					style: { top: `${nowTop}%` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-2 left-1 h-4 w-1 rounded-full bg-ink" })
				}) : null, cellBlocks.map((block) => {
					const pos = bandPosition(block.start, block.end, band);
					const compact = durationMinutes(block.start, block.end) <= 55;
					const dimmed = focusCourseId !== null && focusCourseId !== block.course.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(block),
						className: cn("absolute right-1.5 left-1.5 z-[1] overflow-hidden rounded-md px-2.5 py-2 text-left shadow-[var(--shadow-border)]", "transition-[transform,box-shadow,opacity] duration-150 ease-out", "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink", block.campus === "South" ? "bg-south-fill" : "bg-north-fill", dimmed && "opacity-30"),
						style: {
							top: `${pos.top}%`,
							height: `${pos.height}%`
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-y-0 left-0 w-1", block.campus === "South" ? "bg-south" : "bg-north") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium leading-snug text-ink",
								children: block.course.short
							}),
							!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 block text-xs tabular-nums text-ink-muted",
								children: [
									block.start,
									"–",
									block.end
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-0.5 block truncate text-xs text-ink-muted",
								children: [block.room, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-ink-faint",
									children: [
										" ",
										"· ",
										sectionsLabel(block.sectionStart, block.sectionEnd)
									]
								})]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-xs text-ink-muted",
								children: block.room
							}),
							block.flags.includes("once") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-ink-muted",
								children: "This week only"
							}) : null,
							block.flags.includes("biweekly") && !block.flags.includes("once") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-ink-muted",
								children: "Irregular weeks"
							}) : null
						]
					}, block.id);
				})]
			}, `${band.id}-${day}`);
		})
	] });
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/** Read the signed-in user's saved schedule. Returns null when none is saved —
*  the client keeps its localStorage copy in that case. */
var getSchedule = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("da68ad683b6506403824f4548aa048531cf35a6ff6c597ce4068c249747161de"));
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
var saveSchedule = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveInput).handler(createSsrRpc("0ed26409b7181a11164c7c16fa6a998c8ca2ba41d2eac28f760e4712291f1938"));
/** Drop the saved schedule so the hosted app falls back to localStorage/base. */
var resetSchedule = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("ec8769b0d06b23951eb6cb1ea2e21c41812962d203589200f97e70b6cc4cd1b3"));
/**
* Client-side schedule persistence. `localStorage` is the source of truth on
* every device — it works on the hosted site, the APK, and offline. When the
* user is signed in on the hosted app, the Neon DB acts as a best-effort sync
* layer so the same schedule follows them across browsers. The APK never
* reaches the server functions, so it stays a purely local copy.
*
* A brand-new visitor has no stored schedule: they get an empty base and the
* onboarding flow, not a seeded timetable.
*/
var STORAGE_KEY = "my-schedule";
var ONBOARDED_KEY = "my-schedule-onboarded";
function safeParse(raw) {
	if (!raw) return null;
	try {
		const p = JSON.parse(raw);
		if (!Array.isArray(p.courses) || !Array.isArray(p.meetings)) return null;
		return {
			courses: p.courses,
			meetings: p.meetings,
			updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : 0
		};
	} catch {
		return null;
	}
}
function readLocalSchedule() {
	if (typeof window === "undefined") return null;
	return safeParse(window.localStorage.getItem(STORAGE_KEY));
}
function writeLocalSchedule(courses, meetings, updatedAt = Date.now()) {
	const next = {
		courses,
		meetings,
		updatedAt
	};
	if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	return next;
}
function clearLocalSchedule() {
	if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
}
/**
* Whether this device has finished the first-run onboarding. Tracked
* separately from the schedule itself so "start empty" counts as onboarded,
* while a reset clears both flags and re-runs onboarding.
*/
function hasOnboarded() {
	if (typeof window === "undefined") return false;
	return window.localStorage.getItem(ONBOARDED_KEY) === "1";
}
function markOnboarded() {
	if (typeof window !== "undefined") window.localStorage.setItem(ONBOARDED_KEY, "1");
}
function clearOnboarded() {
	if (typeof window !== "undefined") window.localStorage.removeItem(ONBOARDED_KEY);
}
/** A new device starts from an empty schedule — the user builds their own. */
var BASE_SCHEDULE = {
	courses: [],
	meetings: [],
	updatedAt: 0
};
/**
* One-shot reconciliation on app load for a signed-in user. Returns the
* winning schedule (newest of local/server) and writes it to whichever side is
* stale, so the two copies converge. Never throws — sync is best-effort and
* must not break the local app when offline or on the APK.
*/
async function syncSchedule(canSync) {
	const local = readLocalSchedule() ?? BASE_SCHEDULE;
	if (!canSync) return local;
	try {
		const server = await getSchedule();
		if (!server) {
			await saveSchedule({ data: {
				courses: local.courses,
				meetings: local.meetings
			} });
			return local;
		}
		if (server.updatedAt > local.updatedAt) return writeLocalSchedule(server.courses, server.meetings, server.updatedAt);
		if (local.updatedAt > server.updatedAt) await saveSchedule({ data: {
			courses: local.courses,
			meetings: local.meetings
		} });
		return local;
	} catch {
		return local;
	}
}
/** Persist a new schedule locally and to the cloud when signed in. */
async function applySchedule(courses, meetings, canSync) {
	writeLocalSchedule(courses, meetings);
	if (canSync) try {
		await saveSchedule({ data: {
			courses,
			meetings
		} });
	} catch {}
	return buildScheduleData(courses, meetings);
}
/** Clear the schedule everywhere and send the user back through onboarding. */
async function resetScheduleEverywhere(canSync) {
	clearLocalSchedule();
	clearOnboarded();
	if (canSync) try {
		await resetSchedule();
	} catch {}
	return buildScheduleData([], []);
}
function ScheduleApp({ weekParam }) {
	const navigate = useNavigate({ from: "/" });
	const { user, isPending: sessionPending } = useCurrentUserState();
	const canSync = user !== null;
	const isApk = typeof window !== "undefined" && window.location.hostname === "appassets.androidplatform.net";
	const [schedule, setSchedule] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [onboarded, setOnboarded] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const local = readLocalSchedule() ?? BASE_SCHEDULE;
		setSchedule(buildScheduleData(local.courses, local.meetings));
		setOnboarded(hasOnboarded() || local.meetings.length > 0);
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mounted || sessionPending) return;
		let cancelled = false;
		syncSchedule(canSync).then((win) => {
			if (!cancelled) setSchedule(buildScheduleData(win.courses, win.meetings));
		});
		return () => {
			cancelled = true;
		};
	}, [
		mounted,
		sessionPending,
		canSync
	]);
	const liveWeek = defaultWeek(void 0, schedule ?? DEFAULT_SCHEDULE);
	const [week, setWeekState] = (0, import_react.useState)(() => weekParam ?? liveWeek);
	const [focusCourseId, setFocusCourseId] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [day, setDay] = (0, import_react.useState)(() => {
		const parts = shanghaiParts();
		if (DAYS.includes(parts.weekday)) return parts.weekday;
		return firstBusyDay(weekParam ?? liveWeek, DEFAULT_SCHEDULE);
	});
	const initialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!schedule || initialized.current) return;
		initialized.current = true;
		if (weekParam === void 0) {
			const w = defaultWeek(void 0, schedule);
			setWeekState(w);
			const parts = shanghaiParts();
			setDay(DAYS.includes(parts.weekday) ? parts.weekday : firstBusyDay(w, schedule));
		}
	}, [schedule, weekParam]);
	const blocks = (0, import_react.useMemo)(() => schedule ? blocksForWeek(week, schedule) : [], [week, schedule]);
	const load = schedule ? weekLoad(week, schedule) : {
		south: 0,
		north: 0,
		total: 0,
		count: 0
	};
	const commutes = schedule ? commuteDays(week, schedule) : [];
	const upcoming = schedule ? nextUp(void 0, schedule) : null;
	const currentTermWeek = termWeekFromDate();
	const peak = schedule ? maxWeekLoad(schedule) : 1;
	const totalCredits = schedule ? schedule.courses.reduce((sum, c) => sum + c.credits, 0) : 0;
	async function handleApply(courses, meetings) {
		const next = await applySchedule(courses, meetings, canSync);
		setSchedule(next);
		setFocusCourseId(null);
		setSelected(null);
		toast("Schedule updated");
	}
	/** Onboarding finished — mark the device, then persist like any apply. */
	async function handleOnboarded(courses, meetings) {
		markOnboarded();
		setOnboarded(true);
		await handleApply(courses, meetings);
	}
	async function handleReset() {
		const next = await resetScheduleEverywhere(canSync);
		setSchedule(next);
		setOnboarded(false);
		setFocusCourseId(null);
		setSelected(null);
		toast("Schedule cleared — start fresh");
	}
	(0, import_react.useEffect)(() => {
		if (weekParam !== void 0 && weekParam !== week) setWeekState(clampWeek(weekParam));
	}, [weekParam, week]);
	(0, import_react.useEffect)(() => {
		if (weekParam === void 0) navigate({
			search: { week },
			replace: true
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (schedule && !blocks.some((b) => b.day === day)) setDay(firstBusyDay(week, schedule));
	}, [
		week,
		blocks,
		day,
		schedule
	]);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				goWeek(week - 1);
			}
			if (event.key === "ArrowRight") {
				event.preventDefault();
				goWeek(week + 1);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [week]);
	function goWeek(next) {
		const w = clampWeek(next);
		setWeekState(w);
		navigate({
			search: { week: w },
			replace: true
		});
	}
	async function shareWeek() {
		if (!schedule) return;
		const text = serializeWeek(week, schedule);
		const url = window.location.href;
		if (navigator.share) try {
			await navigator.share({
				title: `North & South · Week ${week}`,
				text,
				url
			});
			return;
		} catch (error) {
			if (error.name === "AbortError") return;
		}
		await navigator.clipboard.writeText(`${text}\n\n${url}`);
		toast("This week copied — send it to anyone");
	}
	if (!mounted || !schedule) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-paper text-ink-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Loading your schedule…"
		})
	});
	if (!onboarded && schedule.meetings.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, { onDone: handleOnboarded });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			toastOptions: { className: "!bg-ink !text-paper !border-0 !rounded-md !font-[inherit] !shadow-[var(--shadow-border)]" }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-dvh bg-paper text-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 pb-16 sm:px-6 lg:px-8 lg:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium tracking-[0.18em] text-ink-muted uppercase",
								children: [
									TERM.label,
									" · ",
									totalCredits,
									" credits · ",
									schedule.courses.length,
									" courses"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-2 font-serif text-4xl leading-none sm:text-5xl",
								children: [
									"North",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-ink-muted",
										children: "&"
									}),
									" South"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 max-w-md text-sm text-ink-muted",
								children: ["Warm blocks are South campus. Cool blocks are North.", upcoming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowLine, { upcoming })] }) : null]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 no-print",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiUpdatePanel, {
									schedule,
									onApply: handleApply,
									onReset: handleReset
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: () => void shareWeek(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share week"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									onClick: () => window.print(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Print"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppInfo, { isApk }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: !isApk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline",
									children: "Sign in to sync"
								}) : null })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon-sm",
											"aria-label": "Previous week",
											disabled: week <= 1,
											onClick: () => goWeek(week - 1),
											className: "no-print",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-serif text-3xl leading-none tabular-nums",
											children: ["Week ", week]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-sm text-ink-muted",
											children: formatWeekRange(week)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon-sm",
											"aria-label": "Next week",
											disabled: week >= TERM.weeks,
											onClick: () => goWeek(week + 1),
											className: "no-print",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-ink",
												children: load.count
											}),
											" ",
											load.count === 1 ? "class" : "classes"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-ink",
											children: formatDuration(load.total)
										}), " in class"] }),
										load.south > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-south",
												children: "South"
											}),
											" ",
											formatDuration(load.south)
										] }) : null,
										load.north > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-north",
												children: "North"
											}),
											" ",
											formatDuration(load.north)
										] }) : null
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heatmap, {
								week,
								peak,
								currentTermWeek,
								onSelect: goWeek,
								schedule
							}),
							currentTermWeek !== null && currentTermWeek !== week ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-ink-muted",
								children: [
									"Right now it is week ",
									currentTermWeek,
									currentTermWeek === 1 ? " — teaching has not started yet" : "",
									".",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "ml-2 font-medium text-ink underline-offset-2 hover:underline",
										onClick: () => goWeek(currentTermWeek),
										children: ["Go to week ", currentTermWeek]
									})
								]
							}) : null,
							commutes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rounded-md bg-south-fill px-4 py-3 text-sm text-south-fg",
								children: [
									"Both campuses this week — ",
									commutes.map((d) => DAY_LABEL[d]).join(" & "),
									". Plan the commute."
								]
							}) : null,
							!weekHasClasses(week, schedule) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rounded-md bg-paper-elevated px-4 py-3 text-sm text-ink-muted shadow-[var(--shadow-border)]",
								children: ["No classes this week.", week < TERM.weeks ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "ml-2 font-medium text-ink underline-offset-2 hover:underline",
									onClick: () => goWeek(week + 1),
									children: ["Jump to week ", week + 1]
								}) : null]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden lg:block rounded-xl bg-paper-elevated p-4 shadow-[var(--shadow-border)] print:block print:rounded-none print:p-0 print:shadow-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekGrid, {
							week,
							blocks,
							focusCourseId,
							onSelect: setSelected,
							schedule
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden no-print",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayAgenda, {
							week,
							day,
							blocks,
							focusCourseId,
							onSelect: setSelected,
							onDayChange: setDay,
							schedule
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "no-print",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-medium tracking-wide text-ink-muted uppercase",
								children: "Courses"
							}), focusCourseId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs font-medium text-ink underline-offset-2 hover:underline",
								onClick: () => setFocusCourseId(null),
								children: "Show all"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
							children: schedule.courses.map((course) => {
								const meetings = courseMeetings(course.id, schedule);
								const campuses = [...new Set(meetings.map((m) => m.campus))];
								const active = focusCourseId === course.id;
								const campus = campuses.length === 1 ? campuses[0] : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setFocusCourseId((id) => id === course.id ? null : course.id),
									className: cn("flex h-full w-full flex-col items-start rounded-lg px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150 ease-out", "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink", active ? "bg-ink text-paper" : "bg-paper-elevated text-ink"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: course.short
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("mt-1 text-xs", active ? "text-paper/70" : "text-ink-muted"),
											children: [
												course.credits,
												" cr · ",
												campus ?? "Both campuses"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("mt-2 text-xs tabular-nums", active ? "text-paper/60" : "text-ink-faint"),
											children: course.code
										})
									]
								}) }, course.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Week 1 starts 7 Sep 2026 · Xi’an time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-xs bg-south" }), " South"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-xs bg-north" }), " North"]
							})]
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeetingPanel, {
			week,
			block: selected,
			open: selected !== null,
			schedule,
			onOpenChange: (open) => {
				if (!open) setSelected(null);
			}
		})
	] });
}
function NowLine({ upcoming }) {
	if (upcoming.status === "now") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-ink",
		children: [
			"In class now: ",
			upcoming.block.course.short,
			", until ",
			upcoming.ends,
			" at ",
			upcoming.block.room,
			"."
		]
	});
	const sameWeek = upcoming.week === termWeekFromDate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-ink",
		children: [
			"Next up: ",
			upcoming.block.course.short,
			sameWeek ? ` ${upcoming.block.day} ${upcoming.block.start}` : ` week ${upcoming.week}`,
			", ",
			upcoming.block.campus,
			" ",
			upcoming.block.room,
			"."
		]
	});
}
function Heatmap({ week, peak, currentTermWeek, onSelect, schedule }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-1",
		style: { gridTemplateColumns: "repeat(17, minmax(0, 1fr))" },
		children: Array.from({ length: TERM.weeks }, (_, i) => {
			const w = i + 1;
			const load = weekLoad(w, schedule);
			const height = Math.max(6, Math.round(load.total / peak * 44));
			const southH = load.total ? Math.round(load.south / load.total * height) : 0;
			const northH = height - southH;
			const selected = w === week;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-label": `Week ${w}, ${load.count} classes`,
					"aria-pressed": selected,
					onClick: () => onSelect(w),
					className: cn("flex h-14 min-w-0 flex-col items-center justify-end gap-1 overflow-hidden rounded-sm pt-1 transition-colors duration-150", selected ? "bg-ink/5" : "hover:bg-ink/5", currentTermWeek === w && !selected && "ring-1 ring-ink/20"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex w-full flex-1 items-end justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex w-1/2 min-w-1.5 flex-col overflow-hidden rounded-xs bg-line",
							style: { height },
							children: [northH > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-north",
								style: { height: northH }
							}) : null, southH > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-south",
								style: { height: southH }
							}) : null]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("w-full truncate text-center text-xs leading-none tabular-nums", selected ? "font-medium text-ink" : "text-ink-faint"),
						children: w
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, { children: [
				"Week ",
				w,
				" · ",
				formatWeekRange(w),
				" · ",
				load.count,
				" ",
				load.count === 1 ? "class" : "classes"
			] })] }, w);
		})
	});
}
function Home() {
	const { week } = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleApp, { weekParam: week });
}
//#endregion
export { Home as component };
