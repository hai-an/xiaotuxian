<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <!-- 右上角 -->
    <template v-slot:right>
      <a  :class="{disabled: index===0}" @click="toggle(-1)" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a :class="{disabled: index===1}" @click="toggle(+1)" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <!--  主体内容 -->
    <div class="box" ref="target">
      <Transition name="fade">
        <ul v-if="brands.length" class="list" :style="`transform: translateX(${index*-1240}px);`" >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
         <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { findBrand } from '@/api/home'
import HomePanel from './home-panel'
import { ref } from 'vue'
import { userLazyData } from '@/hook'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // 获取数据
    // const brands = ref([])
    // findBrand(10).then(data => { brands.value = data.result })
    // 如果我们 需要 调用api接口函数传值: 需通过函数返回值的形式,写入
    // findBrand(10)返回的是Promise对象, 而userLazyData需要的是函数,我们需要用(箭头)函数return Promise对象即可
    const { target, result } = userLazyData(() => findBrand(10))

    // 只设置两页数据 index 为 0 1
    // 当index 为1时,为第二页, ul 向左移动 1240
    const index = ref(0)
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
    return { brands: result, target, toggle, index }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
// 骨架样式
.skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
</style>
