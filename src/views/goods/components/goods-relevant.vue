<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{goodsId? '同类商品推荐' : '猜你喜欢'}}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <xtx-carousel :sliders="sliders"></xtx-carousel>
  </div>
</template>

<script>
import { findRelGoods } from '@/api/product'
import { ref } from 'vue'
// 得到需要的数据
const useRelGoodsData = (id) => {
  const sliders = ref([])
  findRelGoods(id).then(data => {
    // 每页4条
    const pageSize = 4
    const pageCount = Math.ceil(data.result.length / pageSize)
    for (let i = 0; i < pageCount; i++) {
      // slice 从索引i截取,到索引e结束,返回截取的数组,不改变原数组 [] 左闭右闭
      // pageCount 总页数 16页 每页4条 遍历4次 每次push [4条数据] 进去
      // 首次 i为0 ,在result中截取 从索引为0开始截取,长度为4
      sliders.value.push(data.result.slice(i * pageSize, (i + 1) * pageSize))
    }
    console.log(sliders)
  })
  return sliders
}
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: {
    goodsId: { type: String, default: '' }
  },
  setup (props) {
    // 最终需要的数据是 sliders 提供给轮播图使用
    // 数据结构: sliders = [[4个],[4个],[4个],[4个]]
  /*   const sliders = ref([])
    findRelGoods({ id: props.goodsId }).then(data => {
      // data.result 商品列表,数据结构 [16个]
      // 将data.result 数据赋值给sliders数据,保证数据结构正确
      const pageSize = 4
      const pageCount = Math.ceil(data.result.length / pageSize)
      for (let i = 0; i < pageCount; i++) {
        sliders.value.push(data.result.slice(pageSize * 1, pageSize * (i + 1)))
      }
    }) */
    const sliders = useRelGoodsData(props.goodsId)
    return { sliders }
  }
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
