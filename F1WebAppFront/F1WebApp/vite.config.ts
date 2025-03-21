import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      // Proxy for your existing API setup
      '/api': {
        target: 'https://api.jolpi.ca',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/ergast/f1'),
      },
      // Proxy for old Ergast API to bypass CORS
      '/ergast-api': {
        target: 'https://ergast.com/api/f1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ergast-api/, ''),
      },
      // Proxy for the Flags API to bypass CORS
      '/flags-api': {
        target: 'https://flagsapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/flags-api/, ''),
      },
      // Proxy for OpenAI API to bypass CORS
      '/openai-api': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openai-api/, ''),
      },
    },
  },
});
