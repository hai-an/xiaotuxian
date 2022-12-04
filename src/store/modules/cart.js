import { getNewCartGoods, mergeLocalCart, findCartList } from '@/api/cart'

// 购物车模块
export default {
  namespaced: true,
  state () {
    return {
      // 购物车信息
      list: []
    }
  },
  // 本地: id skuId name picture price nowPrice count attrsText selected stock isEffective
  // 线上:比上面 isCollect 有用 discount 无用,两项信息
  mutations: {
    // 设置购物车列表
    setCartList (state, list) {
      state.list = list
    },
    // 加入购物车
    insertCart (state, goods) {
      const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId)
      // 逻辑: 有相同的给 goods累加数量,删除 相同的skuId的商品
      if (sameIndex >= 0) { // findIndex方法 找不到返回-1,
        goods.count = state.list[sameIndex].count + goods.count
        state.list.splice(sameIndex, 1) // 从索引为 sameIndex 的位置,删除一个元素
      }
      state.list.unshift(goods) // 每次 新增商品(种类)/新增商品数量(相同规格) 都会排在最上面
    },
    // 修改购物车
    updateCart (state, goods) {
      // goods中字段有可能不完整,goods有的信息才去修改
      // 1.goods中必须有 skuId,才能找到对应的商品信息
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品 => 删除 商品规格id即可
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 合并本地购物车
    async  mergeLocalCart (ctx) {
      // 存储token后,调用api接口进行合并
      const cartList = ctx.getters.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      await mergeLocalCart(cartList)
      // 合并成功,将本地购物车清空
      ctx.commit('setCartList', [])
    },
    // 修改sku规格函数
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 1.获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2.删除旧的商品
          ctx.commit('deleteCart', oldSkuId)
          // 3.合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4.去插入即可
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 批量删除选中的商品
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 做有效商品的全选&反选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改购物车(选中状态,数量)
    updateCart (ctx, payload) {
      // payload: 必须 有 skuId, 可能有 selected count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {
          // 已登录 TODO
        } else {
          // 未登录
          ctx.commit('insertCart', goods)
          resolve()
        }
      })
    },
    // 获取购物车列表
    findCartList (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录
          findCartList().then(data => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
        } else {
          // 本地
          // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
          // 传参数 promise数组
          const promiseArr = ctx.state.list.map(item => {
            // 返回接口函数的调用
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr).then(dataArr => {
            dataArr.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          }).catch(e => reject(e))
        }
      })
    },
    // 删除购物车商品
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录
        } else {
          // 本地
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品 列表
    validList (state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品数量/件数
    validTotal (state, getters) {
      // console.log('state, getters', state, getters)

      return getters.validList.reduce((c, p) => c + p.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(item => item.stock <= 0 && !item.isEffective)
    },
    // 已选商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品总件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((c, p) => c + p.count, 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  }
}
