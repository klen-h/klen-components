# Klen Components

[![npm version](https://badge.fury.io/js/klen-components.svg)](https://badge.fury.io/js/klen-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 项目概述

Klen Components 是一个企业级 Vue 3 UI 组件库，提供高质量的组件和完整的设计系统。使用 TypeScript 开发，支持主题切换、响应式设计，并遵循现代前端开发最佳实践。

## 📦 安装

```bash
# 使用 npm
npm install klen-components

# 使用 yarn
yarn add klen-components

# 使用 pnpm
pnpm add klen-components
```

## 🚀 快速开始

### 1. 导入组件库

```typescript
// main.ts
import { createApp } from 'vue'
import KlenComponents from 'klen-components'
import 'klen-components/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(KlenComponents)
app.mount('#app')
```

### 2. 使用组件

```vue
<template>
  <div>
    <MyButton type="primary" @click="handleClick">
      点击我
    </MyButton>
    
    <MyInput 
      v-model="inputValue" 
      placeholder="请输入内容"
      :error="hasError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const hasError = ref(false)

const handleClick = () => {
  console.log('按钮被点击了')
}
</script>
```

### 3. 按需导入

```typescript
// 只导入需要的组件
import { MyButton, MyInput } from 'klen-components'
import 'klen-components/dist/style.css'
```

## 🏗️ 项目结构

```
klen-components/
├── packages/                    # 核心组件包
│   ├── components/             # 组件源码
│   │   ├── button/            # 按钮组件
│   │   │   └── MyButton.vue   # 按钮组件实现
│   │   ├── input/             # 输入框组件
│   │   │   └── MyInput.vue    # 输入框组件实现
│   │   └── index.ts           # 组件导出文件
│   ├── styles/                # 样式系统
│   │   ├── variables.scss     # CSS 自定义属性变量
│   │   ├── mixins.scss        # SCSS 混入
│   │   ├── functions.scss     # SCSS 函数
│   │   └── index.scss         # 样式入口文件
│   ├── utils/                 # 工具函数
│   │   └── theme.ts           # 主题管理器
│   └── index.ts               # 主入口文件
├── examples/                   # 示例应用
│   ├── App.vue                # 示例应用主组件
│   ├── main.ts                # 示例应用入口
│   └── index.html             # 示例应用 HTML
├── tests/                     # 测试文件
│   ├── button.test.ts         # 按钮组件测试
│   └── input.test.ts          # 输入框组件测试
├── scripts/                   # 构建脚本
│   └── build.ts               # 构建脚本
├── docs/                      # 文档目录
├── dist/                      # 构建输出目录
├── vite.config.ts             # Vite 配置
├── tsconfig.json              # TypeScript 配置
├── package.json               # 项目配置
├── README.md                  # 项目说明
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd klen-components
pnpm install
```

### 2. 启动开发服务器

```bash
# 使用 pnpm
pnpm dev

### 3. 构建项目

```bash
pnpm build
```

### 4. 运行测试

```bash
pnpm test
```

## 🎨 核心特性

### CSS Modules 样式隔离

- 使用 CSS Modules 确保样式完全隔离
- 类名自动哈希化，避免全局冲突
- 支持 SCSS 预处理器

### 设计系统

- 完整的颜色系统（支持多主题）
- 统一的间距、字体、圆角、阴影规范
- 响应式设计支持

### 主题系统

- 支持浅色、深色、高对比度主题
- 自动检测系统主题偏好
- 主题持久化存储
- 动态主题切换

### 组件系统

- **MyButton**: 支持多种类型、尺寸、状态
- **MyInput**: 支持多种类型、特性、验证状态
- 完整的 TypeScript 类型定义
- 事件处理和状态管理

## 🔧 技术实现

### 样式架构

```scss
// 使用 CSS 自定义属性
:root {
  --primary-color: #1890ff;
  --spacing-md: 16px;
  --border-radius-md: 6px;
}

// CSS Modules 确保隔离
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}
```

### 组件设计

```vue
<template>
  <button :class="$style.button">
    <slot />
  </button>
</template>

<style lang="scss" module>
.button {
  // 样式定义
}
</style>
```

### 主题管理

```typescript
// 使用组合式 API
const { theme, setTheme, toggleTheme } = useTheme()

// 主题切换
setTheme('dark')
toggleTheme()
```

## 📱 响应式支持

- 移动优先的设计理念
- 支持多种断点（xs, sm, md, lg, xl, xxl）
- 响应式工具类
- 自适应布局

## 🧪 测试覆盖

- 使用 Vitest 进行单元测试
- 完整的组件测试用例
- 事件、状态、样式测试
- 测试覆盖率报告

## 📦 构建输出

- ESM 模块格式
- CommonJS 模块格式
- UMD 模块格式
- 类型定义文件
- 样式文件分离

## 🌟 最佳实践

### 命名规范

- 组件名：`My-` 前缀（如 `MyButton`）
- 样式类：使用 CSS Modules 自动哈希
- 文件命名：PascalCase（如 `MyButton.vue`）

### 代码组织

- 单一职责原则
- 组件化思维
- 类型安全
- 可复用性

### 样式管理

- CSS 自定义属性
- SCSS 混入和函数
- 设计系统规范
- 主题切换支持

## 🔮 扩展计划

### 新增组件

- Modal 模态框
- Select 选择器
- Table 表格
- Form 表单
- DatePicker 日期选择器

### 功能增强

- 国际化支持
- 动画系统
- 无障碍访问
- 性能优化

### 工具支持

- Storybook 文档
- 组件生成器
- 主题编辑器
- 设计令牌系统

## 🐛 常见问题

### 样式不生效

确保正确导入了样式文件：
```typescript
import 'klen-components/dist/style.css'
```

### 类型错误

检查 TypeScript 配置和依赖安装：
```bash
pnpm install
pnpm run build:types
```

### 构建失败

清理缓存并重新安装：
```bash
rm -rf node_modules
rm -rf dist
pnpm install
pnpm build
```

## 📚 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [SCSS 官方文档](https://sass-lang.com/)
- [CSS Modules 介绍](https://github.com/css-modules/css-modules)