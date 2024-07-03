import { createRoute } from "./create-route";
import { paths } from "./paths";

export const authRoutes = [
  createRoute({
    path: paths.dashboard,
    factory: () => import("../../pages/dashboard"),
    title: "Dashboard",
  }),
  createRoute({
    path: paths.profile,
    factory: () => import("../../pages/profile"),
    title: "Profile",
  }),
  createRoute({
    path: paths.myTables,
    factory: () => import("../../pages/my-tables"),
    title: "My tables",
  }),
  createRoute({
    path: paths.myTableDetails,
    factory: () => import("../../pages/my-tables/table"),
    title: "My table details",
  }),
  createRoute({
    path: paths.publicTables,
    factory: () => import("../../pages/public-tables"),
    title: "Public tables",
  }),
  createRoute({
    path: paths.publicTableDetails,
    factory: () => import("../../pages/public-tables/table"),
    title: "Public table details",
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
