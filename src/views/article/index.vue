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
                <el-radio-group v-model="form.resource">
                <el-radio label="草稿"></el-radio>
                <el-radio label="待审核"></el-radio>
                <el-radio label="审核通过"></el-radio>
                <el-radio label="审核失败"></el-radio>
                <el-radio label="删除"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="form.region" placeholder="请选择频道">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            </el-form>
            <!-- /内容管理筛选 -->
    </el-card>
    <!-- 下部分 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>根据筛选条件共查询到 46147 条结果：</span>
        </div>
        <!-- 表格区域 -->
            <el-table
            :data="articles"
            style="width: 100%"
            size="small"
            >
            <el-table-column
            prop="date"
            label="封面"
            >
            </el-table-column>
            <el-table-column
            prop="title"
            label="标题"
            >
            </el-table-column>
            <el-table-column
            label="状态">
             <template slot-scope="scope">
            <el-tag v-if ="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if ="scope.row.status === 1" type="warning">待审核</el-tag>
            <el-tag v-else-if  ="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if  ="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if  ="scope.row.status === 4" type="info">已删除</el-tag>
             </template>
            </el-table-column>
            <el-table-column
            prop="pubdate"
            label="发布时间">
            </el-table-column>
            <el-table-column
            label="操作">
            <template>
              <el-button
                size="small"
                circle
                plain
                icon="el-icon-edit"
                type="primary"
               ></el-button>
              <el-button
                size="small"
                circle
                type="danger"
                plain
                icon="el-icon-delete"
               ></el-button>
             </template>
            </el-table-column>
            </el-table>
        <!-- /表格区域 -->

        <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        <!-- /分页 -->
    </el-card>
  </div>
</template>
<script>
import { getArticle } from '@/api/article'
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
        desc: ''
      },
      articles: [],
      value1: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    getArticle () {
      getArticle().then(res => {
        // console.log(res)
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  },
  created () {
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
</style>
