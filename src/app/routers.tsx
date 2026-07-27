import { createBrowserRouter } from "react-router-dom";
import LauncherPage from "../features/launcher/pages/LauncherPage";
import LoginPage from "../features/auth/pages/LoginPage";
import ViewJobs from "../features/jobs/pages/ViewJobs";
import NewJob from "../features/jobs/pages/NewJob";
import ProtectedRoute from "../shared/components/ProtectedRoute";


export const router = createBrowserRouter([
  {
  path:"/login",
  element: <LoginPage />
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
        path: "/desk",
        element: <LauncherPage />,
      },
    ],
  },

]);