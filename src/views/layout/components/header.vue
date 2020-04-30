<template>
  <div class="Header-container">
    <i class="el-icon-s-fold"></i>
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
        <el-dropdown-item>
          <i class="el-icon-lock"></i>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { getUserinfor } from '@/api/user'
export default {
  name: 'AppHeader',
  props: {},
  components: {},
  data () {
    return {
      user: {
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    getUserinfor () {
      getUserinfor().then((res) => {
        this.user = res.data.data
      })
    }
  },
  created () {
    this.getUserinfor()
  },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='less' scoped>
.Header-container {
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  .head-left {
    float: left;
  }
  .el-icon-s-fold {
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
</style>
