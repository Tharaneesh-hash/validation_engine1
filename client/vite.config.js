import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = process.env.VITE_API_URL || env.VITE_API_URL;

  if (mode === 'production' && !apiUrl) {
    throw new Error('Set VITE_API_URL in Vercel to your Render API URL, ending in /api.');
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: process.env.VITE_BACKEND_URL || 'https://validation-engine1-11.onrender.com/api',
          changeOrigin: true,
          secure: false
        }
      }
    },
    optimizeDeps: {
      include: ['lucide-react', 'axios']
    }
  };
});
