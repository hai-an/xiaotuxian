<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <!-- 右上侧 标题链接 -->
      <template #right><XtxMore path="/" /></template>
      <div ref="target" style="position: relative;height: 406px;">
        <Transition name="fade">
         <!-- 面板内容 -->
          <ul class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazy="item.picture" alt="">
                <p class="name ellipsis">{{item.name}}</p>
                <p class="price">&yen;{{item.price}}</p>
              </RouterLink>
            </li>
          </ul>
          <!-- 面板骨架组件 -->
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>
<script>
// import { ref } from 'vue'
import HomePanel from './home-panel'
import { findNew } from '@/api/home'
import HomeSkeleton from './home-skeleton'
import { userLazyData } from '@/hook'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // const goods = ref([])
    // findNew().then(data => { goods.value = data.result })
    const { target, result } = userLazyData(findNew)
    return { goods: result, target }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
