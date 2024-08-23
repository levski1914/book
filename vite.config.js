// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/book/", // Това е поддиректорията на твоя GitHub Pages URL
});
