// 组件导出
export { default as MyButton } from './button/MyButton.vue'
export { default as MyInput } from './input/MyInput.vue'

// 类型导出
export type { ButtonProps } from './button/MyButton.vue'
export type { InputProps } from './input/MyInput.vue'

// 组件列表
export const components = [
  'MyButton',
  'MyInput'
] as const

// 组件类型
export type ComponentName = typeof components[number] 