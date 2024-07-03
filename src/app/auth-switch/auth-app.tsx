import { AppLayout } from "@app/layouts";
import { authRoutes, paths } from "@app/routes";
import { NotFound } from "@components/not-fond";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { RoutesWrapper } from "src/providers";

export const AuthApp = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component() {
        return (
          <AppLayout>
            <RoutesWrapper />
          </AppLayout>
        );
      },
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          index: true,
          element: <Navigate replace to={paths.dashboard} />,
        },
        ...authRoutes,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
