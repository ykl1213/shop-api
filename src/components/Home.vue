<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">欢迎你，xxx <a href="javascript:;" @click="logout">退出</a></div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  height: 60px;
  background-color: #b3c1cd;
  display: flex;
  line-height: 60px;
  .logo,.logout {
    width: 180px;
  }
  .logo {
    background: url('../assets/logo.png') no-repeat center center/contain;
  }
  .logout {
    text-align: right;
    a{
      color: orange;
    }
  }
  .title {
    flex: 1;
    text-align: center;
    color: #fff;
  }
}
.el-aside {
  width: 200px;
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
.home {
  height: 100%;
}
</style>
