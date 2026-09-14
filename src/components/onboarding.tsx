import { useRef, useState } from "react";
import { Sparkles, Loader2, Mic, MicOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { PreviewCard } from "@/components/preview-card";
import { requestAi } from "@/lib/ai-client";
import { buildScheduleData } from "@/lib/schedule-ai";
import { TERM, type Course, type Meeting, type ScheduleData } from "@/lib/schedule";

/**
 * First-run welcome screen. A new visitor has no schedule — instead of a blank
 * grid they describe their classes in plain words (or paste the school's
 * notice), the AI drafts the schedule, and they confirm before anything is
 * saved. "Start empty" skips straight to the app.
 */

type OnboardingProps = {
  /** Persist the finished schedule and enter the app. */
  onDone: (courses: Course[], meetings: Meeting[]) => Promise<void>;
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
  "Machine Learning Mon 08:30–10:05 G-514 South weeks 2–17, Computer Vision Tue 14:00–15:35 A-203 North, Algorithms Thu 10:25–12:00 …";

export function Onboarding({ onDone }: OnboardingProps) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [preview, setPreview] = useState<ScheduleData | null>(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

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

  async function handleCreate() {
    if (!text.trim()) {
      setError("Describe your schedule first — or paste the school's notice.");
      return;
    }
    setBusy(true);
    setError(null);
    setPreview(null);
    try {
      const result = await requestAi("replace", text.trim(), { courses: [], meetings: [] });
      if (!result.ok) {
        setError(result.error);
      } else if (result.kind === "schedule") {
        setPreview(buildScheduleData(result.schedule.courses, result.schedule.meetings));
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
      await onDone(courses, meetings);
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
            <p className="mt-1.5 text-xs text-ink-faint">
              课表 · {TERM.label}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-paper-elevated p-5 shadow-[var(--shadow-border)]">
          <label
            htmlFor="onboarding-text"
            className="text-xs font-medium tracking-wide text-ink-muted uppercase"
          >
            Your schedule, in your own words
          </label>
          <div className="relative mt-2">
            <textarea
              id="onboarding-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={EXAMPLE}
              rows={5}
              maxLength={4000}
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
                    ? "absolute top-2 right-2 rounded-md p-1.5 text-seal-dark bg-seal-tint"
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
                <Button onClick={() => void finish(preview.courses, preview.meetings)} disabled={busy}>
                  {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                  Use this schedule
                </Button>
              </div>
            ) : (
              <Button onClick={() => void handleCreate()} disabled={busy || !text.trim()}>
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
