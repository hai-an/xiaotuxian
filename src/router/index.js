import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
// 一级路由
  {
    path: '/',
    component: () => '@/views/LayOut.vue',
    children: [
      { path: '/', component: () => '@/views/home' }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes
})

export default router
