<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import DetailAction from './components/detail-action'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction },
  setup () {
    // 当前订单
    const order = ref(null)
    // 路由信息对象
    const route = useRoute()
    findOrder(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
