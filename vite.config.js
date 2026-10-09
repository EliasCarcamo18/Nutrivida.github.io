import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Asigna '/Nutrivida.github.io/' únicamente durante 'npm run build'
  base: command === 'build' ? '/Nutrivida.github.io/' : '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js', // Ajusta si tu archivo está en './src/setupTests.js'
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    exclude: ['e2e/**', 'node_modules/**']
  },
}));