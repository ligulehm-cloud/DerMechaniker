import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/DerMechaniker/', // 💡 GitHub Pages base path
  plugins: [react()]
});