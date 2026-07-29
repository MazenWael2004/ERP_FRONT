import { createBrowserRouter } from "react-router-dom";
import LauncherPage from "../features/launcher/pages/LauncherPage";
import LoginPage from "../features/auth/pages/LoginPage";
import ViewJobs from "../features/jobs/pages/ViewJobs";
import NewJob from "../features/jobs/pages/NewJob";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import NotFoundPage from "../shared/pages/NotFoundPage";
import EditJob from "../features/jobs/pages/EditJob";
import ViewZones from "../features/zones/pages/ViewZones";
import NewZone from "../features/zones/pages/NewZone";
import EditZone from "../features/zones/pages/EditZone";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/jobs",
        element: <ViewJobs />,
      },
      {
        path: "/jobs/new-job",
        element: <NewJob />,
      },
      {
        path:"/jobs/:id",
        element: <EditJob />
      },
      {
        path: "/desk",
        element: <LauncherPage />,
      },
      {
        path:"/zones",
        element: <ViewZones />
      },
      {
        path:"zones/new-zone",
        element:<NewZone />
      },
      {
       path:"zones/:id",
       element:<EditZone />
      }
    ],
  },

  // Must be last
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);