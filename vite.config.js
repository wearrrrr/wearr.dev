import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        projects: resolve(__dirname, 'projects.html'),
        files: resolve(__dirname, 'files.html'),
        hire: resolve(__dirname, 'hire-me.html'),
      },
    },
  },
})