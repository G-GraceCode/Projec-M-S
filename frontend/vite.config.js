import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      "/projec/user": {
        target: "https://dtv62c-5000.csb.app",
        changeOrigin: true,
      },
    },
  },
});
