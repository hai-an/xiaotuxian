<template>
  <XtxDialog :title="`${formData.id?'编辑':'添加'}收货地址`" v-model:visible="visibleDialog" >
    <!-- 表单 -->
    <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="label">收货人：</div>
        <div class="field">
          <input v-model="formData.receiver" class="input" placeholder="请输入收货人" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">手机号：</div>
        <div class="field">
          <input v-model="formData.contact" class="input" placeholder="请输入手机号" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地区：</div>
        <div class="field">
          <XtxCity @change="changeCity" :fullLocation="formData.fullLocation" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">详细地址：</div>
        <div class="field">
          <input v-model="formData.address" class="input" placeholder="请输入详细地址" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">邮政编码：</div>
        <div class="field">
          <input v-model="formData.postalCode" class="input" placeholder="请输入邮政编码" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地址标签：</div>
        <div class="field">
          <input v-model="formData.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <template #footer>
      <XtxButton @click="visibleDialog=false" type="gray" style="margin-right: 20px;">取消</XtxButton>
      <XtxButton @click="submit()" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref, reactive } from 'vue'
import { addAddress, editAddress } from '@/api/order'
import Message from '@/components/library/Message'
export default {
  name: 'AddressEdit',
  setup (props, { emit }) {
    const visibleDialog = ref(false)
    // 打开对话框
    const openDialog = (address) => {
      // address = {}:添加收货地址 || {数据}:修改收货地址
      visibleDialog.value = true
      if (address.id) {
        // 修改地址
        // 传入的不是空对象,说明是修改当前的 address
        for (const key in address) {
          formData[key] = address[key]
        }
      } else {
        // 添加地址
      // 如果是添加 清空上一次的数据
        for (const key in formData) {
          if (key === 'isDefault') {
            formData.isDefault = 1
          } else {
            formData[key] = null
          }
        }
      }
    }
    // 表单数据
    const formData = reactive({
      id: '',
      receiver: '',
      contact: '',
      provinceCode: '', // 省
      cityCode: '', // 市
      countyCode: '', // 区
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1, // 0: 默认地址 1:非默认地址
      fullLocation: '' // 行政区的联合字段
    })
    // 选择(选中)地区
    const changeCity = (data) => {
      formData.provinceCode = data.provinceCode
      formData.cityCode = data.cityCode
      formData.countyCode = data.countyCode
      formData.fullLocation = data.fullLocation
    }
    // 提交地址 添加逻辑
    const submit = () => {
      // 1.省略了校验(实际工作中,不能省略)
      // 2.发送请求
      if (formData.id) {
        // 更新
        editAddress(formData).then(data => {
        //  提示 关闭 触发自定义事件
          Message({ text: '修改收货地址成功', type: 'success' })
          visibleDialog.value = false
          emit('submit-address', formData)
        })
      } else {
        // 添加
        addAddress(formData).then(data => {
        // 更新id 提示 关闭 触发自定义事件
          formData.id = data.result.id
          Message({ text: '添加收货地址成功', type: 'success' })
          visibleDialog.value = false
          emit('submit-address', formData)
        })
      }
    }
    return { visibleDialog, openDialog, changeCity, formData, submit }
  }
}
</script>

<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper){
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
