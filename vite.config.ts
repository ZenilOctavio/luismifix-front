import path from "path"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from "vite"

const outDir = path.resolve('..','backend-luismifix','public')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "css": path.resolve(__dirname, "./src/css"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir
  }
})
