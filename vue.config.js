
module.exports = {
// 自定义 VueCLI 中的 webpack 配置
  configureWebpack: {
    // 告诉 webpack 使用 script 标签加载的那个资源，而不是去 node_moudles 中打包处理
    externals: {
    // 属性名：你加载的那个包名
    // 属性值：script 标签暴露的全局变量，注意，写到字符串中！！！
    // 'element-ui': 'ELEMENT'
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      echarts: 'echarts'

      // 这个不是错误，是一个语法警告，意思是如果没有特殊符号就不要加引号，有特殊符号是必须加引号的
      // 对象属性名都加引号也不是错，仅仅一个警告而已，无关紧要。
    }
  }
}
