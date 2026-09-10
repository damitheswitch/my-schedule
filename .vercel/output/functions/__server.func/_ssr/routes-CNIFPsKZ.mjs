import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Printer, c as Clock, i as Share2, l as ChevronRight, n as Users, o as MapPin, s as GraduationCap, t as X, u as ChevronLeft } from "../_libs/lucide-react.mjs";
import { A as termWeekFromDate, C as formatWeekRange, D as sectionsLabel, E as nextUp, M as weekHasClasses, N as weekLoad, O as serializeWeek, S as formatShortDate, T as maxWeekLoad, _ as dateOf, a as DAYS, b as firstBusyDay, c as TOTAL_CREDITS, d as blocksForWeek, f as clampWeek, g as courseMeetings, h as courseHours, i as COURSES, j as toMinutes, k as shanghaiParts, l as bandOf, m as commuteDays, n as Route, o as DAY_LABEL, p as commuteCopy, r as BANDS, s as TERM, u as bandPosition, v as defaultWeek, w as holidayName, x as formatDuration, y as durationMinutes } from "./router-op8fzgoV.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, p as Slot, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CNIFPsKZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function DayAgenda({ week, day, blocks, focusCourseId, onSelect, onDayChange }) {
	const dayBlocks = blocks.filter((b) => b.day === day);
	const date = dateOf(week, day);
	const holiday = holidayName(date.iso);
	const commute = commuteCopy(week, day);
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
function MeetingPanel({ week, block, open, onOpenChange }) {
	const course = block?.course;
	const hours = course ? courseHours(course.id) : 0;
	const others = course ? courseMeetings(course.id) : [];
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
function WeekGrid({ week, blocks, focusCourseId, onSelect }) {
	const now = shanghaiParts();
	const isCurrentWeek = termWeekFromDate() === week;
	const today = isCurrentWeek && DAYS.includes(now.weekday) ? now.weekday : null;
	const commute = new Set(commuteDays(week));
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
function ScheduleApp({ weekParam }) {
	const navigate = useNavigate({ from: "/" });
	const liveWeek = defaultWeek();
	const [week, setWeekState] = (0, import_react.useState)(() => weekParam ?? liveWeek);
	const [focusCourseId, setFocusCourseId] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [day, setDay] = (0, import_react.useState)(() => {
		const parts = shanghaiParts();
		if (DAYS.includes(parts.weekday)) return parts.weekday;
		return firstBusyDay(weekParam ?? liveWeek);
	});
	const blocks = (0, import_react.useMemo)(() => blocksForWeek(week), [week]);
	const load = weekLoad(week);
	const commutes = commuteDays(week);
	const upcoming = nextUp();
	const currentTermWeek = termWeekFromDate();
	const peak = maxWeekLoad();
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
		if (!blocks.some((b) => b.day === day)) setDay(firstBusyDay(week));
	}, [
		week,
		blocks,
		day
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
		const text = serializeWeek(week);
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
									TOTAL_CREDITS,
									" credits · ",
									COURSES.length,
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => void shareWeek(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share week"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								onClick: () => window.print(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Print"]
							})]
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
								onSelect: goWeek
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
							!weekHasClasses(week) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
							onSelect: setSelected
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
							onDayChange: setDay
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
							children: COURSES.map((course) => {
								const meetings = courseMeetings(course.id);
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
function Heatmap({ week, peak, currentTermWeek, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-1",
		style: { gridTemplateColumns: "repeat(17, minmax(0, 1fr))" },
		children: Array.from({ length: TERM.weeks }, (_, i) => {
			const w = i + 1;
			const load = weekLoad(w);
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
	const { week } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleApp, { weekParam: week });
}
//#endregion
export { Home as component };
