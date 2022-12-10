<template>
  <div class="member-order">
    MemberOrder
    <!-- 体验jsx语法 -->
    <XtxTabs v-model="activeName" @tabClick="changeTab">
    <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">{{item.label}}</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import { orderStatus } from '@/api/constants'
export default {
  name: 'MemberOrder',
  setup () {
    const activeName = ref('all')
    console.log(activeName)
    // 点击tab 获取数据用
    const changeTab = (active) => {
      console.log(active)
    }
    return { activeName, changeTab, orderStatus }
  }
}
</script>

<style scoped lang="less">

</style>
