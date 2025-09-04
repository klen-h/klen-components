<template>
  <div class="app">
    <header class="header">
      <h1>Klen Components 示例</h1>
      <div class="theme-switcher">
        <button @click="toggleTheme" class="theme-btn">
          {{ currentThemeConfig?.icon }} {{ currentThemeConfig?.label }}
        </button>
      </div>
    </header>
    
    <main class="main">
      <section class="section">
        <h2>按钮组件</h2>
        <div class="demo-group">
          <h3>基础按钮</h3>
          <div class="demo-row">
            <MyButton>默认按钮</MyButton>
            <MyButton type="primary">主要按钮</MyButton>
            <MyButton type="secondary">次要按钮</MyButton>
            <MyButton type="success">成功按钮</MyButton>
            <MyButton type="warning">警告按钮</MyButton>
            <MyButton type="danger">危险按钮</MyButton>
            <MyButton type="ghost">幽灵按钮</MyButton>
          </div>
        </div>
        
        <div class="demo-group">
          <h3>按钮尺寸</h3>
          <div class="demo-row">
            <MyButton size="small">小按钮</MyButton>
            <MyButton size="medium">中按钮</MyButton>
            <MyButton size="large">大按钮</MyButton>
          </div>
        </div>
        
        <div class="demo-group">
          <h3>按钮状态</h3>
          <div class="demo-row">
            <MyButton :loading="true">加载中</MyButton>
            <MyButton disabled>禁用按钮</MyButton>
            <MyButton block>块级按钮</MyButton>
          </div>
        </div>
        
        <div class="demo-group">
          <h3>按钮事件</h3>
          <div class="demo-row">
            <MyButton @click="handleButtonClick">点击我</MyButton>
            <MyButton @click="handleButtonClick" type="success">成功操作</MyButton>
            <MyButton @click="handleButtonClick" type="danger">危险操作</MyButton>
          </div>
        </div>
      </section>
      
      <section class="section">
        <h2>输入框组件</h2>
        <div class="demo-group">
          <h3>基础输入框</h3>
          <div class="demo-row">
            <MyInput v-model="inputValue" placeholder="请输入内容" />
          </div>
        </div>
        
        <div class="demo-group">
          <h3>输入框类型</h3>
          <div class="demo-row">
            <MyInput v-model="emailValue" type="email" placeholder="请输入邮箱" />
            <MyInput v-model="passwordValue" type="password" placeholder="请输入密码" show-password-toggle />
            <MyInput v-model="numberValue" type="number" placeholder="请输入数字" />
          </div>
        </div>
        
        <div class="demo-group">
          <h3>输入框尺寸</h3>
          <div class="demo-row">
            <MyInput v-model="inputValue" size="small" placeholder="小尺寸" />
            <MyInput v-model="inputValue" size="medium" placeholder="中尺寸" />
            <MyInput v-model="inputValue" size="large" placeholder="大尺寸" />
          </div>
        </div>
        
        <div class="demo-group">
          <h3>输入框特性</h3>
          <div class="demo-row">
            <MyInput v-model="inputValue" clearable placeholder="可清空" />
            <MyInput v-model="inputValue" prefix="💰" suffix="元" placeholder="带前缀后缀" />
            <MyInput v-model="inputValue" show-count :maxlength="50" placeholder="显示字数统计" />
          </div>
        </div>
        
        <div class="demo-group">
          <h3>输入框状态</h3>
          <div class="demo-row">
            <MyInput v-model="inputValue" disabled placeholder="禁用状态" />
            <MyInput v-model="inputValue" readonly placeholder="只读状态" />
            <MyInput v-model="inputValue" error-message="这是一个错误信息" placeholder="错误状态" />
            <MyInput v-model="inputValue" help-text="这是一个帮助信息" placeholder="帮助信息" />
          </div>
        </div>
      </section>
      
      <section class="section">
        <h2>主题切换</h2>
        <div class="demo-group">
          <h3>可用主题</h3>
          <div class="demo-row">
            <button 
              v-for="theme in availableThemes" 
              :key="theme.name"
              @click="setTheme(theme.name)"
              :class="['theme-option', { active: theme.name === theme }]"
            >
              {{ theme.icon }} {{ theme.label }}
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MyButton, MyInput, useTheme } from '../packages'

// 使用主题
const { theme, setTheme, toggleTheme, availableThemes, currentThemeConfig } = useTheme()

// 响应式数据
const inputValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
const numberValue = ref('')

// 事件处理
const handleButtonClick = () => {
  alert('按钮被点击了！')
}

// 组件名称
defineOptions({
  name: 'App'
})
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) var(--spacing-xl);
  background-color: var(--white);
  border-bottom: 1px solid var(--border-color-light);
  box-shadow: var(--shadow-sm);
  
  h1 {
    margin: 0;
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    color: var(--primary-color);
  }
}

.theme-switcher {
  .theme-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-size: var(--font-size-sm);
    transition: all var(--transition-base);
    
    &:hover {
      background-color: var(--primary-hover);
    }
  }
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.section {
  margin-bottom: var(--spacing-xxl);
  
  h2 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid var(--primary-color);
  }
}

.demo-group {
  margin-bottom: var(--spacing-xl);
  
  h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-md);
    color: var(--text-color-secondary);
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  align-items: center;
  
  > * {
    margin-bottom: var(--spacing-sm);
  }
}

.theme-option {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all var(--transition-base);
  
  &:hover {
    border-color: var(--primary-color);
    background-color: var(--primary-light);
  }
  
  &.active {
    background-color: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .demo-row {
    flex-direction: column;
    align-items: stretch;
    
    > * {
      width: 100%;
    }
  }
  
  .main {
    padding: var(--spacing-md);
  }
}
</style> 