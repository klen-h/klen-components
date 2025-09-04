// 组件导出
export * from './components'

// 工具导出
export * from './utils/theme'

// 样式导出
import './styles/index.scss'

// 插件安装
import type { App } from 'vue'
import { MyButton, MyInput } from './components'

export default {
  install(app: App) {
    // 注册组件
    app.component('MyButton', MyButton)
    app.component('MyInput', MyInput)
  }
}

// 导出插件
export { ThemePlugin } from './utils/theme'

// 导出主题管理器
export { themeManager, useTheme } from './utils/theme'

// 导出类型
export type { ThemeType, ThemeConfig } from './utils/theme' 