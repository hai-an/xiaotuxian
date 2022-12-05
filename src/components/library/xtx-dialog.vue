<template>
  <div class="xtx-dialog" :class="{fade}" v-show="visible">
    <div class="wrapper" :class="{fade}">
      <div class="header">
        <h3>{{title}}</h3>
        <a @click="close" href="JavaScript:;" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <slot  />
      </div>
      <div class="footer">
        <slot name="footer"  />
        <!-- <XtxButton type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton type="primary">确认</XtxButton> -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxDialog',
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false }
  },
  setup (props, { emit }) {
    const fade = ref(false)
    watch(() => props.visible, (newVal) => {
      setTimeout(() => {
        fade.value = newVal
        console.log(newVal)
      }, 0)
    }, { immediate: true })
    // 关闭时,通知父组件
    const close = () => {
      emit('update:visible', false)
    }
    return { fade, close }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  padding-top: 50px;
  background: rgba(0,0,0,0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0,0,0,.5);
  }
  .wrapper {
//     display: flex;
//     align-items: stretch;
// // justify-content: center;
//     flex-direction:column;
    width: 800px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%,-50%);
      opacity: 1;
    }
    .body {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      justify-content: space-between;
      padding: 20px 40px;
      font-size: 16px;
      // min-height: 400px;
      overflow: auto;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position:relative;
      height: 70px;
      line-height: 70px;
      padding: 20px 20px 0;
      border-bottom: 1px solid #f5f5f5;
      h3 {
      height: 70px;
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
