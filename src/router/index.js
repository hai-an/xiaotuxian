import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index')

const Login = () => import('@/views/login/index') // 登录页面
const LoginCallback = () => import('@/views/login/callback') // 登录重定向
const routes = [
// 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }
    ]
  },
  { path: '/login', component: Login }, // 登录页面
  { path: '/login/callback', component: LoginCallback } // 登录重定向
]

// 创建路由实例
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
