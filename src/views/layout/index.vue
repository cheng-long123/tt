<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <!-- <app-header /> -->
        <i
          :class="{
          'el-icon-s-fold':!isCollapse,
          'el-icon-s-unfold':isCollapse
          }"
          @click="isCollapse = !isCollapse"
        ></i>
        <div class="head-font">江苏传智播客科技教育有限公司</div>
        <el-dropdown class="head-right">
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt />
            <span class="el-dropdown-link">
              {{user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-setting"></i>
              个人设置
            </el-dropdown-item>
            <el-dropdown-item @click.native="onLogout()">
              <i class="el-icon-lock"></i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
// import AppHeader from './components/header'
import { getUserinfor } from '@/api/user'
export default {
  name: 'LayoutIndex',
  props: {},
  components: {
    AppAside
  },
  data () {
    return {
      user: {
      },
      isCollapse: false
    }
  },
  created () {
    this.getUserinfor()
  },
  computed: {
  },
  watch: {},
  methods: {
    // 获取用户信息
    getUserinfor () {
      getUserinfor().then((res) => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    // 退出登录
    onLogout () {
      // console.log(123)
      this.$confirm('你确定要退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除token
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          center: true
        })
      })
    }
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
  .header {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    .head-left {
      float: left;
    }
    .el-icon-s-fold,
    .el-icon-s-unfold {
      float: left;
      line-height: 60px;
      font-size: 24px;
    }

    .head-font {
      float: left;
    }
    .head-right {
      float: right;
      .avatar-wrap {
        display: flex;
        align-items: center;
        font-weight: 700;
        color: #049eff;

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
