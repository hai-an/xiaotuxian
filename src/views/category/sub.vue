<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 商品筛选区 -->
      <SubFilter @filter-change="changeFilter" />
     <!-- 结果区域 -->
     <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="changeSort"/>
        <!-- <SubSort @sort-change="changesort" /> -->
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData"></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()

    // 定义数据状态 和 数据类型
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 定义 api查询参数
    let reqParams = {
      page: 1, // 页码
      pageSize: 20 // 每页/条数据
    }
    // 获取数据函数
    const getData = () => {
      console.log('触发了吗')
      loading.value = true
      reqParams.categoryId = route.params.id // 往 api查询参数 里面添加id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++ // 页码加1
        } else {
          // 没有数据可以加载了
          finished.value = true
        }
        loading.value = false
      })
    }
    // 切换二级类目,初始化数据模板.重新获取数据
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === `/category/sub/${newVal}`) {
        // loading.value = false
        goodsList.value = []
        reqParams = {
          page: 1, // 页码
          pageSize: 20 // 每页/条数据
        }
        finished.value = false
      }
    }
    )

    // 监听筛选区改变
    const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams } // 合并参数
      console.log('filterParams', filterParams)

      // 初始化数据模板
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }
    // 监听排序改变
    const changeSort = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams } // 合并参数
      // 初始化数据模板
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }
    return { loading, finished, goodsList, getData, changeFilter, changeSort }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
