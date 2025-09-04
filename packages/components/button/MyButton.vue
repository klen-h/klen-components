<template>
  <button
    :class="[
      $style.button,
      $style[`button--${type}`],
      $style[`button--${size}`],
      {
        [$style['button--disabled']]: disabled,
        [$style['button--loading']]: loading,
        [$style['button--block']]: block,
        [$style['button--ghost']]: ghost
      }
    ]"
    :disabled="disabled || loading"
    :type="htmlType"
    @click="handleClick"
  >
    <span v-if="loading" :class="$style.loadingIcon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
          <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
        </circle>
      </svg>
    </span>
    
    <span v-if="icon && !loading" :class="$style.icon">
      <component :is="icon" />
    </span>
    
    <span v-if="$slots.default" :class="$style.content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
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

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  htmlType: 'button',
  disabled: false,
  loading: false,
  block: false,
  ghost: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

// 组件名称
defineOptions({
  name: 'MyButton'
})
</script>

<style lang="scss" module>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  outline: none;
  position: relative;
  overflow: hidden;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(var(--primary-color), 0.2);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  // 尺寸样式
  &--small {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
    height: 24px;
    min-width: 64px;
  }
  
  &--medium {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
    height: 32px;
    min-width: 80px;
  }
  
  &--large {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
    height: 40px;
    min-width: 96px;
  }
  
  // 类型样式
  &--primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--white);
    
    &:hover:not(:disabled) {
      background-color: var(--primary-hover);
      border-color: var(--primary-hover);
    }
    
    &:active:not(:disabled) {
      background-color: var(--primary-active);
      border-color: var(--primary-active);
    }
  }
  
  &--secondary {
    background-color: transparent;
    border-color: var(--primary-color);
    color: var(--primary-color);
    
    &:hover:not(:disabled) {
      background-color: var(--primary-color);
      color: var(--white);
    }
    
    &:active:not(:disabled) {
      background-color: var(--primary-active);
      border-color: var(--primary-active);
      color: var(--white);
    }
  }
  
  &--success {
    background-color: var(--success-color);
    border-color: var(--success-color);
    color: var(--white);
    
    &:hover:not(:disabled) {
      background-color: var(--success-hover);
      border-color: var(--success-hover);
    }
    
    &:active:not(:disabled) {
      background-color: var(--success-active);
      border-color: var(--success-active);
    }
  }
  
  &--warning {
    background-color: var(--warning-color);
    border-color: var(--warning-color);
    color: var(--white);
    
    &:hover:not(:disabled) {
      background-color: var(--warning-hover);
      border-color: var(--warning-hover);
    }
    
    &:active:not(:disabled) {
      background-color: var(--warning-active);
      border-color: var(--warning-active);
    }
  }
  
  &--danger {
    background-color: var(--error-color);
    border-color: var(--error-color);
    color: var(--white);
    
    &:hover:not(:disabled) {
      background-color: var(--error-hover);
      border-color: var(--error-hover);
    }
    
    &:active:not(:disabled) {
      background-color: var(--error-active);
      border-color: var(--error-active);
    }
  }
  
  &--ghost {
    background-color: transparent;
    border-color: transparent;
    color: var(--text-color);
    
    &:hover:not(:disabled) {
      background-color: var(--background-color);
      color: var(--primary-color);
    }
    
    &:active:not(:disabled) {
      background-color: var(--border-color-light);
      color: var(--primary-active);
    }
  }
  
  // 特殊状态
  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    
    &:hover {
      background-color: inherit;
      border-color: inherit;
      color: inherit;
    }
  }
  
  &--loading {
    cursor: wait;
    
    .content {
      opacity: 0.7;
    }
  }
  
  &--block {
    width: 100%;
    display: flex;
  }
  
  // 图标样式
  .icon {
    display: inline-flex;
    align-items: center;
    margin-right: var(--spacing-xs);
    font-size: 1em;
    
    svg {
      width: 1em;
      height: 1em;
    }
  }
  
  // 加载图标样式
  .loadingIcon {
    display: inline-flex;
    align-items: center;
    margin-right: var(--spacing-xs);
    animation: spin 1s linear infinite;
    
    svg {
      width: 1em;
      height: 1em;
    }
  }
  
  // 内容样式
  .content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  
  // 涟漪效果
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  &:active::before {
    width: 200px;
    height: 200px;
  }
}

// 旋转动画
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 焦点样式增强
.button:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

// 高对比度主题支持
[data-theme="high-contrast"] .button {
  border-width: 2px;
  
  &:focus-visible {
    outline-width: 3px;
  }
}

// 打印样式
@media print {
  .button {
    border: 1px solid #000;
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
  }
}
</style> 