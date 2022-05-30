<template>
  <border border-radius="10px">
    <el-table :data="users" stripe border align="center">
      <el-table-column prop="uid" label="UID" width="150"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="registerdate" label="注册日期" width="150"></el-table-column>
      <el-table-column prop="exp" label="积分" width="130"></el-table-column>
      <el-table-column label="用户状态" width="150">
        <template slot-scope="scope">
          <div>{{get_user_status_string(scope.row)}}</div>
        </template>
      </el-table-column>

      <el-table-column width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_admin" type="info" size="small">禁言</el-button>
          <el-button v-if="!scope.row.is_banned" @click="alert_ban_user(scope.row)" type="danger" size="small">
            禁言
          </el-button>
          <el-button v-else @click="alert_unban_user(scope.row)" type="warning" size="small">
            解禁
          </el-button>
        </template>
      </el-table-column>

      <el-table-column width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="alert_set_admin(scope.row)">
            设为管理员
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </border>
</template>


<script>
  export default {
    name: 'UserManager',
    data() {
      return {
        users: [{
          uid: '20020212',
          username: 'xyy',
          email: '20373744@buaa.edu.cn',
          registerdate: '2002-02-12',
          exp: '114514',
          is_admin: false,
          is_banned: true,
          bannned_until: '2099-09-09',
        },
        {
          uid: '114514',
          username: '???',
          email: 'beijing@beijing.bj',
          registerdate: '0000-00-00',
          is_admin: false,
          is_banned: false,
          bannned_until: '2099-09-09',
        },
        ]
      }
    },

    methods: {
      get_user_status_string(user) {
        if (user.is_admin) {
          user.is_banned = false;
          return '管理员';
        }
        else if (user.is_banned) {
          return '禁言中，直到 ' + user.bannned_until;
        }
        else return '用户'
      },

      alert_ban_user(user) {
        this.$prompt('请输入禁言天数', '禁言用户 ' + user.username, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\s*\d+\s*$/,
          inputErrorMessage: '禁言天数不正确'
        }).then(({ value }) => {
          this.ban_user(user, parseInt(value))
          // this.$message.success('成功禁言 ' + user.username + '，时长 ' + value + ' 天');
        });
      },

      alert_unban_user(user) {
        this.$confirm('确认解禁用户 ' + user.username + ' 吗？', '解除禁言', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.unban_user(user)
          this.$message.success('成功解禁 ' + user.username);
        });
      },

      alert_set_admin(user) {
        this.$confirm('确认设置用户 ' + user.username + ' 为管理员吗？', '设置管理员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.set_admin(user)
          this.$message.success('成功设置管理员 ' + user.username);
        });
      },

      ban_user(user, days) {
        user.is_banned = true;
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 3600 * 1000);
        user.bannned_until = this.date_to_string(date);
      },

      unban_user(user) {
        user.is_banned = false;
      },

      set_admin(user) {
        return user;
      },

      date_to_string(date) {  // 为什么日期格式化的功能都要我写啊js是现代语言吗？？？
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        return year + '-' + month + '-' + day;
      }
    }
  }
</script>