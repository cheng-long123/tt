// 用户请求模块
// 导入request
import request from '@/utils/request'
// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 获取用户基本资料
export const getUserinfor = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MjEwNzgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.-6fuZbztej2J49GueJPVPb0UqcaM1jywA1EyT6miNhY'
    }

  })
}
