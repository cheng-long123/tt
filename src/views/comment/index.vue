<template>
  <div class='comment-container'>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
   </el-breadcrumb>
  </div>
  <el-table
       v-loading="loading"
      :data="comments"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
             {{scope.row.comment_status ? '正常':'关闭'}}
      </template>
      </el-table-column>
      <el-table-column
        label="操作">
       <template slot-scope="scope">
         <el-button
         v-if="scope.row.comment_status"
          size="mini"
          type="danger"
          plain
           @click="operationComment(scope.row.id.c,false)">
          关闭评论</el-button>
         <el-button
         v-else size="mini"
          type="success"
          plain
          @click="operationComment(scope.row.id.c,true)">
          打开评论</el-button>
       </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="paging"
        background
        :disabled="loading"
        layout="prev, pager, next"
        :page-size="per_page"
        :total="totalCount"
        :size-change.sync="page"
         @current-change="currentChange"
        >
   </el-pagination>
</el-card>

  </div>
</template>
<script>
import { getComment, updateComment } from '@/api/comment'
export default {
  name: 'CommentIndex',
  props: {},
  components: {},
  data () {
    return {
      comments: [],
      per_page: 20, // 每页数据
      totalCount: 0, // 总数据
      page: 1, // 页数
      loading: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取评论
    getComment (page) {
      this.loading = true
      getComment({
        page,
        response_type: 'comment',
        per_page: this.per_page
      }).then(res => {
        console.log(res)
        this.loading = false
        this.comments = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    // 分页
    currentChange (page) {
      this.getComment(page)
    },
    // 打开关闭评论
    operationComment (id, status) {
      const articleid = id.join('')
      //   console.log(id)
      this.$confirm(status ? '亲，您是否要打开当前文章评论功能?' : '亲，您是否要关闭当前文章评论功能，如果关闭读者将无法对这篇文章进行评论',
        '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$message({
          type: 'success',
          message: status ? '已打开评论' : '已关闭评论',
          center: true
        })
        updateComment({
          article_id: articleid
        }, { allow_comment: status }).then(res => {
        // console.log(res)
          this.getComment()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getComment()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.paging{
    text-align: center;
    margin-top: 30px;
}
</style>
