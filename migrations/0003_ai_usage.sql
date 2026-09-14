-- Counters for the public /api/ai endpoint's rate limits.
-- One row per (bucket, window): bucket "ip:<hash>" or "global", window_key a
-- minute or day stamp. Rows are increment-only; old windows are never read.
create table if not exists ai_usage (
  bucket text not null,
  window_key text not null,
  count integer not null default 0,
  primary key (bucket, window_key)
);
