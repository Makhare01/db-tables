import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import pluginTsconfigPaths from "vite-tsconfig-paths";

const PROXY_BASE_URL = "http://localhost:8080" as const;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
    pluginTsconfigPaths(),
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: `${PROXY_BASE_URL}/api`,
        changeOrigin: true,
        rewrite: (fullPath) => fullPath.replace("/api", ""),
      },
    },
  },
});
