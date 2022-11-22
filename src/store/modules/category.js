// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
//  分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合
      // 如果是空数组,就不会显示头部分类导航
      // 根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    // 修改分类数据
    setList (state, payload) {
      state.list = payload
    },
    // 定义 控制弹窗隐藏与显示的函数 需要 state数据 和 目标id
    show (state, item) {
      // state.list.forEach((id) => {
      //   if (id === id) {
      //     item.open = true
      //     return true
      //   }
      // })
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    // 获取分类数据
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 给每个一级项 添加 open 控制弹窗隐藏
      result.forEach(top => {
        top.open = false // 默认隐藏
      })
      commit('setList', result) // 获取数据成功，提交mutations进行数据修改
    }
  }
}
