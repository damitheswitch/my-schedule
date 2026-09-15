import { useRef, useState } from "react";
import {
  Sparkles,
  Loader2,
  RotateCcw,
  MessageCircleQuestion,
  Mic,
  MicOff,
  Paperclip,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PreviewCard } from "@/components/preview-card";
import { type Course, type Meeting, type ScheduleData } from "@/lib/schedule";
import { requestAi, type AiMode } from "@/lib/ai-client";
import { buildScheduleData } from "@/lib/schedule-ai";
import { IMPORT_ACCEPT, importFile, type ImportedFile } from "@/lib/file-import";
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
  { id: "replace", label: "Rebuild", hint: "Recreate the schedule from a description or file" },
  { id: "ask", label: "Ask", hint: "Answer a question about your schedule" },
];

const PLACEHOLDERS: Record<AiMode, string> = {
  merge: "e.g. Tomorrow's Machine Learning class is moved to room B-120, and next week's Computer Vision is cancelled.",
  replace: "e.g. Full schedule for this semester: Monday 08:30 Comprehensive Chinese in G-514, weeks 2-4 and 6-17… — or attach a file/screenshot.",
  ask: "e.g. What do I have next Monday? When is my Machine Learning exam week?",
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as
    | (new () => SpeechRecognitionLike)
    | null;
}

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
  const [attachment, setAttachment] = useState<ImportedFile | null>(null);
  const [listening, setListening] = useState(false);
  const [reading, setReading] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const SpeechRecognition = getSpeechRecognition();
  const canSubmit = Boolean(text.trim()) || attachment?.kind === "image";

  function toggleListening() {
    if (!SpeechRecognition) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0]?.transcript ?? "")
        .join(" ");
      setText((t) => (t ? `${t.trim()} ${transcript}` : transcript));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  }

  async function handleFile(file: File) {
    setError(null);
    setPreview(null);
    setAnswer(null);
    setReading(file.name);
    try {
      const imported = await importFile(file);
      if (imported.kind === "text") {
        setText((t) => (t.trim() ? `${t.trim()}\n\n${imported.text}` : imported.text));
        setAttachment(null);
      } else {
        setAttachment(imported);
        if (mode === "ask") setMode("replace");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't read that file. Try another.");
    } finally {
      setReading(null);
    }
  }

  function reset() {
    setPreview(null);
    setAnswer(null);
    setSummary("");
    setError(null);
    setConfirmReset(false);
    setAttachment(null);
  }

  async function handleSubmit() {
    if (!canSubmit) {
      setError(
        mode === "ask"
          ? "Ask a question about your schedule first."
          : "Paste the school's notice, describe your schedule, or attach a file first.",
      );
      return;
    }
    setBusy(true);
    setError(null);
    setPreview(null);
    setAnswer(null);
    try {
      const image = attachment?.kind === "image" ? attachment.dataUrl : undefined;
      const result = await requestAi(
        mode,
        text.trim(),
        { courses: schedule.courses, meetings: schedule.meetings },
        { image, term: schedule.term },
      );
      if (!result.ok) {
        setError(result.error);
      } else if (result.kind === "answer") {
        setAnswer(result.answer);
      } else {
        setPreview(
          buildScheduleData(result.schedule.courses, result.schedule.meetings, schedule.term),
        );
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
            Paste a notice to merge it, rebuild from a file or description, or
            ask a question — you review every change before it's saved.
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

            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={PLACEHOLDERS[mode]}
                rows={mode === "ask" ? 3 : 6}
                maxLength={19000}
                className="w-full resize-y rounded-md border border-line bg-paper px-3 py-2 pr-20 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
              />
              <div className="absolute top-2 right-2 flex items-center gap-0.5">
                {mode !== "ask" ? (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    title="Attach a timetable file or screenshot"
                    aria-label="Attach a timetable file or screenshot"
                    className="rounded-md p-1.5 text-ink-faint hover:text-ink"
                  >
                    <Paperclip className="size-4" />
                  </button>
                ) : null}
                {SpeechRecognition ? (
                  <button
                    type="button"
                    onClick={toggleListening}
                    title={listening ? "Stop dictating" : "Dictate"}
                    aria-label={listening ? "Stop dictating" : "Dictate"}
                    className={
                      listening
                        ? "rounded-md bg-seal-tint p-1.5 text-seal-dark"
                        : "rounded-md p-1.5 text-ink-faint hover:text-ink"
                    }
                  >
                    {listening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  </button>
                ) : null}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept={IMPORT_ACCEPT}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleFile(file);
                  e.target.value = "";
                }}
              />
            </div>

            {reading ? (
              <p className="flex items-center gap-2 text-xs text-ink-muted">
                <Loader2 className="size-3.5 animate-spin" />
                Reading {reading}…
              </p>
            ) : null}

            {attachment?.kind === "image" ? (
              <div className="flex items-center gap-3 rounded-md border border-line bg-paper-elevated p-3 shadow-[var(--shadow-border)]">
                <img
                  src={attachment.dataUrl}
                  alt={attachment.name}
                  className="h-14 w-14 rounded-sm border border-line object-cover"
                />
                <p className="min-w-0 flex-1 truncate text-sm text-ink">{attachment.name}</p>
                <button
                  type="button"
                  aria-label="Remove attachment"
                  onClick={() => setAttachment(null)}
                  className="rounded-md p-1.5 text-ink-faint hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : null}

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
                    disabled={busy || !canSubmit}
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
