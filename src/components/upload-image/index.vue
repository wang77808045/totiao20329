<template>
  <div class="upload-image">
    <div class="preview" @click="onUploadShow">
      <img v-if="value" :src="value" class="avatar">

      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <el-dialog title="请选择文章封面图片" :visible.sync="centerDialogVisible" width="50%" center>
      <el-tabs v-model="activeName">
        <!-- 素材庫 -->
        <el-tab-pane label="素材库" name="first">
          <el-radio-group v-model="activeImage" @change="loadImages">
            <el-radio label="all">全部</el-radio>
            <el-radio label="collect">收藏</el-radio>
          </el-radio-group>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in images" :key="item.id"

                    @click.native="activeIndex=index">
                    <i class="el-icon-success" v-if="index === activeIndex"></i>
              <img :src="item.url" height="100" alt />
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 上传图片 -->
        <el-tab-pane label="上传图片" name="second">
          <el-upload></el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  components: {},
  props: { value: { type: String } },
  data () {
    return {
      centerDialogVisible: false, // 对话框显示状态
      activeImage: 'all', // 激活的标签 first/second
      activeName: 'first', // 激活的图片 all/collect
      images: [],
      activeIndex: null // 激活的图片的索引
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onUploadShow () {
      this.loadImages()
      this.centerDialogVisible = true
    },
    loadImages () {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: this.activeImage === 'collect'
        }

      }).then(res => {
        this.images = res.data.data.results
      })
        .catch(err => {
          console.log(err)
        })
    },
    onConfirm () {
      const image = this.images[this.activeIndex]
      if (image) {
        this.$emit('input', image.url)
      }
      this.centerDialogVisible = false
    }
  }
}
</script>

<style scoped>
.upload-image {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.img-item {
  border: 1px solid #0f0;
  box-sizing: border-box;

}
</style>
