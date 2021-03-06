// 评论接口
import request from '@/utils/request'

// 获取评论
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
// 评论打开与关闭
export const updateComment = (params, data) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params,
    data
  })
}
// 获取粉丝
export const getFans = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
