

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 使用环境变量判断生产环境
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? '/-FIT5032_2025_Zhe_Wang_35846453/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
