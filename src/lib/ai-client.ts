import { PUBLIC_SITE_URL } from "@/lib/app-version";
import type { Course, Meeting } from "@/lib/schedule";

/**
 * Client for the public `/api/ai` endpoint. Every surface — hosted site,
 * signed-out browser, and the Android WebView — goes through here, so the
 * owner key stays server-side and nobody ever pastes an API key.
 *
 * The APK is bundled and served from `appassets.androidplatform.net`, so it
 * has no same-origin backend: it calls the deployed site directly (allowed by
 * the endpoint's CORS allowlist).
 */

export function isApkRuntime(): boolean {
  return typeof window !== "undefined" && window.location.host.includes("appassets");
}

function aiEndpoint(): string {
  return isApkRuntime() ? `${PUBLIC_SITE_URL}/api/ai` : "/api/ai";
}

export type AiMode = "merge" | "replace" | "ask";

export type AiResult =
  | { ok: true; kind: "schedule"; schedule: { courses: Course[]; meetings: Meeting[] }; summary: string }
  | { ok: true; kind: "answer"; answer: string }
  | { ok: false; error: string };

export async function requestAi(
  mode: AiMode,
  text: string,
  current: { courses: Course[]; meetings: Meeting[] },
): Promise<AiResult> {
  let res: Response;
  try {
    res = await fetch(aiEndpoint(), {
      method: "POST",
      // text/plain keeps this a CORS "simple request": the WebView then skips
      // the OPTIONS preflight (answered by the platform's default CORS handler
      // without an allow-origin) and the POST's own allow-origin is enough.
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        mode,
        text,
        schedule: { courses: current.courses, meetings: current.meetings },
      }),
    });
  } catch {
    return { ok: false, error: "Couldn't reach the assistant — check your connection." };
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await res.json()) as Record<string, unknown>;
  } catch {
    // Non-JSON response (proxy error, etc.) — fall through to status handling.
  }

  if (!res.ok || body.ok === false) {
    const error = typeof body.error === "string" ? body.error : `Something went wrong (${res.status}).`;
    return { ok: false, error };
  }

  if (mode === "ask") {
    return typeof body.answer === "string"
      ? { ok: true, kind: "answer", answer: body.answer }
      : { ok: false, error: "The assistant returned something unreadable. Try again." };
  }

  const schedule = body.schedule as { courses: Course[]; meetings: Meeting[] } | undefined;
  if (!schedule) {
    return { ok: false, error: "The assistant returned something unreadable. Try again." };
  }
  return {
    ok: true,
    kind: "schedule",
    schedule,
    summary: typeof body.summary === "string" ? body.summary : "Schedule ready.",
  };
}
