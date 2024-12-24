import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/", // Use "/" if deploying to Vercel
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Explicitly specify the output directory
  },
  server: {
    proxy: {
      "/api": {
        target: "https://profile-mapping.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
