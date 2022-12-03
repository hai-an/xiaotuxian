// 1.导入消息提示组件
// 2.设置虚拟节点
// 3.准备一个 提示组件的dom容器
// 4.将虚拟节点渲染在 dom 容器中
// 5.无论执行 resolve 或 reject 都要销毁组件
import XtxConfirm from './xtx-confirm.vue'
import { render, createVNode } from 'vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm')
document.body.appendChild(div) // 添加到 dom树里

// 设置虚拟节点
// 该函数渲染XtxConfirm组件, title(提示标题) 和 text(提示文本)
// 函数返回值 Promise
export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    // 确定
    const submitCallback = () => {
      render(null, div) // 销毁组件
      resolve()
    }
    // 取消
    const cancelCallback = () => {
      render(null, div) // 销毁组件
      reject(new Error('点击取消'))
    }
    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    // 3. 点击取消按钮，触发reject同时销毁组件
    const vnode = createVNode(XtxConfirm, { title, text, submitCallback, cancelCallback })
    render(vnode, div) // 创建组件
  })
}
