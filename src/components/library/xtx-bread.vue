<!-- <template>
  <div class='xtx-bread'>
   <slot></slot>
  </div>
</template> -->

<script>
import { h } from 'vue'

// 1. template 标签去除,单文件组件
// 2.返回值就是组件内容
// 3. vue2.0 的h函数传参进来的, vue3.0的h函数导入进来
// 4.h第一个参数 标签名字 第二个参数 标签属性对象 第三个参数 子节点

// 需求return h('div', { class: 'xtx-bread' }, '子节点')

// 1.创建xtx-bread 父容器
// 2.获取默认插槽内容
// 3.去除xtx-bread-item组件的i标签,应该由render函数组织
// 4.遍历插槽中的item,得到一个动态创建的节点,最后一个item不加i标签
// 5.把动态创建的节点渲染再xtx-bread标签中
export default {
  name: 'XtxBread',
  render () {
    const items = this.$slots.default() // 拿到默认插槽的标签结构
    const dymanicItems = [] // 定义动态的标签数组
    items.forEach((item, i) => { // item:每一项 i:索引值
      dymanicItems.push(item)
      if (i < (items.length - 1)) { // 当索引值不小于 数组长度-1时,不添加 i 标签
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }

}
</script>
<!-- 去掉scoped全局作用 -->
<!--  去除 scoped 属性，目的：然样式作用到xtx-bread-item组件 -->
<style lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素，找到所有的子元素，找到最后一个，判断是不是LI，是就是选中，不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素，找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>
