<template>
  <div class="cart-sku" ref="target">
    <div class="attrs"  @click="toggle()">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visable">
      <!-- 加载状态 -->
      <div v-if="!goods" class="loading"></div>
      <!-- 商品规格 -->
      <GoodsSku @change="changeSku" v-if="goods" :skuId="skuId" :goods="goods"  />
      <XtxButton @click="submit()"  v-if="goods" type="primary" size="mini" style="margin-left:60px">确认</XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import GoodsSku from '@/views/goods/components/goods-sku'
import { onClickOutside } from '@vueuse/core'
import { getSpecsAndSkus } from '@/api/product'
export default {
  name: 'CartSku',
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  components: { GoodsSku },
  setup (props, { emit }) {
    const visable = ref(false) // 控制弹层显示
    const goods = ref(null) // 商品信息
    const loading = ref(false) // 加载状态
    // 选择sku商品规格时,触发
    const currSku = ref(null)
    const changeSku = (sku) => {
      currSku.value = sku
    }
    // 点击确定时, 发送当前选中的 sku,提交信息给购物车组件 更新sku
    // 提交信息给购物车组件
    const submit = () => {
      // 给购物车提供的数据: 有sku信息,且新的sku信息 与 老的sku信息 不能相同 (id)
      if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value)
        // console.log(currSku.value)
        close()
      }
    }
    // |-----------------------------

    // 打开
    const open = () => {
      visable.value = true
      // 获取当前spec和sku数据
      getSpecsAndSkus(props.skuId).then(data => {
        goods.value = data.result
      })
    }
    // 关闭
    const close = () => {
      visable.value = false
      goods.value = null
    }
    // 切换
    const toggle = () => {
      visable.value ? close() : open()
      console.log(123213)
    }
    // 点及其他地方关闭
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    return { target, open, close, toggle, visable, goods, loading, changeSku, submit }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
