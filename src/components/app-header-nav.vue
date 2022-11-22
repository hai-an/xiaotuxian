<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 1.鼠标进入 一级分类标题 弹窗显示 -->
    <!-- 2.鼠标点击 一级分类标题 弹窗关闭 -->
    <!-- 3.鼠标点击 二级分类标题 弹窗关闭 -->
    <!-- 4.鼠标离开 一级,二级分类标题 弹窗关闭 -->
    <li v-for="item in CategoryList" :key="item.id" @mouseenter="show(item)" @mouseleave="hide(item)">
      <RouterLink :to="`/category/${item.id}`" @click="hide(item)">{{item.name}}</RouterLink>
      <div class="layer" :class="{open: item.open ? true : false}">
        <!-- 动态控制 layer.open 属性 -->
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture">
              <p>{{sub.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppHeaderNav',
  setup (props, what) {
    console.log('what', what)
    // 使用 vuex 获取分类导航数据
    // 调用 获取分类导航数据方法
    const store = useStore()
    const CategoryList = computed(() => {
      return store.state.category.list
    })
    console.log(CategoryList)
    const show = (item) => {
      console.log(item)
      return store.commit('category/show', item)
    }
    const hide = (item) => {
      return store.commit('category/hide', item)
    }
    return { CategoryList, show, hide }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
   > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
     > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
// 二级类目 样式

.layer {
&.open {
        height: 132px;
        opacity: 1;
      }
width: 1240px;
background-color: #fff;
position: absolute;
left: -200px;
top: 56px;
height: 0;
overflow: hidden;
opacity: 0;
box-shadow: 0 0 5px #ccc;
transition: all .2s .1s;
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 70px;
  align-items: center;
  height: 132px;
  li {
    width: 110px;
    text-align: center;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      padding-top: 10px;
    }
    &:hover {
      p {
        color: @xtxColor;
      }
    }
  }
}
}
</style>
