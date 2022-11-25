<template>
  <div class='sub-sort'>
    <div class="sort">
      <a :class="{active: sortParams.sortParams=== null}" @click="changeSort(null)" href="javascript:;">默认排序</a>
      <a :class="{active: sortParams.sortParams=== 'publishTime'}" @click="changeSort('publishTime')" href="javascript:;">最新商品</a>
      <a :class="{active: sortParams.sortParams=== 'orderNum'}" @click="changeSort('orderNum')" href="javascript:;">最高人气</a>
      <a :class="{active: sortParams.sortParams=== 'evaluateNum'}" @click="changeSort('evaluateNum')" href="javascript:;">评论最多</a>
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i class="arrow up" :class="{active: sortParams.sortMethod === 'asc'&& sortParams.sortParams ==='price'}"  />
        <i class="arrow down" :class="{active: sortParams.sortMethod === 'desc'&& sortParams.sortParams ==='price'}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // sortField====>publishTime,orderNum,price,evaluateNum
    // sortMethod====>asc为正序 desc为倒序
    // 定义数据
    const sortParams = reactive({
      inventory: false, // 有库存
      onlyDiscount: false, // 有折扣
      sortParams: null, // 排序参数 publishTime,orderNum,price,evaluateNum
      sortMethod: null // 排序方法 desc:倒序(默认排序) asc:正序
    })
    // 改变排序
    const changeSort = (sortField) => { // sortField 排序种类
      if (sortField === 'price') {
        sortParams.sortParams = sortField // 更新当前 排序种类
        // 设置 默认排序为 desc为倒序
        if (sortParams.sortMethod === null) { // 第一次点击前为 null
          sortParams.sortMethod = 'desc'
        } else { // 非第一次点击的情况
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        if (sortParams.sortParams === sortField) return // 阻止重复点击当前选中的标签
        sortParams.sortParams = sortField
        sortParams.sortMethod = null // 当点击非 price 标签时,重置 排序方式为 null
      }
      // 提交父组件
      emit('sort-change', sortParams)
      console.log('sortParams', sortParams)
    }
    // 提交父组件
    const changeCheck = (sortField) => {
      emit('sort-change', sortParams)
      console.log('sortParams', sortParams)
    }
    return { sortParams, changeSort, changeCheck }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
