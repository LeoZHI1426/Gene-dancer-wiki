import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 新增这一行，将资源路径改为相对路径
  plugins: [react()],
})