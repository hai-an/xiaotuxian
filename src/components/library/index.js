// 扩展vue原有的功能: 全局组件, 自定义指令 ,挂载原型方法 ,注意: 没有全局过滤器
// 这就是插件
// vue2.0 插件写法要素: 导出一个对象,有install函数,默认传入了vue构造函数,vue基础之上扩展
// vue3.0 插件写法要素: 导出一个对象,有install函数,默认传入了app应用实例,app基础之上扩展
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png' // 导入加载失败的默认图片
export default {
  install (app) {
    // 在app上进行扩展,app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties  方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    defineDirective(app)
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

      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 进入可视区, 调用 停止观察 的方法
          console.log('进入可视区', binding, el)

          observer.unobserve(el)
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
      observer.observe(el)
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
