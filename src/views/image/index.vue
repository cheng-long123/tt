<template>
  <div class='image-container'>
     <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
   </el-breadcrumb>
  </div>
    <div class="head-btn">
        <el-radio-group v-model="collect" size="mini" @change="collectChange">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
       </el-radio-group>
     <el-button type="success"  size="mini">添加素材</el-button>
    </div>
    <el-row :gutter="20" class="fodder-bg">
        <el-col
        class="fodder-border"
        v-for="(image, index) in images"
        :key="index"
        :xs=12
        :sm=6
        :md=4
        >
       <el-image
        style="width:120px; height:120px"
        :src="image.url"
        fit="cover">
      </el-image>
        </el-col>
     </el-row>
</el-card>
  </div>
</template>
<script>
import { getImage } from '@/api/image'
export default {
  name: 'ImageIndex',
  props: {},
  components: {},
  data () {
    return {
      collect: false,
      images: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getImage (collect = false) {
      getImage({
        collect
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      })
    },
    collectChange (value) {
      this.getImage(value)
      console.log(value)
    }
  },
  created () {
    this.getImage()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.head-btn{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.fodder-bg{
    .fodder-border{
        // border: 1px solid #ccc;
        margin-top: 10px;
        padding: 0 5px;
    }
}
</style>
