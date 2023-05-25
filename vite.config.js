import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, '/contact/index.html'),
        files: resolve(__dirname, '/files/index.html'),
        hire: resolve(__dirname, '/hire-me/index.html'),
        projects: resolve(__dirname, '/projects/index.html'),
      },
    },
  },
})