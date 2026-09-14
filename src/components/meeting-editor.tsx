import { useEffect, useMemo, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DAYS,
  DAY_LABEL,
  TERM,
  compressWeeks,
  expandWeeks,
  sectionsForTime,
  toMinutes,
  type Block,
  type Campus,
  type Course,
  type DayKey,
  type Meeting,
  type ScheduleData,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";

/**
 * Manual class editor — the non-AI way to update a schedule. Two modes:
 * `block` set → edit that class (or delete it); `block` null → add a new
 * class. Produces a full (courses, meetings) pair and hands it to onApply,
 * which persists exactly like an AI-applied change.
 */

export type MeetingEditorTarget =
  | { mode: "edit"; block: Block }
  | { mode: "new"; day?: DayKey };

type MeetingEditorProps = {
  target: MeetingEditorTarget | null;
  schedule: ScheduleData;
  onApply: (courses: Course[], meetings: Meeting[]) => Promise<void>;
  onClose: () => void;
};

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const NEW_COURSE = "__new__";

export function MeetingEditor({ target, schedule, onApply, onClose }: MeetingEditorProps) {
  const open = target !== null;
  const editing = target?.mode === "edit" ? target.block : null;

  const [courseKey, setCourseKey] = useState<string>(NEW_COURSE);
  const [newCourseName, setNewCourseName] = useState("");
  const [day, setDay] = useState<DayKey>("Mon");
  const [start, setStart] = useState("08:30");
  const [end, setEnd] = useState("10:05");
  const [room, setRoom] = useState("");
  const [campus, setCampus] = useState<Campus>("South");
  const [weeksSpec, setWeeksSpec] = useState(`1-${TERM.weeks}`);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // (Re)seed the form every time the dialog opens on a different target.
  useEffect(() => {
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
      setCampus("South");
      setWeeksSpec(`1-${TERM.weeks}`);
    }
  }, [target, schedule]);

  const isNewCourse = !editing && courseKey === NEW_COURSE;

  const weeks = useMemo(() => {
    const parsed = expandWeeks(weeksSpec.replaceAll("–", "-").replaceAll("—", "-"));
    return [...new Set(parsed.filter((w) => Number.isInteger(w) && w >= 1 && w <= TERM.weeks))].sort(
      (a, b) => a - b,
    );
  }, [weeksSpec]);

  function validate(): string | null {
    if (isNewCourse && !newCourseName.trim()) return "Name the new course.";
    if (!TIME_RE.test(start) || !TIME_RE.test(end)) return "Times use 24h HH:MM — e.g. 08:30.";
    if (toMinutes(end) <= toMinutes(start)) return "End time must be after start time.";
    if (weeks.length === 0) return `Weeks: use numbers or ranges within 1–${TERM.weeks}, e.g. "1-16" or "2,4,6".`;
    return null;
  }

  function buildNext(): { courses: Course[]; meetings: Meeting[] } | null {
    const err = validate();
    if (err) {
      setError(err);
      return null;
    }
    const sections = sectionsForTime(start, end);
    const meetings = schedule.meetings.filter(
      (m) => !editing || !editing.meetings.some((bm) => bm.id === m.id),
    );
    const courses = [...schedule.courses];

    let courseId: string;
    if (editing) {
      courseId = editing.course.id;
    } else if (isNewCourse) {
      const name = newCourseName.trim();
      courseId = `manual-${Date.now().toString(36)}`;
      courses.push({ id: courseId, name, short: name, code: "", credits: 0, teachers: [] });
    } else {
      courseId = courseKey;
    }

    meetings.push({
      id: `manual-${Date.now().toString(36)}`,
      courseId,
      campus,
      day,
      sectionStart: sections.sectionStart,
      sectionEnd: sections.sectionEnd,
      start,
      end,
      weeks,
      weeksLabel: compressWeeks(weeks),
      room: room.trim() || "—",
    });

    // Drop courses left with no meetings at all (e.g. after a delete/move).
    const used = new Set(meetings.map((m) => m.courseId));
    return { courses: courses.filter((c) => used.has(c.id)), meetings };
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
      await onApply(
        schedule.courses.filter((c) => used.has(c.id)),
        meetings,
      );
      onClose();
    } catch {
      setError("Could not delete. Try again.");
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? onClose() : undefined)}>
      <DialogContent>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8">
          <DialogTitle>{editing ? "Edit class" : "Add a class"}</DialogTitle>
          <DialogDescription className="mt-1.5">
            {editing
              ? `${editing.course.name} — changes apply to every week it meets.`
              : "One class at a time — the assistant can always fill in the rest."}
          </DialogDescription>

          <div className="mt-6 flex flex-col gap-4">
            {editing ? (
              <Field label="Course">
                <p className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink">
                  {editing.course.name}
                </p>
              </Field>
            ) : (
              <Field label="Course">
                <select
                  value={courseKey}
                  onChange={(e) => setCourseKey(e.target.value)}
                  className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
                >
                  {schedule.courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option value={NEW_COURSE}>New course…</option>
                </select>
                {isNewCourse ? (
                  <input
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Course name"
                    maxLength={80}
                    className="mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
                  />
                ) : null}
              </Field>
            )}

            <Field label="Day">
              <div className="flex gap-1">
                {DAYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDay(d)}
                    className={cn(
                      "flex-1 rounded-sm py-2 text-sm font-medium transition-colors",
                      day === d ? "bg-ink text-paper" : "text-ink-muted hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Starts">
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
                />
              </Field>
              <Field label="Ends">
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Room">
                <input
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="B-120"
                  maxLength={40}
                  className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
                />
              </Field>
              <Field label="Campus">
                <div className="flex gap-1">
                  {(["South", "North"] as Campus[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCampus(c)}
                      className={cn(
                        "flex-1 rounded-sm py-2 text-sm font-medium transition-colors",
                        campus === c
                          ? c === "South"
                            ? "bg-south-fill text-south-fg ring-1 ring-south/40"
                            : "bg-north-fill text-north-fg ring-1 ring-north/40"
                          : "text-ink-muted hover:bg-ink/5 hover:text-ink",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            <Field label={`Weeks it meets (1–${TERM.weeks})`}>
              <input
                value={weeksSpec}
                onChange={(e) => setWeeksSpec(e.target.value)}
                placeholder={`1-${TERM.weeks} or 2,4,6-10`}
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
              />
              <p className="mt-1 text-xs text-ink-faint">
                {weeks.length > 0
                  ? `${DAY_LABEL[day]}s · ${weeks.length} ${weeks.length === 1 ? "week" : "weeks"}`
                  : "Separate ranges with commas."}
              </p>
            </Field>

            {error ? (
              <p className="rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark">{error}</p>
            ) : null}

            <div className="mt-1 flex items-center justify-between gap-3">
              {editing ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => (confirmDelete ? void handleDelete() : setConfirmDelete(true))}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium underline-offset-2 disabled:opacity-50",
                    confirmDelete ? "text-seal hover:underline" : "text-ink-muted hover:text-seal",
                  )}
                >
                  <Trash2 className="size-3.5" />
                  {confirmDelete ? "Tap again to delete" : "Delete class"}
                </button>
              ) : (
                <span />
              )}
              <Button onClick={() => void handleSave()} disabled={busy}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                {editing ? "Save changes" : "Add class"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium tracking-wide text-ink-muted uppercase">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
