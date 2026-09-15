-- Per-user term calendar (label, week-1 Monday, week count) — added when
-- schedules stopped assuming a fixed term.
alter table user_schedules add column if not exists term jsonb;
