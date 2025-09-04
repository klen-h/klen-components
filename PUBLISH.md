# NPM 发布指南

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 主要版本 (1.0.0 -> 2.0.0)
npm version major
```

## 🚀 发布步骤

### 1. 登录 npm

```bash
npm login
```

输入你的 npm 用户名、密码和邮箱。

### 2. 构建项目

```bash
pnpm build
```

确保构建成功，检查 `dist` 目录下的文件。

### 3. 发布到 npm

```bash
npm publish
```

### 4. 验证发布

发布成功后，可以通过以下方式验证：

```bash
# 查看包信息
npm view klen-components

# 安装测试
npm install klen-components
```

## 🔧 发布配置说明

### package.json 关键配置

```json
{
  "name": "klen-components",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./dist/style.css": "./dist/style.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "prepublishOnly": "pnpm run build"
}
```

### 构建输出说明

- `index.esm.js` - ES 模块格式，支持 tree-shaking
- `index.cjs.js` - CommonJS 格式，兼容 Node.js
- `index.umd.js` - UMD 格式，支持浏览器直接引用
- `index.d.ts` - TypeScript 类型定义
- `style.css` - 样式文件

## 📝 使用方式

### 完整导入

```typescript
import KlenComponents from 'klen-components'
import 'klen-components/dist/style.css'

app.use(KlenComponents)
```

### 按需导入

```typescript
import { MyButton, MyInput } from 'klen-components'
import 'klen-components/dist/style.css'
```

## 🔄 更新发布

### 1. 修改代码

在 `packages/` 目录下修改组件代码。

### 2. 更新版本

```bash
npm version patch  # 或其他版本类型
```

### 3. 重新发布

```bash
pnpm build
npm publish
```

## ⚠️ 注意事项

1. **版本管理**: 遵循语义化版本规范
2. **构建检查**: 每次发布前都要运行 `pnpm build` 确保构建成功
3. **类型定义**: 确保 TypeScript 类型定义正确生成
4. **样式文件**: 确保样式文件正确包含在发布包中
5. **依赖管理**: 检查 `peerDependencies` 和 `devDependencies` 配置

## 🐛 常见问题

### 发布失败

1. 检查包名是否已被占用
2. 确认 npm 登录状态
3. 检查版本号是否已存在

### 类型错误

1. 确保 `tsconfig.build.json` 配置正确
2. 检查 Vue 组件类型定义
3. 运行 `pnpm build:types` 单独生成类型

### 样式不生效

1. 确保样式文件包含在 `files` 字段中
2. 检查 CSS 导入路径
3. 验证构建输出中的样式文件

## 📚 相关链接

- [npm 发布文档](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [语义化版本](https://semver.org/)
- [Vue 3 组件库开发指南](https://vuejs.org/guide/reusability/plugins.html)
