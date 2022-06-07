<template>
  <ForumBorder>
    <el-table :data="user_info" stripe border align="center">
      <el-table-column prop="userid" label="UID" width="100"></el-table-column>
      <el-table-column prop="username" label="用户名" width="200"></el-table-column>
      <el-table-column prop="user_level" label="等级" width="100"></el-table-column>
      <el-table-column prop="user_experience" label="经验" width="100"></el-table-column>
      <el-table-column prop="last_login_day" label="上次登录" width="200"></el-table-column>
      <el-table-column label="用户状态" width="200">
        <template slot-scope="scope">
          <div>{{get_user_status_string(scope.row)}}</div>
        </template>
      </el-table-column>

      <el-table-column width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_admin" type="info" size="small">禁言</el-button>
          <el-button v-else-if="!scope.row.is_banned" @click="alert_ban_user(scope.row)" type="danger" size="small">
            禁言
          </el-button>
          <el-button v-else @click="alert_unban_user(scope.row)" type="warning" size="small">
            解禁
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </ForumBorder>
</template>


<script>
  import qs from 'qs';
  import ForumBorder from "@/components/ForumBorder";
  export default {
    name: 'UserManager',
    components: { ForumBorder },
    data() {
      return {
        user_info: [],
      }
    },

    mounted() {
      this.get_all_user_info(0);
    },

    methods: {
      get_all_user_info(page) {
        console.log({
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        });
        this.$axios.post('/user/manage', qs.stringify({ page_num: page }), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.user_info = res.data.page_data;
              console.log(this.user_info);
              this.$message.success('成功！');
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

      get_user_status_string(user) {
        if (user.is_admin) {
          user.is_banned = false;
          return '管理员';
        }
        else if (user.is_banned) {
          return '禁言中，直到 ' + user.ban_time;
        }
        else return '用户';
      },

      alert_ban_user(user) {
        this.$prompt('请输入禁言天数', '禁言用户 ' + user.username, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\s*\d+\s*$/,
          inputErrorMessage: '禁言天数不正确'
        }).then(({ value }) => {
          this.ban_user(user, parseInt(value))
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


      ban_user(user, days) {
        user.is_banned = true;
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 3600 * 1000);
        user.bannned_until = date.toLocaleString();

        let post_data = {
          ban_time: date.toLocaleString(),
          banned_username: user.username
        };

        this.$axios.post('/user/ban_user', qs.stringify(post_data), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success('成功禁言 ' + user.username + '，时长 ' + days + ' 天');
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

      unban_user(user) {
        user.is_banned = false;
      },
    },
  }
</script>