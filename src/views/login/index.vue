<template>
  <div class="login-container">
    <el-form class="from-login" ref="login-form" :model="user" :rules="formRules">
      <div class="logo">
        <img src="./logo_index.png" alt />
      </div>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onlogin()" class="login-btn" :loading="LoginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
// script代码
<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '18888888888',
        // 13911111111
        code: '246810',
        agree: false
        // 246810
      },
      LoginLoading: false,
      // 表单验证
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '验证码格式错误', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请用户同意信息'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    onlogin () {
      this.$refs['login-form'].validate((valid) => {
        if (valid) {
          this.Login()
        } else {
          return false
        }
      })
    },
    Login () {
      // 禁用按钮
      this.LoginLoading = true
      // // 接收
      // const user = this.user
      //  发送请求
      login(this.user).then((res) => {
        // 登录成功

        this.$message({
          message: '登陆成功',
          type: 'success',
          center: true,
          showClose: true
        })
        // 存储token
        // localStorage.setItem('token', res.data.data.token)
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 按钮 解禁
        this.LoginLoading = false
        // 跳转
        // this.$router.push('/')
        this.$router.push({
          name: 'home'
        })
      }).catch(() => {
      // 登陆失败
        this.$message.error({
          message: '登陆失败,手机号或密码错误',
          center: true,
          showClose: true
        })
        // 按钮 解禁
        this.LoginLoading = false
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
