/// <reference types="vitest" />

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

import { pwaManifest } from "./src/config/pwaManifest.js";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "prompt",
      manifestFilename: "manifest.json",

      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,woff,woff2,ico}"]
      },

      manifest: pwaManifest
    })
  ],

  test: {
    environment: "jsdom",
    globals: true,
    // backend/ has its own vitest.config.js (Node environment, its own
    // .env) and its own `npm test` - excluded here so running the
    // frontend's test command from the repo root doesn't also try (and
    // fail) to run backend tests under the wrong environment/cwd.
    exclude: [...configDefaults.exclude, "tests/e2e/**", "backend/**"],
  },
});