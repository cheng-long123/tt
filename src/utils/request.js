// 封装axios请求
// 引入axios
import axios from 'axios'
// 创建request请求
const request = axios.create({
// 统一接口地址
  baseURL: 'http://ttapi.research.itcast.cn/mp'
// timeout: timeout
// headers: headers
})
export default request
