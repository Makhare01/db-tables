export const paths = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/",
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
