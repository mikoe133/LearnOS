// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // 开发服务器配置
    port: 5173, // 可选：指定本地开发端口
    open: true, // 自动打开浏览器
    proxy: {
      // 所有以 /api 开头的请求都会被代理
      '/api': {
        target: 'http://localhost:3000', // 你的后端服务地址
        changeOrigin: true,              // 改变 origin（对跨域很重要）
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 /api 前缀再转发
        secure: false, // 如果 target 是 https 且证书无效，可设为 false（仅开发用
        configure: (proxy, options) => {
          // 可选：自定义代理行为
          console.log('Proxying:', options.target)
        },
        headers: {
          // 可添加自定义请求头
          'X-Custom-Header': 'value'
        }
      }
    }
  }
})