<template>
  <div class='fans-container'>
      <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
             </el-breadcrumb>
            </div>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane v-loading="loading" label="粉丝列表" name="first">
              <el-row class="row" :gutter="20">
              <el-col
              v-for="(fans, index) in fanss"
              :key="index"
               class="col"
               :xs="12"
               :sm="8"
               :md="6"
               :lg="4">
              <div class="fans-box">
                 <img :src="fans.photo" alt="">
                  <p>{{fans.name}}</p>
                 <el-button class="btn" type="primary" plain size="mini">+关注</el-button>
              </div>
              </el-col>
           </el-row>
            <el-pagination
              background
              :disabled="loading"
              @current-change="fansCurrentChanage"
              :current-page.sync="page"
              :page-size.sync="per_page"
              :size-change.sync="per_page"
              layout="prev, pager, next, jumper"
              :total="totalCount">
           </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="粉丝画像" name="second">
              <div id="main" ref="main"></div>
            </el-tab-pane>
          </el-tabs>
         </el-card>
  </div>
</template>
<script>
import { getFans } from '@/api/comment'
// import MapDemo from './components/map-demo'
import echarts from 'echarts'
export default {
  name: 'FansIndex',
  props: {},
  components: {},
  data () {
    return {
      activeName: 'first',
      fanss: [],
      totalCount: 0, // 总数据
      page: 1, // 分页
      per_page: 24, // 每页数量
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    getFans () {
      this.loading = true
      getFans({
        page: this.page,
        per_page: this.per_page
      }).then(res => {
        // console.log(res)
        this.fanss = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.loading = false
      })
    },
    fansCurrentChanage (page) {
      this.page = page
      this.getFans()
      // console.log(page)
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(this.$refs.main)
    // console.log(myChart)
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // var option = {
    //   title: {
    //     text: 'ECharts 入门示例'
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ['销量']
    //   },
    //   xAxis: {
    //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //   },
    //   yAxis: {},
    //   series: [{
    //     name: '销量',
    //     type: 'bar',
    //     data: [5, 20, 36, 10, 10, 20]
    //   }]
    // }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.fans-box{
     margin-bottom: 10px;
     border: 1px dashed #ccc;
     width: 130px;
     height: 180px;
     img{
       display: block;
       width: 80px;
       height: 80px;
      margin: 0 auto;
      margin-top: 10px;
      border-radius: 50%;
     }
     p{
       text-align: center;
       font-size: 14px;
      //  color: #409EFF;
     }
     .btn{
       display: block;
      margin:0 auto;
     }
}
#main{
  width: 700px;
  height: 500px;
}
</style>
