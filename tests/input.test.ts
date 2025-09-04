import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyInput from '../packages/components/input/MyInput.vue'

describe('MyInput', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyInput)
    
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('applies model value', () => {
    const wrapper = mount(MyInput, {
      props: {
        modelValue: 'test value'
      }
    })
    
    expect(wrapper.find('input').element.value).toBe('test value')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(MyInput)
    const input = wrapper.find('input')
    
    await input.setValue('new value')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('emits change event', async () => {
    const wrapper = mount(MyInput)
    const input = wrapper.find('input')
    
    await input.trigger('change')
    
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('emits focus event', async () => {
    const wrapper = mount(MyInput)
    const input = wrapper.find('input')
    
    await input.trigger('focus')
    
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event', async () => {
    const wrapper = mount(MyInput)
    const input = wrapper.find('input')
    
    await input.trigger('blur')
    
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('applies correct type attribute', () => {
    const wrapper = mount(MyInput, {
      props: {
        type: 'password'
      }
    })
    
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('applies correct size class', () => {
    const wrapper = mount(MyInput, {
      props: {
        size: 'large'
      }
    })
    
    expect(wrapper.classes()).toContain('input--large')
  })

  it('applies disabled attribute when disabled', () => {
    const wrapper = mount(MyInput, {
      props: {
        disabled: true
      }
    })
    
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('applies readonly attribute when readonly', () => {
    const wrapper = mount(MyInput, {
      props: {
        readonly: true
      }
    })
    
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('applies required attribute when required', () => {
    const wrapper = mount(MyInput, {
      props: {
        required: true
      }
    })
    
    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('applies maxlength attribute', () => {
    const wrapper = mount(MyInput, {
      props: {
        maxlength: 100
      }
    })
    
    expect(wrapper.find('input').attributes('maxlength')).toBe('100')
  })

  it('applies minlength attribute', () => {
    const wrapper = mount(MyInput, {
      props: {
        minlength: 10
      }
    })
    
    expect(wrapper.find('input').attributes('minlength')).toBe('10')
  })

  it('applies pattern attribute', () => {
    const wrapper = mount(MyInput, {
      props: {
        pattern: '[A-Za-z]{3}'
      }
    })
    
    expect(wrapper.find('input').attributes('pattern')).toBe('[A-Za-z]{3}')
  })

  it('applies autocomplete attribute', () => {
    const wrapper = mount(MyInput, {
      props: {
        autocomplete: 'email'
      }
    })
    
    expect(wrapper.find('input').attributes('autocomplete')).toBe('email')
  })

  it('applies autofocus attribute when autofocus is true', () => {
    const wrapper = mount(MyInput, {
      props: {
        autofocus: true
      }
    })
    
    expect(wrapper.find('input').attributes('autofocus')).toBeDefined()
  })

  it('applies name attribute', () => {
    const wrapper = mount(MyInput, {
      props: {
        name: 'test-input'
      }
    })
    
    expect(wrapper.find('input').attributes('name')).toBe('test-input')
  })

  it('shows label when label prop is provided', () => {
    const wrapper = mount(MyInput, {
      props: {
        label: 'Test Label'
      }
    })
    
    expect(wrapper.text()).toContain('Test Label')
  })

  it('shows required indicator when required', () => {
    const wrapper = mount(MyInput, {
      props: {
        label: 'Test Label',
        required: true
      }
    })
    
    expect(wrapper.text()).toContain('*')
  })

  it('shows prefix when prefix prop is provided', () => {
    const wrapper = mount(MyInput, {
      props: {
        prefix: '💰'
      }
    })
    
    expect(wrapper.text()).toContain('💰')
  })

  it('shows suffix when suffix prop is provided', () => {
    const wrapper = mount(MyInput, {
      props: {
        suffix: '元'
      }
    })
    
    expect(wrapper.text()).toContain('元')
  })

  it('shows clear button when clearable and has value', () => {
    const wrapper = mount(MyInput, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })
    
    expect(wrapper.find('.clearButton').exists()).toBe(true)
  })

  it('does not show clear button when no value', () => {
    const wrapper = mount(MyInput, {
      props: {
        modelValue: '',
        clearable: true
      }
    })
    
    expect(wrapper.find('.clearButton').exists()).toBe(false)
  })

  it('does not show clear button when disabled', () => {
    const wrapper = mount(MyInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        disabled: true
      }
    })
    
    expect(wrapper.find('.clearButton').exists()).toBe(false)
  })

  it('emits clear event when clear button is clicked', async () => {
    const wrapper = mount(MyInput, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })
    
    await wrapper.find('.clearButton').trigger('click')
    
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('shows password toggle when showPasswordToggle is true and type is password', () => {
    const wrapper = mount(MyInput, {
      props: {
        type: 'password',
        showPasswordToggle: true
      }
    })
    
    expect(wrapper.find('.passwordToggle').exists()).toBe(true)
  })

  it('does not show password toggle when type is not password', () => {
    const wrapper = mount(MyInput, {
      props: {
        type: 'text',
        showPasswordToggle: true
      }
    })
    
    expect(wrapper.find('.passwordToggle').exists()).toBe(false)
  })

  it('toggles password visibility when password toggle is clicked', async () => {
    const wrapper = mount(MyInput, {
      props: {
        type: 'password',
        showPasswordToggle: true
      }
    })
    
    const input = wrapper.find('input')
    const toggle = wrapper.find('.passwordToggle')
    
    expect(input.attributes('type')).toBe('password')
    
    await toggle.trigger('click')
    
    expect(input.attributes('type')).toBe('text')
  })

  it('shows error message when errorMessage is provided', () => {
    const wrapper = mount(MyInput, {
      props: {
        errorMessage: 'This is an error'
      }
    })
    
    expect(wrapper.text()).toContain('This is an error')
  })

  it('shows help text when helpText is provided and no error', () => {
    const wrapper = mount(MyInput, {
      props: {
        helpText: 'This is help text'
      }
    })
    
    expect(wrapper.text()).toContain('This is help text')
  })

  it('does not show help text when errorMessage is provided', () => {
    const wrapper = mount(MyInput, {
      props: {
        helpText: 'This is help text',
        errorMessage: 'This is an error'
      }
    })
    
    expect(wrapper.text()).not.toContain('This is help text')
  })

  it('shows character count when showCount is true', () => {
    const wrapper = mount(MyInput, {
      props: {
        modelValue: 'test',
        showCount: true
      }
    })
    
    expect(wrapper.text()).toContain('4')
  })

  it('shows character count with maxlength when both are provided', () => {
    const wrapper = mount(MyInput, {
      props: {
        modelValue: 'test',
        showCount: true,
        maxlength: 100
      }
    })
    
    expect(wrapper.text()).toContain('4 / 100')
  })

  it('applies error class when has error', () => {
    const wrapper = mount(MyInput, {
      props: {
        errorMessage: 'Error message'
      }
    })
    
    expect(wrapper.classes()).toContain('inputWrapper--error')
  })
}) 