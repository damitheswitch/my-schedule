import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Printer, Share2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { DayAgenda } from "@/components/day-agenda";
import { MeetingPanel } from "@/components/meeting-panel";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { WeekGrid } from "@/components/week-grid";
import {
  COURSES,
  DAYS,
  TERM,
  TOTAL_CREDITS,
  blocksForWeek,
  clampWeek,
  commuteDays,
  courseMeetings,
  defaultWeek,
  DAY_LABEL,
  firstBusyDay,
  formatDuration,
  formatWeekRange,
  nextUp,
  serializeWeek,
  shanghaiParts,
  termWeekFromDate,
  weekLoad,
  weekHasClasses,
  maxWeekLoad,
  type Block,
  type DayKey,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";

type ScheduleAppProps = {
  weekParam?: number;
};

export function ScheduleApp({ weekParam }: ScheduleAppProps) {
  const navigate = useNavigate({ from: "/" });
  const liveWeek = defaultWeek();
  const [week, setWeekState] = useState(() => weekParam ?? liveWeek);
  const [focusCourseId, setFocusCourseId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Block | null>(null);
  const [day, setDay] = useState<DayKey>(() => {
    const parts = shanghaiParts();
    if (DAYS.includes(parts.weekday as DayKey)) return parts.weekday as DayKey;
    return firstBusyDay(weekParam ?? liveWeek);
  });

  const blocks = useMemo(() => blocksForWeek(week), [week]);
  const load = weekLoad(week);
  const commutes = commuteDays(week);
  const upcoming = nextUp();
  const currentTermWeek = termWeekFromDate();
  const peak = maxWeekLoad();

  useEffect(() => {
    if (weekParam !== undefined && weekParam !== week) {
      setWeekState(clampWeek(weekParam));
    }
  }, [weekParam, week]);

  useEffect(() => {
    if (weekParam === undefined) {
      void navigate({ search: { week }, replace: true });
    }
    // Initial URL so shared links include the week.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!blocks.some((b) => b.day === day)) {
      setDay(firstBusyDay(week));
    }
  }, [week, blocks, day]);

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
  }, [week]);

  function goWeek(next: number) {
    const w = clampWeek(next);
    setWeekState(w);
    void navigate({ search: { week: w }, replace: true });
  }

  async function shareWeek() {
    const text = serializeWeek(week);
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `North & South · Week ${week}`,
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
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 pb-16 sm:px-6 lg:px-8 lg:py-10">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-ink-muted uppercase">
                {TERM.label} · {TOTAL_CREDITS} credits · {COURSES.length} courses
              </p>
              <h1 className="mt-2 font-serif text-4xl leading-none sm:text-5xl">
                North{" "}
                <span className="italic text-ink-muted">&</span> South
              </h1>
              <p className="mt-3 max-w-md text-sm text-ink-muted">
                Warm blocks are South campus. Cool blocks are North.
                {upcoming ? (
                  <>
                    {" "}
                    <NowLine upcoming={upcoming} />
                  </>
                ) : null}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 no-print">
              <Button variant="outline" onClick={() => void shareWeek()}>
                <Share2 className="size-4" />
                Share week
              </Button>
              <Button variant="ghost" onClick={() => window.print()}>
                <Printer className="size-4" />
                Print
              </Button>
            </div>
          </header>

          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-1">
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
                    <div className="font-serif text-3xl leading-none tabular-nums">
                      Week {week}
                    </div>
                    <div className="mt-1 text-sm text-ink-muted">{formatWeekRange(week)}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Next week"
                    disabled={week >= TERM.weeks}
                    onClick={() => goWeek(week + 1)}
                    className="no-print"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-muted">
                <span>
                  <span className="font-medium text-ink">{load.count}</span>{" "}
                  {load.count === 1 ? "class" : "classes"}
                </span>
                <span>
                  <span className="font-medium text-ink">{formatDuration(load.total)}</span> in class
                </span>
                {load.south > 0 ? (
                  <span>
                    <span className="text-south">South</span> {formatDuration(load.south)}
                  </span>
                ) : null}
                {load.north > 0 ? (
                  <span>
                    <span className="text-north">North</span> {formatDuration(load.north)}
                  </span>
                ) : null}
              </div>
            </div>

            <Heatmap week={week} peak={peak} currentTermWeek={currentTermWeek} onSelect={goWeek} />

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
              <p className="rounded-md bg-south-fill px-4 py-3 text-sm text-south-fg">
                Both campuses this week — {commutes.map((d) => DAY_LABEL[d]).join(" & ")}.
                Plan the commute.
              </p>
            ) : null}

            {!weekHasClasses(week) ? (
              <p className="rounded-md bg-paper-elevated px-4 py-3 text-sm text-ink-muted shadow-[var(--shadow-border)]">
                No classes this week.
                {week < TERM.weeks ? (
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
            />
          </div>

          <section className="no-print">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                Courses
              </h2>
              {focusCourseId ? (
                <button
                  type="button"
                  className="text-xs font-medium text-ink underline-offset-2 hover:underline"
                  onClick={() => setFocusCourseId(null)}
                >
                  Show all
                </button>
              ) : null}
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {COURSES.map((course) => {
                const meetings = courseMeetings(course.id);
                const campuses = [...new Set(meetings.map((m) => m.campus))];
                const active = focusCourseId === course.id;
                const campus = campuses.length === 1 ? campuses[0] : null;
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
                          "mt-1 text-xs",
                          active ? "text-paper/70" : "text-ink-muted",
                        )}
                      >
                        {course.credits} cr · {campus ?? "Both campuses"}
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
            <p>Week 1 starts 7 Sep 2026 · Xi’an time</p>
            <p className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-xs bg-south" /> South
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-xs bg-north" /> North
              </span>
            </p>
          </footer>
        </div>
      </div>

      <MeetingPanel
        week={week}
        block={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </TooltipProvider>
  );
}

function NowLine({
  upcoming,
}: {
  upcoming: NonNullable<ReturnType<typeof nextUp>>;
}) {
  if (upcoming.status === "now") {
    return (
      <span className="text-ink">
        In class now: {upcoming.block.course.short}, until {upcoming.ends} at {upcoming.block.room}.
      </span>
    );
  }
  const sameWeek = upcoming.week === termWeekFromDate();
  return (
    <span className="text-ink">
      Next up: {upcoming.block.course.short}
      {sameWeek ? ` ${upcoming.block.day} ${upcoming.block.start}` : ` week ${upcoming.week}`}
      , {upcoming.block.campus} {upcoming.block.room}.
    </span>
  );
}

function Heatmap({
  week,
  peak,
  currentTermWeek,
  onSelect,
}: {
  week: number;
  peak: number;
  currentTermWeek: number | null;
  onSelect: (week: number) => void;
}) {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: "repeat(17, minmax(0, 1fr))" }}
    >
      {Array.from({ length: TERM.weeks }, (_, i) => {
        const w = i + 1;
        const load = weekLoad(w);
        const height = Math.max(6, Math.round((load.total / peak) * 44));
        const southH = load.total ? Math.round((load.south / load.total) * height) : 0;
        const northH = height - southH;
        const selected = w === week;
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
                    className="flex w-1/2 min-w-1.5 flex-col overflow-hidden rounded-xs bg-line"
                    style={{ height }}
                  >
                    {northH > 0 ? (
                      <span className="bg-north" style={{ height: northH }} />
                    ) : null}
                    {southH > 0 ? (
                      <span className="bg-south" style={{ height: southH }} />
                    ) : null}
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
              Week {w} · {formatWeekRange(w)} · {load.count}{" "}
              {load.count === 1 ? "class" : "classes"}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
