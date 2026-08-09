import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Project Pages URL: https://radomir-radionov.github.io/tt-01-sidebar/
  base: '/tt-01-sidebar/',
  plugins: [react(), tailwindcss()],
})
