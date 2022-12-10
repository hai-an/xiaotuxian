<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props, { emit }) {
    // 绑定 v-model 数据
    const activeName = useVModel(props, 'modelValue', emit)
    // 点击 tab导航事件,替换 唯一标识
    const tabClick = (name, index) => {
      activeName.value = name // 使点击的标识 替换 当前的标识

      // 提供自定义事件 => 子组件点击tab => 父组件获取数据
      emit('tabClick', { activeName, index })
    }
    // 给 xtx-tabs-panel传值 activeName,共享给panel组件
    provide('activeName', activeName)
    return { activeName, tabClick }
  },
  render () {
    // 获取插槽内容
    const panels = this.$slots.default()
    // console.log(panels)
    // 动态的 dynamicPanels 组件集合
    const dynamicPanels = []
    panels.forEach(item => {
      // 静态数据
      if (item.type.name === 'XtxTabsPanel') {
        dynamicPanels.push(item)
      } else {
        // v-for 渲染拿到的数据
        item.children.forEach(item => {
          dynamicPanels.push(item)
        })
      }
    })
    // 需要的盒子
    // 1.tabs组件的大容器
    // 2.选项卡的导航菜单结构
    // 3.内容容器
    const nav = <nav>{
      dynamicPanels.map((item, i) => {
        return (
        <a onClick={() => this.tabClick(item.props.name, i)} class={{ active: item.props.name === this.activeName }} href='javascript:;'>{item.props.label}</a>
        )
      })
      }</nav>

    // 返回tabs组件的大容器
    return <div class='xtx-tabs'>{[nav, dynamicPanels]}</div>
  }
}
</script>
<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
