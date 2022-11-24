// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// stop 是停止观察是否进入或移出可视区域的行为
// const { stop } = useIntersectionObserver(
//   // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
//   target,
//   // isIntersecting 是否进入可视区域，true是进入 false是移出
//   // observerElement 被观察的dom
//   ([{ isIntersecting }], observerElement) => {
//     // 在此处可根据isIntersecting来判断，然后做业务
//   },
// )
export const userLazyData = (apiFn) => {
// 1.需要被观察对象
// 2.需要api函数

  const result = ref([])
  const target = ref(null)
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
    // 在此处可根据isIntersecting来判断，然后做业务
    // 进入可视区 => 停止观察 => 调用api 接口函数 返回数据
    if (isIntersecting) {
      stop()
      // 调用api 函数
      apiFn().then((data) => {
        result.value = data.result
      })
    }
  }, { // 第三参数 : 配置项
    // threshold 容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件。
    threshold: 0
  }
  )
  // 返回--->数据（dom,后台数据）

  return { result, target }
}
