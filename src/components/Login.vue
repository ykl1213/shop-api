<template>
  <div class="login">
      <el-form ref="form" :model="form" label-width="80px">
        <img src="../assets/avatar.jpg" alt="">
        <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button>重置</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less">
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
