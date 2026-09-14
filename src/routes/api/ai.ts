import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  buildAskMessages,
  buildParseMessages,
  normalizeAiOutput,
  normalizeAskOutput,
  requestCompletion,
} from "@/lib/schedule-ai";
import type { Course, Meeting } from "@/lib/schedule";

/**
 * Public AI endpoint — POST /api/ai.
 *
 * This is the SaaS path: every client (hosted site, signed-out browsers, and
 * the Android APK) calls this route, and only this route holds the owner's
 * `XAI_API_KEY`. Because it is unauthenticated, defense lives here:
 *
 *   - strict input validation + size caps (below)
 *   - per-IP and global rate limits (`ai-rate-limit.ts`)
 *   - scoped prompts + structured output (`schedule-ai.ts`)
 *   - CORS allowlist: only same-origin and the APK WebView origin may call it
 *     from a browser context (non-browser callers are still rate-limited)
 *   - generic client-facing errors; the key never appears in responses
 */

const ALLOWED_ORIGINS = new Set(["https://appassets.androidplatform.net"]);

const MAX_TEXT = 4000;
const MAX_BODY = 64_000;
const MAX_COURSES = 40;
const MAX_MEETINGS = 150;

const requestSchema = z.object({
  mode: z.enum(["merge", "replace", "ask"]),
  text: z.string().min(1).max(MAX_TEXT),
  schedule: z
    .object({
      courses: z.array(z.record(z.string(), z.unknown())).max(MAX_COURSES).optional(),
      meetings: z.array(z.record(z.string(), z.unknown())).max(MAX_MEETINGS).optional(),
    })
    .optional(),
});

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
  }
  return {};
}

function json(
  request: Request,
  status: number,
  body: Record<string, unknown>,
  extra: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(request),
      ...extra,
    },
  });
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      OPTIONS: ({ request }) =>
        new Response(null, { status: 204, headers: corsHeaders(request) }),

      POST: async ({ request }) => {
        // The body is JSON either way. `text/plain` is accepted because the
        // APK sends it deliberately: a text/plain POST is a CORS "simple
        // request", so the WebView skips the OPTIONS preflight that the
        // platform's default CORS handler answers without an allow-origin.
        const contentType = request.headers.get("content-type") ?? "";
        const isJson = contentType.includes("application/json");
        const isPlain = contentType.includes("text/plain");
        if (!isJson && !isPlain) {
          return json(request, 415, { ok: false, error: "Expected a JSON request." });
        }

        let raw: string;
        try {
          raw = await request.text();
        } catch {
          return json(request, 400, { ok: false, error: "Could not read the request." });
        }
        if (raw.length > MAX_BODY) {
          return json(request, 413, { ok: false, error: "Request too large." });
        }

        let parsedBody: unknown;
        try {
          parsedBody = JSON.parse(raw);
        } catch {
          return json(request, 400, { ok: false, error: "Malformed JSON." });
        }
        const input = requestSchema.safeParse(parsedBody);
        if (!input.success) {
          return json(request, 400, {
            ok: false,
            error: `Keep it under ${MAX_TEXT} characters and try again.`,
          });
        }

        const { checkAiRateLimit } = await import("@/lib/ai-rate-limit");
        const limited = await checkAiRateLimit(clientIp(request));
        if (!limited.ok) {
          return json(
            request,
            limited.status,
            { ok: false, error: limited.error },
            { "Retry-After": String(limited.retryAfterSec) },
          );
        }

        const apiKey = process.env.XAI_API_KEY;
        if (!apiKey) {
          return json(request, 503, {
            ok: false,
            error: "The AI assistant isn't configured on this deployment.",
          });
        }

        const current = {
          courses: (input.data.schedule?.courses ?? []) as Course[],
          meetings: (input.data.schedule?.meetings ?? []) as Meeting[],
        };

        const { system, user } =
          input.data.mode === "ask"
            ? buildAskMessages(input.data.text, current)
            : buildParseMessages(input.data.text, input.data.mode, current);

        const completion = await requestCompletion(system, user, apiKey);
        if (!completion.ok) {
          return json(request, 502, { ok: false, error: completion.error });
        }

        if (input.data.mode === "ask") {
          const answer = normalizeAskOutput(completion.text);
          if (!answer) {
            return json(request, 502, { ok: false, error: "The AI returned something unreadable. Try again." });
          }
          return json(request, 200, { ok: true, answer });
        }

        const parsed = normalizeAiOutput(completion.text);
        if (!parsed) {
          return json(request, 502, {
            ok: false,
            error: "The AI returned something unreadable. Try again.",
          });
        }
        return json(request, 200, {
          ok: true,
          schedule: { courses: parsed.schedule.courses, meetings: parsed.schedule.meetings },
          summary: parsed.summary,
        });
      },
    },
  },
});
