import { createStore } from 'vuex'
// import { createPersistedstate } from 'vuex-persistedstate' // 引入 vuex 持久化包
import createPersistedstate from 'vuex-persistedstate'
// 引入三个子模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
// 创建vuex仓库并导出
export default createStore({
  state: {
    // 数据
  },
  mutations: {
    // 改数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
    user,
    cart,
    category
  },
  getters: {
    // vuex的计算属性
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
