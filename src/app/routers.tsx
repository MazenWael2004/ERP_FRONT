import { createBrowserRouter } from "react-router-dom";
import LauncherPage from "../features/launcher/pages/LauncherPage";
import LoginPage from "../features/auth/pages/LoginPage";


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