import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sass from 'sass';
import type { Plugin } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Custom plugin to save gradient settings
const gradientSettingsSaver = (): Plugin => {
  return {
    name: 'gradient-settings-saver',
    apply: 'serve', // Only apply this plugin during development
    configureServer(server) {
      server.middlewares.use('/api/save-gradient-settings', (req, res) => {
        // Only handle POST requests
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        // Parse JSON body
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        
        req.on('end', () => {
          try {
            const { content } = JSON.parse(body);
            
            // Write the settings to the defaultGradientSettings.ts file
            const settingsPath = resolve(__dirname, 'src/utils/defaultGradientSettings.ts');
            writeFileSync(settingsPath, content, 'utf8');
            
            // Also update the settings in the context file
            const contextPath = resolve(__dirname, 'src/context/GradientSettingsContext.tsx');
            let contextContent = readFileSync(contextPath, 'utf8');
            
            // Extract the defaultSettings object using regex
            const defaultSettingsRegex = /(const defaultSettings: GradientSettings = )({[\s\S]*?});/;
            
            // Get just the settings object from content
            const settingsObjectRegex = /(export const defaultGradientSettings: GradientSettings = )({[\s\S]*?});/;
            const settingsObjectMatch = content.match(settingsObjectRegex);
            
            if (settingsObjectMatch && settingsObjectMatch[2]) {
              const settingsObject = settingsObjectMatch[2];
              
              // Replace the settings in the context file
              contextContent = contextContent.replace(defaultSettingsRegex, `$1${settingsObject};`);
              writeFileSync(contextPath, contextContent, 'utf8');
            }
            
            // Respond with success
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            console.error('Error saving settings:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        });
      });
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    gradientSettingsSaver()
  ],
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