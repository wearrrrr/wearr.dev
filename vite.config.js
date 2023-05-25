import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/pages/index.html'),
        contact: resolve(__dirname, '/pages/index.html'),
        projects: resolve(__dirname, '/pages/projects.html'),
        files: resolve(__dirname, '/pages/files.html'),
        hire: resolve(__dirname, '/pages/hire-me.html'),
      },
    },
  },
})