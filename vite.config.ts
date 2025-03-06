import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    https: {
      key: readFileSync('certs/localhost+2-key.pem'),
      cert: readFileSync('certs/localhost+2.pem'),
    },
  },
  resolve: {
    alias: {
      'lucide-react': 'lucide-react/dist/esm/lucide-react.js'
    }
  }
});