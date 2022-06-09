<template>
  <ForumBorder>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div>总共有用户 {{this.user_sum}} 人</div>
    <el-table :data="user_info" stripe border align="center">
      <el-table-column prop="userid" label="UID" width="100"></el-table-column>
      <el-table-column label="用户名" width="200">
        <template slot-scope="scope">
          <router-link :to="{path:'/personcenter', query:{user:scope.row.username}}">
            <el-link>{{scope.row.username}}</el-link>
          </router-link>
        </template>
      </el-table-column>
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
    <el-pagination layout="prev, pager, next" :total="this.user_sum" :page-size="20"></el-pagination>
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
        user_sum: 0,
      }
    },

    mounted() {
      this.get_all_user_info(0);
    },

    methods: {
      get_all_user_info(page) {
        this.$axios.post('/user/manage', qs.stringify({ page_num: page }), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.user_info = res.data.page_data;
              this.user_sum = res.data.user_sum;
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
          return '禁言中，还有 ' + user.ban_time + ' 天解禁';
        }
        else return '用户';
      },

      alert_ban_user(user) {
        this.$prompt('请输入禁言天数', '禁言用户 ' + user.username, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\s*[1-9][0-9]*\s*$/,
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
        });
      },


      ban_user(user, days) {
        let post_data = {
          ban_time: parseInt(days),
          banned_username: user.username,
        };

        this.$axios.post('/user/ban_user', qs.stringify(post_data), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              user.is_banned = true;
              user.ban_time = days;
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
        this.$axios.post('/user/release_ban', qs.stringify({ banned_username: user.username }), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              user.is_banned = false;
              this.$message.success('成功解禁 ' + user.username);
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

    },
  }
</script>