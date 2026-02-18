import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Full-Stack-LAB2/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
})
