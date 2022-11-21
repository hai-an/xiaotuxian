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
    }
  },
  actions: {
    // 获取分类数据
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      commit('setList', result) // 获取数据成功，提交mutations进行数据修改
    }
  }
}
