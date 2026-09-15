import {
  DAYS,
  commuteDays,
  dateOf,
  dayPosition,
  daySpan,
  durationMinutes,
  formatShortDate,
  localParts,
  minutesToLabel,
  sectionsLabel,
  termWeekFromDate,
  type Block,
  type ScheduleData,
} from "@/lib/schedule";
import { locFillStyle, locVar, locTone } from "@/lib/loc-style";
import { cn } from "@/lib/utils";

const PX_PER_MIN = 1.05;

type WeekGridProps = {
  week: number;
  blocks: Block[];
  focusCourseId: string | null;
  onSelect: (block: Block) => void;
  schedule: ScheduleData;
};

export function WeekGrid({ week, blocks, focusCourseId, onSelect, schedule }: WeekGridProps) {
  const now = localParts();
  const currentWeek = termWeekFromDate(new Date(), schedule.term);
  const isCurrentWeek = currentWeek === week;
  const today = isCurrentWeek ? now.weekday : null;
  const commute = new Set(commuteDays(week, schedule));
  const nowMins = now.hour * 60 + now.minute;

  const span = daySpan(schedule);
  const colHeight = (span.endMin - span.startMin) * PX_PER_MIN;
  const hours: number[] = [];
  for (let t = span.startMin; t <= span.endMin; t += 60) hours.push(t);
  const nowTop =
    isCurrentWeek && nowMins >= span.startMin && nowMins <= span.endMin
      ? (nowMins - span.startMin) * PX_PER_MIN
      : null;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[52rem]">
        <div className="grid grid-cols-[4.25rem_repeat(7,minmax(0,1fr))]">
          <div />
          {DAYS.map((day) => {
            const date = dateOf(week, day, schedule.term);
            const isToday = today === day;
            return (
              <div
                key={day}
                className={cn(
                  "border-b border-line px-2 pb-3",
                  isToday && "bg-paper-elevated",
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isToday ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {day}
                  </span>
                  <span className="text-sm tabular-nums text-ink-faint">
                    {formatShortDate(week, day, schedule.term)}
                  </span>
                </div>
                <div className="mt-1 flex min-h-5 items-center gap-2">
                  {isToday ? (
                    <span className="text-xs font-medium tracking-wide text-ink">
                      Today
                    </span>
                  ) : null}
                  {commute.has(day) ? (
                    <span className="text-xs text-ink-muted">Multiple places</span>
                  ) : null}
                  <span className="sr-only">{date.iso}</span>
                </div>
              </div>
            );
          })}

          <div className="relative pr-3 pt-0 text-right" style={{ height: colHeight }}>
            {hours.map((t) => (
              <div
                key={t}
                className="absolute right-3 -translate-y-1/2 text-xs font-medium tabular-nums text-ink-faint"
                style={{ top: (t - span.startMin) * PX_PER_MIN }}
              >
                {minutesToLabel(t)}
              </div>
            ))}
          </div>

          {DAYS.map((day) => {
            const cellBlocks = blocks.filter((b) => b.day === day);
            const isToday = today === day;
            return (
              <div
                key={day}
                className={cn(
                  "relative border-l border-line",
                  isToday && "bg-paper-elevated",
                )}
                style={{ height: colHeight }}
              >
                {hours.slice(1).map((t) => (
                  <div
                    key={t}
                    className="pointer-events-none absolute right-0 left-0 border-t border-line/60"
                    style={{ top: (t - span.startMin) * PX_PER_MIN }}
                  />
                ))}
                {nowTop !== null && isToday ? (
                  <div
                    className="pointer-events-none absolute right-0 left-0 z-10 h-px bg-ink"
                    style={{ top: nowTop }}
                  >
                    <span className="absolute -top-2 left-1 h-4 w-1 rounded-full bg-ink" />
                  </div>
                ) : null}
                {cellBlocks.map((block) => {
                  const pos = dayPosition(block.start, block.end, span);
                  const compact = durationMinutes(block.start, block.end) <= 55;
                  const dimmed =
                    focusCourseId !== null && focusCourseId !== block.course.id;
                  const tone = locTone(schedule, block.campus);
                  return (
                    <button
                      key={block.id}
                      type="button"
                      onClick={() => onSelect(block)}
                      className={cn(
                        "absolute right-1.5 left-1.5 z-[1] overflow-hidden rounded-md px-2.5 py-1.5 text-left shadow-[var(--shadow-border)]",
                        "transition-[transform,box-shadow,opacity] duration-150 ease-out",
                        "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                        dimmed && "opacity-30",
                      )}
                      style={{
                        top: pos.top * (colHeight / 100),
                        height: pos.height * (colHeight / 100),
                        ...locFillStyle(schedule, block.campus),
                      }}
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-1"
                        style={{ backgroundColor: locVar(tone, "") }}
                      />
                      <span className="block text-sm leading-snug font-medium">
                        {block.course.short}
                      </span>
                      {!compact ? (
                        <>
                          <span className="mt-0.5 block text-xs tabular-nums opacity-80">
                            {block.start}–{block.end}
                          </span>
                          <span className="mt-0.5 block truncate text-xs opacity-80">
                            {[block.campus, block.room].filter(Boolean).join(" ")}
                            <span className="opacity-60">
                              {" "}
                              · {sectionsLabel(block.sectionStart, block.sectionEnd)}
                            </span>
                          </span>
                        </>
                      ) : (
                        <span className="block truncate text-xs opacity-80">
                          {[block.campus, block.room].filter(Boolean).join(" ")}
                        </span>
                      )}
                      {block.flags.includes("once") ? (
                        <span className="mt-1 block text-xs opacity-80">This week only</span>
                      ) : null}
                      {block.flags.includes("biweekly") && !block.flags.includes("once") ? (
                        <span className="mt-1 block text-xs opacity-80">Irregular weeks</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
