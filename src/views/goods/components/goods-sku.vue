<!-- eslint-disable no-return-assign -->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt >{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
        <img  @click="clickSpecs(item,val)" v-if="val.picture" :class="{selected:val.selected}" :src="val.picture" :title="val.name">
        <span :class="{selected:val.selected}" @click="clickSpecs(item,val)" v-else>{{val.name}}</span>
      </template>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  setup (props) {
    const clickSpecs = (item, val) => {
      // 1.选中时,再次点击该选项,取消选中
      // 2.当前项选中时,点击同一规格的其他 属性时,取消当前选中,给 点击目标 添加选中
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(p => { p.selected = false })
        val.selected = true
      }
    }
    return { clickSpecs }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
