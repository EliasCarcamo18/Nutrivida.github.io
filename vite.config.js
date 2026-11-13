import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Asigna '/' Ãºnicamente durante 'npm run build'
  base: command === 'build' ? '/' : '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js', // Ajusta si tu archivo estÃ¡ en './src/setupTests.js'
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    exclude: ['e2e/**', 'node_modules/**']
  },
}));
