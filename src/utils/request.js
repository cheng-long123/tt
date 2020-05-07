// 封装axios请求
// 引入axios
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
import { Message } from 'element-ui'
// 创建request请求
const request = axios.create({
  // 统一接口地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 处理大数字
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
  // timeout: timeout
  // headers: headers
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const { status } = error.response
  if (status === 401) {
    window.localStorage.removeItem('user')
    router.push('/login')
    Message({
      type: 'warning',
      message: '登陆状态无效,请重新登录',
      center: true
    })
  } else if (status === 403) {
    Message({
      type: 'warning',
      message: '没有操作权限',
      center: true
    })
  } else if (status >= 500) {
    Message({
      type: 'warning',
      message: '服务器内部异常,请稍后重试',
      center: true
    })
  }
  return Promise.reject(error)
})
export default request
