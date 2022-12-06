<template>
  <div class="checkout-address">
    <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
    <div class="text" v-if="showAddress">
      <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
      <ul>
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
        <!-- replace(/ /g,'') 去空格 -->
      </ul>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialogFn()" class="btn">切换地址</XtxButton>
      <XtxButton  @click="openAddressEdit()" class="btn">添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框组件----------------------------- -->
  <XtxDialog title="切换收货地址" v-model:visible="visibleDialog">
    <div class="text item" v-for="item in list" :key="item.id"
    @click="()=>{selectedAddress=item,confirmAddressFn()}"
    :class="{active:selectedAddress&&selectedAddress.id === item.id}"
    >
      <ul>
          <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
          <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
          <!-- replace(/ /g,'') 去空格 -->
      </ul>
    </div>
     <!-- vue3.0 仅支持v-slot+template写法 -->
     <template #footer>
     <!-- <template v-slot:footer> -->
        <XtxButton @click="visibleDialog=false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="confirmAddressFn()" type="primary">确认</XtxButton>
      </template>
  </XtxDialog>
  <!-- 添加地址 编辑组件 -->
  <AddressEdit ref="addressEdit" @submit-address="successHandler"></AddressEdit>
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './address-edit'
export default {
  name: 'CheckoutAddress',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AddressEdit
  },
  emits: ['change'],
  setup (props, { emit }) {
    const showAddress = ref(null)
    // 1.找到默认收货地址
    // 2.没有默认收货地址,使用第一条收货地址
    // 3,如果没有数据,提示添加
    if (props.list.length !== 0) {
      const defaultAddress = props.list.find(item => item.isDefault === 1) // 设置默认收货地址
      if (defaultAddress) { // 找到默认收货地址
        showAddress.value = defaultAddress
      } else {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0] // 没有默认收货地址,使用第一条收货地址
      }
    }
    // 控制 对话框组件
    const visibleDialog = ref(false)
    // 默认通知一个地址给父组件
    // emit('change', showAddress.value && showAddress.value.id)
    emit('change', showAddress.value?.id)
    // console.log(showAddress.value.id)

    // 记录当前选中的 addressId
    const selectedAddress = ref(null)
    // 切换地址 逻辑
    const confirmAddressFn = () => {
      // 把当前的 address 替换 选中的address
      showAddress.value = selectedAddress.value
      // 通知父组件 更新id
      emit('change', showAddress.value?.id)
      // 点击确定后,关闭对话框
      visibleDialog.value = false
    }

    // 打开对话框 逻辑
    const openDialogFn = () => {
      // 打开 对话框
      visibleDialog.value = true
      // document.body.parentNode.style.overflowY = 'auto'
      // document.querySelector('.xtx-dialog').parent().css('overflow-y', 'auto')
      // 清除上一次的内容,置空
      selectedAddress.value = null
    }

    // 添加收货地址组件 逻辑
    const addressEdit = ref(null)
    const openAddressEdit = () => {
      addressEdit.value.openDialog()
    }

    // 成功添加地址的回调
    const successHandler = (formData) => {
      // 如果是添加往 list 中 unshift 一条数据
      // eslint-disable-next-line vue/no-mutating-props
      // const jsonStr = JSON.stringify(formData)
      // props.list.unshift(JSON.parse(jsonStr))
      // 又因为list是props数据,修改数据用的都是同一条引用地址,需要用到 克隆
      // eslint-disable-next-line vue/no-mutating-props
      props.list.unshift(JSON.parse(JSON.stringify(formData))) // 克隆
    }

    return {
      showAddress,
      visibleDialog,
      openDialogFn,
      confirmAddressFn,
      selectedAddress,
      openAddressEdit,
      addressEdit,
      successHandler
    }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  // max-height: 740px;
  // min-height:550px;
  // overflow: auto;
  .text {
    display: flex;
    justify-content: space-between;
    // flex: 1;
    flex-basis: 230px;

    min-height: 90px;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
