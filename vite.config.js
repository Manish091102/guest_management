import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./", // Ensure correct paths for production
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      '@': '/src',  // No need for 'path.resolve' here in Vite
    },
  },
});
