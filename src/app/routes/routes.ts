import { createRoute } from "./create-route";
import { paths } from "./paths";

export const authRoutes = [
  createRoute({
    path: paths.dashboard,
    factory: () => import("../../pages/dashboard"),
    title: "Dashboard",
  }),
];

export const unauthRoutes = [
  createRoute({
    path: paths.signIn,
    factory: () => import("../../pages/sign-in"),
    title: "Sign in",
  }),
  createRoute({
    path: paths.signUp,
    factory: () => import("../../pages/sign-up"),
    title: "Sign up",
  }),
];

export const routes = [...authRoutes, ...unauthRoutes];
