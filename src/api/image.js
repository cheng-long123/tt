// 图片素材接口
import request from '@/utils/request'

// 上传图片
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
// 获取图片素材
export const getImage = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 获取图片素材
export const collectImage = (collect, targetId) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${targetId}`,
    data: {
      collect
    }
  })
}
