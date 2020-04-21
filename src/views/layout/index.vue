<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside class="aside" width="200px">
      <app-aside class="aside-menu" />
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <app-header />
      </el-header>
      <!-- 内容 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件
import AppAside from './components/aside'
import AppHeader from './components/header'
export default {
  name: 'LayoutIndex',
  props: {},
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {
    }
  },
  created () { },
  computed: {
  },
  watch: {},
  methods: {
  },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='less' scoped>
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .aside-menu {
    height: 100%;
  }
}
</style>
