<template>
  <div class="article-container">
    <!-- 上部分 -->
    <el-card class="box-card head-crad">
        <div slot="header" class="clearfix">
            <!-- 内容管理面包屑路径导航-->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        <!-- 、内容管理面包屑路径导航-->
        </div>
        <!-- 内容管理筛选 -->
            <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item label="状态">
                <el-radio-group v-model="status">
                  <el-radio :label="null">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
                <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="channelId" placeholder="请选择频道">
                <el-option label="全部" :value="null"></el-option>
                <el-option
                v-for="(channel,index) in channels"
                :key="index"
                :label="channel.name"
                :value="channel.id"
                 >
                 </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
             <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="loading" @click="getArticle(page=1)">查询</el-button>
            </el-form-item>
            </el-form>
            <!-- /内容管理筛选 -->
    </el-card>
    <!-- 下部分 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>根据筛选条件共查询到 {{totalCount}} 条结果：</span>
        </div>
        <!-- 表格区域 -->
            <el-table
            :data="articles"
            style="width: 100%"
            size="small"
            v-loading="loading"
            >
            <el-table-column
            prop="date"
            label="封面"
            >
            <template slot-scope="scope">
              <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              lazy>
              </el-image>
              <!-- <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]"
              alt="">
              <img
              v-else
              class="article-cover"
              src="./no-cover.gif"
              alt=""> -->
            </template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="标题"
            >
            </el-table-column>
            <el-table-column
            label="状态">
             <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-else-if ="scope.row.status === 1" type="warning">待审核</el-tag>
            <el-tag v-else-if  ="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if  ="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if  ="scope.row.status === 4" type="info">已删除</el-tag> -->
             </template>
            </el-table-column>
            <el-table-column
            prop="pubdate"
            label="发布时间">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                circle
                plain
                icon="el-icon-edit"
                type="primary"
                @click="$router.push('/publish?id=' + scope.row.id)"
               ></el-button>
              <el-button
                size="small"
                circle
                type="danger"
                plain
                icon="el-icon-delete"
                @click = "onDeleteArticle(scope.row.id)"
               ></el-button>
             </template>
              </el-table-column>
              </el-table>
        <!-- /表格区域 -->

        <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                :page-size="pageSize"
                :disabled="loading"
                :current-page.sync="page"
                @current-change="currentChange">
            </el-pagination>
        <!-- /分页 -->
    </el-card>
  </div>
</template>
<script>
import { getArticle, getArticleChannels, deleteArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
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
        desc: '',
        value1: ''
      },
      articleStatus: [
        { text: '草稿', type: '' },
        { text: '待审核', type: 'warning' },
        { text: '审核通过', type: 'success' },
        { text: '审核失败', type: 'danger' },
        { text: '已删除', type: 'info' }
      ],
      articles: [], // 文章列表
      totalCount: 0, // 总数据数
      pageSize: 10, // 每页 数据条数
      status: null, // 状态
      channels: [], // 频道
      channelId: null, // 查询频道
      rangeDate: null, // 时间
      loading: true, // 加载
      page: 1 // 分页
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取列表信息
    async getArticle (page = 1) {
      this.loading = true
      const res = await getArticle({
        page: this.page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 起始时间
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止时间
      })
      this.loading = false
      const { results, total_count: TotalCount } = res.data.data
      this.articles = results
      this.totalCount = TotalCount
    },
    // 分页
    currentChange (page) {
      this.page = page
      this.getArticle()
    },
    // 获取频道
    async getChannels () {
      const res = await getArticleChannels()
      this.channels = res.data.data.channels
    },
    // 删除功能
    onDeleteArticle (articleId) {
      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 转换为字符串格式
        const res = await deleteArticle(articleId.toString())
        this.$message({
          message: '删除成功',
          type: 'success',
          center: true
        })
        this.getArticle(this.page)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          center: true
        })
      })
    }
  },
  created () {
    // 调用
    this.getChannels()
    this.getArticle()
  },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='less' scoped>
.head-crad{
    margin-bottom: 40px;
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-pagination{
      text-align: center;
      margin-top: 30px;
  }
  .article-cover{
    width: 120px;
    background-size: cover;
  }
</style>
