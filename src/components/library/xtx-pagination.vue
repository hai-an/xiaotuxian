<template>
  <div class="xtx-pagination" v-if="total>0">
    <a @click="changePage(myCurrentPage-1)" v-if="myCurrentPage > 1" href="javascript:;">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="myCurrentPage > 1">...</span>
    <a @click="changePage(i)" v-for="i in pager.btnArr" :key="i" href="javascript:;" :class="{active:myCurrentPage===i}">{{i}}</a>
    <span v-if="myCurrentPage < pager.pageCount">...</span>
    <a @click="changePage(myCurrentPage+1)" v-if="myCurrentPage < pager.pageCount" href="javascript:;">下一页</a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit }) {
    // 需要数据:
    // 1.按钮个数 5个
    const btnCount = 5
    // 2.当前显示的页码
    const myCurrentPage = ref(10)
    // 3.总页数  = 总条数 / 每一页条数 向上取整
    const myTotal = ref(100)
    const myPageSize = ref(10)
    // 以上数据 依赖上面数据得到 需要提供计算属性
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      // 按钮个数 和当前页码 => 起始按钮,结束按钮,按钮数组
      // 1.理想情况 假如10页 当前显示的页码4
      const offset = Math.floor(btnCount / 2) // 5/2 =   2.5 ==> 2
      let start = myCurrentPage.value - offset // 4-2 = 2
      let end = start + btnCount - 1 // 2 + 5 -1 = 6
      // 2.如果起始页码小于1需要处理，需要重新计算
      if (start < 1) {
        start = 1
        end = (start + btnCount - 1) > pageCount ? pageCount : (start + btnCount - 1)
      }
      // 3.如果结束页码大于总页数，需要重新计算
      if (end > pageCount) {
        end = pageCount
        start = (end - btnCount + 1) < 1 ? 1 : (end - btnCount + 1)
      }
      // 处理完毕start和end得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    })
    // 点击按钮 通知父组件
    const changePage = (newPage) => {
      if (myCurrentPage.value !== newPage) { // 不能重复点击同一个按钮
        myCurrentPage.value = newPage
        // 通知父组件最新页码
        emit('current-change', newPage)
      }
    }
    return { myCurrentPage, pager, changePage }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
