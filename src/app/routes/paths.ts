export const paths = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  profile: "/profile",
  myTables: "/my-tables",
  myTableDetails: "/my-tables/:tableId",
  publicTables: "/public-tables",
  publicTableDetails: "/public-tables/:tableId",
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
