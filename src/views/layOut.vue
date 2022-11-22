<template>
  <!-- 导航栏 部分 -->
  <app-topnav></app-topnav>
  <!-- 头部  -->
  <app-header></app-header>
  <!-- 吸顶导航组件 -->
  <app-header-sticky></app-header-sticky>
  <!-- 主体 -->
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <!-- 底部 -->
  <app-footer></app-footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'

export default {
  name: 'xtx-layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  }, // 获取下分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>
 .app-body{
  min-height: 600px;
 }
</style>
