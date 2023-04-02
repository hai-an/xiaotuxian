import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import store from '@/store'
import { h } from 'vue'
const routes = [
// 一级路由
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/', component: () => import('@/views/home/index.vue') },
      { path: '/category/:id', component: () => import('@/views/category/index.vue') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub.vue') },
      { path: '/product/:id', component: () => import('@/views/goods/index.vue') },
      { path: '/cart', component: () => import('@/views/cart/index.vue') },
      { path: '/member/checkout', component: () => import('@/views/member/pay/checkout.vue') },
      { path: '/member/pay', component: () => import('@/views/member/pay/index.vue') },
      { path: '/pay/callback', component: () => import('@/views/member/pay/result.vue') },
      {
        path: '/member',
        component: (resolve) => require(['@/viewsmember/Layout.vue'], resolve),
        children: [
          { path: '/member', component: () => import('@/views/member/home/index.vue') }, // 个人中心
          // { path: '/member/order', component: MemberOrder }
          {
            path: '/member/order', // 个人订单
            // vue3.0 需要有嵌套关系才能模糊匹配
            component: { render: () => h(RouterView) },
            children: [
              { path: '', component: () => import('@/views/member/order/index.vue') },
              { path: ':id', component: () => import('@/views/member/order/detail.vue') }
            ]
          }
        ]
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index') }, // 登录页面
  { path: '/login/callback', component: () => import('@/views/login/callback') } // 登录重定向

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
