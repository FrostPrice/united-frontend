/* eslint-disable no-undef */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    const env = loadEnv(mode, process.cwd(), "DEV_");

    return {
      plugins: [react()],
      resolve: {},
      build: {
        chunkSizeWarningLimit: 3000,
      },

      server: {
        port: env.DEV_APP_PORT,
        proxy: {
          "/api": {
            target: env.DEV_APP_API_URL,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    };
  } else {
    const env = loadEnv(mode, process.cwd(), "VITE_");

    return {
      plugins: [react()],
      resolve: {},
      base: "/",
      build: {
        chunkSizeWarningLimit: 3000,
      },

      server: {
        port: env.VITE_APP_PORT,
        proxy: {
          "/api": {
            target: env.VITE_APP_API_URL,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    };
  }
});
