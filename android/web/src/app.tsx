import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { ScheduleApp } from "@/components/schedule-app";
import { clampWeek } from "@/lib/schedule";

type Search = {
  week?: number;
};

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = Number(search.week);
    if (!Number.isFinite(raw)) return {};
    return { week: clampWeek(raw) };
  },
  component: function Home() {
    const { week } = indexRoute.useSearch();
    return <ScheduleApp weekParam={week} />;
  },
});

const routeTree = rootRoute.addChildren([indexRoute]);

// Hash history keeps client routing working when the bundle is served from
// appassets.androidplatform.net inside the WebView — no server-side fallback.
const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
