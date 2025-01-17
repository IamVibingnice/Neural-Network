import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': process.env
  },
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util/',
      buffer: 'buffer/',
      stream: 'stream-browserify',
      path: 'path-browserify',
      crypto: 'crypto-js',
      '@neondatabase/serverless': path.resolve(__dirname, 'node_modules/@neondatabase/serverless/index.js')
    }
  },
  optimizeDeps: {
    include: ['@neondatabase/serverless']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
});