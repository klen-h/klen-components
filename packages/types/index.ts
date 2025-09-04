// 组件类型导出
export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  htmlType?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  ghost?: boolean
  icon?: any
}

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: 'small' | 'medium' | 'large'
  prefix?: string
  suffix?: string
  clearable?: boolean
  showPasswordToggle?: boolean
  showCount?: boolean
  maxlength?: number
  minlength?: number
  pattern?: string
  autocomplete?: string
  autofocus?: boolean
  name?: string
  errorMessage?: string
  helpText?: string
}
