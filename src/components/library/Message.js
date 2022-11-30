// 提供一个能够显示 xtx-message组件的函数
// 这个函数将来: 导入直接使用,也可以挂载到vue实型上
// import Message from 'Message.js' 使用 Message({type:'error', text:'提示文字',duration: 秒数,})
// this.$message({
//   type: 'success', // success error warning
//   message: '注册成功',
//   duration: 2000,
// })
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// Dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div) // 添加到 dom树里

// 定时器
let timer = null

export default ({ type, text, duration = 1500 }) => {
// 渲染组件
// 1.导入消息提示组件
// 2.将消息提示组件编译为 虚拟节点(dom节点)
//  createVNode(组件,属性对象(props))
  const vnode = createVNode(XtxMessage, { type, text })
  // 3.准备一个装载消息提示组件的容器
  // 4.将虚拟节点渲染 在 容器中
  // render(虚拟节点, DOM容器)
  render(vnode, div)
  // 5.销毁定时器 n秒后,销毁容器
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, duration)
}
