import { useEffect, useState } from "react";
import { Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { APK_FILENAME, APK_PATH, APP_VERSION, WHATS_NEW } from "@/lib/app-version";

const SEEN_KEY = "my-schedule-seen-version";

/**
 * "What's new" + Android-app dialog. Announces itself once per app version
 * (tracked in localStorage) — the standard post-update notice — and doubles as
 * the "Get the app" entry point from the header. On the APK itself the download
 * section is replaced with a you're-on-the-app note.
 */
export function AppInfo({ isApk }: { isApk: boolean }) {
  const [open, setOpen] = useState(false);

  // Announce once per version, shortly after mount so the schedule paints first.
  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = window.localStorage.getItem(SEEN_KEY);
    } catch {
      return;
    }
    if (seen === APP_VERSION) return;
    const t = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      try {
        window.localStorage.setItem(SEEN_KEY, APP_VERSION);
      } catch {
        /* storage unavailable */
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="App info and Android download"
          title="App info & Android download"
        >
          <Smartphone className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="px-6 pt-6 pb-8">
          <p className="text-xs font-medium tracking-[0.18em] text-ink-muted uppercase">
            North &amp; South · v{APP_VERSION}
          </p>
          <DialogTitle className="mt-2 font-serif text-2xl">
            What&apos;s new
          </DialogTitle>
          <DialogDescription className="mt-1.5">
            A few things landed since you last looked.
          </DialogDescription>

          <ul className="mt-5 flex flex-col gap-4">
            {WHATS_NEW.map((item) => (
              <li key={item.title} className="flex flex-col gap-1">
                <span className="text-sm font-medium text-ink">{item.title}</span>
                <span className="text-sm text-ink-muted">{item.detail}</span>
              </li>
            ))}
          </ul>

          {isApk ? (
            <p className="mt-6 rounded-md bg-paper px-3 py-2 text-xs text-ink-faint shadow-[var(--shadow-border)]">
              You&apos;re running the Android app — updates ship as new APKs on the
              website.
            </p>
          ) : (
            <div className="mt-6 rounded-md border border-line bg-paper p-4 shadow-[var(--shadow-border)]">
              <p className="text-sm font-medium text-ink">Get the Android app</p>
              <p className="mt-1 text-xs text-ink-muted">
                Sideloads on Android 8.0+ — tap download, open the file, allow
                install from your browser. Debug-signed.
              </p>
              <Button asChild className="mt-3 w-full">
                <a href={APK_PATH} download={APK_FILENAME}>
                  <Download className="size-4" />
                  Download APK (v{APP_VERSION})
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
