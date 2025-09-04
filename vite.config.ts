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
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.esm.js',
          assetFileNames: 'style.css',
          exports: 'named'
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs.js',
          assetFileNames: 'style.css',
          exports: 'named'
        },
        {
          format: 'umd',
          name: 'KlenComponents',
          entryFileNames: 'index.umd.js',
          assetFileNames: 'style.css',
          globals: {
            vue: 'Vue'
          }
        }
      ]
    },
    cssCodeSplit: false,
    sourcemap: true
  },
}) 