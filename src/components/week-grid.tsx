import {
  BANDS,
  DAYS,
  bandOf,
  bandPosition,
  commuteDays,
  dateOf,
  durationMinutes,
  formatShortDate,
  holidayName,
  sectionsLabel,
  shanghaiParts,
  termWeekFromDate,
  toMinutes,
  type Band,
  type Block,
  type DayKey,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";

const BAND_HEIGHT: Record<Band["id"], string> = {
  morning: "h-52",
  afternoon: "h-52",
  evening: "h-36",
};

type WeekGridProps = {
  week: number;
  blocks: Block[];
  focusCourseId: string | null;
  onSelect: (block: Block) => void;
};

export function WeekGrid({ week, blocks, focusCourseId, onSelect }: WeekGridProps) {
  const now = shanghaiParts();
  const currentWeek = termWeekFromDate();
  const isCurrentWeek = currentWeek === week;
  const today = isCurrentWeek && DAYS.includes(now.weekday as DayKey)
    ? (now.weekday as DayKey)
    : null;
  const commute = new Set(commuteDays(week));
  const nowMins = now.hour * 60 + now.minute;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[56rem]">
        <div className="grid grid-cols-[4.25rem_repeat(5,minmax(0,1fr))]">
          <div />
          {DAYS.map((day) => {
            const date = dateOf(week, day);
            const holiday = holidayName(date.iso);
            const isToday = today === day;
            return (
              <div
                key={day}
                className={cn(
                  "border-b border-line px-3 pb-3",
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
                    {formatShortDate(week, day)}
                  </span>
                </div>
                <div className="mt-1 flex min-h-5 items-center gap-2">
                  {isToday ? (
                    <span className="text-xs font-medium tracking-wide text-ink">
                      Today
                    </span>
                  ) : null}
                  {holiday ? (
                    <span className="text-xs text-south">{holiday}</span>
                  ) : null}
                  {commute.has(day) ? (
                    <span className="text-xs text-ink-muted">Both campuses</span>
                  ) : null}
                </div>
              </div>
            );
          })}

          {BANDS.map((band, bandIndex) => (
            <BandRow
              key={band.id}
              band={band}
              blocks={blocks}
              focusCourseId={focusCourseId}
              today={today}
              nowMins={isCurrentWeek ? nowMins : null}
              showRule={bandIndex > 0}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BandRow({
  band,
  blocks,
  focusCourseId,
  today,
  nowMins,
  showRule,
  onSelect,
}: {
  band: Band;
  blocks: Block[];
  focusCourseId: string | null;
  today: DayKey | null;
  nowMins: number | null;
  showRule: boolean;
  onSelect: (block: Block) => void;
}) {
  const gutterLabel = band.id === "afternoon" ? "Lunch" : band.id === "evening" ? "Dinner" : null;
  const gutterTime = band.id === "afternoon" ? "12:00" : band.id === "evening" ? "17:30" : null;
  const showNow =
    nowMins !== null &&
    nowMins >= toMinutes(band.start) &&
    nowMins < toMinutes(band.end);
  const nowTop = showNow && nowMins !== null
    ? ((nowMins - toMinutes(band.start)) / (toMinutes(band.end) - toMinutes(band.start))) * 100
    : null;

  return (
    <>
      {showRule && gutterLabel ? (
        <>
          <div className="flex h-9 items-center justify-end pr-3 text-xs tabular-nums text-ink-faint">
            {gutterTime}
          </div>
          <div className="col-span-5 flex h-9 items-center gap-3 px-2">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs tracking-wide text-ink-faint">{gutterLabel}</span>
            <div className="h-px flex-1 bg-line" />
          </div>
        </>
      ) : null}

      <div className={cn("pr-3 pt-1 text-right", BAND_HEIGHT[band.id])}>
        <div className="text-xs font-medium tabular-nums text-ink">{band.start}</div>
        <div className="mt-1 text-xs tracking-wide text-ink-faint">{band.label}</div>
      </div>

      {DAYS.map((day) => {
        const cellBlocks = blocks.filter(
          (b) => b.day === day && bandOf(b.start).id === band.id,
        );
        const isToday = today === day;
        return (
          <div
            key={`${band.id}-${day}`}
            className={cn(
              "relative border-l border-line",
              BAND_HEIGHT[band.id],
              isToday && "bg-paper-elevated",
            )}
          >
            {nowTop !== null && isToday ? (
              <div
                className="pointer-events-none absolute right-0 left-0 z-10 h-px bg-ink"
                style={{ top: `${nowTop}%` }}
              >
                <span className="absolute -top-2 left-1 h-4 w-1 rounded-full bg-ink" />
              </div>
            ) : null}
            {cellBlocks.map((block) => {
              const pos = bandPosition(block.start, block.end, band);
              const compact = durationMinutes(block.start, block.end) <= 55;
              const dimmed = focusCourseId !== null && focusCourseId !== block.course.id;
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => onSelect(block)}
                  className={cn(
                    "absolute right-1.5 left-1.5 z-[1] overflow-hidden rounded-md px-2.5 py-2 text-left shadow-[var(--shadow-border)]",
                    "transition-[transform,box-shadow,opacity] duration-150 ease-out",
                    "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                    block.campus === "South" ? "bg-south-fill" : "bg-north-fill",
                    dimmed && "opacity-30",
                  )}
                  style={{ top: `${pos.top}%`, height: `${pos.height}%` }}
                >
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 w-1",
                      block.campus === "South" ? "bg-south" : "bg-north",
                    )}
                  />
                  <span className="block text-sm font-medium leading-snug text-ink">
                    {block.course.short}
                  </span>
                  {!compact ? (
                    <>
                      <span className="mt-0.5 block text-xs tabular-nums text-ink-muted">
                        {block.start}–{block.end}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-ink-muted">
                        {block.room}
                        <span className="text-ink-faint">
                          {" "}
                          · {sectionsLabel(block.sectionStart, block.sectionEnd)}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="block truncate text-xs text-ink-muted">{block.room}</span>
                  )}
                  {block.flags.includes("once") ? (
                    <span className="mt-1 block text-xs text-ink-muted">This week only</span>
                  ) : null}
                  {block.flags.includes("biweekly") && !block.flags.includes("once") ? (
                    <span className="mt-1 block text-xs text-ink-muted">Irregular weeks</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
