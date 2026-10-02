import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const shared = fileURLToPath(new URL('./shared', import.meta.url));

export default defineConfig({
  root: 'client',
  plugins: [react()],
  resolve: { alias: { '@shared': shared } },
  server: {
    port: 5173,
    fs: { allow: ['..'] },
    proxy: { '/api': 'http://localhost:4000' },
  },
  build: { outDir: '../dist', emptyOutDir: true },
});
