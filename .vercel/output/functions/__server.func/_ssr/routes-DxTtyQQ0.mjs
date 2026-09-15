import { o as __toESM } from "../_runtime.mjs";
import { D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as signOut, t as authClient } from "./client-CVqXY6bk.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as hasGateSessionMarker } from "./server-HzWscnOe.mjs";
import { B as weekLoad, C as formatShortDate, D as minutesToLabel, E as maxWeekLoad, F as sectionsLabel, I as serializeWeek, L as termWeekFromDate, M as normalizeTerm, O as mondayOf, P as sectionsForTime, R as toMinutes, S as formatDuration, T as localParts, _ as defaultTerm, b as expandWeeks, c as commuteCopy, d as courseHours, f as courseMeetings, g as daypartOf, h as daySpan, k as nextUp, l as commuteDays, m as dayPosition, n as DAY_LABEL, o as buildScheduleData, p as dateOf, r as blocksForWeek, s as clampWeek, t as DAYS, u as compressWeeks, v as defaultWeek, w as formatWeekRange, x as firstBusyDay, y as durationMinutes, z as weekHasClasses } from "./schedule-ai-BkapXzpf.mjs";
import { C as ChevronRight, D as ArrowRight, E as Bell, S as Clock, T as CalendarDays, _ as MapPin, a as Sparkles, b as FileText, c as Settings, d as Plus, f as Pencil, g as MessageCircleQuestion, h as MicOff, i as Trash2, l as RotateCcw, m as Mic, n as Users, o as Smartphone, p as Paperclip, s as Share2, t as X, u as Printer, v as LoaderCircle, w as ChevronLeft, x as Download, y as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as Route$3 } from "./router-BJ0ZRhg_.mjs";
import { t as authMiddleware } from "./middleware-Bjg4bIle.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { _ as Slot, a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DxTtyQQ0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[background-color,color,box-shadow,transform,opacity,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-seal text-white hover:-translate-y-px hover:bg-seal-dark hover:shadow-[var(--shadow-seal)]",
			outline: "border-[1.5px] border-line bg-transparent text-ink hover:border-seal hover:text-seal",
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
/** Read-only summary of an AI-drafted schedule, shown before it's applied. */
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
					children: DAYS.map((d) => {
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
													[m.campus, m.room].filter(Boolean).join(" "),
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
var APP_VERSION = "2.0.0";
var APK_FILENAME = `kebiao-${APP_VERSION}.apk`;
var APK_PATH = `/${APK_FILENAME}`;
/**
* The deployed site the APK calls for AI. The WebView bundle has no backend,
* so it posts to this origin's `/api/ai` (allowlisted in the endpoint's CORS).
*/
var PUBLIC_SITE_URL = "https://my-schedule-xi-one.vercel.app";
var WHATS_NEW = [
	{
		title: "Import your timetable file",
		detail: "Drop in the school's export — PDF, Word, Excel, CSV, text — or a screenshot of it. The assistant reads it and drafts your whole term."
	},
	{
		title: "Your term, your way",
		detail: "Set your own term name, start date and length in Settings — and schedules can now include Saturday and Sunday classes."
	},
	{
		title: "Class reminders + home-screen widget",
		detail: "Get nudged before class (in Settings), and on Android add the Kebiao widget to your home screen for your next class at a glance."
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
async function requestAi(mode, text, current, opts = {}) {
	let res;
	try {
		res = await fetch(aiEndpoint(), {
			method: "POST",
			headers: { "Content-Type": "text/plain;charset=UTF-8" },
			body: JSON.stringify({
				mode,
				text,
				image: opts.image,
				term: opts.term,
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
var IMPORT_ACCEPT = ".txt,.csv,.tsv,.md,.text,.pdf,.docx,.doc,.xlsx,.xls,.png,.jpg,.jpeg,.webp,.gif,.bmp";
var IMAGE_RE = /\.(png|jpe?g|webp|gif|bmp)$/i;
var TEXT_RE = /\.(txt|csv|tsv|md|text)$/i;
var PDF_RE = /\.pdf$/i;
var WORD_RE = /\.docx?$/i;
var EXCEL_RE = /\.xlsx?$/i;
var MAX_TEXT_CHARS = 19e3;
/** Read a File into text or a (downscaled) image data URL. */
async function importFile(file) {
	const name = file.name || "file";
	if (IMAGE_RE.test(name) || file.type.startsWith("image/")) return {
		kind: "image",
		name,
		dataUrl: await fileToDataUrl(file)
	};
	if (TEXT_RE.test(name)) return {
		kind: "text",
		name,
		text: capText(await file.text())
	};
	if (PDF_RE.test(name) || file.type === "application/pdf") return importPdf(file);
	if (WORD_RE.test(name)) {
		const mammoth = await import("../_libs/mammoth.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
		const arrayBuffer = await file.arrayBuffer();
		return {
			kind: "text",
			name,
			text: capText((await mammoth.extractRawText({ arrayBuffer })).value)
		};
	}
	if (EXCEL_RE.test(name)) {
		const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
		const wb = XLSX.read(await file.arrayBuffer());
		const parts = [];
		for (const sheetName of wb.SheetNames) {
			const csv = XLSX.utils.sheet_to_csv(wb.Sheets[sheetName]);
			if (csv.trim()) parts.push(`# ${sheetName}\n${csv}`);
			if (parts.join("\n").length > MAX_TEXT_CHARS) break;
		}
		return {
			kind: "text",
			name,
			text: capText(parts.join("\n\n"))
		};
	}
	try {
		const text = await file.text();
		if (text.trim()) return {
			kind: "text",
			name,
			text: capText(text)
		};
	} catch {}
	throw new Error("Couldn't read that file type — try a screenshot or PDF.");
}
function capText(text) {
	const trimmed = text.trim();
	return trimmed.length > MAX_TEXT_CHARS ? trimmed.slice(0, MAX_TEXT_CHARS) : trimmed;
}
async function importPdf(file) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	const worker = await import("./pdf.worker.min-CA4SejP6.mjs");
	pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
	const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
	const pages = [];
	for (let i = 1; i <= Math.min(doc.numPages, 8); i += 1) {
		const text = (await (await doc.getPage(i)).getTextContent()).items.map((item) => "str" in item ? item.str : "").join(" ");
		if (text.trim()) pages.push(text.trim());
		if (pages.join("\n").length > MAX_TEXT_CHARS) break;
	}
	const text = capText(pages.join("\n\n"));
	if (text.length > 40) return {
		kind: "text",
		name: file.name,
		text
	};
	const page = await doc.getPage(1);
	const viewport = page.getViewport({ scale: 2 });
	const canvas = document.createElement("canvas");
	canvas.width = viewport.width;
	canvas.height = viewport.height;
	await page.render({
		canvas,
		canvasContext: canvas.getContext("2d"),
		viewport
	}).promise;
	return {
		kind: "image",
		name: file.name,
		dataUrl: await downscaleCanvas(canvas)
	};
}
/** Decode an image file, downscale to ≤1600px, re-encode as JPEG data URL. */
async function fileToDataUrl(file) {
	const bitmap = await createImageBitmap(file).catch(() => null);
	if (bitmap) {
		const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
		const w = Math.max(1, Math.round(bitmap.width * scale));
		const h = Math.max(1, Math.round(bitmap.height * scale));
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
		bitmap.close();
		return downscaleCanvas(canvas);
	}
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read the image."));
		reader.readAsDataURL(file);
	});
}
async function downscaleCanvas(canvas) {
	const max = 1600;
	let source = canvas;
	if (Math.max(canvas.width, canvas.height) > max) {
		const scale = max / Math.max(canvas.width, canvas.height);
		const smaller = document.createElement("canvas");
		smaller.width = Math.round(canvas.width * scale);
		smaller.height = Math.round(canvas.height * scale);
		smaller.getContext("2d").drawImage(canvas, 0, 0, smaller.width, smaller.height);
		source = smaller;
	}
	const flat = document.createElement("canvas");
	flat.width = source.width;
	flat.height = source.height;
	const ctx = flat.getContext("2d");
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, flat.width, flat.height);
	ctx.drawImage(source, 0, 0);
	return flat.toDataURL("image/jpeg", .85);
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
		hint: "Recreate the schedule from a description or file"
	},
	{
		id: "ask",
		label: "Ask",
		hint: "Answer a question about your schedule"
	}
];
var PLACEHOLDERS = {
	merge: "e.g. Tomorrow's Machine Learning class is moved to room B-120, and next week's Computer Vision is cancelled.",
	replace: "e.g. Full schedule for this semester: Monday 08:30 Comprehensive Chinese in G-514, weeks 2-4 and 6-17… — or attach a file/screenshot.",
	ask: "e.g. What do I have next Monday? When is my Machine Learning exam week?"
};
function getSpeechRecognition$1() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function AiUpdatePanel({ schedule, onApply, onReset }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("merge");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [resetting, setResetting] = (0, import_react.useState)(false);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [answer, setAnswer] = (0, import_react.useState)(null);
	const [summary, setSummary] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [attachment, setAttachment] = (0, import_react.useState)(null);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [reading, setReading] = (0, import_react.useState)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const SpeechRecognition = getSpeechRecognition$1();
	const canSubmit = Boolean(text.trim()) || attachment?.kind === "image";
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
	async function handleFile(file) {
		setError(null);
		setPreview(null);
		setAnswer(null);
		setReading(file.name);
		try {
			const imported = await importFile(file);
			if (imported.kind === "text") {
				setText((t) => t.trim() ? `${t.trim()}\n\n${imported.text}` : imported.text);
				setAttachment(null);
			} else {
				setAttachment(imported);
				if (mode === "ask") setMode("replace");
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : "Couldn't read that file. Try another.");
		} finally {
			setReading(null);
		}
	}
	function reset() {
		setPreview(null);
		setAnswer(null);
		setSummary("");
		setError(null);
		setConfirmReset(false);
		setAttachment(null);
	}
	async function handleSubmit() {
		if (!canSubmit) {
			setError(mode === "ask" ? "Ask a question about your schedule first." : "Paste the school's notice, describe your schedule, or attach a file first.");
			return;
		}
		setBusy(true);
		setError(null);
		setPreview(null);
		setAnswer(null);
		try {
			const image = attachment?.kind === "image" ? attachment.dataUrl : void 0;
			const result = await requestAi(mode, text.trim(), {
				courses: schedule.courses,
				meetings: schedule.meetings
			}, {
				image,
				term: schedule.term
			});
			if (!result.ok) setError(result.error);
			else if (result.kind === "answer") setAnswer(result.answer);
			else {
				setPreview(buildScheduleData(result.schedule.courses, result.schedule.meetings, schedule.term));
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: "Assistant"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only sm:hidden",
					children: "Assistant"
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-6 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-serif text-2xl font-bold",
						children: "Assistant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-2",
						children: "Paste a notice to merge it, rebuild from a file or description, or ask a question — you review every change before it's saved."
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: text,
										onChange: (e) => setText(e.target.value),
										placeholder: PLACEHOLDERS[mode],
										rows: mode === "ask" ? 3 : 6,
										maxLength: 19e3,
										className: "w-full resize-y rounded-md border border-line bg-paper px-3 py-2 pr-20 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute top-2 right-2 flex items-center gap-0.5",
										children: [mode !== "ask" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => fileRef.current?.click(),
											title: "Attach a timetable file or screenshot",
											"aria-label": "Attach a timetable file or screenshot",
											className: "rounded-md p-1.5 text-ink-faint hover:text-ink",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" })
										}) : null, SpeechRecognition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: toggleListening,
											title: listening ? "Stop dictating" : "Dictate",
											"aria-label": listening ? "Stop dictating" : "Dictate",
											className: listening ? "rounded-md bg-seal-tint p-1.5 text-seal-dark" : "rounded-md p-1.5 text-ink-faint hover:text-ink",
											children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: IMPORT_ACCEPT,
										className: "hidden",
										onChange: (e) => {
											const file = e.target.files?.[0];
											if (file) handleFile(file);
											e.target.value = "";
										}
									})
								]
							}),
							reading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-xs text-ink-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }),
									"Reading ",
									reading,
									"…"
								]
							}) : null,
							attachment?.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-md border border-line bg-paper-elevated p-3 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: attachment.dataUrl,
										alt: attachment.name,
										className: "h-14 w-14 rounded-sm border border-line object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "min-w-0 flex-1 truncate text-sm text-ink",
										children: attachment.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Remove attachment",
										onClick: () => setAttachment(null),
										className: "rounded-md p-1.5 text-ink-faint hover:text-ink",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
									})
								]
							}) : null,
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark",
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
									onClick: () => confirmReset ? void handleResetClick() : setConfirmReset(true),
									className: cn("inline-flex items-center gap-1.5 text-xs font-medium underline-offset-2 disabled:opacity-50", confirmReset ? "text-seal hover:underline" : "text-ink-muted hover:underline"),
									children: [resetting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), confirmReset ? "Erase everything?" : "Start over"]
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
										disabled: busy || !canSubmit,
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
		className: cn("flex-1 cursor-pointer rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150", active ? "bg-seal text-white shadow-[var(--shadow-seal)]" : "text-ink-muted hover:text-ink"),
		children: label
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
		if (seen === "2.0.0") return;
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
					children: ["Kebiao · v", APP_VERSION]
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
/**
* Location colors. A schedule maps each distinct place label to a palette
* index (`campusTone`, first-seen order). Tones index the `--color-loc-*`
* custom properties in styles.css; undefined tone = neutral paper.
*/
function locTone(data, campus) {
	if (!campus) return void 0;
	return data.campusTone[campus];
}
function locVar(tone, suffix) {
	return tone === void 0 ? `var(--color-${suffix === "-fill" ? "paper-elevated" : suffix === "-fg" ? "ink" : "ink-faint"})` : `var(--color-loc-${tone}${suffix})`;
}
/** Card/chip fill + readable foreground for a location. */
function locFillStyle(data, campus) {
	const tone = locTone(data, campus);
	return {
		backgroundColor: locVar(tone, "-fill"),
		color: locVar(tone, "-fg")
	};
}
/** Solid accent (left bar, dot, legend swatch). */
function locSolidStyle(data, campus) {
	return { backgroundColor: locVar(locTone(data, campus), "") };
}
function DayAgenda({ week, day, blocks, focusCourseId, onSelect, onDayChange, schedule }) {
	const dayBlocks = blocks.filter((b) => b.day === day);
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
						className: cn("flex h-11 min-w-11 flex-1 flex-col items-center justify-center rounded-md px-1.5 transition-colors duration-150", active ? "bg-ink text-paper" : "text-ink-muted hover:bg-ink/5 hover:text-ink"),
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-muted",
					children: formatShortDate(week, day, schedule.term)
				}),
				commute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink",
					children: commute
				}) : null
			] }),
			dayBlocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg bg-paper-elevated px-4 py-8 text-center text-sm text-ink-muted shadow-[var(--shadow-border)]",
				children: "Free day."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-3",
				children: dayBlocks.map((block) => {
					const dimmed = focusCourseId !== null && focusCourseId !== block.course.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(block),
						className: cn("relative flex w-full gap-4 rounded-lg p-4 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow,opacity] duration-150 ease-out", "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink", dimmed && "opacity-35"),
						style: locFillStyle(schedule, block.campus),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-y-3 left-0 w-1 rounded-full",
								style: locSolidStyle(schedule, block.campus)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-16 shrink-0 pl-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium tabular-nums",
										children: block.start
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs tabular-nums opacity-80",
										children: block.end
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-xs tracking-wide opacity-60",
										children: daypartOf(block.start)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-base font-medium",
										children: block.course.short
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center gap-1.5 text-sm opacity-80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [block.campus, block.room].filter(Boolean).join(" · ") || "No location" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-xs opacity-60",
										children: [
											sectionsLabel(block.sectionStart, block.sectionEnd),
											block.flags.includes("once") ? " · this week only" : "",
											block.flags.includes("biweekly") ? " · irregular" : ""
										]
									})
								]
							})
						]
					}) }, block.id);
				})
			})
		]
	});
}
/**
* Kebiao seal-stamp logo — a Chinese seal (印章) holding 课表 ("class
* schedule") in rice on seal red, with the gold line motif shared with
* therealchina.net. `size` is the rendered edge in px.
*/
function Logo({ size = 36, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className,
		width: size,
		height: size,
		viewBox: "0 0 48 48",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		role: "img",
		"aria-label": "Kebiao",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "6",
				width: "36",
				height: "36",
				rx: "5",
				fill: "#A6192E"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "9",
				width: "30",
				height: "30",
				rx: "3",
				fill: "none",
				stroke: "#FAF6EF",
				strokeWidth: "1.5",
				opacity: "0.9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "24",
				y: "28.5",
				textAnchor: "middle",
				fill: "#FAF6EF",
				fontFamily: "'Noto Serif SC', 'Songti SC', serif",
				fontWeight: "900",
				fontSize: "14",
				letterSpacing: "-0.5",
				children: "课表"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M15 33.5c2-2.4 4-2.4 6-0.8s4 1.6 6-0.8 4-2.4 6 0",
				stroke: "#C9A227",
				strokeWidth: "1.1",
				strokeLinecap: "round",
				fill: "none",
				opacity: "0.85"
			})
		]
	});
}
var TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
var NEW_COURSE = "__new__";
function MeetingEditor({ target, schedule, onApply, onClose }) {
	const open = target !== null;
	const editing = target?.mode === "edit" ? target.block : null;
	const termWeeks = schedule.term.weeks;
	const [courseKey, setCourseKey] = (0, import_react.useState)(NEW_COURSE);
	const [newCourseName, setNewCourseName] = (0, import_react.useState)("");
	const [day, setDay] = (0, import_react.useState)("Mon");
	const [start, setStart] = (0, import_react.useState)("08:30");
	const [end, setEnd] = (0, import_react.useState)("10:05");
	const [room, setRoom] = (0, import_react.useState)("");
	const [campus, setCampus] = (0, import_react.useState)("");
	const [weeksSpec, setWeeksSpec] = (0, import_react.useState)(`1-${termWeeks}`);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const knownCampuses = (0, import_react.useMemo)(() => Object.keys(schedule.campusTone), [schedule.campusTone]);
	(0, import_react.useEffect)(() => {
		if (!target) return;
		setError(null);
		setConfirmDelete(false);
		if (target.mode === "edit") {
			const b = target.block;
			setCourseKey(b.course.id);
			setNewCourseName("");
			setDay(b.day);
			setStart(b.start);
			setEnd(b.end);
			setRoom(b.room);
			setCampus(b.campus);
			const weeks = [...new Set(b.meetings.flatMap((m) => m.weeks))].sort((a, b) => a - b);
			setWeeksSpec(compressWeeks(weeks).replaceAll("–", "-"));
		} else {
			setCourseKey(schedule.courses[0]?.id ?? NEW_COURSE);
			setNewCourseName("");
			setDay(target.day ?? "Mon");
			setStart("08:30");
			setEnd("10:05");
			setRoom("");
			setCampus(knownCampuses[0] ?? "");
			setWeeksSpec(`1-${termWeeks}`);
		}
	}, [
		target,
		schedule,
		termWeeks,
		knownCampuses
	]);
	const isNewCourse = !editing && courseKey === NEW_COURSE;
	const weeks = (0, import_react.useMemo)(() => {
		const parsed = expandWeeks(weeksSpec.replaceAll("–", "-").replaceAll("—", "-"));
		return [...new Set(parsed.filter((w) => Number.isInteger(w) && w >= 1 && w <= termWeeks))].sort((a, b) => a - b);
	}, [weeksSpec, termWeeks]);
	function validate() {
		if (isNewCourse && !newCourseName.trim()) return "Name the new course.";
		if (!TIME_RE.test(start) || !TIME_RE.test(end)) return "Times use 24h HH:MM — e.g. 08:30.";
		if (toMinutes(end) <= toMinutes(start)) return "End time must be after start time.";
		if (weeks.length === 0) return `Weeks: use numbers or ranges within 1–${termWeeks}, e.g. "1-16" or "2,4,6".`;
		return null;
	}
	function buildNext() {
		const err = validate();
		if (err) {
			setError(err);
			return null;
		}
		const sections = sectionsForTime(start, end, schedule);
		const meetings = schedule.meetings.filter((m) => !editing || !editing.meetings.some((bm) => bm.id === m.id));
		const courses = [...schedule.courses];
		let courseId;
		if (editing) courseId = editing.course.id;
		else if (isNewCourse) {
			const name = newCourseName.trim();
			courseId = `manual-${Date.now().toString(36)}`;
			courses.push({
				id: courseId,
				name,
				short: name,
				code: "",
				credits: 0,
				teachers: []
			});
		} else courseId = courseKey;
		meetings.push({
			id: `manual-${Date.now().toString(36)}`,
			courseId,
			campus: campus.trim(),
			day,
			sectionStart: sections.sectionStart,
			sectionEnd: sections.sectionEnd,
			start,
			end,
			weeks,
			weeksLabel: compressWeeks(weeks),
			room: room.trim() || "—"
		});
		const used = new Set(meetings.map((m) => m.courseId));
		return {
			courses: courses.filter((c) => used.has(c.id)),
			meetings
		};
	}
	async function handleSave() {
		const next = buildNext();
		if (!next) return;
		setBusy(true);
		setError(null);
		try {
			await onApply(next.courses, next.meetings);
			onClose();
		} catch {
			setError("Could not save. Try again.");
			setBusy(false);
		}
	}
	async function handleDelete() {
		if (!editing) return;
		setBusy(true);
		setError(null);
		try {
			const drop = new Set(editing.meetings.map((m) => m.id));
			const meetings = schedule.meetings.filter((m) => !drop.has(m.id));
			const used = new Set(meetings.map((m) => m.courseId));
			await onApply(schedule.courses.filter((c) => used.has(c.id)), meetings);
			onClose();
		} catch {
			setError("Could not delete. Try again.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o ? onClose() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Edit class" : "Add a class" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1.5",
					children: editing ? `${editing.course.name} — changes apply to every week it meets.` : "One class at a time — the assistant can always fill in the rest."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-4",
					children: [
						editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Course",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink",
								children: editing.course.name
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Course",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: courseKey,
								onChange: (e) => setCourseKey(e.target.value),
								className: "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40",
								children: [schedule.courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: NEW_COURSE,
									children: "New course…"
								})]
							}), isNewCourse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: newCourseName,
								onChange: (e) => setNewCourseName(e.target.value),
								placeholder: "Course name",
								maxLength: 80,
								className: "mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Day",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1",
								children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDay(d),
									className: cn("flex-1 rounded-sm py-2 text-xs font-medium transition-colors", day === d ? "bg-ink text-paper" : "text-ink-muted hover:bg-ink/5 hover:text-ink"),
									children: d
								}, d))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Starts",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: start,
									onChange: (e) => setStart(e.target.value),
									className: "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Ends",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: end,
									onChange: (e) => setEnd(e.target.value),
									className: "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Room",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: room,
									onChange: (e) => setRoom(e.target.value),
									placeholder: "B-120",
									maxLength: 40,
									className: "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								label: "Location (campus, site…)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: campus,
									onChange: (e) => setCampus(e.target.value),
									placeholder: "e.g. South, Main, online",
									maxLength: 60,
									list: "known-locations",
									className: "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
									id: "known-locations",
									children: knownCampuses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c }, c))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: `Weeks it meets (1–${termWeeks})`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: weeksSpec,
								onChange: (e) => setWeeksSpec(e.target.value),
								placeholder: `1-${termWeeks} or 2,4,6-10`,
								className: "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-ink-faint",
								children: weeks.length > 0 ? `${DAY_LABEL[day]}s · ${weeks.length} ${weeks.length === 1 ? "week" : "weeks"}` : "Separate ranges with commas."
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center justify-between gap-3",
							children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy,
								onClick: () => confirmDelete ? void handleDelete() : setConfirmDelete(true),
								className: cn("inline-flex items-center gap-1.5 text-sm font-medium underline-offset-2 disabled:opacity-50", confirmDelete ? "text-seal hover:underline" : "text-ink-muted hover:text-seal"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), confirmDelete ? "Tap again to delete" : "Delete class"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void handleSave(),
								disabled: busy,
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, editing ? "Save changes" : "Add class"]
							})]
						})
					]
				})
			]
		}) })
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium tracking-wide text-ink-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5",
			children
		})]
	});
}
function MeetingPanel({ week, block, open, schedule, onOpenChange, onEdit }) {
	const course = block?.course;
	const hours = course ? courseHours(course.id, schedule) : 0;
	const others = course ? courseMeetings(course.id, schedule) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: block && course ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8",
			children: [
				block.campus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide uppercase",
					style: { color: locVar(locTone(schedule, block.campus), "") },
					children: block.campus
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "mt-2 pr-8",
					children: course.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2",
					children: [course.code, course.credits ? `${course.credits} ${course.credits === 1 ? "credit" : "credits"}` : ""].filter(Boolean).join(" · ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 flex flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: MapPin,
							label: "Where",
							children: [block.room, block.campus].filter(Boolean).join(" · ") || "—"
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
						course.teachers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							icon: Users,
							label: "Teachers",
							children: course.teachers.join(" · ")
						}) : null,
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
							current: week,
							termWeeks: schedule.term.weeks
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
							className: cn("rounded-md px-3 py-2.5 text-sm shadow-[var(--shadow-border)]", !block.meetings.some((x) => x.id === m.id) && "bg-paper"),
							style: block.meetings.some((x) => x.id === m.id) ? locFillStyle(schedule, m.campus) : void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium",
								children: [
									DAY_LABEL[m.day],
									" ",
									m.start,
									"–",
									m.end
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs opacity-70",
								children: [
									[m.campus, m.room].filter(Boolean).join(" "),
									" · weeks ",
									m.weeksLabel
								]
							})]
						}, m.id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 border-t border-line pt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onEdit(block),
						className: "inline-flex items-center gap-2 rounded-full border-[1.5px] border-line px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:border-seal hover:text-seal",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Edit class"]
					})
				})
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
function WeekDots({ weeks, current, termWeeks }) {
	const set = new Set(weeks);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 grid gap-1",
		style: { gridTemplateColumns: `repeat(${Math.min(termWeeks, 26)}, minmax(0, 1fr))` },
		children: Array.from({ length: termWeeks }, (_, i) => {
			const w = i + 1;
			const on = set.has(w);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				title: `Week ${w}`,
				className: cn("h-5 rounded-xs", on ? "bg-ink" : "bg-line", w === current && on && "ring-2 ring-ink ring-offset-2 ring-offset-paper-elevated")
			}, w);
		})
	});
}
function getSpeechRecognition() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
var EXAMPLE = "Machine Learning Mon 08:30–10:05 G-514 weeks 2–17, Computer Vision Tue 14:00–15:35 A-203, Algorithms Thu 10:25–12:00 …";
function Onboarding({ onDone }) {
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [reading, setReading] = (0, import_react.useState)(null);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [summary, setSummary] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [attachment, setAttachment] = (0, import_react.useState)(null);
	const [termDraft, setTermDraft] = (0, import_react.useState)(() => defaultTerm());
	const recognitionRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
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
	async function handleFile(file) {
		setError(null);
		setPreview(null);
		setReading(file.name);
		try {
			const imported = await importFile(file);
			if (imported.kind === "text") {
				setText(imported.text);
				setAttachment(null);
			} else setAttachment(imported);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Couldn't read that file. Try another.");
		} finally {
			setReading(null);
		}
	}
	const canBuild = Boolean(text.trim()) || attachment?.kind === "image";
	async function handleCreate() {
		if (!canBuild) {
			setError("Describe your schedule, paste the school's notice, or attach a file first.");
			return;
		}
		setBusy(true);
		setError(null);
		setPreview(null);
		try {
			const term = normalizeTerm(termDraft);
			const image = attachment?.kind === "image" ? attachment.dataUrl : void 0;
			const result = await requestAi("replace", text.trim(), {
				courses: [],
				meetings: []
			}, {
				image,
				term
			});
			if (!result.ok) setError(result.error);
			else if (result.kind === "schedule") {
				setPreview(buildScheduleData(result.schedule.courses, result.schedule.meetings, term));
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
			await onDone(courses, meetings, normalizeTerm(termDraft));
		} catch {
			setError("Could not save the schedule. Try again.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-paper px-4 py-10 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 44 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-2xl leading-none font-black tracking-tight",
					children: "Kebiao"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs text-ink-faint",
					children: "课表 · your term, one file away"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-6 rounded-xl bg-paper-elevated p-5 shadow-[var(--shadow-border)] transition-shadow", dragging && "ring-2 ring-seal/50"),
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					const file = e.dataTransfer.files?.[0];
					if (file) handleFile(file);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "onboarding-text",
								className: "text-xs font-medium tracking-wide text-ink-muted uppercase",
								children: "Your schedule, your way"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-ink shadow-[var(--shadow-border)] transition-colors hover:border-seal hover:text-seal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-3.5" }), "Upload file"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: IMPORT_ACCEPT,
								className: "hidden",
								onChange: (e) => {
									const file = e.target.files?.[0];
									if (file) handleFile(file);
									e.target.value = "";
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-ink-faint",
						children: "Drop a timetable file or a screenshot — PDF, Word, Excel, CSV, text or image — or just type it below."
					}),
					attachment?.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3 rounded-md border border-line bg-paper p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: attachment.dataUrl,
								alt: attachment.name,
								className: "h-16 w-16 rounded-sm border border-line object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-1.5 text-sm font-medium text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: attachment.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-ink-faint",
									children: "The assistant will read the timetable from this image."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Remove attachment",
								onClick: () => setAttachment(null),
								className: "rounded-md p-1.5 text-ink-faint hover:text-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})
						]
					}) : null,
					reading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center gap-2 text-xs text-ink-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }),
							"Reading ",
							reading,
							"…"
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "onboarding-text",
							value: text,
							onChange: (e) => setText(e.target.value),
							placeholder: EXAMPLE,
							rows: 5,
							maxLength: 19e3,
							autoFocus: true,
							className: "w-full resize-y rounded-md border border-line bg-paper px-3 py-2 pr-10 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
						}), SpeechRecognition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleListening,
							title: listening ? "Stop dictating" : "Dictate your schedule",
							"aria-label": listening ? "Stop dictating" : "Dictate your schedule",
							className: listening ? "absolute top-2 right-2 rounded-md bg-seal-tint p-1.5 text-seal-dark" : "absolute top-2 right-2 rounded-md p-1.5 text-ink-faint hover:text-ink",
							children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
						}) : null]
					}),
					listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-seal-dark",
						children: "Listening… speak your schedule."
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark",
						children: error
					}) : null,
					preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCard, {
							schedule: preview,
							summary
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 rounded-md border border-line bg-paper p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-faint",
										children: "Term name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: termDraft.label,
										onChange: (e) => setTermDraft((t) => ({
											...t,
											label: e.target.value
										})),
										placeholder: "Autumn 2026",
										maxLength: 60,
										className: "mt-1 w-full rounded-md border border-line bg-paper px-2 py-1.5 text-xs text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-faint",
										children: "Week 1 starts"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: termDraft.startMonday,
										onChange: (e) => setTermDraft((t) => ({
											...t,
											startMonday: e.target.value
										})),
										className: "mt-1 w-full rounded-md border border-line bg-paper px-2 py-1.5 text-xs tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-faint",
										children: "Weeks"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: termDraft.weeks,
										onChange: (e) => setTermDraft((t) => ({
											...t,
											weeks: Math.min(52, Math.max(1, Number(e.target.value) || 1))
										})),
										inputMode: "numeric",
										className: "mt-1 w-full rounded-md border border-line bg-paper px-2 py-1.5 text-xs tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
									})]
								})
							]
						})]
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
							disabled: busy || !canBuild,
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Build it"]
						})]
					})
				]
			})]
		})
	});
}
/**
* Class reminders. On the web app they fire while the app is open (browsers
* don't allow a page-free scheduled local notification); the Android APK gets
* true always-on reminders natively through the `Kebiao` bridge — this module
* mirrors the same prefs to it so both stay in sync.
*/
var PREFS_KEY = "my-schedule-reminders";
var LEAD_OPTIONS = [
	5,
	10,
	15,
	30
];
function readReminderPrefs() {
	if (typeof window === "undefined") return {
		enabled: false,
		leadMin: 10
	};
	try {
		const raw = window.localStorage.getItem(PREFS_KEY);
		if (!raw) return {
			enabled: false,
			leadMin: 10
		};
		const p = JSON.parse(raw);
		return {
			enabled: Boolean(p.enabled),
			leadMin: typeof p.leadMin === "number" ? p.leadMin : 10
		};
	} catch {
		return {
			enabled: false,
			leadMin: 10
		};
	}
}
function writeReminderPrefs(prefs) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}
function notificationsSupported() {
	return typeof window !== "undefined" && "Notification" in window;
}
/** Ask for the notification permission — must be called from a user gesture. */
async function ensureNotificationPermission() {
	if (!notificationsSupported()) return false;
	if (Notification.permission === "granted") return true;
	if (Notification.permission === "denied") return false;
	return await Notification.requestPermission() === "granted";
}
var timers = [];
/** Compute every upcoming class start within the next 7 days. */
function upcomingReminders(data, leadMin) {
	const now = /* @__PURE__ */ new Date();
	const week = termWeekFromDate(now, data.term);
	if (!week) return [];
	const parts = localParts(now);
	const dayIndex = DAYS.indexOf(parts.weekday);
	const out = [];
	const blocks = blocksForWeek(week, data);
	for (const block of blocks) {
		const bDay = DAYS.indexOf(block.day);
		if (bDay < dayIndex) continue;
		const daysAhead = bDay - dayIndex;
		const fire = new Date(now);
		fire.setDate(fire.getDate() + daysAhead);
		const [h, m] = block.start.split(":").map(Number);
		fire.setHours(h, m - leadMin, 0, 0);
		if (fire.getTime() <= now.getTime()) continue;
		const where = [block.campus, block.room].filter(Boolean).join(" ");
		out.push({
			at: fire.getTime(),
			title: `${block.course.short} in ${leadMin} min`,
			body: `${block.start}–${block.end}${where ? ` · ${where}` : ""}`
		});
	}
	return out;
}
/**
* (Re)schedule in-page timers for upcoming class reminders. Call on load, on
* schedule change, and when the tab becomes visible again.
*/
function syncReminders(data) {
	for (const t of timers) window.clearTimeout(t);
	timers = [];
	const prefs = readReminderPrefs();
	if (!prefs.enabled || !notificationsSupported()) return;
	if (Notification.permission !== "granted") return;
	for (const r of upcomingReminders(data, prefs.leadMin)) {
		const delay = r.at - Date.now();
		if (delay < 0 || delay > 6048e5) continue;
		timers.push(window.setTimeout(() => {
			try {
				new Notification(r.title, {
					body: r.body,
					tag: `kebiao-${r.at}`
				});
			} catch {}
		}, delay));
	}
}
/**
* App settings: the term calendar (name, week-1 Monday, week count) and class
* reminders. Term changes re-anchor every week number without touching the
* meetings themselves.
*/
function SettingsDialog({ schedule, onApplyTerm, onRemindersChanged }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [label, setLabel] = (0, import_react.useState)(schedule.term.label);
	const [start, setStart] = (0, import_react.useState)(schedule.term.startMonday);
	const [weeks, setWeeks] = (0, import_react.useState)(String(schedule.term.weeks));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [remOn, setRemOn] = (0, import_react.useState)(() => readReminderPrefs().enabled);
	const [lead, setLead] = (0, import_react.useState)(() => readReminderPrefs().leadMin);
	(0, import_react.useEffect)(() => {
		if (open) {
			setLabel(schedule.term.label);
			setStart(schedule.term.startMonday);
			setWeeks(String(schedule.term.weeks));
			setError(null);
			const prefs = readReminderPrefs();
			setRemOn(prefs.enabled);
			setLead(prefs.leadMin);
		}
	}, [open, schedule.term]);
	async function handleSave() {
		const weeksNum = Number(weeks);
		if (!Number.isInteger(weeksNum) || weeksNum < 1 || weeksNum > 52) {
			setError(`Weeks must be a number between 1 and 52.`);
			return;
		}
		if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) {
			setError("Pick the date week 1 begins.");
			return;
		}
		setBusy(true);
		setError(null);
		try {
			await onApplyTerm(normalizeTerm({
				label,
				startMonday: start,
				weeks: weeksNum
			}));
			setOpen(false);
			toast("Term updated");
		} catch {
			setError("Could not save. Try again.");
			setBusy(false);
		}
	}
	async function toggleReminders(next) {
		if (next && !isApkRuntime() && notificationsSupported()) {
			if (!await ensureNotificationPermission()) {
				toast("Notifications are blocked — allow them in your browser settings.");
				return;
			}
		}
		setRemOn(next);
		writeReminderPrefs({
			enabled: next,
			leadMin: lead
		});
		onRemindersChanged?.();
	}
	function changeLead(next) {
		setLead(next);
		writeReminderPrefs({
			enabled: remOn,
			leadMin: next
		});
		onRemindersChanged?.();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": "Settings",
				title: "Settings",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 pt-6 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-serif text-2xl",
					children: "Settings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1.5",
					children: "Your term calendar and class reminders."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "flex items-center gap-2 text-xs font-medium tracking-wide text-ink-muted uppercase",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), "Term"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-ink-faint",
											children: "Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: label,
											onChange: (e) => setLabel(e.target.value),
											placeholder: "Autumn 2026",
											maxLength: 60,
											className: "mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-ink-faint",
											children: "Weeks"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: weeks,
											onChange: (e) => setWeeks(e.target.value),
											inputMode: "numeric",
											maxLength: 2,
											className: "mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-faint",
										children: "Week 1 starts (any day — snapped to Monday)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: start,
										onChange: (e) => setStart(e.target.value),
										className: "mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
									})]
								}),
								start && /^\d{4}-\d{2}-\d{2}$/.test(start) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-ink-faint",
									children: ["Week 1 Monday: ", mondayOf(/* @__PURE__ */ new Date(`${start}T12:00:00`))]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-3 border-t border-line pt-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "flex items-center gap-2 text-xs font-medium tracking-wide text-ink-muted uppercase",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5" }), "Class reminders"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-ink",
										children: ["Remind me before class", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-xs text-ink-faint",
											children: isApkRuntime() ? "Scheduled on your phone — works even with the app closed." : "Fires while the app is open. The Android app reminds even when closed."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "switch",
										"aria-checked": remOn,
										onClick: () => void toggleReminders(!remOn),
										className: cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", remOn ? "bg-ink" : "bg-line"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 size-5 rounded-full bg-paper shadow transition-transform", remOn ? "translate-x-[22px]" : "translate-x-0.5") })
									})]
								}),
								remOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-ink-faint",
											children: "Remind"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-1",
											children: LEAD_OPTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => changeLead(m),
												className: cn("rounded-sm px-2.5 py-1.5 text-xs font-medium transition-colors", lead === m ? "bg-ink text-paper" : "text-ink-muted hover:bg-ink/5"),
												children: [m, "m"]
											}, m))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-ink-faint",
											children: "before"
										})
									]
								}) : null
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void handleSave(),
								disabled: busy,
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Save term"]
							})
						})
					]
				})
			]
		}) })]
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
var PX_PER_MIN = 1.05;
function WeekGrid({ week, blocks, focusCourseId, onSelect, schedule }) {
	const now = localParts();
	const isCurrentWeek = termWeekFromDate(/* @__PURE__ */ new Date(), schedule.term) === week;
	const today = isCurrentWeek ? now.weekday : null;
	const commute = new Set(commuteDays(week, schedule));
	const nowMins = now.hour * 60 + now.minute;
	const span = daySpan(schedule);
	const colHeight = (span.endMin - span.startMin) * PX_PER_MIN;
	const hours = [];
	for (let t = span.startMin; t <= span.endMin; t += 60) hours.push(t);
	const nowTop = isCurrentWeek && nowMins >= span.startMin && nowMins <= span.endMin ? (nowMins - span.startMin) * PX_PER_MIN : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-[52rem]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[4.25rem_repeat(7,minmax(0,1fr))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					DAYS.map((day) => {
						const date = dateOf(week, day, schedule.term);
						const isToday = today === day;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("border-b border-line px-2 pb-3", isToday && "bg-paper-elevated"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-sm font-medium", isToday ? "text-ink" : "text-ink-muted"),
									children: day
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm tabular-nums text-ink-faint",
									children: formatShortDate(week, day, schedule.term)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex min-h-5 items-center gap-2",
								children: [
									isToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium tracking-wide text-ink",
										children: "Today"
									}) : null,
									commute.has(day) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-muted",
										children: "Multiple places"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: date.iso
									})
								]
							})]
						}, day);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative pr-3 pt-0 text-right",
						style: { height: colHeight },
						children: hours.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-3 -translate-y-1/2 text-xs font-medium tabular-nums text-ink-faint",
							style: { top: (t - span.startMin) * PX_PER_MIN },
							children: minutesToLabel(t)
						}, t))
					}),
					DAYS.map((day) => {
						const cellBlocks = blocks.filter((b) => b.day === day);
						const isToday = today === day;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("relative border-l border-line", isToday && "bg-paper-elevated"),
							style: { height: colHeight },
							children: [
								hours.slice(1).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pointer-events-none absolute right-0 left-0 border-t border-line/60",
									style: { top: (t - span.startMin) * PX_PER_MIN }
								}, t)),
								nowTop !== null && isToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pointer-events-none absolute right-0 left-0 z-10 h-px bg-ink",
									style: { top: nowTop },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-2 left-1 h-4 w-1 rounded-full bg-ink" })
								}) : null,
								cellBlocks.map((block) => {
									const pos = dayPosition(block.start, block.end, span);
									const compact = durationMinutes(block.start, block.end) <= 55;
									const dimmed = focusCourseId !== null && focusCourseId !== block.course.id;
									const tone = locTone(schedule, block.campus);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => onSelect(block),
										className: cn("absolute right-1.5 left-1.5 z-[1] overflow-hidden rounded-md px-2.5 py-1.5 text-left shadow-[var(--shadow-border)]", "transition-[transform,box-shadow,opacity] duration-150 ease-out", "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink", dimmed && "opacity-30"),
										style: {
											top: pos.top * (colHeight / 100),
											height: pos.height * (colHeight / 100),
											...locFillStyle(schedule, block.campus)
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute inset-y-0 left-0 w-1",
												style: { backgroundColor: locVar(tone, "") }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm leading-snug font-medium",
												children: block.course.short
											}),
											!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mt-0.5 block text-xs tabular-nums opacity-80",
												children: [
													block.start,
													"–",
													block.end
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mt-0.5 block truncate text-xs opacity-80",
												children: [[block.campus, block.room].filter(Boolean).join(" "), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "opacity-60",
													children: [
														" ",
														"· ",
														sectionsLabel(block.sectionStart, block.sectionEnd)
													]
												})]
											})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-xs opacity-80",
												children: [block.campus, block.room].filter(Boolean).join(" ")
											}),
											block.flags.includes("once") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block text-xs opacity-80",
												children: "This week only"
											}) : null,
											block.flags.includes("biweekly") && !block.flags.includes("once") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block text-xs opacity-80",
												children: "Irregular weeks"
											}) : null
										]
									}, block.id);
								})
							]
						}, day);
					})
				]
			})
		})
	});
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
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;                  // still resolving — don't redirect yet
*   if (!user) return <Navigate to="/login" />;  // definitely signed out
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
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
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
var termSchema = object({
	label: string().max(80),
	startMonday: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	weeks: number().int().min(1).max(52)
}).optional();
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
	})).max(80),
	meetings: array(object({
		id: string().max(120),
		courseId: string().max(80),
		campus: string().max(60),
		day: _enum([
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun"
		]),
		sectionStart: number(),
		sectionEnd: number(),
		start: string().max(8),
		end: string().max(8),
		weeks: array(number()).max(60),
		weeksLabel: string().max(60),
		room: string().max(80),
		flag: _enum(["biweekly", "once"]).optional()
	})).max(500),
	term: termSchema
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
/**
* Schedules stored before terms became per-user carried a fixed calendar.
* Upgrade them to that same calendar so existing installs don't shift.
*/
var LEGACY_TERM = {
	label: "Autumn 2026",
	startMonday: "2026-09-07",
	weeks: 17
};
function safeParse(raw) {
	if (!raw) return null;
	try {
		const p = JSON.parse(raw);
		if (!Array.isArray(p.courses) || !Array.isArray(p.meetings)) return null;
		const term = p.term ? normalizeTerm(p.term) : p.meetings.length ? LEGACY_TERM : defaultTerm();
		return {
			courses: p.courses,
			meetings: p.meetings,
			term,
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
function writeLocalSchedule(courses, meetings, term, updatedAt = Date.now()) {
	const existing = readLocalSchedule();
	const next = {
		courses,
		meetings,
		term: term ?? existing?.term ?? defaultTerm(),
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
				meetings: local.meetings,
				term: local.term
			} });
			return local;
		}
		if (server.updatedAt > local.updatedAt) return writeLocalSchedule(server.courses, server.meetings, server.term, server.updatedAt);
		if (local.updatedAt > server.updatedAt) await saveSchedule({ data: {
			courses: local.courses,
			meetings: local.meetings,
			term: local.term
		} });
		return local;
	} catch {
		return local;
	}
}
/** Persist a new schedule locally and to the cloud when signed in. */
async function applySchedule(courses, meetings, canSync, term) {
	const local = writeLocalSchedule(courses, meetings, term);
	if (canSync) try {
		await saveSchedule({ data: {
			courses,
			meetings,
			term: local.term
		} });
	} catch {}
	return buildScheduleData(courses, meetings, local.term);
}
/** Persist just the term settings (schedule untouched). */
async function applyTerm(term, canSync) {
	const local = readLocalSchedule() ?? BASE_SCHEDULE;
	const next = writeLocalSchedule(local.courses, local.meetings, term);
	if (canSync) try {
		await saveSchedule({ data: {
			courses: next.courses,
			meetings: next.meetings,
			term
		} });
	} catch {}
	return buildScheduleData(next.courses, next.meetings, term);
}
/** Clear the schedule everywhere and send the user back through onboarding. */
async function resetScheduleEverywhere(canSync) {
	clearLocalSchedule();
	clearOnboarded();
	if (canSync) try {
		await resetSchedule();
	} catch {}
	return buildScheduleData([], [], defaultTerm());
}
function ScheduleApp({ weekParam }) {
	const navigate = useNavigate({ from: "/" });
	const { user, isPending: sessionPending } = useCurrentUserState();
	const canSync = user !== null;
	const isApk = isApkRuntime();
	const [schedule, setSchedule] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [onboarded, setOnboarded] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const local = readLocalSchedule() ?? BASE_SCHEDULE;
		setSchedule(buildScheduleData(local.courses, local.meetings, local.term));
		setOnboarded(hasOnboarded() || local.meetings.length > 0);
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mounted || sessionPending) return;
		let cancelled = false;
		syncSchedule(canSync).then((win) => {
			if (!cancelled) setSchedule(buildScheduleData(win.courses, win.meetings, win.term));
		});
		return () => {
			cancelled = true;
		};
	}, [
		mounted,
		sessionPending,
		canSync
	]);
	(0, import_react.useEffect)(() => {
		if (!schedule) return;
		syncReminders(schedule);
		window.Kebiao?.setSchedule?.(JSON.stringify({
			courses: schedule.courses,
			meetings: schedule.meetings,
			term: schedule.term,
			reminders: readReminderPrefs()
		}));
	}, [schedule]);
	(0, import_react.useEffect)(() => {
		if (!schedule) return;
		const onVisible = () => {
			if (document.visibilityState === "visible") syncReminders(schedule);
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, [schedule]);
	const termWeeks = schedule?.term.weeks ?? 16;
	const liveWeek = defaultWeek(/* @__PURE__ */ new Date(), schedule ?? emptyFallback());
	const [week, setWeekState] = (0, import_react.useState)(() => clampWeek(weekParam ?? liveWeek, termWeeks));
	const [focusCourseId, setFocusCourseId] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [editorTarget, setEditorTarget] = (0, import_react.useState)(null);
	const [day, setDay] = (0, import_react.useState)(() => localParts().weekday);
	const initialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!schedule || initialized.current) return;
		initialized.current = true;
		if (weekParam === void 0) {
			const w = defaultWeek(/* @__PURE__ */ new Date(), schedule);
			setWeekState(w);
			setDay(localParts().weekday);
		}
	}, [schedule, weekParam]);
	const blocks = (0, import_react.useMemo)(() => schedule ? blocksForWeek(week, schedule) : [], [week, schedule]);
	const load = schedule ? weekLoad(week, schedule) : {
		total: 0,
		count: 0,
		byCampus: {}
	};
	const commutes = schedule ? commuteDays(week, schedule) : [];
	const upcoming = schedule ? nextUp(/* @__PURE__ */ new Date(), schedule) : null;
	const currentTermWeek = schedule ? termWeekFromDate(/* @__PURE__ */ new Date(), schedule.term) : null;
	const peak = schedule ? maxWeekLoad(schedule) : 1;
	const totalCredits = schedule ? schedule.courses.reduce((sum, c) => sum + c.credits, 0) : 0;
	async function handleApply(courses, meetings) {
		const next = await applySchedule(courses, meetings, canSync, schedule?.term);
		setSchedule(next);
		setFocusCourseId(null);
		setSelected(null);
		toast("Schedule updated");
	}
	/** Onboarding finished — mark the device, then persist like any apply. */
	async function handleOnboarded(courses, meetings, term) {
		markOnboarded();
		setOnboarded(true);
		const next = await applySchedule(courses, meetings, canSync, term);
		setSchedule(next);
		setFocusCourseId(null);
		setSelected(null);
		toast("Schedule saved");
	}
	async function handleApplyTerm(term) {
		const next = await applyTerm(term, canSync);
		setSchedule(next);
		setWeekState((w) => clampWeek(w, next.term.weeks));
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
		if (weekParam !== void 0 && weekParam !== week) setWeekState(clampWeek(weekParam, termWeeks));
	}, [
		weekParam,
		week,
		termWeeks
	]);
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
	const goWeek = (0, import_react.useCallback)((next) => {
		const w = clampWeek(next, termWeeks);
		setWeekState(w);
		navigate({
			search: { week: w },
			replace: true
		});
	}, [navigate, termWeeks]);
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
	}, [week, goWeek]);
	async function shareWeek() {
		if (!schedule) return;
		const text = serializeWeek(week, schedule);
		const url = window.location.href;
		if (navigator.share) try {
			await navigator.share({
				title: `Kebiao · Week ${week}`,
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
	const campusLabels = Object.keys(schedule.campusTone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			toastOptions: { className: "!bg-ink !text-paper !border-0 !rounded-md !font-[inherit] !shadow-[var(--shadow-border)]" }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-dvh bg-paper text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								size: 32,
								className: "shrink-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif text-xl leading-none font-black tracking-tight",
								children: "Kebiao"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 hidden text-xs text-ink-faint lg:inline",
								children: schedule.term.label
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 sm:gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiUpdatePanel, {
								schedule,
								onApply: handleApply,
								onReset: handleReset
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Add a class",
								title: "Add a class",
								onClick: () => setEditorTarget({
									mode: "new",
									day
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Share this week",
								title: "Share this week",
								onClick: () => void shareWeek(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Print",
								title: "Print",
								onClick: () => window.print(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {
								schedule,
								onApplyTerm: handleApplyTerm,
								onRemindersChanged: () => schedule && syncReminders(schedule)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppInfo, { isApk }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: !isApk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "ml-1 hidden text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline sm:inline",
								children: "Sign in to sync"
							}) : null })
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-medium tracking-[0.18em] text-ink-faint uppercase",
										children: [
											schedule.term.label,
											" · ",
											totalCredits,
											" credits · ",
											schedule.courses.length,
											" courses"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 flex items-center gap-1",
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
												className: "font-serif text-3xl leading-none font-bold tabular-nums",
												children: ["Week ", week]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-sm text-ink-muted",
												children: formatWeekRange(week, schedule.term)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon-sm",
												"aria-label": "Next week",
												disabled: week >= termWeeks,
												onClick: () => goWeek(week + 1),
												className: "no-print",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
											})
										]
									}),
									upcoming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-ink-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowLine, {
											upcoming,
											term: schedule.term
										})
									}) : null
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
										Object.entries(load.byCampus).filter(([c]) => c).map(([campus, mins]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "size-2 rounded-xs",
													style: locSolidStyle(schedule, campus)
												}),
												campus,
												" ",
												formatDuration(mins)
											]
										}, campus))
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
								className: "rounded-md bg-paper-elevated px-4 py-3 text-sm text-ink shadow-[var(--shadow-border)]",
								children: [
									"Multiple locations this week — ",
									commutes.map((d) => DAY_LABEL[d]).join(" & "),
									". Plan the commute."
								]
							}) : null,
							!weekHasClasses(week, schedule) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rounded-md bg-paper-elevated px-4 py-3 text-sm text-ink-muted shadow-[var(--shadow-border)]",
								children: ["No classes this week.", week < termWeeks ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-4",
								children: [focusCourseId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs font-medium text-ink underline-offset-2 hover:underline",
									onClick: () => setFocusCourseId(null),
									children: "Show all"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "inline-flex items-center gap-1 text-xs font-medium text-seal underline-offset-2 hover:underline",
									onClick: () => setEditorTarget({
										mode: "new",
										day
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), "Add class"]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
							children: schedule.courses.map((course) => {
								const meetings = courseMeetings(course.id, schedule);
								const campuses = [...new Set(meetings.map((m) => m.campus).filter(Boolean))];
								const active = focusCourseId === course.id;
								const campus = campuses.length === 1 ? campuses[0] : null;
								const tone = campus ? locTone(schedule, campus) : void 0;
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
											className: cn("mt-1 inline-flex items-center gap-1.5 text-xs", active ? "text-paper/70" : "text-ink-muted"),
											children: [
												campus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "size-2 rounded-xs",
													style: { backgroundColor: locVar(tone, "") }
												}) : null,
												course.credits,
												" cr · ",
												campus ?? (campuses.length > 1 ? "Multiple places" : "—")
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Week 1 starts ",
							formatShortDateInline(schedule.term.startMonday),
							" · ",
							schedule.term.weeks,
							" weeks"
						] }), campusLabels.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex items-center gap-4",
							children: campusLabels.map((campus) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2.5 rounded-xs",
									style: locSolidStyle(schedule, campus)
								}), campus]
							}, campus))
						}) : null]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeetingPanel, {
			week,
			block: selected,
			open: selected !== null,
			schedule,
			onOpenChange: (open) => {
				if (!open) setSelected(null);
			},
			onEdit: (block) => {
				setSelected(null);
				setEditorTarget({
					mode: "edit",
					block
				});
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeetingEditor, {
			target: editorTarget,
			schedule,
			onApply: handleApply,
			onClose: () => setEditorTarget(null)
		})
	] });
}
function emptyFallback() {
	return buildScheduleData([], []);
}
function formatShortDateInline(iso) {
	const d = /* @__PURE__ */ new Date(`${iso}T12:00:00`);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function NowLine({ upcoming, term }) {
	if (upcoming.status === "now") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-ink",
		children: [
			"In class now: ",
			upcoming.block.course.short,
			", until ",
			upcoming.ends,
			" at",
			" ",
			[upcoming.block.campus, upcoming.block.room].filter(Boolean).join(" ") || "—",
			"."
		]
	});
	const sameWeek = upcoming.week === termWeekFromDate(/* @__PURE__ */ new Date(), term);
	const where = [upcoming.block.campus, upcoming.block.room].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-ink",
		children: [
			"Next up: ",
			upcoming.block.course.short,
			sameWeek ? ` ${upcoming.block.day} ${upcoming.block.start}` : ` week ${upcoming.week}`,
			where ? `, ${where}` : "",
			"."
		]
	});
}
function Heatmap({ week, peak, currentTermWeek, onSelect, schedule }) {
	const weeks = schedule.term.weeks;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(weeks > 22 && "overflow-x-auto pb-1"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-1",
			style: { gridTemplateColumns: `repeat(${weeks}, minmax(${weeks > 22 ? "18px" : "0"}, 1fr))` },
			children: Array.from({ length: weeks }, (_, i) => {
				const w = i + 1;
				const load = weekLoad(w, schedule);
				const height = Math.max(6, Math.round(load.total / peak * 44));
				const selected = w === week;
				const entries = Object.entries(load.byCampus).filter(([c]) => c);
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex w-1/2 min-w-1.5 flex-col-reverse overflow-hidden rounded-xs bg-line",
								style: { height },
								children: entries.map(([campus, mins]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									height: Math.round(mins / Math.max(load.total, 1) * height),
									backgroundColor: locVar(locTone(schedule, campus), "")
								} }, campus))
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
					formatWeekRange(w, schedule.term),
					" · ",
					load.count,
					" ",
					load.count === 1 ? "class" : "classes"
				] })] }, w);
			})
		})
	});
}
function Home() {
	const { week } = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleApp, { weekParam: week });
}
//#endregion
export { Home as component };
