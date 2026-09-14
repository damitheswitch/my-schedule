import { MapPin } from "lucide-react";
import {
  DAYS,
  DAY_LABEL,
  bandOf,
  commuteCopy,
  dateOf,
  formatShortDate,
  holidayName,
  sectionsLabel,
  type Block,
  type DayKey,
  type ScheduleData,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";

type DayAgendaProps = {
  week: number;
  day: DayKey;
  blocks: Block[];
  focusCourseId: string | null;
  onSelect: (block: Block) => void;
  onDayChange: (day: DayKey) => void;
  schedule: ScheduleData;
};

export function DayAgenda({
  week,
  day,
  blocks,
  focusCourseId,
  onSelect,
  onDayChange,
  schedule,
}: DayAgendaProps) {
  const dayBlocks = blocks.filter((b) => b.day === day);
  const date = dateOf(week, day);
  const holiday = holidayName(date.iso);
  const commute = commuteCopy(week, day, schedule);
  const busyDays = new Set(blocks.map((b) => b.day));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {DAYS.map((d) => {
          const active = d === day;
          const busy = busyDays.has(d);
          return (
            <button
              key={d}
              type="button"
              onClick={() => onDayChange(d)}
              className={cn(
                "flex h-11 min-w-14 flex-1 flex-col items-center justify-center rounded-md px-2 transition-colors duration-150",
                active ? "bg-ink text-paper" : "text-ink-muted hover:bg-ink/5 hover:text-ink",
              )}
            >
              <span className="text-xs font-medium">{d}</span>
              <span
                className={cn(
                  "mt-0.5 size-1 rounded-full",
                  active ? "bg-paper" : busy ? "bg-ink-muted" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      <div>
        <h2 className="font-serif text-3xl leading-none text-ink">
          {DAY_LABEL[day]}
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          {formatShortDate(week, day)}
          {holiday ? ` · ${holiday}` : ""}
        </p>
        {commute ? (
          <p className="mt-2 text-sm text-south">{commute}</p>
        ) : null}
      </div>

      {dayBlocks.length === 0 ? (
        <p className="rounded-lg bg-paper-elevated px-4 py-8 text-center text-sm text-ink-muted shadow-[var(--shadow-border)]">
          {holiday ? `${holiday} — no classes.` : "Free day."}
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {dayBlocks.map((block) => {
            const dimmed = focusCourseId !== null && focusCourseId !== block.course.id;
            const band = bandOf(block.start);
            return (
              <li key={block.id}>
                <button
                  type="button"
                  onClick={() => onSelect(block)}
                  className={cn(
                    "flex w-full gap-4 rounded-lg p-4 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow,opacity] duration-150 ease-out",
                    "hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                    block.campus === "South" ? "bg-south-fill" : "bg-north-fill",
                    dimmed && "opacity-35",
                  )}
                >
                  <div className="w-16 shrink-0">
                    <div className="text-sm font-medium tabular-nums text-ink">{block.start}</div>
                    <div className="text-xs tabular-nums text-ink-muted">{block.end}</div>
                    <div className="mt-2 text-xs tracking-wide text-ink-faint">{band.label}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-medium text-ink">{block.course.short}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                      <MapPin className="size-3.5 shrink-0" />
                      <span>
                        {block.campus} · {block.room}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-ink-faint">
                      {sectionsLabel(block.sectionStart, block.sectionEnd)}
                      {block.flags.includes("once") ? " · this week only" : ""}
                      {block.flags.includes("biweekly") ? " · irregular" : ""}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
