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
                <el-form ref="form" :model="user" style="" label-width="80px">
              <el-form-item label="编号">
                {{user.id}}
              </el-form-item>
              <el-form-item label="手机">
               {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea"  v-model="user.intro"></el-input>
              </el-form-item>
                <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="upUserinfor">保存设置</el-button>
              </el-form-item>
          </el-form>
              </el-col>
              <el-col :span="5" :offset="5">
               <label for="file">
                  <el-avatar
                  shape="square"
                  :size="200"
                  fit="contain"
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
            :visible.sync="dialogVisible">
               <el-image
                :src="previewImage"
                fit="cover">
              </el-image>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>
<script>
import { getUserinfor, upUserinfor } from '@/api/user'
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
      previewImage: ''
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
      // console.log(blobData)
    },
    upUserinfor () {
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
        this.getUserinfor()
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
.upavatar{
  margin-right: 20px;
  text-align: center;
}
</style>
