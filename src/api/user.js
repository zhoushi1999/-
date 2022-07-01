import request from '@/utils/request'
// this只能在vue中使用，不能在js使用
// import store from '@/store'
export const getSmsCode = (mobile) => {
  return request({ url: `sms/codes/${mobile}` })
}
// 登录接口
export const login = ({ mobile, code }) => {
  return request({ url: '/authorizations', method: 'POST', data: { mobile, code } })
}
// 获取用户个人信息
export const getUserinfo = () => {
  return request({
    url: 'user'
  })
}
