// 封装axios请求
// 引入axios
import axios from 'axios'
// 创建request请求
const request = axios.create({
  // 统一接口地址
  baseURL: 'http://ttapi.research.itcast.cn/'
  // timeout: timeout
  // headers: headers
})

// 请求拦截器

request.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config)
  return config
}, function (error) {
  return Promise.reject(error)
})
export default request
