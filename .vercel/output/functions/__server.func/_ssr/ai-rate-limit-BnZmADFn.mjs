//#region node_modules/.nitro/vite/services/ssr/assets/ai-rate-limit-BnZmADFn.js
var IP_MINUTE_LIMIT = Number(process.env.AI_IP_MINUTE_LIMIT ?? 6);
var IP_DAY_LIMIT = Number(process.env.AI_IP_DAY_LIMIT ?? 30);
var GLOBAL_DAY_LIMIT = Number(process.env.AI_GLOBAL_DAY_LIMIT ?? 400);
var minuteKey = () => `m:${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16)}`;
var dayKey = () => `d:${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
/** Hash the IP so raw addresses aren't stored at rest. */
async function hashIp(ip) {
	const data = new TextEncoder().encode(`ns-ai:${ip}`);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(digest).slice(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function windowsFor(ip) {
	const hashed = await hashIp(ip);
	return [
		{
			bucket: `ip:${hashed}`,
			key: minuteKey(),
			limit: IP_MINUTE_LIMIT,
			retryAfterSec: 60,
			error: "You're doing that a lot — wait a moment and try again."
		},
		{
			bucket: `ip:${hashed}`,
			key: dayKey(),
			limit: IP_DAY_LIMIT,
			retryAfterSec: 3600,
			error: "You've reached today's AI limit. Come back tomorrow."
		},
		{
			bucket: "global",
			key: dayKey(),
			limit: GLOBAL_DAY_LIMIT,
			retryAfterSec: 3600,
			error: "The AI assistant is at capacity for today. Try again tomorrow."
		}
	];
}
var memCounters = /* @__PURE__ */ new Map();
function memIncrement(bucket, key, ttlMs) {
	const now = Date.now();
	const k = `${bucket}:${key}`;
	const cur = memCounters.get(k);
	if (!cur || cur.expires < now) {
		memCounters.set(k, {
			count: 1,
			expires: now + ttlMs
		});
		return 1;
	}
	cur.count += 1;
	return cur.count;
}
function memCheck(windows) {
	for (const w of windows) {
		const ttl = w.key.startsWith("m:") ? 12e4 : 1728e5;
		if (memIncrement(w.bucket, w.key, ttl) > w.limit) return {
			ok: false,
			status: 429,
			error: w.error,
			retryAfterSec: w.retryAfterSec
		};
	}
	return { ok: true };
}
async function dbCheck(windows) {
	try {
		const { getSql } = await import("./db-D8CXEjvD.mjs").then((n) => n.t).then((n) => n.t);
		const sql = await getSql();
		for (const w of windows) {
			const rows = await sql`
        insert into ai_usage (bucket, window_key, count)
        values (${w.bucket}, ${w.key}, 1)
        on conflict (bucket, window_key)
        do update set count = ai_usage.count + 1
        returning count
      `;
			if (Number(rows[0]?.count ?? 0) > w.limit) return {
				ok: false,
				status: 429,
				error: w.error,
				retryAfterSec: w.retryAfterSec
			};
		}
		return { ok: true };
	} catch {
		return null;
	}
}
/**
* Increment counters for this request and decide whether it may proceed.
* Denied requests still consumed their increment, so a flood can't retry-loop
* into a free pass — the count only grows.
*/
async function checkAiRateLimit(ip) {
	if (process.env.AI_DISABLED === "1" || process.env.AI_DISABLED === "true") return {
		ok: false,
		status: 503,
		error: "The AI assistant is temporarily unavailable. Try again later.",
		retryAfterSec: 3600
	};
	const windows = await windowsFor(ip);
	return await dbCheck(windows) ?? memCheck(windows);
}
//#endregion
export { checkAiRateLimit };
