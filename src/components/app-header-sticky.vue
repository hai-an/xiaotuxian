<template>
  <div class="app-header-sticky" :class="{show: y>=78}">
    <div class="container" v-show="y>=78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from './app-header-nav'
// 1.传统方式 设置滚动距离
// import { onMounted, ref } from 'vue'
// 2.使用插件 设置滚动距离
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  // 传统方式 设置滚动距离
  // setup () {
  //   // 监听滚动距离
  //   const y = ref(0)

  //   onMounted(() => {
  //     window.onscroll = () => {
  //       const scrollTop = document.documentElement.scrollTop
  //       // console.log(scrollTop)
  //       y.value = scrollTop
  //     }
  //   })
  //   return { y }
  // }
  setup () {
    const { y } = useWindowScroll() // 使用插件获取 页面y轴滚动距离
    return { y }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 默认移出顶部且完全透明，定义一个类回到默认吸顶位置完全显示。 start
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  // 默认移出顶部且完全透明，定义一个类回到默认吸顶位置完全显示。 end
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
