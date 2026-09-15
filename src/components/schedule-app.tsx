import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Plus, Printer, Share2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { AiUpdatePanel } from "@/components/ai-update-panel";
import { AppInfo } from "@/components/app-info";
import { DayAgenda } from "@/components/day-agenda";
import { Logo } from "@/components/logo";
import { MeetingEditor, type MeetingEditorTarget } from "@/components/meeting-editor";
import { MeetingPanel } from "@/components/meeting-panel";
import { Onboarding } from "@/components/onboarding";
import { SettingsDialog } from "@/components/settings-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { WeekGrid } from "@/components/week-grid";
import { UserButton, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { authEnabled } from "@/lib/auth/client";
import { isApkRuntime } from "@/lib/ai-client";
import { buildScheduleData } from "@/lib/schedule-ai";
import { readReminderPrefs, syncReminders } from "@/lib/notify";
import {
  applySchedule,
  applyTerm,
  BASE_SCHEDULE,
  hasOnboarded,
  markOnboarded,
  readLocalSchedule,
  resetScheduleEverywhere,
  syncSchedule,
} from "@/lib/schedule-store";
import {
  blocksForWeek,
  clampWeek,
  commuteDays,
  courseMeetings,
  defaultWeek,
  DAY_LABEL,
  firstBusyDay,
  formatDuration,
  formatWeekRange,
  localParts,
  nextUp,
  serializeWeek,
  termWeekFromDate,
  weekLoad,
  weekHasClasses,
  maxWeekLoad,
  type Block,
  type Course,
  type DayKey,
  type Meeting,
  type ScheduleData,
  type TermConfig,
} from "@/lib/schedule";
import { locSolidStyle, locVar, locTone } from "@/lib/loc-style";
import { cn } from "@/lib/utils";

type ScheduleAppProps = {
  weekParam?: number;
};

export function ScheduleApp({ weekParam }: ScheduleAppProps) {
  const navigate = useNavigate({ from: "/" });
  const { user, isPending: sessionPending } = useCurrentUserState();
  // Any resolved user can sync — the signed-in user on the hosted app, or the
  // shared dev user when auth is off locally. Signed-out visitors stay local.
  const canSync = user !== null;
  // The Android wrapper serves the bundle from app assets — no server exists,
  // so auth and sync controls are pointless there.
  const isApk = isApkRuntime();

  // Local-first: the schedule renders from this device's localStorage, then
  // converges with the cloud copy when signed in on the hosted app.
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [mounted, setMounted] = useState(false);
  // First-run flag: false until this device has been through onboarding (or
  // already holds a real schedule — returning users skip it entirely).
  const [onboarded, setOnboarded] = useState(true);

  useEffect(() => {
    const local = readLocalSchedule() ?? BASE_SCHEDULE;
    setSchedule(buildScheduleData(local.courses, local.meetings, local.term));
    setOnboarded(hasOnboarded() || local.meetings.length > 0);
    setMounted(true);
  }, []);

  // Once the session resolves, reconcile localStorage with the cloud copy —
  // newest wins, written back to the stale side. No-op offline / on the APK.
  useEffect(() => {
    if (!mounted || sessionPending) return;
    let cancelled = false;
    void syncSchedule(canSync).then((win) => {
      if (!cancelled) setSchedule(buildScheduleData(win.courses, win.meetings, win.term));
    });
    return () => {
      cancelled = true;
    };
  }, [mounted, sessionPending, canSync]);

  // Mirror the schedule to the Android shell (widget + native reminders) and
  // (re)arm in-app reminders whenever the schedule or reminder prefs change.
  useEffect(() => {
    if (!schedule) return;
    syncReminders(schedule);
    const bridge = (window as unknown as { Kebiao?: { setSchedule?: (json: string) => void } })
      .Kebiao;
    bridge?.setSchedule?.(
      JSON.stringify({
        courses: schedule.courses,
        meetings: schedule.meetings,
        term: schedule.term,
        reminders: readReminderPrefs(),
      }),
    );
  }, [schedule]);

  useEffect(() => {
    if (!schedule) return;
    const onVisible = () => {
      if (document.visibilityState === "visible") syncReminders(schedule);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [schedule]);

  const termWeeks = schedule?.term.weeks ?? 16;
  const liveWeek = defaultWeek(new Date(), schedule ?? emptyFallback());
  const [week, setWeekState] = useState(() => clampWeek(weekParam ?? liveWeek, termWeeks));
  const [focusCourseId, setFocusCourseId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Block | null>(null);
  const [editorTarget, setEditorTarget] = useState<MeetingEditorTarget | null>(null);
  const [day, setDay] = useState<DayKey>(() => localParts().weekday);
  // After the real schedule loads, re-derive week/day once (stored schedules
  // can be busier on different weeks than the built-in base).
  const initialized = useRef(false);
  useEffect(() => {
    if (!schedule || initialized.current) return;
    initialized.current = true;
    if (weekParam === undefined) {
      const w = defaultWeek(new Date(), schedule);
      setWeekState(w);
      setDay(localParts().weekday);
    }
  }, [schedule, weekParam]);

  const blocks = useMemo(
    () => (schedule ? blocksForWeek(week, schedule) : []),
    [week, schedule],
  );
  const load = schedule
    ? weekLoad(week, schedule)
    : { total: 0, count: 0, byCampus: {} as Record<string, number> };
  const commutes = schedule ? commuteDays(week, schedule) : [];
  const upcoming = schedule ? nextUp(new Date(), schedule) : null;
  const currentTermWeek = schedule ? termWeekFromDate(new Date(), schedule.term) : null;
  const peak = schedule ? maxWeekLoad(schedule) : 1;
  const totalCredits = schedule
    ? schedule.courses.reduce((sum, c) => sum + c.credits, 0)
    : 0;

  async function handleApply(courses: Course[], meetings: Meeting[]) {
    const next = await applySchedule(courses, meetings, canSync, schedule?.term);
    setSchedule(next);
    setFocusCourseId(null);
    setSelected(null);
    toast("Schedule updated");
  }

  /** Onboarding finished — mark the device, then persist like any apply. */
  async function handleOnboarded(courses: Course[], meetings: Meeting[], term: TermConfig) {
    markOnboarded();
    setOnboarded(true);
    const next = await applySchedule(courses, meetings, canSync, term);
    setSchedule(next);
    setFocusCourseId(null);
    setSelected(null);
    toast("Schedule saved");
  }

  async function handleApplyTerm(term: TermConfig) {
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

  useEffect(() => {
    if (weekParam !== undefined && weekParam !== week) {
      setWeekState(clampWeek(weekParam, termWeeks));
    }
  }, [weekParam, week, termWeeks]);

  useEffect(() => {
    if (weekParam === undefined) {
      void navigate({ search: { week }, replace: true });
    }
    // Initial URL so shared links include the week.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (schedule && !blocks.some((b) => b.day === day)) {
      setDay(firstBusyDay(week, schedule));
    }
  }, [week, blocks, day, schedule]);

  const goWeek = useCallback(
    (next: number) => {
      const w = clampWeek(next, termWeeks);
      setWeekState(w);
      void navigate({ search: { week: w }, replace: true });
    },
    [navigate, termWeeks],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Kebiao · Week ${week}`,
          text,
          url,
        });
        return;
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    }
    await navigator.clipboard.writeText(`${text}\n\n${url}`);
    toast("This week copied — send it to anyone");
  }

  if (!mounted || !schedule) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper text-ink-muted">
        <p className="text-sm">Loading your schedule…</p>
      </div>
    );
  }

  // First run: no onboarded flag and nothing scheduled — show the welcome
  // flow. If a cloud sync later delivers meetings, this hides itself.
  if (!onboarded && schedule.meetings.length === 0) {
    return <Onboarding onDone={handleOnboarded} />;
  }

  const campusLabels = Object.keys(schedule.campusTone);

  return (
    <TooltipProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "!bg-ink !text-paper !border-0 !rounded-md !font-[inherit] !shadow-[var(--shadow-border)]",
        }}
      />
      <div className="min-h-dvh bg-paper text-ink">
        <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2.5">
              <Logo size={32} className="shrink-0" />
              <span className="font-serif text-xl leading-none font-black tracking-tight">
                Kebiao
              </span>
              <span className="mt-1 hidden text-xs text-ink-faint lg:inline">
                {schedule.term.label}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <AiUpdatePanel
                schedule={schedule}
                onApply={handleApply}
                onReset={handleReset}
              />
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Add a class"
                title="Add a class"
                onClick={() => setEditorTarget({ mode: "new", day })}
              >
                <Plus className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Share this week"
                title="Share this week"
                onClick={() => void shareWeek()}
              >
                <Share2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Print"
                title="Print"
                onClick={() => window.print()}
              >
                <Printer className="size-4" />
              </Button>
              <SettingsDialog
                schedule={schedule}
                onApplyTerm={handleApplyTerm}
                onRemindersChanged={() => schedule && syncReminders(schedule)}
              />
              <AppInfo isApk={isApk} />
              <UserButton />
              <SignedOut>
                {authEnabled && !isApk ? (
                  <Link
                    to="/login"
                    className="ml-1 hidden text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline sm:inline"
                  >
                    Sign in to sync
                  </Link>
                ) : null}
              </SignedOut>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-8">
          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-ink-faint uppercase">
                  {schedule.term.label} · {totalCredits} credits · {schedule.courses.length} courses
                </p>
                <div className="mt-1.5 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Previous week"
                    disabled={week <= 1}
                    onClick={() => goWeek(week - 1)}
                    className="no-print"
                  >
                    <ChevronLeft className="size-5" />
                  </Button>
                  <div>
                    <div className="font-serif text-3xl leading-none font-bold tabular-nums">
                      Week {week}
                    </div>
                    <div className="mt-1 text-sm text-ink-muted">{formatWeekRange(week, schedule.term)}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Next week"
                    disabled={week >= termWeeks}
                    onClick={() => goWeek(week + 1)}
                    className="no-print"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                </div>
                {upcoming ? (
                  <p className="mt-2 text-sm text-ink-muted">
                    <NowLine upcoming={upcoming} term={schedule.term} />
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-muted">
                <span>
                  <span className="font-medium text-ink">{load.count}</span>{" "}
                  {load.count === 1 ? "class" : "classes"}
                </span>
                <span>
                  <span className="font-medium text-ink">{formatDuration(load.total)}</span> in class
                </span>
                {Object.entries(load.byCampus)
                  .filter(([c]) => c)
                  .map(([campus, mins]) => (
                    <span key={campus} className="inline-flex items-center gap-1.5">
                      <span
                        className="size-2 rounded-xs"
                        style={locSolidStyle(schedule, campus)}
                      />
                      {campus} {formatDuration(mins)}
                    </span>
                  ))}
              </div>
            </div>

            <Heatmap week={week} peak={peak} currentTermWeek={currentTermWeek} onSelect={goWeek} schedule={schedule} />

            {currentTermWeek !== null && currentTermWeek !== week ? (
              <p className="text-sm text-ink-muted">
                Right now it is week {currentTermWeek}
                {currentTermWeek === 1 ? " — teaching has not started yet" : ""}.
                <button
                  type="button"
                  className="ml-2 font-medium text-ink underline-offset-2 hover:underline"
                  onClick={() => goWeek(currentTermWeek)}
                >
                  Go to week {currentTermWeek}
                </button>
              </p>
            ) : null}

            {commutes.length > 0 ? (
              <p className="rounded-md bg-paper-elevated px-4 py-3 text-sm text-ink shadow-[var(--shadow-border)]">
                Multiple locations this week — {commutes.map((d) => DAY_LABEL[d]).join(" & ")}.
                Plan the commute.
              </p>
            ) : null}

            {!weekHasClasses(week, schedule) ? (
              <p className="rounded-md bg-paper-elevated px-4 py-3 text-sm text-ink-muted shadow-[var(--shadow-border)]">
                No classes this week.
                {week < termWeeks ? (
                  <button
                    type="button"
                    className="ml-2 font-medium text-ink underline-offset-2 hover:underline"
                    onClick={() => goWeek(week + 1)}
                  >
                    Jump to week {week + 1}
                  </button>
                ) : null}
              </p>
            ) : null}
          </section>

          <div className="hidden lg:block rounded-xl bg-paper-elevated p-4 shadow-[var(--shadow-border)] print:block print:rounded-none print:p-0 print:shadow-none">
            <WeekGrid
              week={week}
              blocks={blocks}
              focusCourseId={focusCourseId}
              onSelect={setSelected}
              schedule={schedule}
            />
          </div>

          <div className="lg:hidden no-print">
            <DayAgenda
              week={week}
              day={day}
              blocks={blocks}
              focusCourseId={focusCourseId}
              onSelect={setSelected}
              onDayChange={setDay}
              schedule={schedule}
            />
          </div>

          <section className="no-print">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                Courses
              </h2>
              <div className="flex items-baseline gap-4">
                {focusCourseId ? (
                  <button
                    type="button"
                    className="text-xs font-medium text-ink underline-offset-2 hover:underline"
                    onClick={() => setFocusCourseId(null)}
                  >
                    Show all
                  </button>
                ) : null}
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-medium text-seal underline-offset-2 hover:underline"
                  onClick={() => setEditorTarget({ mode: "new", day })}
                >
                  <Plus className="size-3" />
                  Add class
                </button>
              </div>
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {schedule.courses.map((course) => {
                const meetings = courseMeetings(course.id, schedule);
                const campuses = [...new Set(meetings.map((m) => m.campus).filter(Boolean))];
                const active = focusCourseId === course.id;
                const campus = campuses.length === 1 ? campuses[0] : null;
                const tone = campus ? locTone(schedule, campus) : undefined;
                return (
                  <li key={course.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setFocusCourseId((id) => (id === course.id ? null : course.id))
                      }
                      className={cn(
                        "flex h-full w-full flex-col items-start rounded-lg px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150 ease-out",
                        "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                        active ? "bg-ink text-paper" : "bg-paper-elevated text-ink",
                      )}
                    >
                      <span className="text-sm font-medium">{course.short}</span>
                      <span
                        className={cn(
                          "mt-1 inline-flex items-center gap-1.5 text-xs",
                          active ? "text-paper/70" : "text-ink-muted",
                        )}
                      >
                        {campus ? (
                          <span
                            className="size-2 rounded-xs"
                            style={{ backgroundColor: locVar(tone, "") }}
                          />
                        ) : null}
                        {course.credits} cr · {campus ?? (campuses.length > 1 ? "Multiple places" : "—")}
                      </span>
                      <span
                        className={cn(
                          "mt-2 text-xs tabular-nums",
                          active ? "text-paper/60" : "text-ink-faint",
                        )}
                      >
                        {course.code}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint">
            <p>
              Week 1 starts {formatShortDateInline(schedule.term.startMonday)} · {schedule.term.weeks} weeks
            </p>
            {campusLabels.length ? (
              <p className="flex items-center gap-4">
                {campusLabels.map((campus) => (
                  <span key={campus} className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-xs" style={locSolidStyle(schedule, campus)} />
                    {campus}
                  </span>
                ))}
              </p>
            ) : null}
          </footer>
        </div>
      </div>

      <MeetingPanel
        week={week}
        block={selected}
        open={selected !== null}
        schedule={schedule}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        onEdit={(block) => {
          setSelected(null);
          setEditorTarget({ mode: "edit", block });
        }}
      />
      <MeetingEditor
        target={editorTarget}
        schedule={schedule}
        onApply={handleApply}
        onClose={() => setEditorTarget(null)}
      />
    </TooltipProvider>
  );
}

function emptyFallback(): ScheduleData {
  return buildScheduleData([], []);
}

function formatShortDateInline(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function NowLine({
  upcoming,
  term,
}: {
  upcoming: NonNullable<ReturnType<typeof nextUp>>;
  term: TermConfig;
}) {
  if (upcoming.status === "now") {
    return (
      <span className="text-ink">
        In class now: {upcoming.block.course.short}, until {upcoming.ends} at{" "}
        {[upcoming.block.campus, upcoming.block.room].filter(Boolean).join(" ") || "—"}.
      </span>
    );
  }
  const sameWeek = upcoming.week === termWeekFromDate(new Date(), term);
  const where = [upcoming.block.campus, upcoming.block.room].filter(Boolean).join(" ");
  return (
    <span className="text-ink">
      Next up: {upcoming.block.course.short}
      {sameWeek ? ` ${upcoming.block.day} ${upcoming.block.start}` : ` week ${upcoming.week}`}
      {where ? `, ${where}` : ""}.
    </span>
  );
}

function Heatmap({
  week,
  peak,
  currentTermWeek,
  onSelect,
  schedule,
}: {
  week: number;
  peak: number;
  currentTermWeek: number | null;
  onSelect: (week: number) => void;
  schedule: ScheduleData;
}) {
  const weeks = schedule.term.weeks;
  return (
    <div className={cn(weeks > 22 && "overflow-x-auto pb-1")}>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${weeks}, minmax(${weeks > 22 ? "18px" : "0"}, 1fr))`,
        }}
      >
        {Array.from({ length: weeks }, (_, i) => {
          const w = i + 1;
          const load = weekLoad(w, schedule);
          const height = Math.max(6, Math.round((load.total / peak) * 44));
          const selected = w === week;
          const entries = Object.entries(load.byCampus).filter(([c]) => c);
          return (
            <Tooltip key={w}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`Week ${w}, ${load.count} classes`}
                  aria-pressed={selected}
                  onClick={() => onSelect(w)}
                  className={cn(
                    "flex h-14 min-w-0 flex-col items-center justify-end gap-1 overflow-hidden rounded-sm pt-1 transition-colors duration-150",
                    selected ? "bg-ink/5" : "hover:bg-ink/5",
                    currentTermWeek === w && !selected && "ring-1 ring-ink/20",
                  )}
                >
                  <span className="flex w-full flex-1 items-end justify-center">
                    <span
                      className="flex w-1/2 min-w-1.5 flex-col-reverse overflow-hidden rounded-xs bg-line"
                      style={{ height }}
                    >
                      {entries.map(([campus, mins]) => (
                        <span
                          key={campus}
                          style={{
                            height: Math.round((mins / Math.max(load.total, 1)) * height),
                            backgroundColor: locVar(locTone(schedule, campus), ""),
                          }}
                        />
                      ))}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "w-full truncate text-center text-xs leading-none tabular-nums",
                      selected ? "font-medium text-ink" : "text-ink-faint",
                    )}
                  >
                    {w}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Week {w} · {formatWeekRange(w, schedule.term)} · {load.count}{" "}
                {load.count === 1 ? "class" : "classes"}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
