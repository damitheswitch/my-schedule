-- migrations/0002_schedule.sql — per-user schedule store (courses + meetings as JSON)
create table if not exists user_schedules (
  user_id    text primary key,
  courses    jsonb not null,
  meetings   jsonb not null,
  updated_at timestamptz not null default now()
);
