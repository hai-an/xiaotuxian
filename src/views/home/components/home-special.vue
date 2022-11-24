<template>
  <HomePanel title="最新专题">
    <template v-slot:right><XtxMore /></template>
    <div class="box" ref="target">
      <Transition name="fade">
        <ul  v-if="specialList.length" class="special-list">
          <li class="special-item" v-for="item in specialList" :key="item.id">
            <RouterLink to="/">
              <img :src="item.cover" alt />
              <div class="meta">
                <p class="title">
                  <span class="top ellipsis">{{item.title}}</span>
                  <span class="sub ellipsis">{{item.summary}}</span>
                </p>
                <span class="price">&yen;{{item.lowestPrice}}起</span>
              </div>
            </RouterLink>
            <div class="foot">
              <span class="like"><i class="iconfont icon-hart1"></i>{{item.collectNum}}</span>
              <span class="view"><i class="iconfont icon-see"></i>{{item.viewNum}}</span>
              <span class="reply"><i class="iconfont icon-message"></i>{{item.replyNum}}</span>
            </div>
          </li>
            <!-- </div> -->
        </ul>
        <div v-else class="skeleton">
         <XtxSkeleton class="item" v-for="i in 3" :key="i" animated bg="#e4e4e4" width="404px" height="288px"/>
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { findSpecial } from '@/api/home'
import { userLazyData } from '@/hook'
import HomePanel from './home-panel'
export default {
  name: 'HomeSpecial',
  components: { HomePanel },
  setup () {
    const { target, result } = userLazyData(findSpecial)
    return { target, specialList: result }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
// .special-box{
  // width:1240px;
  // display: flex;
  // justify-content: space-between;
  // transition: all 1s;
  .special-list {
    // margin-left: 20px;
    height: 380px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .special-item {
      width: 404px;
      background: #fff;
      .hoverShadow();
      a {
        display: block;
        width: 100%;
        height: 288px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .meta {
          background-image: linear-gradient(to top,rgba(0, 0, 0, 0.8),transparent 50%);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 288px;
          .title {
            position: absolute;
            bottom: 0px;
            left: 0;
            padding-left: 16px;
            width: 70%;
            height: 70px;
            .top {
              color: #fff;
              font-size: 22px;
              display: block;
            }
            .sub {
              display: block;
              font-size: 19px;
              color: #999;
            }
          }
          .price {
            position: absolute;
            bottom: 25px;
            right: 16px;
            line-height: 1;
            padding: 4px 8px 4px 7px;
            color: @priceColor;
            font-size: 17px;
            background-color: #fff;
            border-radius: 2px;
          }
        }
      }
      .foot {
        height: 72px;
        line-height: 72px;
        padding: 0 20px;
        font-size: 16px;

        i {
          display: inline-block;
          width: 15px;
          height: 14px;
          margin-right: 5px;
          color: #999;
        }
        .like,
        .view {
          float: left;
          margin-right: 25px;
          vertical-align: middle;
        }
        .reply {
          float: right;
          vertical-align: middle;
        }
      }
    }
  }
// }
.skeleton {
    width: 100%;
    display: flex;
    justify-content: space-between;
    // .item {
    //   // margin-right: 20px;
    // }
  }
</style>
