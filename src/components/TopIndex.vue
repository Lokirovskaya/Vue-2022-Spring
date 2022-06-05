<template>
  <el-row>
    <el-col :span="8">
      <div class="grid-content">
        <el-menu :default-active="active_index" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <router-link :to="{path: '/'}">首页</router-link>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">论坛分区</template>
            <router-link :to="{path:'sector', query:{name:'discussion'}}">
              <el-menu-item index="2-1"><i class="el-icon-position"></i>讨论区</el-menu-item>
            </router-link>
            <router-link :to="{path:'sector', query:{name:'recommendation'}}">
              <el-menu-item index="2-2"><i class="el-icon-collection"></i>课程推荐</el-menu-item>
            </router-link>
            <router-link :to="{path:'sector', query:{name:'exercise'}}">
              <el-menu-item index="2-3"><i class="el-icon-medal"></i>刷题板块</el-menu-item>
            </router-link>
            <router-link :to="{path:'sector', query:{name:'campus'}}">
              <el-menu-item index="2-4"><i class="el-icon-present"></i>校园周边</el-menu-item>
            </router-link>
            <router-link :to="{path:'sector', query:{name:'resource'}}">
              <el-menu-item index="2-5"><i class="el-icon-download"></i>资源共享</el-menu-item>
            </router-link>
          </el-submenu>
          <el-menu-item index="3" v-show="this.$store.getters.is_admin">
            <router-link :to="{path: '/usermanager'}">管理员界面</router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <!--导航栏-->
    <el-col :span="8">
      <div class="grid-content" style="position: relative;bottom: -10.5px">
        <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" size="middle" v-model="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-col>
    <!--搜索栏-->
    <el-col :span="8">
      <div class="grid-content" style="text-align: right">
        <div v-if="this.$store.state.login_state === 0">
          <el-link :underline="false" style="position: relative;bottom:-19px" @click="goto_login">登录/注册</el-link>
          &nbsp;&nbsp;
        </div>
        <div v-else>
          <el-dropdown @command="User_Command">
            <div>
              <el-avatar style="position: relative;bottom: -13.5px" shape="square" :size="35" v-bind:src="User.pho">
              </el-avatar>
              <span style="position: relative;bottom: -3px">&nbsp;{{ this.$store.state.username }}&nbsp;&nbsp;</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link :to="{path:'/personcenter'}">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-col>
    <!--用户栏-->
  </el-row>
</template>

<script>
  //import qs from "qs";
  export default {
    name: "TopIndex",
    data() {
      return {
        search: "",
        active_index: "1",
        User: {
          name: this.$store.commit.name,
          pho: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg",
        }
      }
    },
    methods: {
      goto_login() {
        this.$router.replace('/login');
      },
      goto_logout() {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出登录'
          });
          this.$store.commit('set_userstate_to_unlogged'); //切换到游客状态
          this.$router.replace('/');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      User_Command(command) {
        if (command === 'b') {
          this.goto_logout();
        }
      },
    }
  }
</script>

<style scoped>
  .el-row {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 61px;
    margin-bottom: 5px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>