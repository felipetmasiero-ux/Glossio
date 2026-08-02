/// <reference types="vitest" />

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

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

      manifest: {
        name: "Glossio",
        short_name: "Glossio",
        description: "Learn languages through lessons, exploration and spaced repetition.",
        theme_color: "#2C3E63",
        background_color: "#EEF1F5",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      }
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