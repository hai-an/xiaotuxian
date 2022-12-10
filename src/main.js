import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入自定义的UI库
import ui from './components/library'
import 'normalize.css' // 重置样式的库normalize
import '@/assets/styles/common.less' // 导入公共样式
// 3.使用mock
import './mock'
// 插件的使用，在main.js使用app.use(插件)
createApp(App).use(store).use(router).use(ui).mount('#app')
