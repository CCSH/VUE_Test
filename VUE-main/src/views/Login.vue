<template>
  <el-card
    class="login_container"
    shadow="always"
    :body-style="{ padding: '0px' }"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :inline="true"
      label-width="70px"
    >
      <h3 class="login_title">系统登录</h3>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item class="login_btn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import Cookie from 'js-cookie'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (
            (this.form.username === 'admin' && this.form.password == '1') ||
            (this.form.username === '1' && this.form.password == '1')
          ) {
            const token =
              this.form.username + '_' + Math.random().toString(36).slice(-8)
            Cookie.set('token', token)
            //存储用户信息
            this.$store.commit('saveUserInfo', { info: this.form.username })
            //注册路由
            this.$store.commit('handleRouter', this.$router)
            //跳转首页
            this.$router.push({ name: 'home' })
          } else {
            this.$message.error('用户名或密码错误')
          }
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.login_container {
  width: 350px;
  margin: 180px auto;
  padding: 35px;
  padding-bottom: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .login_btn {
    margin-top: 10px;
    margin-right: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
