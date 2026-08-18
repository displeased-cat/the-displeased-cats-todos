import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/the-displeased-cats-todos/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
