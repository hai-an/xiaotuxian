<template>
  <!-- 有 goods再创建组件 -->
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem>{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 左侧 商品图片区 -->
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <!-- 右侧 商品信息区 -->
        <div class="spec">
          <GoodsName :goods="goods"></GoodsName>
          <!-- 商品 sku组件 -->
          <!-- goods.find(sku => sku.inventory>0) goods.skus[0].id -->
          <!-- <p>{{goods.skus.find(sku => sku.inventory>0)}}</p> -->
          <GoodsSku v-if="goods.skus[0].id" :goods="goods" :skuId="getSkuId()" @change="changeSku"></GoodsSku>
          <!-- 数量选中组件 -->
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory"></XtxNumbox>
          <!-- 按钮 -->
          <XtxButton @click="insertCart" type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>

      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant  :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findGoods } from '@/api/product'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn'
import { ref, watch, nextTick, provide, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup () {
    // 获取商品详情
    const useGoods = () => {
      // 出现路由地址商品ID变化,但是不会重新初始化组件
      const goods = ref(null)
      const route = useRoute()
      // 监听商品ID变化,即=> 路由id变化
      watch(() => route.params.id, (newVal) => {
        if (newVal && route.path === `/product/${newVal}`) {
          findGoods(route.params.id).then(data => {
            // 让商品的数据为 null 后,利用 v-if 重新销毁组件后,再重新创建组件
            goods.value = null
            nextTick(() => {
              goods.value = data.result
              console.log('goods', goods.value.skus[0].id)
              getSkuId()
            })
          })
        }
      }, { immediate: true })
      return goods
    }
    const goods = useGoods()
    // sku 改变时,触发
    const changeSku = sku => {
      console.log('sku', sku)
      // 修改商品的现价原价库存信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory

        currSku.value = sku
      } else {
        currSku.value = null
      }
    }
    // ---------------
    const getSkuId = () => {
      const currSkuId = goods.value.skus.find(sku => sku.inventory > 0)
      console.log('currSkuId.id', currSkuId.id)
      return currSkuId.id
    }

    // 共享给 后代 使用数据
    provide('goods', goods)

    const num = ref(1) // 选择数量
    // 加入购物车逻辑
    const currSku = ref(null)
    const instance = getCurrentInstance()
    const store = useStore()
    // 点击加入购物车 触发
    const insertCart = () => {
      nextTick(() => {
        if (!currSku.value) {
          console.log('currSku.value', currSku.value)
          return instance.proxy.$message('请选择商品规格')
        }
        if (num.value > goods.inventory) {
          return instance.proxy.$message('库存不足')
        }
      })
      store.dispatch('cart/insertCart', {
        id: goods.value.id,
        skuId: currSku.value.skuId,
        name: goods.value.name,
        picture: goods.value.mainPictures[0],
        price: currSku.value.price,
        nowPrice: currSku.value.price,
        count: num.value,
        attrsText: currSku.value.specsText,
        selected: true,
        isEffective: true,
        stock: currSku.value.inventory
      }).then(() => {
        Message({ text: '加入购物车成功', type: 'success' })
      })
    }

    return { goods, changeSku, num, getSkuId, insertCart }
  }
}

</script>

<style scoped lang='less'>
  // 商品信息
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
