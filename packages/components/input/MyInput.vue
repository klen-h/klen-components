<template>
  <div :class="[$style.inputWrapper, { [$style['inputWrapper--error']]: hasError }]">
    <label v-if="label" :class="$style.label" :for="inputId">
      {{ label }}
      <span v-if="required" :class="$style.required">*</span>
    </label>
    
    <div :class="$style.inputContainer">
      <span v-if="prefix" :class="$style.prefix">{{ prefix }}</span>
      
      <input
        :id="inputId"
        ref="inputRef"
        :class="[
          $style.input,
          $style[`input--${size}`],
          {
            [$style['input--error']]: hasError,
            [$style['input--disabled']]: disabled,
            [$style['input--readonly']]: readonly
          }
        ]"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :minlength="minlength"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :name="name"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <span v-if="suffix" :class="$style.suffix">{{ suffix }}</span>
      
      <span v-if="clearable && modelValue && !disabled" :class="$style.clearButton" @click="handleClear">
        ✕
      </span>
      
      <span v-if="showPasswordToggle && type === 'password'" :class="$style.passwordToggle" @click="togglePassword">
        {{ passwordVisible ? '👁️' : '👁️‍🗨️' }}
      </span>
    </div>
    
    <div v-if="hasError && errorMessage" :class="$style.errorMessage">
      {{ errorMessage }}
    </div>
    
    <div v-if="helpText && !hasError" :class="$style.helpText">
      {{ helpText }}
    </div>
    
    <div v-if="showCount" :class="$style.characterCount">
      {{ String(modelValue || '').length }}{{ maxlength ? ` / ${maxlength}` : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

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

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'medium',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  showPasswordToggle: false,
  showCount: false,
  autofocus: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'keydown': [event: KeyboardEvent]
  'clear': []
}>()

const inputRef = ref<HTMLInputElement>()
const passwordVisible = ref(false)
const inputId = computed(() => `my-input-${Math.random().toString(36).substr(2, 9)}`)

const hasError = computed(() => !!props.errorMessage)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value
  if (inputRef.value) {
    inputRef.value.type = passwordVisible.value ? 'text' : 'password'
  }
}

// 组件名称
defineOptions({
  name: 'MyInput'
})

// 暴露方法给父组件
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  setSelectionRange: (start: number, end: number) => inputRef.value?.setSelectionRange(start, end)
})
</script>

<style lang="scss" module>
.inputWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  
  &--error {
    .input {
      border-color: var(--error-color);
      
      &:focus {
        border-color: var(--error-color);
        box-shadow: 0 0 0 2px rgba(var(--error-color), 0.2);
      }
    }
  }
}

.label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-color);
  line-height: var(--line-height-base);
  
  .required {
    color: var(--error-color);
    margin-left: var(--spacing-xs);
  }
}

.inputContainer {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  display: inline-block;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  color: var(--text-color);
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
  outline: none;
  
  &::placeholder {
    color: var(--text-color-disabled);
  }
  
  &:hover {
    border-color: var(--primary-hover);
  }
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color), 0.2);
  }
  
  &:disabled {
    background-color: var(--background-color);
    color: var(--text-color-disabled);
    cursor: not-allowed;
  }
  
  &:readonly {
    background-color: var(--background-color);
    cursor: default;
  }
  
  // 尺寸样式
  &--small {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
    height: 24px;
  }
  
  &--medium {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
    height: 32px;
  }
  
  &--large {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
    height: 40px;
  }
  
  // 前缀和后缀样式
  &:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  
  &:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.prefix,
.suffix {
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  white-space: nowrap;
}

.prefix {
  border-right: none;
  border-top-left-radius: var(--border-radius-md);
  border-bottom-left-radius: var(--border-radius-md);
}

.suffix {
  border-left: none;
  border-top-right-radius: var(--border-radius-md);
  border-bottom-right-radius: var(--border-radius-md);
}

.clearButton,
.passwordToggle {
  position: absolute;
  right: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: var(--text-color-secondary);
  transition: color var(--transition-base);
  
  &:hover {
    color: var(--text-color);
  }
}

.clearButton {
  font-size: 12px;
  font-weight: bold;
}

.passwordToggle {
  font-size: 16px;
}

.errorMessage {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--error-color);
  line-height: var(--line-height-base);
}

.helpText {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  line-height: var(--line-height-base);
}

.characterCount {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  text-align: right;
  line-height: var(--line-height-base);
}

// 焦点样式增强
.input:focus-visible {
  outline: none;
}

// 高对比度主题支持
[data-theme="high-contrast"] .input {
  border-width: 2px;
  
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
}

// 打印样式
@media print {
  .input {
    border: 1px solid #000;
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
  }
}
</style> 