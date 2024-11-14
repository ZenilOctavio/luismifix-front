import path from "path";
import react from '@vitejs/plugin-react';
import { defineConfig } from "vite";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "css": path.resolve(__dirname, "./src/css"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_APIBOT_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});