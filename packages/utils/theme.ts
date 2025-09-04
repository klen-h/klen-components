import { ref, computed, onMounted, onUnmounted, readonly } from 'vue'
import type { App } from 'vue'

export type ThemeType = 'light' | 'dark' | 'high-contrast';

export interface ThemeConfig {
  name: ThemeType;
  label: string;
  icon?: string;
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  { name: 'light', label: '浅色主题', icon: '☀️' },
  { name: 'dark', label: '深色主题', icon: '🌙' },
  { name: 'high-contrast', label: '高对比度', icon: '🔍' }
];

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: ThemeType = 'light';
  private listeners: Set<(theme: ThemeType) => void> = new Set();
  private storageKey = 'my-ui-theme';

  private constructor() {
    this.init();
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private init(): void {
    // 从localStorage恢复主题
    const savedTheme = this.getSavedTheme();
    if (savedTheme) {
      this.setTheme(savedTheme, false);
    } else {
      // 检查系统主题偏好
      this.detectSystemTheme();
    }

    // 监听系统主题变化
    this.listenSystemThemeChange();
  }

  private getSavedTheme(): ThemeType | null {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved && AVAILABLE_THEMES.some(t => t.name === saved) ? saved as ThemeType : null;
    } catch {
      return null;
    }
  }

  private saveTheme(theme: ThemeType): void {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // 忽略存储错误
    }
  }

  private detectSystemTheme(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      
      if (prefersHighContrast) {
        this.setTheme('high-contrast', false);
      } else if (prefersDark) {
        this.setTheme('dark', false);
      } else {
        this.setTheme('light', false);
      }
    }
  }

  private listenSystemThemeChange(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      // 监听深色模式变化
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkQuery.addEventListener('change', (e) => {
        if (this.currentTheme === 'dark' || this.currentTheme === 'light') {
          const newTheme: ThemeType = e.matches ? 'dark' : 'light';
          this.setTheme(newTheme, false);
        }
      });

      // 监听高对比度变化
      const contrastQuery = window.matchMedia('(prefers-contrast: high)');
      contrastQuery.addEventListener('change', (e) => {
        if (e.matches) {
          this.setTheme('high-contrast', false);
        } else if (this.currentTheme === 'high-contrast') {
          this.detectSystemTheme();
        }
      });
    }
  }

  setTheme(theme: ThemeType, save: boolean = true): void {
    if (!AVAILABLE_THEMES.some(t => t.name === theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }

    if (this.currentTheme === theme) {
      return;
    }

    this.currentTheme = theme;
    
    // 设置HTML属性
    document.documentElement.setAttribute('data-theme', theme);
    
    // 保存到localStorage
    if (save) {
      this.saveTheme(theme);
    }

    // 触发主题变化事件
    this.notifyListeners(theme);
    
    // 触发自定义事件
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('themechange', { 
        detail: { theme, previousTheme: this.currentTheme } 
      }));
    }
  }

  getTheme(): ThemeType {
    return this.currentTheme;
  }

  getThemeConfig(): ThemeConfig | undefined {
    return AVAILABLE_THEMES.find(t => t.name === this.currentTheme);
  }

  toggleTheme(): void {
    const themes = AVAILABLE_THEMES.map(t => t.name);
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  cycleTheme(): void {
    this.toggleTheme();
  }

  isDark(): boolean {
    return this.currentTheme === 'dark';
  }

  isLight(): boolean {
    return this.currentTheme === 'light';
  }

  isHighContrast(): boolean {
    return this.currentTheme === 'high-contrast';
  }

  // 监听器管理
  addListener(listener: (theme: ThemeType) => void): () => void {
    this.listeners.add(listener);
    
    // 返回移除监听器的函数
    return () => {
      this.listeners.delete(listener);
    };
  }

  removeListener(listener: (theme: ThemeType) => void): void {
    this.listeners.delete(listener);
  }

  private notifyListeners(theme: ThemeType): void {
    this.listeners.forEach(listener => {
      try {
        listener(theme);
      } catch (error) {
        console.error('Theme listener error:', error);
      }
    });
  }

  // 获取主题相关的CSS变量值
  getThemeValue(cssVariable: string): string {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
    }
    return '';
  }

  // 获取所有主题相关的CSS变量
  getThemeValues(): Record<string, string> {
    const values: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const cssVars = [
        '--primary-color',
        '--success-color',
        '--warning-color',
        '--error-color',
        '--text-color',
        '--background-color',
        '--border-color'
      ];
      
      cssVars.forEach(varName => {
        values[varName] = computedStyle.getPropertyValue(varName).trim();
      });
    }
    return values;
  }

  // 重置为系统主题
  resetToSystem(): void {
    this.detectSystemTheme();
  }

  // 获取可用主题列表
  getAvailableThemes(): ThemeConfig[] {
    return [...AVAILABLE_THEMES];
  }

  // 检查主题是否可用
  isThemeAvailable(theme: string): boolean {
    return AVAILABLE_THEMES.some(t => t.name === theme);
  }
}

// 导出单例实例
export const themeManager = ThemeManager.getInstance();

// 导出Vue组合式函数
export function useTheme() {
  const theme = ref<ThemeType>(themeManager.getTheme());
  
  const setTheme = (newTheme: ThemeType) => {
    themeManager.setTheme(newTheme);
  };
  
  const toggleTheme = () => {
    themeManager.toggleTheme();
  };
  
  const isDark = computed(() => themeManager.isDark());
  const isLight = computed(() => themeManager.isLight());
  const isHighContrast = computed(() => themeManager.isHighContrast());
  
  const availableThemes = computed(() => themeManager.getAvailableThemes());
  const currentThemeConfig = computed(() => themeManager.getThemeConfig());
  
  // 监听主题变化
  onMounted(() => {
    const removeListener = themeManager.addListener((newTheme) => {
      theme.value = newTheme;
    });
    
    onUnmounted(() => {
      removeListener();
    });
  });
  
  return {
    theme: readonly(theme),
    setTheme,
    toggleTheme,
    isDark,
    isLight,
    isHighContrast,
    availableThemes,
    currentThemeConfig
  };
}

// 导出Vue插件
export const ThemePlugin = {
  install(app: App) {
    app.config.globalProperties.$theme = themeManager;
    
    // 提供主题管理器
    app.provide('theme', themeManager);
    
    // 添加全局属性
    app.config.globalProperties.$setTheme = (theme: ThemeType) => {
      themeManager.setTheme(theme);
    };
    
    app.config.globalProperties.$getTheme = () => {
      return themeManager.getTheme();
    };
  }
}; 