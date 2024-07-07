export const paths = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  profile: "/profile",
  myTables: "/my-tables",
  myTableDetails: "/my-tables/:tableId",
  addDataToTable: "/my-tables/:tableId/add-data",
  editTable: "/my-tables/:tableId/edit",
  publicTables: "/public-tables",
  publicTableDetails: "/public-tables/:tableId",
  createTable: "/create-table",
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
