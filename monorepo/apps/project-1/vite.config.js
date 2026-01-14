import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://mechanical.ai4x.com.cn',
        changeOrigin: true,
        secure: false, // 如果是 HTTPS 且证书有问题可设为 false（仅开发）
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
