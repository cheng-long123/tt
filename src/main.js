import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载 element 组件库
import ElementUI from 'element-ui'
// 引进element-tiptap组件库
import { ElementTiptapPlugin } from 'element-tiptap'
// 加载 element 组件库样式
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
// import './style/index.less'
// 声明语言
Vue.use(ElementTiptapPlugin, {
  lang: 'zh'// 中文简体
})
// 注册ElementUI
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
