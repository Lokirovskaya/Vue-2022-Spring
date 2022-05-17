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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- 此处应有各种v-if -->
          <el-button v-if="scope.row.is_admin" type="info" size="small">禁言</el-button>
          <el-button v-if="!scope.row.is_banned" @click="ban_user(scope.row)" type="danger" size="small">禁言</el-button>
          <el-button v-else @click="unban_user(scope.row)" type="warning" size="small">解禁</el-button>
          <!-- <el-button type="primary" size="small">设为管理员</el-button> -->
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
          uid: '1232456',
          username: '???',
          email: '百京',
          registerdate: '西城区',
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

      ban_user(user) {
        // TODO, 时间设置
        user.is_banned = true;
      },

      unban_user(user) {
        user.is_banned = false;
      }
    }
  }
</script>