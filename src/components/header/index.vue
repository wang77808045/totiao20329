<template>
    <el-row type="flex" justify="space-between" align="middle">
        <!-- 左侧 -->
        <el-col :span="6" class="left">
            <i class="el-icon-s-fold"></i>
        <span>北京天鑫盛世科技发展有限公司</span>
        </el-col>
        <!-- 右侧 -->
        <el-col span="3" class="right">
            <!-- 头像 -->
            <img src="../../assets/img/avatar.jpg" alt="">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click">
                <span>快乐风男</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>账户信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
  methods: {
    onLogout () {
      this.$confirm('确认推出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        // 删除 token
        window.sessionStorage.removeItem('user')

        // 跳转到登录页
        this.$router.push('/login')

        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        // 取消执行这里
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;

  i {
    font-size: 24px;
  }

  span {
    margin-left: 4px;
  }
}

.right {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
