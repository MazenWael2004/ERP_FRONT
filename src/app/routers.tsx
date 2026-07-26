import { createBrowserRouter } from "react-router-dom";
import LauncherPage from "../features/launcher/pages/LauncherPage";
import LoginPage from "../features/auth/pages/LoginPage";
import ViewJobs from "../features/jobs/pages/ViewJobs";


export const router = createBrowserRouter([
  {
    path: "/desk",
    element: <LauncherPage />,
    // errorElement: <NotFoundPage />,
    // children: [
    //   {
    //     index: true,
    //     element: <HomePage />,
    //   },
    //   {
    //     path: "login",
    //     element: <LoginPage />,
    //   },
    // ],
  },
  {
     path: "/jobs",
    element: <ViewJobs />
  },

//   {
//     path: "/dashboard",
//     element: <DashboardLayout />,
//     children: [
//       {
//         index: true,
//         element: <DashboardPage />,
//       },
//     ],
//   },
{
  path:"/login",
  element: <LoginPage />
}
]);