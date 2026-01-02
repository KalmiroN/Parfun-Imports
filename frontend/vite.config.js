import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // ✅ abre o navegador automaticamente
    proxy: {
      "/api": {
        target: "http://localhost:8080", // backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
