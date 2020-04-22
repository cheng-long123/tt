// 用户请求模块
// 导入request
import request from '@/utils/request'
// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data
  })
}
// 获取用户基本资料
export const getUserinfor = () => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/user/profile'
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }

  })
}
