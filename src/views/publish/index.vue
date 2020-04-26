<template>
  <div class='publish-container'>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <el-form ref="form" :model="article" label-width="60px" :rules="formRules">
            <el-form-item label="标题" style="width:500px" prop="title">
                <el-input v-model="article.title" placeholder="请输入标题" ></el-input>
            </el-form-item>
             <el-form-item label="内容"  prop="content">
                <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
                <el-tiptap v-model="article.content" :extensions="extensions" height=500 placeholder="请输入内容"></el-tiptap>
            </el-form-item>
             <el-form-item label="封面">
                <el-radio-group v-model="article.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" prop="channel_id">
                <el-select v-model="article.channel_id"  placeholder="请选择频道">
                <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="(channel, index) in channels"
                :key="index">
                 </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                 <el-button  v-if="$route.query.id" type="success" @click="onPublish(false)">修改</el-button>
                <el-button v-else type="primary" @click="onPublish(false)">发布</el-button>
                <el-button  @click="onPublish(true)">{{$route.query.id ? '修改草稿' : '存为草稿'}}</el-button>
            </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {
  getArticleChannels,
  addArticle,
  getAppointArticle,
  updateArticle
} from '@/api/article'
import { uploadImage } from '@/api/image'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'

import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Link,
  Iframe,
  CodeBlock,
  Blockquote,
  Image,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  TrailingNode,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  FormatClear,
  TextColor,
  TextHighlight,
  Preview,
  Print,
  Fullscreen,
  SelectAll,
  FontType
} from 'element-tiptap'
export default {
  name: 'PublishIndex',
  props: {},
  components: {
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new Iframe(),
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }),
        new CodeBlock(),
        new Blockquote(),
        new TodoItem(),
        new TodoList(),
        new TextAlign(),
        new Indent(),
        new LineHeight(),
        new HorizontalRule(),
        new HardBreak(),
        new TrailingNode(),
        new History(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new FormatClear(),
        new TextColor(),
        new TextHighlight(),
        new Preview(),
        new Print(),
        new SelectAll(),
        new FontType(),
        new Fullscreen()
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 获取频道
    getChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 发表文章
    onPublish (draft = false) {
    // 获取id
      const articleId = this.$route.query.id
      // 判断是否有id 如果有执行修改 没有执行添加
      if (articleId) {
        updateArticle(articleId, this.article, draft).then(res => {
          console.log(res)
          if (draft === false) {
            this.$message({
              message: '修改成功',
              type: 'success',
              center: true
            })
          } else {
            this.$message({
              message: '修改草稿成功',
              type: 'success',
              center: true
            })
          }
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          console.log(res)
          if (draft === false) {
            this.$message({
              message: '发布成功',
              type: 'success',
              center: true
            })
          } else {
            this.$message({
              message: '草稿发布成功',
              type: 'success',
              center: true
            })
          }
          this.$router.push('/article')
        })
      }
    },
    // 获取指定文章
    getAppointArticle () {
      getAppointArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    }
  },
  created () {
    this.getChannels()
    // 判断地址是否传过来id 如果传过来就执行
    if (this.$route.query.id) {
      this.getAppointArticle()
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
</style>
