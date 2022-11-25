<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
// import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
// v-model 属性 :modelValue   和 方法 update:modelValue
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  // vue3.0 组合API写法
  // setup (props, { emit }) {
  //   const checked = ref(false)
  //   const changeChecked = () => {
  //     checked.value = !checked.value
  //     // 使用 emit 通知父组件 改数据
  //     emit('update:modelValue', checked.value)
  //   }

  //   // 使用侦听器.得到父组件传递数据,给checked数据
  //   watch(() => props.modelValue, () => {
  //     checked.value = props.modelValue
  //   }, { immediate: true })
  //   return { checked, changeChecked }
  // }
  // 使用@vueuse/core 的实现 checked双向数据绑定
  setup (props, { emit }) {
    // 使用 useVModel实现数据双向绑定v-model指令
    // 1.使用props接收modleVal
    // 2.使用useVModel来包装props中的modelVal属性数据
    // 3.使用checked.value 就是使用父组件数据
    // 4.再使用 checked.value='数据' 赋值.触发 emit('update:modelVal', '数据')
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件
      checked.value = newVal // 触发 update:modelVal 事件
      // 让组件支持change事件
      emit('change', newVal)
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
