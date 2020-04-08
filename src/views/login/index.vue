<template>
    <div class="login">
        <el-card class="login_card">
            <!-- 卡片内容 -->
            <div class="title">
                <img src="@/assets/img/logo_index.png" alt="">
            </div>
            <!-- 表单 -->
            <el-form ref="formObj" style="margin-top:30px" :model="loginForm" :rules="loginRules">
                <!-- 手机号 -->
                <el-form-item prop="mobile">
                    <el-input type="text" v-model='loginForm.mobile' placeholder="请输入手机号"></el-input>
                </el-form-item>

                <!-- 验证码 -->
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" style="width:280px" placeholder="请输入验证码"></el-input>
                    <el-button style="float:right" plain >发送验证码</el-button>
                </el-form-item>

                <!-- 用户协议浮选框 -->
                <el-form-item prop="checked">
                    <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议及条款</el-checkbox>
                </el-form-item>

                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button @click="login" type="primary" style="width:100%">login</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>s

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      // 校验规则对象
      loginRules: {
        // key(要校验的字段名)： value(数组=>多条或者1条或者没有规则)
        mobile: [{ required: true, message: '请输入您的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号有误' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码有误' }],
        checked: [{
          validator: function (rule, value, callback) {
            // rule 代表当前的规则 没啥用
          // value 代表当前的值 => 表单字段checked的值
          // callback回调函数
            if (value) {
              // 如果是true 就是选中了 通过校验
              callback() // 直接执行callBack 表示直接通过
            } else {
              callback(new Error('未阅读并同意'))
            }
          }
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.formObj.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'

          }).then(res => {
            window.sessionStorage.setItem('user', res.data.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或者验证码有误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_card{
        width:440px;
        height: 360px;
        .title{
            text-align: center;
            img{
                height: 45px;
            }
        }
    }
}
</style>
