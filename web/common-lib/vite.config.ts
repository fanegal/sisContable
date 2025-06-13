import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path';
import libCss from 'vite-plugin-libcss';

export default defineConfig({
  plugins: [react(), dts(), libCss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'CommonLib',
      fileName: 'CommonLib',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },

  },
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  }
})
