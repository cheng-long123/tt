<template>
  <div class='image-container'>
     <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
   </el-breadcrumb>
  </div>
  <image-list
  :is-show-action="true"
  :is-show-check="false"
  />
</el-card>
</div>
</template>

<script>
import imageList from './components/image-list'
export default {
  name: '',
  props: {},
  components: {
    imageList
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
</style>
