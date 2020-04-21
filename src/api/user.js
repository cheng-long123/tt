// 用户请求模块
// 导入request
import request from '@/utils/request'
// 封装
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}
