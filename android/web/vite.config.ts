import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const here = dirname(fileURLToPath(import.meta.url));
// Reuse the real app code straight out of the my-schedule checkout so the
// Android wrapper can never drift from the web app it ships. Works both as a
// sibling directory (../../my-schedule/src) and inside the repo itself
// (android/web -> ../../src).
const appSrc = ["../../my-schedule/src", "../../src"]
  .map((p) => resolve(here, p))
  .find((p) => existsSync(p));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: { "@": appSrc },
    // The app sources live outside this project; dedupe so every file shares
    // one copy of React and the router instead of resolving into
    // my-schedule/node_modules a second time.
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  server: { port: 5174 },
  build: {
    outDir: "../app/src/main/assets/www",
    emptyOutDir: true,
  },
});
