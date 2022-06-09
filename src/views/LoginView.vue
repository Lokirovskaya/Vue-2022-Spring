<template>
  <div v-if="this.$store.state.login_state == 0" class="login">
    <div>{{this.$route.query.userid}}</div>
    <h1>请登录</h1>

    <el-input placeholder="输入账号" v-model="input_id" clearable style="width:300px"></el-input>
    <p>
      <el-input placeholder="输入密码" v-model="input_password" clearable style="width:300px" show-password></el-input>
    <p>
      <el-input placeholder="输入校验码" v-model="input_admin_password" clearable style="width:300px" show-password></el-input>
      <p>
    <div>
      <el-button @click="login" round>登录</el-button>
      <router-link to="/register" style="margin: 5px;">
        <el-button round>去注册</el-button>
      </router-link>
    </div>
  </div>
  <div v-else>
    <font size="5">您已登录！</font>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    data() {
      return {
        input_id: "",
        input_password: "",
        input_admin_password:"",
        route_from: "",
      }
    },
    methods: {
      login() {
        this.$axios.post('/user/login', qs.stringify(this.$data))
          .then(res => {
            if (res.data.errno === 0) {
              if (res.data.data.is_admin)
                this.$store.commit('set_userstate_to_admin');
              else if (res.data.data.is_banned)
                this.$store.commit('set_utserstae_to_banned');
              else
                this.$store.commit('set_userstate_to_normal');
              this.$store.commit('set_token', res.data.data.authorization);
              this.$store.commit('set_userid', res.data.data.userid);
              this.$store.commit('set_username', res.data.data.username);
              this.$store.commit('set_userphoto',res.data.data.photo);
              this.$message.success(res.data.data.username + ' 登录成功！');
              if ( res.data.data.last_login_day === null )
              {
                this.$router.push({path: '/post', query:{id: 1}});
              }else{
                setTimeout(() => {
                  this.$router.push(this.route_from);
                }, 1000);
              }
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => { vm.route_from = from.fullPath; });
    },
  }
</script>