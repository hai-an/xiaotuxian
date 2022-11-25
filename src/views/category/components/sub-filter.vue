<template>
<!-- 筛选区 -->
   <div class="sub-filter" v-if="filterData && !filterLoading">
     <div class="item" >
       <div class="head">品牌：</div>
       <div class="body">
         <!-- <a href="javascript:;">全部</a> -->
         <a :class="{active: filterData.selectedBrand === brand.id}" href="javascript:;" v-for="brand in filterData.brands" :key="brand.id">{{brand.name}}</a>
       </div>
     </div>

     <div class="item" v-for="p in filterData.saleProperties" :key="p">
       <div class="head">{{p.name}}：</div>
       <div class="body">
         <!-- <a href="javascript:;">全部</a> -->
         <a :class="{active: p.selectedProp === attr.id}"
         v-for="attr in p.properties" :key="attr.id"
         href="javascript:;"
         >
            {{attr.name}}
         </a>
       </div>
     </div>
   </div>
   <!-- 骨架样式 -->
   <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category' // 获取二级分类筛选条件数据
import { useRoute } from 'vue-router'
// import { useStore } from 'vuex'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup () {
    // 1.获取数据
    // 2.数据中需要全部选中,需要预览当前点击激活功能,默认选中 全选
    // 3.完成渲染
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)
    // 4.分类发生变化时,需要重新获取筛选数据,需要使用侦听器
    watch(() => route.params.id, (newVal, oldVal) => {
      // 当你从二级类目去顶级类目时 也会拿到id,不能加载数据因为他不是二级类目
      if (newVal && `/category/sub/${newVal}` === route.path) {
        filterLoading.value = true
        // 发请求,获取数据, 从.then拿到的数据中解构出  result
        newVal && findSubCategoryFilter(route.params.id).then(({ result }) => {
          console.log(result)
          // 品牌全部
          result.selectedBrand = null // 自定义添加的默认选中属性
          result.brands.unshift({ id: null, name: '全部' })
          console.log(result.brands)
          // 销售属性全部
          result.saleProperties.forEach(p => {
            p.selectedProp = null // 自定义添加的默认选中属性
            p.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = result // 赋值渲染数据数组
          filterLoading.value = false
        })
      }
    }, { immediate: true })
    return { filterData, filterLoading }
  }
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  // 骨架样式
  .xtx-skeleton {
      padding: 10px 0;
    }
</style>
