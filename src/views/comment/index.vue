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
         <el-switch
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="scope.row.loading"
          @change="operationComment(scope.row)"
          >
        </el-switch>
         <!-- <el-button
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
          打开评论</el-button> -->
       </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="paging"
        background
        :disabled="loading"
        :page-size.sync="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :current-page.sync="page"
         :page-sizes="[10, 20, 30, 40,50]"
        :size-change.sync="per_page"
         @current-change="currentChange"
        @size-change="handleSizeChange"
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
      per_page: 10, // 每页数据
      totalCount: 0, // 总数据
      page: 1, // 页数
      loading: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取评论
    getComment () {
      this.loading = true
      getComment({
        page: this.page,
        response_type: 'comment',
        per_page: this.per_page
      }).then(res => {
        // console.log(res)
        this.loading = false
        // this.comments = res.data.data.results
        const results = res.data.data.results
        // 给每个results设置loading
        results.forEach(comment => {
          // loading 默认false
          comment.loading = false
        })
        // 赋值
        this.comments = results
        // 总数居
        this.totalCount = res.data.data.total_count
      })
    },
    // 分页
    currentChange (page) {
      this.page = page
      this.getComment()
    },
    handleSizeChange (pageSize) {
      this.page = 1
      this.per_page = pageSize
      this.getComment()
    },
    // 打开关闭评论
    operationComment (article) {
      // 禁用
      article.loading = true
      updateComment({
        article_id: article.id.toString()
      }, { allow_comment: article.comment_status }).then(res => {
        // 启用
        article.loading = false
        // console.log(res)
        // this.getComment()
      })
      // const id = id.c
      // const articleid = article.id.c.join('')
      // console.log(commentStatus)
      //   console.log(id)
      // const articleid = article.id.toString()
      // console.log(articleid)
      // this.$confirm(article.comment_status ? '亲，您是否要打开当前文章评论功能?' : '亲，您是否要关闭当前文章评论功能，如果关闭读者将无法对这篇文章进行评论',
      //   '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: article.comment_status ? '已打开评论' : '已关闭评论',
      //     center: true
      //   })
      // })
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
