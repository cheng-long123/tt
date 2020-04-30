<template>
  <div class='uploadcover-container'>
    <div class="addImage" @click="dialogVisible = true">
      <img ref="cover-image" :src="value" alt="">
    </div>
     <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
      >
      <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="first">
            <image-list
            :is-show-add="false"
            :is-show-action="false"
            ref="selected-list"
            />
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
              <div class="uploadImage" @click="$refs.file.click()">
              <img ref="preview-cover"  alt="">
            </div>
             <input type="file" ref="file" id="file" hidden @change="onFileChange">
          </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
        type="primary"
        @click="onCoverConfirm"
        >确 定</el-button>
      </span>
   </el-dialog>
  </div>
</template>
<script>
import { uploadImage } from '@/api/image'
import imageList from '@/views/image/components/image-list'
export default {
  name: 'UploadcoverIndex',
  props: ['value'],
  components: {
    imageList
  },
  data () {
    return {
      activeName: 'first',
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onFileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-cover'].src = blob
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          return this.$message('请选择图片！')
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.$refs['cover-image'].src = res.data.data.url
          this.dialogVisible = false
          this.$emit('input', res.data.data.url)
          // this.$refs['image-cover'].src = ''
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['selected-list']
        const selected = imageList.selected
        if (selected === null) {
          return this.$message('请选择图片！')
        }
        // 关闭对话框
        this.dialogVisible = false
        this.$emit('input', imageList.images[selected].url)
      }
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.addImage{
  float: left;
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  margin-right: 20px;
  background: url("./upload.png") no-repeat;
  background-size: cover;
  img{
  width: 100%;
    height: 100%;
  }
}
.addImage:hover{
  border: 1px dashed #409EFF;
}
.uploadImage{
  width: 230px;
  height: 230px;
  border: 1px dashed #ccc;
  margin: 0 auto;
  background: url('./upload.png') no-repeat;
  background-size: cover;
  img{
    width: 100%;
    height: 100%;
  }
}
.uploadImage:hover{
  border: 1px dashed #409EFF;
}
</style>
