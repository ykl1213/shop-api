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
      <el-aside width="200px">
         <el-menu
          :default-active="aside"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router>
          <el-submenu :index="menu.path" v-for="menu in menusList" :key="menu.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu.authName}}</span>
            </template>
            <el-menu-item :index="sbumenu.path" v-for="sbumenu in menu.children" :key="sbumenu.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{sbumenu.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menusList: []
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  created () {
    this.$axios({
      method: 'get',
      url: 'menus'
    }).then(res => {
      const { meta, data } = res
      console.log(res)
      if (meta.status === 200) {
        this.menusList = data
      }
    })
  },
  computed: {
    aside () {
      return this.$route.path.slice(1)
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
.el-menu {
  width: 200px;
}
</style>
