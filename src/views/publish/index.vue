<template>
  <div class="publish">
      <el-card class="box-card">
          <div slot="header" class=clearfix >
              <span>发布文章</span>
          </div>
          <el-form ref="form" :model="article" label-width="80px">
              <el-form-item label="标题">
                  <el-input v-model="article.title"></el-input>
              </el-form-item>
              <el-form-item label="内容">
                  <quill-editor v-model="article.content" ref="myQuillEditor" :options="editorOption" class="ql-editor"></quill-editor>
              </el-form-item>
              <el-form-item label="频道">
                  <channels v-model="article.channel_id" :include-all="false"></channels>
              </el-form-item>

              <el-form-item label="封面">
                  <el-radio-group v-model="article.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                  </el-radio-group>
                  <template v-if="article.cover.type>0">
                    <el-row :gutter="20">
                      <el-col :span="4" v-for="(item,index) in article.cover.type" :key="item">
                        <UploadImage v-model="article.cover.images[index]"></UploadImage>
                      </el-col>
                    </el-row>
                  </template>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit(false)">发表</el-button>
                    <el-button @click="onSubmit(true)">存入草稿</el-button>
                </el-form-item>

          </el-form>
      </el-card>
  </div>
</template>

<script>
// 引入富文本编辑器的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
import channels from '../../components/channels'

import UploadImage from '../../components/upload-image'
export default {
  name: 'publishArticle',
  data () {
    return {
      article: {
        content: '',
        title: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      // channels: [],
      editorOption: {}
    }
  },
  components: {
    // 注册组件
    quillEditor,
    channels: channels,
    UploadImage
  },
  created () {
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.updateArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        method: 'post',
        url: '/articles',

        params: {
          draft
        },
        data: this.article
      }).then(res => {
        console.log(res)
        this.$router.replace('/article')
        this.$message({ message: '发布成功', type: 'success' })
      }).catch(err => {
        console.log(err, '发布失败')
      })
    },
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.$router.replace('/article')
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    },
    loadArticle () {
      this.$axios({
        method: 'get',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style>
.ql-editor {
  min-height: 300px;
}
</style>
