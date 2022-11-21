import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 重置样式的库normalize
import '@/assets/styles/common.less' // 导入公共样式
createApp(App).use(store).use(router).mount('#app')
