// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './', // 현재 폴더가 루트
  plugins: [react()],
})
