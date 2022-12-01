// 定义校验规则提供给vee-validate组件使用
import { userCheckAccount } from '@/api/user'
export default {
  // 用户名校验
  account (value) {
    // 1. 必填
    // 2. 6-20个字符，需要以字母开头
    if (!value) return '用户名不能为空' // 非空校验
    if (!/^[a-zA-Z]\w{5,11}$/.test(value)) return '字母开头且6-20个字符'
    return true
  },
  // 密码校验
  password (value) {
    // 1. 必填
    // 2. 密码是6-24个字符
    if (!value) return '密码不能为空' // 非空校验
    if (!/^\d{6,12}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  // 手机号校验
  mobile (value) {
    // 1. 必填
    // 2. 密码是6-24个字符
    if (!value) return '手机号码不能为空' // 非空校验
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机格式不正确'
    return true
  },
  // 验证码校验
  code (value) {
    // 1. 必填
    // 2. 密码是6-24个字符
    if (!value) return '验证码不能为空' // 非空校验
    if (!/^\d{6}$/.test(value)) return '验证码长度为6位'
    return true
  },
  // 用户协议
  isAgree (value) {
    if (!value) return '请勾选用户协议'
    return true
  },
  async accountApi (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    // 服务端校验
    const { result } = await userCheckAccount(value)
    if (result.valid) return '用户名已存在'
    return true
  },
  rePassword (value, { form }) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    // 校验密码是否一致  form表单数据对象
    if (value !== form.password) return '两次输入的密码不一致'
    return true
  }
}
