import { createApp } from 'vue'
import App from './App.vue'
import KlenComponents from '../packages'

// 创建应用
const app = createApp(App)

// 使用UI库
app.use(KlenComponents)

// 挂载应用
app.mount('#app') 