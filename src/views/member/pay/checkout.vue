<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem >填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper" v-if="checkoutInfo">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <!-- 切换收货地址组件 -->
          <CheckoutAddress @change="changeAddress" :list="checkoutInfo.userAddresses" />
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkoutInfo.goods" :key="item.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="">
                    <div class="right">
                      <p>{{item.name}}</p>
                      <p>{{item.attrsText}}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{item.price}}</td>
                <td>{{item.count}}</td>
                <td>&yen;{{item.totalPrice}}</td>
                <td>&yen;{{item.totalPayPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
         <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl><dt>商品件数：</dt><dd>{{checkoutInfo.summary.goodsCount}}件</dd></dl>
            <dl><dt>商品总价：</dt><dd>¥{{checkoutInfo.summary.totalPrice}}</dd></dl>
            <dl><dt>运<i></i>费：</dt><dd>¥{{checkoutInfo.summary.postFee}}</dd></dl>
            <dl><dt>应付总额：</dt><dd class="price">¥{{checkoutInfo.summary.totalPayPrice}}</dd></dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton @click="submitOrderFn" type="primary">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import CheckoutAddress from './components/checkout-address'
import { findCheckoutInfo, createOrder, findOrderRepurchase } from '@/api/order'
import Message from '@/components/library/Message'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'XtxPayCheckoutPage',
  components: { CheckoutAddress },
  // 1.在拥有根元素的组件中,触发自定义事件,有没有emits选项无所谓
  // 2.如果你的组件渲染的代码片段,vue3.0规范,需要在emits中申明你所触发的自定义事件
  // 3.提倡:你发了自定义事件,需要在emits选项申明下,代码可读性更高!
  emits: ['change'],
  setup () {
    const checkoutInfo = ref(null)
    const route = useRoute()
    if (route.query.orderId) {
      // 结算功能 - 生成订单 - 订单页(传id)
      findOrderRepurchase(route.query.orderId).then(data => {
        checkoutInfo.value = data.result
        // 设置订单商品数据
        requestParams.goods = checkoutInfo.value.goods.map(({ skuId, count }) => ({ skuId, count }))
      })
    } else {
      // 结算功能 - 生成订单 - 购物车(不传id)
      findCheckoutInfo().then(data => {
        checkoutInfo.value = data.result
        // 获取 提交订单时的商品信息
        requestParams.goods = checkoutInfo.value.goods.map(({ skuId, count }) => ({ skuId, count }))
      })
    }

    // 结算功能 - 提交订单 - 提交信息
    const requestParams = reactive({
      addressId: null, // 收货地址,切换收货地址或者组件默认的时候设置
      deliveryTimeType: 1,
      payType: 1,
      buyerMessage: '',
      goods: [] // 商品信息,获取订单信息后设置
    })
    // 接收收货地址id
    const changeAddress = (addressId) => {
      requestParams.addressId = addressId
    }

    // 提交订单
    const router = useRouter()
    const submitOrderFn = () => {
      // 判断有无收货地址
      if (!requestParams.addressId) {
        return Message({ text: '亲,请设置收货地址后,再下单!' })
      }
      createOrder(requestParams).then(data => {
        Message({ text: '订单提交成功！请尽快完成支付!', type: 'success' })
        // 跳转支付页面
        router.push({ path: '/member/pay', query: { orderId: data.result.id } })
      })
    }
    return { checkoutInfo, changeAddress, submitOrderFn, requestParams }
  }
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,&:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
