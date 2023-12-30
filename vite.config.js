// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || '3001',
  },
});
