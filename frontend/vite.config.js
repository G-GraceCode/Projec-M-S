import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/projec/user, /project": {
        target: "https://trrmmy-5000.csb.app",
        changeOrigin: true,
      },
    },
  },
});
