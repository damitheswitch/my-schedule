import { useState } from "react";
import { Sparkles, Loader2, RotateCcw, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DAY_LABEL, type Course, type Meeting, type ScheduleData } from "@/lib/schedule";
import {
  buildParseMessages,
  normalizeAiOutput,
  requestCompletion,
  type ParseMode,
} from "@/lib/schedule-ai";
import { parseScheduleUpdate, type ParseResult } from "@/lib/schedule-data";
import { cn } from "@/lib/utils";

type AiUpdatePanelProps = {
  /** The schedule the user is currently looking at — the AI edits start here. */
  schedule: ScheduleData;
  /** True when a signed-in session can reach the server functions. */
  canSync: boolean;
  /** Persist the chosen schedule (localStorage + cloud when signed in). */
  onApply: (courses: Course[], meetings: Meeting[]) => Promise<void>;
  /** Drop all saved data and restore the built-in schedule. */
  onReset: () => Promise<void>;
};

const API_KEY_STORAGE = "my-schedule-ai-key";
const NEEDS_KEY = "__needs_key__";

function readStoredKey(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(API_KEY_STORAGE) ?? "";
}

export function AiUpdatePanel({ schedule, canSync, onApply, onReset }: AiUpdatePanelProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<ParseMode>("merge");
  const [apiKey, setApiKey] = useState(readStoredKey);
  const [parsing, setParsing] = useState(false);
  const [applying, setApplying] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [preview, setPreview] = useState<ScheduleData | null>(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  // The key field is always relevant when there's no signed-in session; after a
  // failed server call it's revealed as the fallback on the hosted app too.
  const [needsKey, setNeedsKey] = useState(false);

  function reset() {
    setPreview(null);
    setSummary("");
    setError(null);
  }

  function persistKey(key: string) {
    setApiKey(key);
    if (typeof window !== "undefined") {
      if (key) window.localStorage.setItem(API_KEY_STORAGE, key);
      else window.localStorage.removeItem(API_KEY_STORAGE);
    }
  }

  async function runParse(): Promise<ParseResult> {
    const payload = {
      text,
      mode,
      courses: schedule.courses,
      meetings: schedule.meetings,
    };
    if (canSync) {
      try {
        const res = await parseScheduleUpdate({ data: payload });
        if (res.ok) return res;
      } catch {
        // No reachable server (APK) or the session expired — use the own-key path.
      }
    }
    const key = apiKey.trim();
    if (!key) return { ok: false, error: NEEDS_KEY };
    const { system, user } = buildParseMessages(text, mode, schedule);
    const completion = await requestCompletion(system, user, key);
    if (!completion.ok) return { ok: false, error: completion.error };
    const normalized = normalizeAiOutput(completion.text);
    if (!normalized) return { ok: false, error: "The AI response was not valid schedule JSON." };
    return { ok: true, schedule: normalized.schedule, summary: normalized.summary };
  }

  async function handlePreview() {
    if (!text.trim()) {
      setError("Paste the school's schedule notice first.");
      return;
    }
    setParsing(true);
    setError(null);
    setPreview(null);
    try {
      const result = await runParse();
      if (!result.ok) {
        if (result.error === NEEDS_KEY) {
          setNeedsKey(true);
          setError("Paste your xAI API key below — this device has no built-in AI.");
        } else {
          if (result.error === "AI is not available in this environment.") setNeedsKey(true);
          setError(result.error);
        }
      } else {
        setPreview(result.schedule);
        setSummary(result.summary);
      }
    } catch {
      setError("Something went wrong talking to the AI. Try again.");
    } finally {
      setParsing(false);
    }
  }

  async function handleApply() {
    if (!preview) return;
    setApplying(true);
    setError(null);
    try {
      await onApply(preview.courses, preview.meetings);
      setOpen(false);
      setText("");
      reset();
    } catch {
      setError("Could not save the schedule. Try again.");
    } finally {
      setApplying(false);
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

  const showKeyField = needsKey || !canSync;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Sparkles className="size-4" />
          AI update
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="px-6 pt-6 pb-8">
          <DialogTitle className="font-serif text-2xl">Update with AI</DialogTitle>
          <DialogDescription className="mt-2">
            Paste a schedule notice from your class group. The AI reads it and
            updates your schedule — review the preview before applying.
          </DialogDescription>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-center gap-1 rounded-md bg-paper-elevated p-1 shadow-[var(--shadow-border)]">
              <ModeButton
                active={mode === "merge"}
                onClick={() => setMode("merge")}
                label="Merge"
                hint="Apply the notice to your current schedule"
              />
              <ModeButton
                active={mode === "replace"}
                onClick={() => setMode("replace")}
                label="Replace"
                hint="Rebuild the schedule from the notice"
              />
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                mode === "merge"
                  ? "e.g. Tomorrow's Machine Learning class is moved to room B-120, and next week's Computer Vision is cancelled."
                  : "e.g. Full schedule for this semester: Monday 08:30 Comprehensive Chinese in G-514, weeks 2-4 and 6-17…"
              }
              rows={6}
              className="w-full resize-y rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-ink/30"
            />

            {showKeyField ? (
              <div>
                <label
                  htmlFor="ai-key"
                  className="flex items-center gap-1.5 text-xs font-medium text-ink-muted"
                >
                  <KeyRound className="size-3.5" />
                  Your xAI API key
                </label>
                <input
                  id="ai-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => persistKey(e.target.value)}
                  placeholder="xai-…"
                  autoComplete="off"
                  className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-ink/30"
                />
                <p className="mt-1.5 text-xs text-ink-faint">
                  Stored only on this device. Get one at console.x.ai — on the signed-in website the
                  built-in AI is used instead.
                </p>
              </div>
            ) : null}

            {error ? (
              <p className="rounded-md bg-south-fill px-3 py-2 text-sm text-south-fg">
                {error}
              </p>
            ) : null}

            {preview ? (
              <PreviewCard schedule={preview} summary={summary} />
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={resetting}
                onClick={() => void handleResetClick()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted underline-offset-2 hover:underline disabled:opacity-50"
              >
                {resetting ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="size-3.5" />
                )}
                Reset to default schedule
              </button>

              <div className="flex items-center gap-2">
                {preview ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      reset();
                    }}
                    disabled={applying}
                  >
                    Discard
                  </Button>
                ) : null}
                {preview ? (
                  <Button onClick={() => void handleApply()} disabled={applying}>
                    {applying ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    Apply changes
                  </Button>
                ) : (
                  <Button
                    onClick={() => void handlePreview()}
                    disabled={parsing || !text.trim()}
                  >
                    {parsing ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    Preview changes
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
        active ? "bg-ink text-paper shadow-[var(--shadow-border)]" : "text-ink-muted hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}

function PreviewCard({
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
