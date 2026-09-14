/**
 * Rate limiting for the public `/api/ai` endpoint. Server-only — imports
 * `@/lib/db`, so it must never be imported from client code (the API route
 * dynamically imports it, same convention as `schedule-data.ts`).
 *
 * Two layers protect the owner's xAI quota:
 *   - per-IP: a burst limit per minute + a daily cap
 *   - global: a daily cap across all visitors + an `AI_DISABLED` kill-switch
 *
 * Counters live in the `ai_usage` table so they are shared across serverless
 * instances. If the DB is unavailable we fall back to a per-process in-memory
 * map — weaker on multi-instance deploys, but it keeps local dev working and
 * still bounds damage better than nothing.
 */

export type RateResult =
  | { ok: true }
  | { ok: false; status: number; error: string; retryAfterSec: number };

const IP_MINUTE_LIMIT = Number(process.env.AI_IP_MINUTE_LIMIT ?? 6);
const IP_DAY_LIMIT = Number(process.env.AI_IP_DAY_LIMIT ?? 30);
const GLOBAL_DAY_LIMIT = Number(process.env.AI_GLOBAL_DAY_LIMIT ?? 400);

const minuteKey = () => `m:${new Date().toISOString().slice(0, 16)}`; // YYYY-MM-DDTHH:MM
const dayKey = () => `d:${new Date().toISOString().slice(0, 10)}`;

/** Hash the IP so raw addresses aren't stored at rest. */
async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`ns-ai:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 8))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type Window = { bucket: string; key: string; limit: number; retryAfterSec: number; error: string };

async function windowsFor(ip: string): Promise<Window[]> {
  const hashed = await hashIp(ip);
  return [
    {
      bucket: `ip:${hashed}`,
      key: minuteKey(),
      limit: IP_MINUTE_LIMIT,
      retryAfterSec: 60,
      error: "You're doing that a lot — wait a moment and try again.",
    },
    {
      bucket: `ip:${hashed}`,
      key: dayKey(),
      limit: IP_DAY_LIMIT,
      retryAfterSec: 3600,
      error: "You've reached today's AI limit. Come back tomorrow.",
    },
    {
      bucket: "global",
      key: dayKey(),
      limit: GLOBAL_DAY_LIMIT,
      retryAfterSec: 3600,
      error: "The AI assistant is at capacity for today. Try again tomorrow.",
    },
  ];
}

// ---- In-memory fallback ----------------------------------------------------

const memCounters = new Map<string, { count: number; expires: number }>();

function memIncrement(bucket: string, key: string, ttlMs: number): number {
  const now = Date.now();
  const k = `${bucket}:${key}`;
  const cur = memCounters.get(k);
  if (!cur || cur.expires < now) {
    memCounters.set(k, { count: 1, expires: now + ttlMs });
    return 1;
  }
  cur.count += 1;
  return cur.count;
}

function memCheck(windows: Window[]): RateResult {
  for (const w of windows) {
    const ttl = w.key.startsWith("m:") ? 120_000 : 172_800_000;
    if (memIncrement(w.bucket, w.key, ttl) > w.limit) {
      return { ok: false, status: 429, error: w.error, retryAfterSec: w.retryAfterSec };
    }
  }
  return { ok: true };
}

// ---- DB-backed counters ----------------------------------------------------

async function dbCheck(windows: Window[]): Promise<RateResult | null> {
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    for (const w of windows) {
      const rows = await sql<{ count: number }>`
        insert into ai_usage (bucket, window_key, count)
        values (${w.bucket}, ${w.key}, 1)
        on conflict (bucket, window_key)
        do update set count = ai_usage.count + 1
        returning count
      `;
      const count = Number(rows[0]?.count ?? 0);
      if (count > w.limit) {
        return { ok: false, status: 429, error: w.error, retryAfterSec: w.retryAfterSec };
      }
    }
    return { ok: true };
  } catch {
    return null; // DB unavailable — caller falls back to memory.
  }
}

/**
 * Increment counters for this request and decide whether it may proceed.
 * Denied requests still consumed their increment, so a flood can't retry-loop
 * into a free pass — the count only grows.
 */
export async function checkAiRateLimit(ip: string): Promise<RateResult> {
  if (process.env.AI_DISABLED === "1" || process.env.AI_DISABLED === "true") {
    return {
      ok: false,
      status: 503,
      error: "The AI assistant is temporarily unavailable. Try again later.",
      retryAfterSec: 3600,
    };
  }
  const windows = await windowsFor(ip);
  const dbResult = await dbCheck(windows);
  return dbResult ?? memCheck(windows);
}
