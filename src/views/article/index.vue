<template>
    <div class="article">
        <!-- 筛选数据 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>全部图文</span>
            </div>
            <el-form ref="form" label-width="80px">
                <el-form-item label="文章状态">
                    <el-radio-group v-model="filterForm.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio label="0">草稿</el-radio>
                        <el-radio label="1">待审核</el-radio>
                        <el-radio label="2">审核通过</el-radio>
                        <el-radio label="3">审核失败</el-radio>
                        <el-radio label="4">已删除</el-radio>

                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道列表">
                    <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
                        <el-option label="所有频道" :value="null"></el-option>
                        <el-option :label="channel.name"
                                    :value="channel.id"
                                    v-for="channel in channels"
                                    :key="channel.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间选择">
                    <el-date-picker
                    v-model="rangeDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">

                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loadArticles(1)">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- //文章列表 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>共找到59806条符合条件的内容</span>
            </div>
            <el-table
            :data="articles"
            style="width: 100%"
            v-loading="loading">
                <el-table-column
                    prop="date"
                    label="封面"
                    width="180">

                    <template slot-scope="scope">
                        <img :src="scope.row.cover.images[0]" alt="" width="50">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                    <!-- <template slot-scope="scope">
                        <el-tag :type="articleStatus[scope.row.status].type">
                            {{articleStatus[scope.row.status].label}}</el-tag>
                    </template> -->
                </el-table-column>

                <el-table-column
                prop="pubdate"
                label="操作">
                    <el-button type="danger" size="mini">删除</el-button>
                    <el-button type="primary" size="mini">编辑</el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分页组件 -->
        <el-pagination
         background
         layout="prev,pager,next"
         :total="totalCount"
         @current-change="onPageChange"
         :disabled="loading"></el-pagination>
    </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      // 过滤数据的条件
      filterForm: {
        status: null,
        channel_id: null,
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      articles: [],
      articleStatus: [],
      totalCount: 59806,
      loading: true,
      channels: []
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      const token = window.sessionStorage.getItem('user')
      this.$axios({
        method: 'get',
        url: 'articles',
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page,
          per_page: 10,
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id// 频道列表
        }
      }).then(res => {
        this.articles = res.data.data.results
        console.log(this.articles)
      }).catch(err => {
        console.log(err, '数据加载失败')
      }).finally(() => {
        this.loading = false
      })
    },
    // 点击页码
    onPageChange (page) {
      this.loadArticles(page)
    },
    // 加载频道列表
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'

      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '数据获取失败')
      })
    }
  }
}
</script>

<style>

</style>
