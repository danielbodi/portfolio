import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sass from 'sass';

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
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math"; @use "sass:color";`,
        sassOptions: {
          outputStyle: 'compressed',
          sourceMap: true,
          implementation: sass
        }
      }
    }
  }
});