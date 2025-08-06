import "./index.css";
import {
  Outlet,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
  Navigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Dashboard from "./dashboard/index.tsx";
import PlanningDashboard from "./planning-dashboard";
import NewPlanning from "./new-planning";

const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen min-w-screen p-12">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
  notFoundComponent: () => <Link to="/dashboard">404 return to home</Link>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/dashboard" />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <Dashboard />,
});

const planningDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/planning/$id",
  component: () => <PlanningDashboard />,
});

const newEventRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new-planning",
  component: () => <NewPlanning />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  planningDashboardRoute,
  newEventRoute,
]);

const router = createRouter({ routeTree });

export default router;
