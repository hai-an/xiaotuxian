<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 商品筛选区 -->
      <SubFilter />
      <xtx-checkbox v-model="checkAll">全选</xtx-checkbox>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
  setup () {
    const checkAll = ref(true)

    return { checkAll }
  }
}
</script>
