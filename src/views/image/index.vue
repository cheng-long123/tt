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
     <el-button type="success"  size="mini" @click="dialogVisible=true">添加素材</el-button>
    </div>
    <el-dialog
        title="上传素材"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body="false"
        >
        <el-upload
        class="upload-demo"
        drag
        name="image"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
         :on-success="uploadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
       </el-upload>
    </el-dialog>
    <el-row :gutter="20" class="fodder-bg">
        <el-col
        class="fodder-border"
        v-for="(image, index) in images"
        :key="index"
        :xs=12
        :sm=6
        :md=6
        >
        <div class="fodder-box">
            <span :class="{
                'el-icon-star-off': !image.is_collected,
                'el-icon-star-on': image.is_collected
                }"
                @click=collectImage(image)></span>
            <span class=" el-icon-delete"></span>
        </div>
       <el-image
        style="width:100%; height:180px"
        :src="image.url"
        fit="cover">
      </el-image>
        </el-col>
     </el-row>
     <el-pagination
        class="fodder-paging"
        background
        layout="prev, pager, next"
        :total="1000">
     </el-pagination>
</el-card>
  </div>
</template>
<script>
import { getImage, collectImage } from '@/api/image'

export default {
  name: 'ImageIndex',
  props: {},
  components: {},
  data () {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取图片素材
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
    },
    uploadSuccess () {
    // 取消隐藏
      this.dialogVisible = false
      // 重新渲染
      this.getImage()
    },
    collectImage (imageId) {
      console.log(this.images)
      collectImage(!imageId.is_collected, imageId.id).then(res => {
        console.log(res)
        if (!imageId.is_collected) {
          this.$message({
            showClose: true,
            message: '收藏成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '取消收藏',
            type: 'success'
          })
        }
        this.getImage()
      })
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
        position: relative;
        // border: 1px solid #ccc;
        margin-top: 20px;
        // padding: 0 5px;
        .fodder-box{
            display: none;
            position: absolute;
            bottom: 0;
            left:50%;
            width: 250px;
            height: 0;
              font-size: 20px;
            // margin: 0 5px;
            // padding:0 20px;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 100;
            transform: translate(-50%);
             line-height: 30px;
             font-weight: 700;

              .el-icon-star-off,
              .el-icon-star-on{
                    float: left;
                    margin-left: 30%;
                }
                 .el-icon-star-on{
                     color: red;
                 }
                 .el-icon-delete{
                     float:right;
                     margin-right: 30%;
                 }
        }
    }
            .fodder-border:hover .fodder-box {
            height: 30px;
            display: block;
            }
}
         .fodder-paging{
                text-align: center;
                margin-top: 40px;
            }
</style>
