import request from '@/utils/request'
export const getSmsCode = (mobile) => {
  return request({ url: `sms/codes/${mobile}` })
}
export const login = ({ mobile, code }) => {
  return request({ url: '/authorizations', method: 'POST', data: { mobile, code } })
}
