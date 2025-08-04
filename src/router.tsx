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
import Event from "./dashboard/components/Event.tsx";

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

const eventRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/event/$id",
  component: () => <Event />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  eventRoute,
]);

const router = createRouter({ routeTree });

export default router;
