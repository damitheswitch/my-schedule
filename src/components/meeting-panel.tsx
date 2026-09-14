import type { ReactNode } from "react";
import { MapPin, Clock, GraduationCap, Users, Pencil } from "lucide-react";
import {
  DAY_LABEL,
  TERM,
  courseHours,
  courseMeetings,
  formatDuration,
  sectionsLabel,
  type Block,
  type ScheduleData,
} from "@/lib/schedule";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type MeetingPanelProps = {
  week: number;
  block: Block | null;
  open: boolean;
  schedule: ScheduleData;
  onOpenChange: (open: boolean) => void;
  onEdit: (block: Block) => void;
};

export function MeetingPanel({ week, block, open, schedule, onOpenChange, onEdit }: MeetingPanelProps) {
  const course = block?.course;
  const hours = course ? courseHours(course.id, schedule) : 0;
  const others = course ? courseMeetings(course.id, schedule) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {block && course ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8">
            <p
              className={cn(
                "text-xs font-medium tracking-wide uppercase",
                block.campus === "South" ? "text-south" : "text-north",
              )}
            >
              {block.campus} campus
            </p>
            <DialogTitle className="mt-2 pr-8">{course.name}</DialogTitle>
            <DialogDescription className="mt-2">
              {course.code} · {course.credits} {course.credits === 1 ? "credit" : "credits"}
            </DialogDescription>

            <dl className="mt-8 flex flex-col gap-5">
              <Row icon={MapPin} label="Where">
                {block.room}
                <span className="text-ink-muted"> · {block.campus}</span>
              </Row>
              <Row icon={Clock} label="When">
                {DAY_LABEL[block.day]} {block.start}–{block.end}
                <span className="block text-ink-muted">
                  {sectionsLabel(block.sectionStart, block.sectionEnd)}
                </span>
              </Row>
              <Row icon={Users} label="Teachers">
                {course.teachers.join(" · ")}
              </Row>
              <Row icon={GraduationCap} label="This term">
                {formatDuration(hours)} in class
              </Row>
            </dl>

            <section className="mt-8">
              <h3 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                Weeks it meets
              </h3>
              <WeekDots
                weeks={[...new Set(block.meetings.flatMap((m) => m.weeks))]}
                current={week}
              />
              <p className="mt-2 text-xs text-ink-muted">
                {block.meetings.map((m) => m.weeksLabel).join(" · ")}
                {block.flags.includes("biweekly") ? " · biweekly pattern" : ""}
                {block.flags.includes("once") ? " · single week" : ""}
              </p>
            </section>

            {others.length > 1 ? (
              <section className="mt-8">
                <h3 className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                  All meetings
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {others.map((m) => (
                    <li
                      key={m.id}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm shadow-[var(--shadow-border)]",
                        block.meetings.some((x) => x.id === m.id)
                          ? m.campus === "South"
                            ? "bg-south-fill"
                            : "bg-north-fill"
                          : "bg-paper",
                      )}
                    >
                      <div className="font-medium text-ink">
                        {DAY_LABEL[m.day]} {m.start}–{m.end}
                      </div>
                      <div className="text-xs text-ink-muted">
                        {m.campus} {m.room} · weeks {m.weeksLabel}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="mt-8 border-t border-line pt-5">
              <button
                type="button"
                onClick={() => onEdit(block)}
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:border-seal hover:text-seal"
              >
                <Pencil className="size-3.5" />
                Edit class
              </button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-ink-faint" />
      <div>
        <div className="text-xs tracking-wide text-ink-faint">{label}</div>
        <div className="mt-0.5 text-sm text-ink">{children}</div>
      </div>
    </div>
  );
}

function WeekDots({ weeks, current }: { weeks: number[]; current: number }) {
  const set = new Set(weeks);
  return (
    <div className="mt-3 grid gap-1" style={{ gridTemplateColumns: "repeat(17, minmax(0, 1fr))" }}>
      {Array.from({ length: TERM.weeks }, (_, i) => {
        const w = i + 1;
        const on = set.has(w);
        return (
          <span
            key={w}
            title={`Week ${w}`}
            className={cn(
              "h-6 rounded-xs",
              on ? "bg-ink" : "bg-line",
              w === current && on && "ring-2 ring-ink ring-offset-2 ring-offset-paper-elevated",
            )}
          />
        );
      })}
    </div>
  );
}
