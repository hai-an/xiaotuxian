<template>
  <div class="member-order">
    <!-- 体验jsx语法 -->
    <!-- tab 组件 -->
    <XtxTabs v-model="activeName" @tabClick="changeTab">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
      </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list" v-if="orderList">
      <div  v-if="loading" class="loading"></div>
      <div class="none" v-if="!(loading || orderList.length)">暂无数据</div>
      <OrderItem v-for="goods in orderList" :key="goods.id" :order="goods"></OrderItem>
    </div>
    <!-- 分页组件 -->
    <xtx-pagination
    v-if="(orderList&&orderList.length)"
    :total="orderParams.counts"
    :currentPage="orderParams.page"
    :pageSize="orderParams.pageSize"
    @current-change="()=>orderParams.page=$event"
    ></xtx-pagination>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item'
import { findOrderList } from '@/api/order'
export default {
  name: 'MemberOrder',
  components: { OrderItem },
  setup () {
    const activeName = ref('all')
    // 查询订单参数
    const orderParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    // 加载状态
    const loading = ref(false)
    // 监听 orderParams改变 ,发送数据请求 获取查询订单,立即执行=>初始化数据
    watch(orderParams, () => {
      loading.value = true
      // 查询订单
      findOrderList(orderParams).then(data => {
        orderList.value = data.result.items
        console.log(orderList.value.length)
      })
      loading.value = false
    }, { immediate: true })

    // 点击tab => 获取对应的索引 => 发送数据请求
    const changeTab = ({ index }) => {
      // 需求:  1. 重置 页码为1,
      //       2.订单状态 = index
      // 清空数据
      orderParams.page = 1
      orderParams.orderState = index
    }
    return { activeName, changeTab, orderStatus, orderList, loading, orderParams }
  }
}
</script>

<style scoped lang="less">
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;

}

.none {
    height: 400px;
    text-align: center;
    line-height: 400px;
    color: #999;
  }
.loading {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
  }
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
