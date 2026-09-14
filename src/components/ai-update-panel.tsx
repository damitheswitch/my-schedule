import { useState } from "react";
import { Sparkles, Loader2, RotateCcw, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DAY_LABEL, type Course, type Meeting, type ScheduleData } from "@/lib/schedule";
import { requestAi, type AiMode } from "@/lib/ai-client";
import { cn } from "@/lib/utils";

type AiUpdatePanelProps = {
  /** The schedule the user is currently looking at — the AI edits start here. */
  schedule: ScheduleData;
  /** Persist the chosen schedule (localStorage + cloud when signed in). */
  onApply: (courses: Course[], meetings: Meeting[]) => Promise<void>;
  /** Clear the schedule everywhere and re-run onboarding. */
  onReset: () => Promise<void>;
};

const MODES: { id: AiMode; label: string; hint: string }[] = [
  { id: "merge", label: "Merge", hint: "Apply a notice to your current schedule" },
  { id: "replace", label: "Rebuild", hint: "Recreate the schedule from a description" },
  { id: "ask", label: "Ask", hint: "Answer a question about your schedule" },
];

const PLACEHOLDERS: Record<AiMode, string> = {
  merge: "e.g. Tomorrow's Machine Learning class is moved to room B-120, and next week's Computer Vision is cancelled.",
  replace: "e.g. Full schedule for this semester: Monday 08:30 Comprehensive Chinese in G-514, weeks 2-4 and 6-17…",
  ask: "e.g. What do I have next Monday? When is my Machine Learning exam week?",
};

export function AiUpdatePanel({ schedule, onApply, onReset }: AiUpdatePanelProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<AiMode>("merge");
  const [busy, setBusy] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [preview, setPreview] = useState<ScheduleData | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setPreview(null);
    setAnswer(null);
    setSummary("");
    setError(null);
    setConfirmReset(false);
  }

  async function handleSubmit() {
    if (!text.trim()) {
      setError(
        mode === "ask"
          ? "Ask a question about your schedule first."
          : "Paste the school's notice or describe your schedule first.",
      );
      return;
    }
    setBusy(true);
    setError(null);
    setPreview(null);
    setAnswer(null);
    try {
      const result = await requestAi(mode, text.trim(), {
        courses: schedule.courses,
        meetings: schedule.meetings,
      });
      if (!result.ok) {
        setError(result.error);
      } else if (result.kind === "answer") {
        setAnswer(result.answer);
      } else {
        setPreview(buildPreview(result.schedule));
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

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="size-4" />
          <span className="hidden sm:inline">Assistant</span>
          <span className="sr-only sm:hidden">Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="px-6 pt-6 pb-8">
          <DialogTitle className="font-serif text-2xl font-bold">Assistant</DialogTitle>
          <DialogDescription className="mt-2">
            Paste a notice to merge it, rebuild from a description, or ask a
            question — you review every change before it's saved.
          </DialogDescription>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-center gap-1 rounded-md bg-paper-elevated p-1 shadow-[var(--shadow-border)]">
              {MODES.map((m) => (
                <ModeButton
                  key={m.id}
                  active={mode === m.id}
                  onClick={() => {
                    setMode(m.id);
                    reset();
                  }}
                  label={m.label}
                  hint={m.hint}
                />
              ))}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={PLACEHOLDERS[mode]}
              rows={mode === "ask" ? 3 : 6}
              maxLength={4000}
              className="w-full resize-y rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
            />

            {error ? (
              <p className="rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark">
                {error}
              </p>
            ) : null}

            {answer ? (
              <div className="rounded-md border border-line bg-paper-elevated p-4 shadow-[var(--shadow-border)]">
                <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-ink-muted uppercase">
                  <MessageCircleQuestion className="size-3.5" />
                  Answer
                </p>
                <p className="mt-2 text-sm text-ink">{answer}</p>
              </div>
            ) : null}

            {preview ? (
              <PreviewCard schedule={preview} summary={summary} />
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={resetting}
                onClick={() =>
                  confirmReset ? void handleResetClick() : setConfirmReset(true)
                }
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium underline-offset-2 disabled:opacity-50",
                  confirmReset ? "text-seal hover:underline" : "text-ink-muted hover:underline",
                )}
              >
                {resetting ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="size-3.5" />
                )}
                {confirmReset ? "Erase everything?" : "Start over"}
              </button>

              <div className="flex items-center gap-2">
                {preview ? (
                  <>
                    <Button variant="ghost" onClick={reset} disabled={busy}>
                      Discard
                    </Button>
                    <Button onClick={() => void handleApply()} disabled={busy}>
                      {busy ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : null}
                      Apply changes
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => void handleSubmit()}
                    disabled={busy || !text.trim()}
                  >
                    {busy ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    {mode === "ask" ? "Ask" : "Preview changes"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ModeButton({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={hint}
      className={cn(
        "flex-1 cursor-pointer rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150",
        active ? "bg-seal text-white shadow-[var(--shadow-seal)]" : "text-ink-muted hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}

/** Rebuild ScheduleData (with courseById) from the API's plain arrays. */
function buildPreview(raw: { courses: Course[]; meetings: Meeting[] }): ScheduleData {
  const courseById: Record<string, Course> = {};
  for (const c of raw.courses) courseById[c.id] = c;
  return { courses: raw.courses, meetings: raw.meetings, courseById };
}

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
