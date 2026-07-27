import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(import.meta.dirname, "github"),
  base: "./",
  plugins: [react()],
  publicDir: "public",
  build: {
    outDir: resolve(import.meta.dirname, "docs"),
    emptyOutDir: true,
  },
});
