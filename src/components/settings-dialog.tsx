import { useEffect, useState } from "react";
import { Bell, CalendarDays, Loader2, Settings } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isApkRuntime } from "@/lib/ai-client";
import {
  MAX_TERM_WEEKS,
  mondayOf,
  normalizeTerm,
  type ScheduleData,
  type TermConfig,
} from "@/lib/schedule";
import {
  LEAD_OPTIONS,
  ensureNotificationPermission,
  notificationsSupported,
  readReminderPrefs,
  writeReminderPrefs,
} from "@/lib/notify";
import { cn } from "@/lib/utils";

type SettingsDialogProps = {
  schedule: ScheduleData;
  onApplyTerm: (term: TermConfig) => Promise<void>;
  onRemindersChanged?: () => void;
};

/**
 * App settings: the term calendar (name, week-1 Monday, week count) and class
 * reminders. Term changes re-anchor every week number without touching the
 * meetings themselves.
 */
export function SettingsDialog({ schedule, onApplyTerm, onRemindersChanged }: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(schedule.term.label);
  const [start, setStart] = useState(schedule.term.startMonday);
  const [weeks, setWeeks] = useState(String(schedule.term.weeks));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [remOn, setRemOn] = useState(() => readReminderPrefs().enabled);
  const [lead, setLead] = useState(() => readReminderPrefs().leadMin);

  useEffect(() => {
    if (open) {
      setLabel(schedule.term.label);
      setStart(schedule.term.startMonday);
      setWeeks(String(schedule.term.weeks));
      setError(null);
      const prefs = readReminderPrefs();
      setRemOn(prefs.enabled);
      setLead(prefs.leadMin);
    }
  }, [open, schedule.term]);

  async function handleSave() {
    const weeksNum = Number(weeks);
    if (!Number.isInteger(weeksNum) || weeksNum < 1 || weeksNum > MAX_TERM_WEEKS) {
      setError(`Weeks must be a number between 1 and ${MAX_TERM_WEEKS}.`);
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) {
      setError("Pick the date week 1 begins.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onApplyTerm(normalizeTerm({ label, startMonday: start, weeks: weeksNum }));
      setOpen(false);
      toast("Term updated");
    } catch {
      setError("Could not save. Try again.");
      setBusy(false);
    }
  }

  async function toggleReminders(next: boolean) {
    if (next && !isApkRuntime() && notificationsSupported()) {
      const granted = await ensureNotificationPermission();
      if (!granted) {
        toast("Notifications are blocked — allow them in your browser settings.");
        return;
      }
    }
    setRemOn(next);
    writeReminderPrefs({ enabled: next, leadMin: lead });
    onRemindersChanged?.();
  }

  function changeLead(next: number) {
    setLead(next);
    writeReminderPrefs({ enabled: remOn, leadMin: next });
    onRemindersChanged?.();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Settings" title="Settings">
          <Settings className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="px-6 pt-6 pb-8">
          <DialogTitle className="font-serif text-2xl">Settings</DialogTitle>
          <DialogDescription className="mt-1.5">
            Your term calendar and class reminders.
          </DialogDescription>

          <div className="mt-6 flex flex-col gap-6">
            <section className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 text-xs font-medium tracking-wide text-ink-muted uppercase">
                <CalendarDays className="size-3.5" />
                Term
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-ink-faint">Name</span>
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Autumn 2026"
                    maxLength={60}
                    className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-seal/40"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-ink-faint">Weeks</span>
                  <input
                    value={weeks}
                    onChange={(e) => setWeeks(e.target.value)}
                    inputMode="numeric"
                    maxLength={2}
                    className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs text-ink-faint">Week 1 starts (any day — snapped to Monday)</span>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm tabular-nums text-ink outline-none focus-visible:ring-2 focus-visible:ring-seal/40"
                />
              </label>
              {start && /^\d{4}-\d{2}-\d{2}$/.test(start) ? (
                <p className="text-xs text-ink-faint">
                  Week 1 Monday: {mondayOf(new Date(`${start}T12:00:00`))}
                </p>
              ) : null}
            </section>

            <section className="flex flex-col gap-3 border-t border-line pt-5">
              <h3 className="flex items-center gap-2 text-xs font-medium tracking-wide text-ink-muted uppercase">
                <Bell className="size-3.5" />
                Class reminders
              </h3>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-ink">
                  Remind me before class
                  <span className="mt-0.5 block text-xs text-ink-faint">
                    {isApkRuntime()
                      ? "Scheduled on your phone — works even with the app closed."
                      : "Fires while the app is open. The Android app reminds even when closed."}
                  </span>
                </p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={remOn}
                  onClick={() => void toggleReminders(!remOn)}
                  className={cn(
                    "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                    remOn ? "bg-ink" : "bg-line",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 size-5 rounded-full bg-paper shadow transition-transform",
                      remOn ? "translate-x-[22px]" : "translate-x-0.5",
                    )}
                  />
                </button>
              </div>
              {remOn ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-faint">Remind</span>
                  <div className="flex gap-1">
                    {LEAD_OPTIONS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => changeLead(m)}
                        className={cn(
                          "rounded-sm px-2.5 py-1.5 text-xs font-medium transition-colors",
                          lead === m ? "bg-ink text-paper" : "text-ink-muted hover:bg-ink/5",
                        )}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-ink-faint">before</span>
                </div>
              ) : null}
            </section>

            {error ? (
              <p className="rounded-md bg-seal-tint px-3 py-2 text-sm text-seal-dark">{error}</p>
            ) : null}

            <div className="flex justify-end">
              <Button onClick={() => void handleSave()} disabled={busy}>
                {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                Save term
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
