<template>
  <div>
    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="query" class="search">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    <el-table
      :data="usersList"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="开关">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle plain @click="del(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" round plain  >分类管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog title="添加用户"  :visible.sync="dialogFormVisible"  width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usersList: [],
      allotList: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      dialogFormVisible: false,
      allotUser: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: ['change', 'blur'] },
          { min: 3, max: 9, message: '长度在3-9位', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: ['blur', 'change'] },
          { min: 6, max: 12, message: '长度在6-12位', trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入一个合法的邮箱', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的手机号', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  async created () {
    this.getUser()
    const { data } = await this.$axios.get('roles')
    console.log(data)
    this.allotList = data
  },
  methods: {
    async change ({ id, mg_state: mgStatus }) {
      const res = await this.$axios.put(`users/${id}/state/${mgStatus}`)
      console.log(res)
      const { meta } = res
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        this.getUser()
      } else {
        this.$message.error(meta.msg)
      }
    },
    async getUser () {
      const res = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      console.log(res)
      this.total = res.data.total
      this.usersList = res.data.users
    },
    handleSizeChange (val) {
      console.log(val)
      this.pagesize = val
      this.pagenum = 1
      this.getUser()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUser()
    },
    async del (id) {
      try {
        await this.$confirm('是否删除用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const { meta } = await this.$axios({
          method: 'delete',
          url: `users/${id}`
        })
        // const { meta } = await this.$axios.delete(`users/${id}`)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          if (this.usersList.length === 1) {
            this.pagenum--
          }
          this.getUser()
        } else {
          this.$message.error(meta.msg)
        }
      } catch {
        this.$message.info('取消删除')
      }
    },
    search () {
      this.pagenum = 1
      this.getUser()
    },
    addUser () {
      this.$refs.form.validate(async valid => {
        const { meta } = await this.$axios.post('users', this.form)
        if (meta.status === 201) {
          this.$message.success(meta.msg)
          this.$refs.form.resetFields()
          this.pagenum = Math.ceil(++this.total / this.pagesize)
          this.dialogFormVisible = false
          this.getUser()
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bread {
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  padding: 10px 20px 10px 20px;
}
.search {
  width: 300px;
  margin: 10px 30px 10px 0px;
}
.btn {
  background-color: #f4f4f5;
}
</style>
