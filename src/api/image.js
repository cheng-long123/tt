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
