<template>
  <el-menu
    default-active="/"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409eff"
    router
  >
    <div class="logo">
      <img src="./logo_admin.png" alt />
    </div>
    <el-menu-item index="/">
      <i class="iconfont iconapp_icons--"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="iconfont iconwenzhang-copy"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont iconimg"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont iconfabu"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont iconpinglun"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont iconfans"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
  },
  created () { },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='less' scoped>
.logo {
  width: 100%;
  height: 60px;
  text-align: center;
  img {
    margin-top: 10px;
    line-height: 60px;
  }
}
.iconfont {
  margin-right: 10px;
  padding-left: 5px;
}
</style>
