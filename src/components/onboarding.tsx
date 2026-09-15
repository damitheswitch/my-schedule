import { useRef, useState } from "react";
import {
  Sparkles,
  Loader2,
  Mic,
  MicOff,
  ArrowRight,
  Paperclip,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { PreviewCard } from "@/components/preview-card";
import { requestAi } from "@/lib/ai-client";
import { buildScheduleData } from "@/lib/schedule-ai";
import { IMPORT_ACCEPT, importFile, type ImportedFile } from "@/lib/file-import";
import {
  MAX_TERM_WEEKS,
  defaultTerm,
  normalizeTerm,
  type Course,
  type Meeting,
  type ScheduleData,
  type TermConfig,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";

/**
 * First-run welcome screen. A new visitor has no schedule — they drop in a
 * file (timetable export, PDF, Word doc, spreadsheet, or a screenshot of one),
 * paste text, or dictate; the AI drafts the schedule and they confirm before
 * anything is saved. "Start empty" skips straight to the app.
 */

type OnboardingProps = {
  /** Persist the finished schedule + term and enter the app. */
  onDone: (courses: Course[], meetings: Meeting[], term: TermConfig) => Promise<void>;
};

type SpeechRecognitionResult = { transcript: string };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<SpeechRecognitionResult>> }) => void) | null;
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

const EXAMPLE =
  "Machine Learning Mon 08:30–10:05 G-514 weeks 2–17, Computer Vision Tue 14:00–15:35 A-203, Algorithms Thu 10:25–12:00 …";

export function Onboarding({ onDone }: OnboardingProps) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [reading, setReading] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [preview, setPreview] = useState<ScheduleData | null>(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<ImportedFile | null>(null);
  const [termDraft, setTermDraft] = useState<TermConfig>(() => defaultTerm());
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const SpeechRecognition = getSpeechRecognition();

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
    setReading(file.name);
    try {
      const imported = await importFile(file);
      if (imported.kind === "text") {
        setText(imported.text);
        setAttachment(null);
      } else {
        setAttachment(imported);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't read that file. Try another.");
    } finally {
      setReading(null);
    }
  }

  const canBuild = Boolean(text.trim()) || attachment?.kind === "image";

  async function handleCreate() {
    if (!canBuild) {
      setError("Describe your schedule, paste the school's notice, or attach a file first.");
      return;
    }
    setBusy(true);
    setError(null);
    setPreview(null);
    try {
      const term = normalizeTerm(termDraft);
      const image = attachment?.kind === "image" ? attachment.dataUrl : undefined;
      const result = await requestAi("replace", text.trim(), { courses: [], meetings: [] }, { image, term });
      if (!result.ok) {
        setError(result.error);
      } else if (result.kind === "schedule") {
        setPreview(buildScheduleData(result.schedule.courses, result.schedule.meetings, term));
        setSummary(result.summary);
      } else {
        setError("The assistant returned something unexpected. Try again.");
      }
    } catch {
      setError("Something went wrong talking to the assistant. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function finish(courses: Course[], meetings: Meeting[]) {
    setBusy(true);
    setError(null);
    try {
      await onDone(courses, meetings, normalizeTerm(termDraft));
    } catch {
      setError("Could not save the schedule. Try again.");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4 py-10 text-ink">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-3">
          <Logo size={44} />
          <div>
            <h1 className="font-serif text-2xl leading-none font-black tracking-tight">
              Kebiao
            </h1>
            <p className="mt-1.5 text-xs text-ink-faint">课表 · your term, one file away</p>
          </div>
        </div>

        <div
          className={cn(
            "mt-6 rounded-xl bg-paper-elevated p-5 shadow-[var(--shadow-border)] transition-shadow",
            dragging && "ring-2 ring-seal/50",
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) void handleFile(file);
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="onboarding-text"
              className="text-xs font-medium tracking-wide text-ink-muted uppercase"
            >
              Your schedule, your way
            </label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-ink shadow-[var(--shadow-border)] transition-colors hover:border-seal hover:text-seal"
            >
              <Paperclip className="size-3.5" />
              Upload file
            </button>
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
          <p className="mt-1.5 text-xs text-ink-faint">
            Drop a timetable file or a screenshot — PDF, Word, Excel, CSV, text or image —
            or just type it below.
          </p>

          {attachment?.kind === "image" ? (
            <div className="mt-3 flex items-center gap-3 rounded-md border border-line bg-paper p-3">
              <img
                src={attachment.dataUrl}
                alt={attachment.name}
                className="h-16 w-16 rounded-sm border border-line object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                  <FileText className="size-3.5" />
                  <span className="truncate">{attachment.name}</span>
                </p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  The assistant will read the timetable from this image.
                </p>
              </div>
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

          {reading ? (
            <p className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
              <Loader2 className="size-3.5 animate-spin" />
              Reading {reading}…
            </p>
          ) : null}

          <div className="relative mt-3">
            <textarea
              id="onboarding-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={EXAMPLE}
              rows={5}
              maxLength={19000}
              autoFocus
              className="w-full resize-y rounded-md border border-line bg-paper px-3 py-2 pr-10 text-sm text-ink shadow-[var(--shadow-border)] outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
            />
            {SpeechRecognition ? (
              <button
                type="button"
                onClick={toggleListening}
                title={listening ? "Stop dictating" : "Dictate your schedule"}
                aria-label={listening ? "Stop dictating" : "Dictate your schedule"}
                className={
                  listening
                    ? "absolute top-2 right-2 rounded-md bg-seal-tint p-1.5 text-seal-dark"
                    : "absolute top-2 right-2 rounded-md p-1.5 text-ink-faint hover:text-ink"
                }
              >
                {listening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>
            ) : null}
          </div>
          {listening ? (
            <p className="mt-1.5 text-xs text-seal-dark">Listening… speak your schedule.</p>
          ) : null}

          {error ? (
            <p className="mt-3 rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark">
              {error}
            </p>
          ) : null}

          {preview ? (
            <div className="mt-4">
              <PreviewCard schedule={preview} summary={summary} />
              <div className="mt-3 grid grid-cols-3 gap-2 rounded-md border border-line bg-paper p-3">
                <label className="block">
                  <span className="text-xs text-ink-faint">Term name</span>
                  <input
                    value={termDraft.label}
                    onChange={(e) => setTermDraft((t) => ({ ...t, label: e.target.value }))}
                    placeholder="Autumn 2026"
                    maxLength={60}
                    className="mt-1 w-full rounded-md border border-line bg-paper px-2 py-1.5 text-xs text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-ink-faint">Week 1 starts</span>
                  <input
                    type="date"
                    value={termDraft.startMonday}
                    onChange={(e) => setTermDraft((t) => ({ ...t, startMonday: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-line bg-paper px-2 py-1.5 text-xs tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-ink-faint">Weeks</span>
                  <input
                    value={termDraft.weeks}
                    onChange={(e) =>
                      setTermDraft((t) => ({
                        ...t,
                        weeks: Math.min(MAX_TERM_WEEKS, Math.max(1, Number(e.target.value) || 1)),
                      }))
                    }
                    inputMode="numeric"
                    className="mt-1 w-full rounded-md border border-line bg-paper px-2 py-1.5 text-xs tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
                  />
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => void finish([], [])}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline disabled:opacity-50"
            >
              Start empty
              <ArrowRight className="size-3.5" />
            </button>
            {preview ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setPreview(null)} disabled={busy}>
                  Discard
                </Button>
                <Button
                  onClick={() => void finish(preview.courses, preview.meetings)}
                  disabled={busy}
                >
                  {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                  Use this schedule
                </Button>
              </div>
            ) : (
              <Button onClick={() => void handleCreate()} disabled={busy || !canBuild}>
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                Build it
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
