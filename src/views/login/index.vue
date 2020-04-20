<template>
  <div class="login-container">
    <el-form class="from-login" ref="form" :model="user">
      <div class="logo">
        <img src="./logo_index.png" alt />
      </div>
      <el-form-item>
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      <el-form-item>
        <el-button type="primary" @click="Loginbtn" class="login-btn" :loading="Loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
// script代码
<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false,
      Loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    Loginbtn () {
      // 禁用按钮
      this.Loading = true
      // 接收
      const user = this.user
      //  发送请求
      request({
        method: 'POST',
        url: 'v1_0/authorizations',
        data: user
      }).then(() => {
        // 登录成功
        this.$message({
          message: '登陆成功',
          type: 'success',
          center: true
        })
        // 按钮 解禁
        this.Loading = false
        // console.log(res)
      }).catch(() => {
        // 登陆失败
        // console.log(err)
        this.$message.error({
          message: '登陆失败',
          center: true
        })
        // 按钮 解禁
        this.Loading = false
      })
    }
  },
  created () { },
  mounted () { },
  beforeDestroy () { }
}
</script>

// css样式
<style lang='less' scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  .from-login {
    min-width: 350px;
    background-color: #fff;
    padding: 50px;
    .login-btn {
      width: 100%;
      margin-top: 20px;
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
      img {
        width: 200px;
        height: 40px;
      }
    }
  }
}
</style>
