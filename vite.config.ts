import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Github Pages deployment usually requires base to be set to the repository name if not using a custom domain.
  // For Vercel, this default '/' is perfect.
  base: '/', 
});