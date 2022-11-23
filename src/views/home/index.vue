<template>
  <div class="home-page">
    <!-- 首页入口 -->
    <div class="home-entry">
      <!-- 页面版心 -->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
  </div>
</template>

<script>
// import { useStore } from 'vuex'
// import { reactive, computed } from 'vue'
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  name: 'HomePage',
  components: { HomeCategory, HomeBanner }
  // setup () {
  //   // 1. 获取vuex的一级分类，并且只需要两个二级分类
  // // 2. 需要在组件内部，定义一个品牌数据
  // // 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
  // // 4. 进行渲染即可
  //   // 左侧有10个分类 ,但是只有9个分类数据,需要额外添加一个进去
  //   const store = useStore()
  //   const brind = reactive({
  //     id: 'brind',
  //     name: '品牌',
  //     children: [{ id: 'brand-chilren', name: '品牌推荐' }]
  //   })
  //   const menuList = computed(() => {
  //     const list = store.state.category.list.map(item => {
  //       return {
  //         id: item.id,
  //         name: item.name,
  //         // 防止初始化没有children的时候调用slice函数报错
  //         children: item.children && item.children.slice(0, 2) // slice 不删除原数组,返回删除的数组
  //       }
  //     })
  //     list.push(brind)
  //     return list
  //   })
  //   return { menuList }
  // }
}
</script>

<style scoped lang="less">

</style>
