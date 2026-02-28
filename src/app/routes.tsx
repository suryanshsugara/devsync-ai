import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import DevRoomPage from "./pages/DevRoomPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import CodeViewPage from "./pages/CodeViewPage";
import PrototypeFlowPage from "./pages/PrototypeFlowPage";
import DashboardLayout from "./layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/design-system",
    Component: DesignSystemPage,
  },
  {
    path: "/prototype-flow",
    Component: PrototypeFlowPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "room/:roomId",
        Component: DevRoomPage,
      },
      {
        path: "analytics",
        Component: AnalyticsPage,
      },
      {
        path: "code/:roomId",
        Component: CodeViewPage,
      },
    ],
  },
]);
