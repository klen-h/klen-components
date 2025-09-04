#!/usr/bin/env node

import { build } from 'vite'
import { resolve } from 'path'
import { rmSync, mkdirSync } from 'fs'

const rootDir = resolve(__dirname, '..')
const distDir = resolve(rootDir, 'dist')

async function buildLibrary() {
  console.log('🚀 开始构建 Klen Components...')
  
  try {
    // 清理 dist 目录
    console.log('🧹 清理构建目录...')
    rmSync(distDir, { recursive: true, force: true })
    mkdirSync(distDir, { recursive: true })
    
    // 构建库
    console.log('📦 构建组件库...')
    await build({
      root: rootDir,
      configFile: resolve(rootDir, 'vite.config.ts'),
      mode: 'production'
    })
    
    console.log('✅ 构建完成！')
    console.log(`📁 输出目录: ${distDir}`)
    
  } catch (error) {
    console.error('❌ 构建失败:', error)
    process.exit(1)
  }
}

// 运行构建
buildLibrary() 