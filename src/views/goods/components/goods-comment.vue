<template>
  <div class="goods-comment">
    <!--  -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{commentInfo.salesCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item,i) in commentInfo.tags" :key="item.title"
           href="javascript:;"
           :class="{active:currTagIndex === i}"
           @click="changeTag(i)"
           >{{item.title}}（{{item.tagCount}}）</a>
        </div>
      </div>
    </div>
    <div class="sort" v-if="commentInfo">
      <span>排序：</span>
      <a @click="changeSort(null)"
      :class="{active: reqParams.sortField===null}" href="javascript:;" class="active">默认</a>
      <a @click="changeSort('createTime')"
      :class="{active: reqParams.sortField==='createTime'}" href="javascript:;">最新</a>
      <a @click="changeSort('praiseCount')"
      :class="{active: reqParams.sortField==='praiseCount'}" href="javascript:;">最热</a>
    </div>
    <!-- 评论列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + 's'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i + 'k'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 图片预览组件 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <xtx-pagination @current-change="changePager" :total="total" :current-page="reqParams.page"></xtx-pagination>
  </div>
</template>
<script>
import { findCommentInfoByGoods, findGoodsCommentList } from '@/api/product'
import GoodsCommentImage from './goods-comment-image'
import { ref, inject, reactive, watch } from 'vue'
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup () {
    const commentInfo = ref(null)
    const goods = inject('goods')
    const currTagIndex = ref(0)
    findCommentInfoByGoods(goods.value.id).then(data => {
      // type的目的是将来点击可以区分点的是不是标签
      data.result.tags.unshift({ type: 'img', title: '有图', tagCount: data.result.hasPictureCount })
      data.result.tags.unshift({ type: 'all', title: '全部评价', tagCount: data.result.hasPictureCount })
      commentInfo.value = data.result
      console.log(data.result)
    })
    // 点击tag 获取目标索引 替换 当前索引
    const changeTag = (newIndex) => {
      currTagIndex.value = newIndex
      // 点击tag时修改筛选条件
      const tag = commentInfo.value.tags[newIndex]
      // 情况1:全部评价 情况2:有图 情况3:正常tag
      if (tag.type === 'all') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (tag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = null
        reqParams.tag = tag.title
      }
      // 每次点击 其他 tag时,重置页码
      reqParams.page = 1
    }

    // 准备筛选条件数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      // 排序方式: praiseCount 热度 createTime 最新
      sortField: null
    })

    // 初始化或者筛选条件改变后，获取列表数据。
    const commentList = ref([])
    const total = ref(0) // 总条数
    // 第一个参数 不用深度监听 因为不是对象里包数组,或数组套数组
    watch(reqParams, async () => {
      const data = await findGoodsCommentList(goods.value.id, reqParams)
      commentList.value = data.result.items // 赋值
      total.value = data.result.counts // 总条数
    }, { immediate: true })

    // 点击排序
    const changeSort = (sortField) => {
      reqParams.sortField = sortField
      // 重置页码1
      reqParams.page = 1
    }
    // 定义过滤 函数
    const formatSpecs = (spces) => {
      return spces.reduce((p, c) => `${p} ${c.name}:${c.nameValue}`, '')
    }
    const formatNickname = (nickname) => {
      return nickname.slice(0, 1) + '****' + nickname.slice(-1)
    }

    // 分页数据切换
    const changePager = (newPage) => {
      reqParams.page = newPage
    }
    // 初始化需要发请求,筛选条件发生改变发请求

    return { commentInfo, currTagIndex, changeTag, reqParams, commentList, changeSort, formatSpecs, formatNickname, total, changePager }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
