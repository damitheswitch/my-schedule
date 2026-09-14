import { DAY_LABEL, type ScheduleData } from "@/lib/schedule";

/** Read-only summary of an AI-drafted schedule, shown before it's applied. */
export function PreviewCard({
  schedule,
  summary,
}: {
  schedule: ScheduleData;
  summary: string;
}) {
  const byDay = new Map<string, typeof schedule.meetings>();
  for (const m of schedule.meetings) {
    const list = byDay.get(m.day) ?? [];
    list.push(m);
    byDay.set(m.day, list);
  }
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

  return (
    <div className="rounded-md border border-line bg-paper-elevated p-4 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium text-ink">{summary}</p>
      <p className="mt-1 text-xs text-ink-muted">
        {schedule.courses.length} courses · {schedule.meetings.length} meetings
      </p>
      <div className="mt-3 max-h-64 overflow-y-auto pr-1">
        <ul className="flex flex-col gap-2">
          {days.map((d) => {
            const list = (byDay.get(d) ?? []).slice().sort((a, b) =>
              a.start.localeCompare(b.start),
            );
            if (list.length === 0) return null;
            return (
              <li key={d} className="flex flex-col gap-1">
                <span className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                  {DAY_LABEL[d]}
                </span>
                <ul className="flex flex-col gap-1 pl-3">
                  {list.map((m) => {
                    const course = schedule.courseById[m.courseId];
                    return (
                      <li
                        key={m.id}
                        className="flex items-baseline gap-2 text-xs text-ink"
                      >
                        <span className="tabular-nums text-ink-muted">
                          {m.start}–{m.end}
                        </span>
                        <span className="font-medium">
                          {course?.short ?? m.courseId}
                        </span>
                        <span className="text-ink-faint">
                          {m.campus} {m.room} · wks {m.weeksLabel}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
