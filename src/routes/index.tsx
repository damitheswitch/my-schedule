import { createFileRoute } from "@tanstack/react-router";
import { ScheduleApp } from "@/components/schedule-app";
import { clampWeek } from "@/lib/schedule";

type Search = {
  week?: number;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = Number(search.week);
    if (!Number.isFinite(raw)) return {};
    return { week: clampWeek(raw) };
  },
  component: Home,
});

function Home() {
  const { week } = Route.useSearch();
  return <ScheduleApp weekParam={week} />;
}
