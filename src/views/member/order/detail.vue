<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <DetailSteps :order="order" />
    <!-- 物流栏 -->
    <Suspense v-if="[3,4,5].includes(order.orderState)">
      <!-- 组件加载完毕(数据已接收成功) -->
      <template #default>
        <DetailLogistics  :order="order" />
      </template>
      <!-- 组件加载中(等待中) -->
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import DetailAction from './components/detail-action'
import DetailSteps from './components/detail-steps'
import DetailLogistics from './components/detail-logistics.vue'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction, DetailSteps, DetailLogistics },
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
  height: 100%;
  .loading{
    height: 50px;
    display: flex;
    padding: 0 30px;
    align-items: center;
    background-color: #f5f5f5;
    margin: 30px 50px 0;
  }
}
</style>
