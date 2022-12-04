<!-- eslint-disable no-unused-vars -->
<template>
  <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
        <RouterLink v-if="item.hrefUrl" :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
        <div v-else class="slider">
          <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="">
            <p class="name ellipsis">{{goods.name}}</p>
            <p class="price">&yen;{{goods.price}}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 左侧按钮 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 右侧按钮 -->

    <a @click="toggle(+1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <!-- 指示器  active 当前激活类 -->
    <div class="carousel-indicator">
      <span @click="index=i" v-for="(item,i) in sliders" :key="i" :class="{active:index===i}">
      </span>
    </div>
  </div>
</template>

<script>
// 轮播图 逻辑
// 1.暴露轮播图属性,设置自动播放
// 2.鼠标进入 停止自动播放, 鼠标离开 开始自动播放
// 3.指示器点击 切换 图片; 点击左右按钮索引值加减, 上下图片切换
// 4.销毁组件,onUn 定时器
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 自动播放时间
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 默认显示的图片的索引
    const index = ref(0)

    // 功能一 自动播放
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        // const newIndex = index
        if (props.sliders.length) { // 并且sliders有数据
          // index.value++ // 索引值每次加1
          index.value++
          if (index.value >= props.sliders.length) {
            index.value = 0
          }
        }
      }, props.duration)
    }
    // 开启监听
    watch(() => props.sliders, (newVal) => {
      // 有数据开启自动播放
      if (props.sliders.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    // 功能二 鼠标进入 离开 清除定时器/开启定时器
    const stop = () => {
      clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 功能三 点击指示器,左右按钮 切换图片

    const toggle = (step) => {
      let newIndex = index.value + step
      // console.log(newIndex)
      // 到最大值 重置 为0
      if (newIndex > props.sliders.length - 1) {
        newIndex = 0
      } else if (newIndex < 0) {
      // 到最小值 重置 为sliders长度减一
        newIndex = props.sliders.length - 1
      }
      index.value = newIndex
      // console.log(index)
    }

    // 功能四 组件消耗，清理定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    // 指示器
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    // 左右按钮
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px!important;
      height: 230px!important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
