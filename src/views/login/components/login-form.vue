<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <!-- <div class="form"> -->
    <Form ref="formData"  class="form" v-slot="{errors}" :validation-schema="schema" autocomplete="off">
      <!-- 使用账号登录 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.account}" v-model="form.account" name="account" type="text"  placeholder="请输入用户名或手机号" />
          </div>
          <div v-if="errors.account" class="error"><i class="iconfont icon-warning" />{{errors.account}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field :class="{error:errors.password}" name="password" v-model="form.password" type="password" placeholder="请输入密码" />
          </div>
          <div v-if="errors.password" class="error"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <!-- 使用短信登录 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.mobile}" name="mobile" v-model="form.mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div v-if="errors.mobile" class="error"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field :class="{error:errors.code}" name="code" v-model="form.code" type="text" placeholder="请输入验证码" />
            <span @click="send()" class="code">{{time===0?'发送验证码':`${time}秒后点击`}}</span>
          </div>
          <div v-if="errors.code" class="error"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <!-- Field 的 as 属性可以指定为其他标签，也可指定为组件。 -->
      <!-- 但是组件需要支持 v-model 否则校验不会触发。 -->
      <div class="form-item">
        <div class="agree">
          <!-- <XtxCheckbox v-model="form.isAgree" /> -->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree"/>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a @click="login()" href="javascript:;" class="btn">登录</a>
    <!-- </div> -->
    </Form>
    <div class="action">
      <!-- <span id="qqLoginBtn"></span> -->
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a>
      <!-- <a href="https://graph.qq.com/oauth2.0/authorize?client_id=101941968&response_type=token&scope=all&redirect_uri=http%3A%2F%2Ferabbit.itheima.net%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a> -->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from 'vue'
import { userMobileLoginMsg, userAccountLogin, userMobileLogin } from '@/api/user'
import { Form, Field } from 'vee-validate' // 官方插件
import schema from '@/utils/vee-validate-schema'
// import QC from 'qc'

import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup () {
  //   onMounted(() => {
  //     // 组件渲染完毕，使用QC生成QQ登录按钮
  //     QC.Login({
  //       btnId: 'qqLoginBtn'
  //     })
  //   })
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单对象数据
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })

    // vee-validate 校验基本步骤
    //  1.导入Form Field 组件 将form和input 进行替换,需要加上name用来指定将来的校验规则函数的
    //  2. Field 需要进行数据绑定,字段名称最好和后台接口需要的一致
    //  3.定义Field的name属性指定的校验规则函数, Form的validation-schema接受定义好的校验规则是对象

    // 校验规则对象
    const mySchema = {
      // 校验规则 返回 true就是成功, 返回 字符串就是校验失败 ,字符串是错误提示
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }

    // 监听 isMsgLogin 是否短信登录
    // 在切换 短信 与 账户 登录时候清空表单和校验结果
    const formData = ref(null)
    watch(isMsgLogin, async () => {
      // 切换表单元素，还原数据和清除校验效果
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      formData.value.resetForm() // 校验效果清除，Form组件提供resetForm()
    })

    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // 点击登录时,校验
    const login = async (value) => {
      // Form组件提供了一个 validate 函数作为整体表单校验，当是返回的是一个promise
      const valid = await formData.value.validate()
      // console.log(valid)
      if (valid) {
        let data = null
        // 1,准备 api接口,调用api获取数据
        // 2.成功: 存储用户信息 + 跳转至来源页面或者首页 + 消息提示
        // 3.失败:消息提示
        try {
          if (!isMsgLogin.value) {
          // 账号密码登录
            data = await userAccountLogin({ account: form.account, password: form.password })
          } else {
            // 短信登录
            data = await userMobileLogin(form)
          }
          // 存储用户信息----
          const { id, account, nickname, avatar, token, mobile } = data.result
          // console.log('id, account, nickname, avatar, token, mobile:', id, account, nickname, avatar, token, mobile)
          store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
          // 提示
          Message({ type: 'success', text: '登录成功' })
          // 跳转至来源页面或者首页
          router.push(route.query.redirectUrl || './')
        } catch (e) {
          Message({ type: 'error', text: '登录失败' })
          // Message({ type: 'error', text: error.response.data.message || '登录失败' })
        }
      }

      // Message({ text: '账号密码不正确,请重试!', type: 'error' })
    }

    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      // 秒数 小于等于0,停止定时器
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    // 销毁定时器
    onMounted(() => {
      pause()
    })
    // 倒计时标识
    const time = ref(0)
    // 发送验证码 方法
    const send = async () => {
      // 拿到 当前手机号 进行验证
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) { // 通过验证
        // 没有倒计时才可以发送
        if (time.value === 0) {
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' }) // 提示信息
          time.value = 60
          resume()
        }
      } else {
        // 失败,使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formData.value.setFieldError('mobile', valid)
      }
    }
    return { isMsgLogin, form, schema: mySchema, formData, login, send, time }
  }
  // ,
  // created () {
  //   this.$message({ text: '账号密码不正确,请重试!', type: 'error' })
  // }
}
</script>
<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
