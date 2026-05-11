import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/questions': 'http://localhost:8000',
      '/submissions': 'http://localhost:8000',
    }
  }
})