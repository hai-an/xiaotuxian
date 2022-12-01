// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        account: '', // 用户账号
        avatar: '', // 头像
        nickname: '', // 姓名
        mobile: '',
        token: ''
      },
      // 登录后的回跳的页面地址
      redirectUrl: '/'
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    },
    // 设置登录后的回跳的页面地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}
