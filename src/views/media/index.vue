<template>
<div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>

        <el-upload class="upload-demo" style="float:right;"
                   action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                   :headers="uploadHeaders"
                   name="image"
                   :on-success="onUploadSuccess"
                   :show-file-list="true">
                   <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button>
                   </el-upload>
      </div>
      <div>
        <el-radio-group v-model="type" @change="onFind">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <!--
        el-row 行
          gutter 间隔距离
        el-col 列
          span 用来指定列数
       -->
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="12"
          :md="4"
          v-for="item in images"
          :key="item.id"
          class="col-item"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="item.url"
              class="image"
              height="200"
            />
            <div style="padding: 14px;" class="action">
              <!-- class 还支持对象语法， -->
              <i :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off': !item.is_collected
              }"
              @click="onCollect(item)"></i>

              <!-- class 本来就是绑定数据字符串 -->
              <!-- <i :class="item.is_collected ? 'el-icon-star-on': 'el-icon-star-off'"></i> -->
              <i class="el-icon-delete-solid" @click="onDelete(item)"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
</div>
</template>

<script>
const token = window.sessionStorage.getItem('user')
export default {
  name: 'MediaIndex',
  components: {},
  props: {},
  data () {
    return {
      images: [],
      type: '全部',
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },

    // 该函数是 radio 的 change 事件处理函数
    // 通过文档我们得知，事件函数有个回调参数：选中的 Radio label 值
    // 所以我们可以声明一个形参来接收使用
    onFind (value) {
      this.loadImages(value !== '全部')
    },

    onCollect (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        item.is_collected = !item.is_collected
      }).catch(err => {
        this.$message('操作失敗')
        console.log(err)
      })
    },
    onUploadSuccess () {
      this.loadImages(this.type !== '全部')
    },
    onDelete (item) {
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.loadImages(this.type !== '全部')
        }).catch(err => {
          console.log(err)
          this.$message('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.grid-content {
  background-color: pink;
}

.col-item {
  margin-bottom: 20px;
  .action {
    display: flex;
    justify-content: space-around;
    font-size: 24px;
  }
}
</style>
