import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/crypto": {
        target: "https://api.coingecko.com/api/v3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/crypto/, ""),
      },
      "/api/stocks": {
        target: "https://finnhub.io/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stocks/, ""),
      },
    },
  },
});
