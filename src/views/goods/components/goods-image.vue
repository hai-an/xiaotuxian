<template>
  <div class="goods-image">
    <!-- 大图片 -->
    <div v-show="show" class="large" :style="[{backgroundImage:`url(${images[currIndex]})`},BgPosition]"></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩层 -->
      <div v-show="show" class="layer" :style="maskPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core' // 使用 该方法 拿到鼠标坐标,是否超出目标元素范围
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    // 当前预览的图片的索引
    const currIndex = ref(0)
    // 调用函数, 实时预览 图片的功能逻辑
    const { target, show, maskPosition, BgPosition } = usePreviewLargePicture()
    return { currIndex, target, show, maskPosition, BgPosition }
  }
}
// 封装成函数, 查看预览 大图片
const usePreviewLargePicture = () => {
  // 1.是否显示遮罩层/大图片
  const show = ref(false)
  // 绑定中图片
  const target = ref(null)
  // 2.遮罩层的坐标(样式)
  const maskPosition = reactive({
    left: 0,
    top: 0
  })
  // 3.大图片背景定位(样式)
  const BgPosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0
  })
  // 4.使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  // elementX 鼠标基于容器左上角X轴偏移
  // elementY 鼠标基于容器左上角Y轴偏移
  // isOutside 鼠标是否在模板容器外
  watch([elementX, elementY, isOutside], () => {
    // 5.根据得到的数据设置样式和是否显示数据
    show.value = !isOutside.value // 预览 大图片
    // 5.1 定义 公共数据模板
    const position = { x: 0, y: 0 }
    // 5.2 控制X轴方向的定位 0-200 之间
    if (elementX.value < 100) position.x = 0
    else if (elementX.value > 300) position.x = 200
    else position.x = elementX.value - 100
    // 5.3 控制Y轴方向的定位 0-200 之间
    if (elementY.value < 100) position.y = 0
    else if (elementY.value > 300) position.y = 200
    else position.y = elementY.value - 100
    // 5.4 给样式赋值
    maskPosition.left = position.x + 'px'
    maskPosition.top = position.y + 'px'
    BgPosition.backgroundPositionX = -2 * position.x + 'px'
    BgPosition.backgroundPositionY = -2 * position.y + 'px'
  })
  // 6.返回数据
  //  target要操作的dom标签
  //  show 控制遮罩层与大图片的显示
  //  maskPosition 遮罩层的坐标(定位)样式
  //  BgPosition 大图片的(背景定位)样式
  return { target, show, maskPosition, BgPosition }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
