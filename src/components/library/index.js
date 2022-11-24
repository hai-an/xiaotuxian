// 扩展vue原有的功能: 全局组件, 自定义指令 ,挂载原型方法 ,注意: 没有全局过滤器
// 这就是插件
// vue2.0 插件写法要素: 导出一个对象,有install函数,默认传入了vue构造函数,vue基础之上扩展
// vue3.0 插件写法要素: 导出一个对象,有install函数,默认传入了app应用实例,app基础之上扩展
import defaultImg from '@/assets/images/200.png' // 导入加载失败的默认图片
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching) // 它又一个属性 keys() 获取所有的文件路径
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    // 在app上进行扩展,app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties  方式
    // app.component(XtxSkeleton.name, XtxSkeleton) // 全局注册 骨架组件
    // app.component(XtxCarousel.name, XtxCarousel) // 全局注册 轮播图组件
    // app.component(XtxMore.name, XtxMore) // 全局注册 更多分类组件
    // app.component(XtxBread.name, XtxBread) // 全局注册 面包屑组件
    // app.component(XtxBreadItem.name, XtxBreadItem) // 全局注册 面包屑组件

    // console.dir(importFn.keys()) 文件名称数组
    importFn.keys().forEach(item => {
      // console.log('item', item)  // item 拿到的是 文件路径
      // 获取组件对象
      const component = importFn(item).default
      // 注册组件
      app.component(item.name, component)
    })

    // 自定义指令
    defineDirective(app) // 全局注册 图片懒加载指令
  }
}
const defineDirective = (app) => {
  // 1.图片懒加载指令 v-lazy
  // 原理: 先存储图片地址不能在src上,但图片进入可视区,再将存储的图片地址设置给图片元素即可
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好,钩子函数: inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样,使用指令的DOM是否创建好,钩子函数: mounted
    mounted (el, binding) {
      // 2.创建一个观察对象,来观察当前使用的指令元素
      console.log('IntersectionObserver', IntersectionObserver)

      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 进入可视区, 调用 停止观察 的方法
          console.log('进入可视区', binding, el)

          observe.unobserve(el)
          // 4.处理图片加载失败 error 图片加载失败的事件 load 图片加载成功
          el.onerror = () => {
            // 加载失败,设置默认图片
            el.src = defaultImg
          }
          // 3.把指令的值设置给el的src属性 binding.value 就是指令的值
          el.src = binding.value
        }
      }, {
        // 相交的距离 => 触发 有效的可视区
        threshold: 0.01
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
// 原生方法
// 创建观察对象实例
// const observer = new IntersectionObserver(callback[, options])
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom
