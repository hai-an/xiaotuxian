import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index')

const Login = () => import('@/views/login/index') // 登录页面
const LoginCallback = () => import('@/views/login/callback') // 登录重定向
const Cart = () => import('@/views/cart/index')
const PayCheckout = () => import('@/views/member/pay/checkout')
const Pay = () => import('@/views/member/pay/index.vue')
const PayResult = () => import('@/views/member/pay/result')
const routes = [
// 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: PayCheckout },
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayResult }
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

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  // 没有token, // 跳转去member开头的地址却没有登录 /member
  if (!store.state.user.profile.token && to.path.startsWith('/member')) {
    // console.log('to.fullPath', to.fullPath = /member/checkout)
    next({ path: '/login', query: { redirectUrl: to.fullPath } }) // 去到登录页,成功之后 重定向到
  }
  next() // 放行
})
export default router
