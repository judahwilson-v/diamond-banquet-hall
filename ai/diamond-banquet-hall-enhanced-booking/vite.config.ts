import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const isWidgetBuild = process.env.WIDGET_BUILD === 'true';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: isWidgetBuild
    ? {
        emptyOutDir: true,
        lib: {
          entry: path.resolve(__dirname, 'src/widget.tsx'),
          fileName: () => 'diamond-concierge.js',
          formats: ['es'],
        },
        outDir: 'dist-widget',
      }
    : undefined,
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify; file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
