import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const packageJson: { version: string } = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8"),
);

const getCommitHash = (): string => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "";
  }
};

export default defineConfig({
  base: "./",
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __APP_COMMIT__: JSON.stringify(getCommitHash()),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        id: ".",
        name: "Pizza Teig Rechner",
        short_name: "Teig-Rechner",
        description: "Rechner für Pizzateig-Zutaten und Zubereitungsschritte",
        start_url: ".",
        scope: ".",
        display: "standalone",
        background_color: "#121212",
        theme_color: "#1f2937",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2}"],
      },
    }),
  ],
});
