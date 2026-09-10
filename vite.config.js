import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3002,
    strictPort: false,
    hmr: {
      port: 3002,
    },
  },
  json: {
    stringify: false,
    namedExports: true,
  },
  optimizeDeps: {
    include: ["world-atlas"],
  },
});
