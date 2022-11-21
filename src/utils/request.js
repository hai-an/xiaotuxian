// 1.创建一个新的axios实例
// 2.请求拦截器: 判断有无携带token,并添加token到请求头
// 3.响应器拦截器: 1.剥离无效数据 2.清除过期token
// 4.导出一个函数,调用当前的axios实例发请求,返回值Promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 6000
  // headers: headers
})

// axios设置请求拦截器
instance.interceptors.request.use(config => {
  // config.headers. ='nihao' // 设置响应头
  const { profile } = store.state.user
  console.log(profile.token)

  if (profile.token) { // 有token
    config.headers.Authorization = `Bearer ${profile.token}` // 设置请求头参数
  }
  return config
}, err => {
  return Promise.reject(err)
  // console.log(err)
})

// axios设置响应拦截器
instance.interceptors.response.use(response => {
  return response.data // 拦截处理响应结果，直接返回需要的数据
}, err => {
  if (err.response && err.response.status === 401) { // token过期响应码401
    // 1.清空无效信息
    // 2.跳转登录页
    // 3.跳转需要传参（当前路由地址）给登录页码
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件里头: `/user?a=1` $route.path === /user $route.fullPath === /user?a=1
    // js模块中: router.currentRoute.value.fullPath 就是当前路由地址,router.currentRoute.fullPath 就是ref响应式路由地址
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // encodeURIComponent 转换uri编码,防止解析地址出问题
    router.push('/login/login?redirectUrl=' + fullPath)
  }
  console.log(err)
})
// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求: 请求地址 , 请求方法, 提交数据
  return instance({
    url,
    method,
    // 1.如果是get请求,需要使用 params 来传递submitData ?a=10&c=1
    // 2.如果不是get请求, 需要使用data来传递submitData 请求体传参
    // [] 设置一个动态的key, 写JS表达式,js表达式的执行结果当作 KEY
    // method 参数: get,Get,GET 转换成小写再来判断
    // 在对象， ['params]:submitData === params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
