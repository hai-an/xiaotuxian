<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{active:show}" @click="toggle">
      <span v-if="!fullLocation" class="placeholder">{{placeholder}}</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-if="show" class="option">
      <!-- 没有数据 -->
      <div v-if="loading" class="loading"></div>
      <!-- 有数据 -->
      <template v-else>
      <span @click="changeItem(item)"  class="ellipsis" v-for="item in currentList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择配送地址'
    }
  },
  setup (props, { emit }) {
    // 控制展开收起,默认收起
    const show = ref(false)
    // 2. 显示和隐藏函数（为什么是函数，做更多事情）
    const loading = ref(false)
    const cityData = ref([])
    // 开启弹层
    const open = () => {
      show.value = true
      loading.value = true
      // 打开弹层 调用获取数据函数 拿到数据,在赋值给 cityData
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })
      // 打开弹层,清空上一次的选中的数据
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    // 关闭弹层
    const close = () => {
      show.value = false
    }
    // 控制弹层的开关的方法
    const toggle = () => {
      if (show.value) close()
      else open()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      // 参数一: 观察的dom对象
      // 参数二: 点击dom对象的外部,触发此回调
      close()
    })
    // 获取城市数据
    // 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
    // 2. 何时获取？打开城市列表的时候，做个内存中缓存
    // 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
    const getCityData = () => {
      return new Promise((resolve, reject) => {
        if (window.cityData) {
          // 有缓存
          resolve(window.cityData)
        } else {
          // 无缓存
          const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios.get(url).then(res => {
            window.cityData = res.data
            resolve(window.cityData)
          })
        }
      })
    }
    // 定义地区 基本数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    // 获取城市数据,显示当前地方列表
    // 定义计算属性 实时更新 currentList 选中的地址
    const currentList = computed(() => {
      // TODO 根据点击的省份城市获取对应的列表
      let currlist = cityData.value
      // 城市
      if (changeResult.provinceCode) { // 省份不为空
        currlist = currlist.find(p => p.code === changeResult.provinceCode).areaList
        // 赋值后,currlist 收集到 省 市
      }
      // 区
      if (changeResult.cityCode) { // 省份不为空
        currlist = currlist.find(c => c.code === changeResult.cityCode).areaList
        // 赋值后,currlist 收集到 省 市 区
      }
      return currlist
    })

    // 监听点击(事件) 省市区 时,
    // 默认显示省份,当首次点击时, 赋值 code 和 name ,并且触发 watch 侦听事件,重新渲染 currentList拿到市级数组数据,第二次点击 拿到 code 和 name ,再重新渲染数组,得到 区级数组,  最后选择 区级,即可 关闭弹层,合并数据
    const changeItem = (item) => {
      // 省
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 区 当点击区时, 只需要把之前的数据合并,再传值,并关闭弹窗
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}` // 拼凑合并拿到的 地址
        close() // 关闭弹层
        emit('change', changeResult) // 给父组件传递数据
      }
    }

    return { show, toggle, target, currentList, loading, changeItem }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
