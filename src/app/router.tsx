import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/app",
      lazy: async () => {
        const { AppRoot } = await import("./routes/app/root");
        return { Component: AppRoot };
      },
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
