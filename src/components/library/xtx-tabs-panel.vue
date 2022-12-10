<template>
  <!-- 装载内容 -->
  <div class="xtx-tabs-panel" v-show="name===activeName">
    <slot />
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'XtxTabsPanel',
  // label 选项开文字; name选项卡唯一标识
  // $slot.default() 默认插槽内容
  props: {
    // 标签页标题
    label: {
      type: String,
      default: ''
    },
    // 唯一标识
    name: {
      type: [String, Number],
      default: ''
    }
  },
  setup () {
    // 当前组件该不该显示,取决于 xtx-tabs组件的activeName数据 是否等于 props.name
    const activeName = inject('activeName')
    return { activeName }
  }
}
</script>
