import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyButton from '../packages/components/button/MyButton.vue'

describe('MyButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyButton, {
      slots: {
        default: '按钮文本'
      }
    })
    
    expect(wrapper.text()).toContain('按钮文本')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies correct type class', () => {
    const wrapper = mount(MyButton, {
      props: {
        type: 'primary'
      }
    })
    
    expect(wrapper.classes()).toContain('button--primary')
  })

  it('applies correct size class', () => {
    const wrapper = mount(MyButton, {
      props: {
        size: 'large'
      }
    })
    
    expect(wrapper.classes()).toContain('button--large')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(MyButton)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(MyButton, {
      props: {
        disabled: true
      }
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click event when loading', async () => {
    const wrapper = mount(MyButton, {
      props: {
        loading: true
      }
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies disabled class when disabled', () => {
    const wrapper = mount(MyButton, {
      props: {
        disabled: true
      }
    })
    
    expect(wrapper.classes()).toContain('button--disabled')
  })

  it('applies loading class when loading', () => {
    const wrapper = mount(MyButton, {
      props: {
        loading: true
      }
    })
    
    expect(wrapper.classes()).toContain('button--loading')
  })

  it('applies block class when block prop is true', () => {
    const wrapper = mount(MyButton, {
      props: {
        block: true
      }
    })
    
    expect(wrapper.classes()).toContain('button--block')
  })

  it('applies ghost class when ghost prop is true', () => {
    const wrapper = mount(MyButton, {
      props: {
        ghost: true
      }
    })
    
    expect(wrapper.classes()).toContain('button--ghost')
  })

  it('sets correct button type attribute', () => {
    const wrapper = mount(MyButton, {
      props: {
        htmlType: 'submit'
      }
    })
    
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('shows loading icon when loading', () => {
    const wrapper = mount(MyButton, {
      props: {
        loading: true
      }
    })
    
    expect(wrapper.find('.loadingIcon').exists()).toBe(true)
  })

  it('shows icon when icon prop is provided', () => {
    const wrapper = mount(MyButton, {
      props: {
        icon: '🚀'
      }
    })
    
    expect(wrapper.find('.icon').exists()).toBe(true)
  })

  it('does not show icon when loading', () => {
    const wrapper = mount(MyButton, {
      props: {
        icon: '🚀',
        loading: true
      }
    })
    
    expect(wrapper.find('.icon').exists()).toBe(false)
  })
}) 