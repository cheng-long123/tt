<template>
  <div class='setting-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
          <el-row>
              <el-col :span="10">
                <el-form ref="form-user" :model="user" :rules="formRules" label-width="80px">
              <el-form-item label="编号">
                {{user.id}}
              </el-form-item>
              <el-form-item label="手机">
               {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称" prop="name">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍" prop="intro">
                <el-input type="textarea"  v-model="user.intro"></el-input>
              </el-form-item>
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                type="primary"
                @click="upUserinfor"
                 :disabled="updateUserinfoLoding"
                >
                保存设置</el-button>
              </el-form-item>
          </el-form>
              </el-col>
              <el-col :span="5" :offset="5">
               <label for="file">
                  <el-avatar
                  class="avatar"
                  shape="square"
                  :size="200"
                  fit="cover"
                  :src="user.photo">
                </el-avatar>
               </label>
                <input id="file" type="file" ref="file" hidden @change="fileChange" >
                  <p class="upavatar">修改头像</p>
              </el-col>
          </el-row>
   </el-card>
          <el-dialog
            title="修改头像"
              width="30%"
              append-to-body
              :visible.sync="dialogVisible"
              @opened="dialogOpened"
              @closed="dialogClosed"
             >
             <div class="previewImage">
               <img id="image" class="preview-image" ref="image" :src="previewImage">
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button
              type="primary"
              @click="upUserPhoto"
              :disabled="updateUserPhotoloading"
              >
              确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>
<script>
import { getUserinfor, upUserinfor, upUserPhoto } from '@/api/user'
import globalBus from '@/utils/global-bus'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'SettingIndex',
  props: {},
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {
        id: null, // 编号
        email: '', // 邮箱
        intro: '', // 介绍
        name: '', // 名称
        photo: '', // 图片地址
        mobile: '' // 手机号
      },
      dialogVisible: false, // Dialog显示与隐藏
      previewImage: '',
      cropper: null, // cropper对象
      updateUserinfoLoding: false,
      updateUserPhotoloading: false,
      formRules: {
        name: [
          { required: true, message: '媒体名称不能为空！', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '媒体介绍不能为空！', trigger: 'blur' },
          { min: 10, message: '必须 10 个字符以上', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空！', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取用户资料
    getUserinfor () {
      getUserinfor().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    // 头像
    fileChange () {
      this.dialogVisible = true
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      this.$refs.file.value = ''
      // console.log(blobData)
    },
    // 创建裁剪
    dialogOpened () {
      const image = this.$refs.image
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none'
      })
    },
    // 销毁裁剪
    dialogClosed () {
      this.cropper.destroy()
    },
    // 更新用户头像
    upUserPhoto () {
      this.cropper.getCroppedCanvas().toBlob(file => {
        this.updateUserPhotoloading = true
        const fd = new FormData()
        fd.append('photo', file)
        upUserPhoto(fd).then(res => {
          console.log(res)
          this.dialogVisible = false
          this.$message({
            message: '头像修改成功',
            type: 'success',
            center: true
          })
          this.updateUserPhotoloading = false
          this.user.photo = window.URL.createObjectURL(file)
          globalBus.$emit('user-info', this.user)
        })
      })
    },
    // 修该用户资料
    upUserinfor () {
      this.$refs['form-user'].validate(value => {
        this.updateUserinfoLoding = true
        // console.log(value)
        if (value) {
          upUserinfor({
            name: this.user.name,
            intro: this.user.intro,
            email: this.user.email
          }).then(res => {
            this.$message({
              message: '修改资料成功',
              type: 'success',
              center: true
            })
            this.updateUserinfoLoding = false
            globalBus.$emit('user-info', this.user)
            this.getUserinfor()
          })
        } else {
          return false
        }
      })
    }
  },
  created () {
    this.getUserinfor()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.avatar:hover{
  border: 1px dashed #409eff;
  border-radius: 5px;
}
.upavatar{
  margin-right: 20px;
  text-align: center;
}
.previewImage{
  .preview-image {
    display: block;
  height: 200px;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
  margin: 0 auto;
}
}
</style>
