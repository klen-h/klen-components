import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // 使用现代 API
  //       api: 'modern-compiler'
  //     }
  //   }
  // },
  // 开发服务器配置
  server: {
    port: 5173,
    open: true, // 自动打开浏览器
    host: true, // 允许外部访问
  },
  // 构建配置
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'KlenComponents',
      fileName: 'klen-components',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name].[hash].css'
          }
          return 'assets/[name].[hash].[ext]'
        }
      },
    },
    cssCodeSplit: true,
  },
}) 