<template>
  <div class="login">
      <el-form ref="form" :model="form" :rules='rules' label-width="80px" status-icon>
        <img src="../assets/avatar.jpg" alt="">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input  type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: [ 'change', 'blur' ] },
          { min: 3, max: 6, message: '长度在3-6个', trigger: [ 'change', 'blur' ] }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: [ 'change', 'blur' ] },
          { min: 6, max: 12, message: '密码长度为6-12位', trigger: [ 'change', 'blur' ] }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then((res) => {
          const { meta, data } = res.data
          console.log(res)
          if (meta.status !== 200) {
            this.$message.error(meta.msg)
          } else {
            localStorage.setItem('token', data.token)
            this.$router.push('/home')
            this.$message.success('登录成功')
          }
        })
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    height: 100%;
    background-color: #2d434c;
    position: relative;
    .el-form {
        width: 400px;
        background-color: #fff;
        position: absolute;
        left : 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding: 75px 45px 15px;
        border-radius: 20px;
        img {
            position: absolute;
            top: -75px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
            border: 10px solid#fff ;
        };
        .el-button:last-child {
            margin-left: 80px;
        }
    }
}
</style>
