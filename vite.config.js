import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/the-displeased-cats-todos/',
  plugins: [react()],
  build: {
  outDir: 'docs',
},
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
