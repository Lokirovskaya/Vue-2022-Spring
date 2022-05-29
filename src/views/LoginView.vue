<template>
  <div v-if="this.$store.state.login_state == 0" class="login">
    <div>{{this.$route.query.userid}}</div>
    <h1>请登录</h1>

    <el-input placeholder="输入账号" v-model="input_id" clearable style="width:300px"></el-input>
    <p>
      <el-input placeholder="输入密码" v-model="input_password" clearable style="width:300px" show-password></el-input>
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
        input_password: ""
      }
    },
    methods: {
      login() {
        // // if(data.input == 123) this.$store.commit('change_state');
        // if (this.input_id == 10001 && this.input_password == 123) //10001：用户测试账号，密码为123
        // {
        //   this.$store.commit('change_state1');
        //   this.$router.replace('/');
        // }
        // else if (this.input_id == 10002 && this.input_password == 123) //10002：管理员测试账号，密码为123
        // {
        //   this.$store.commit('change_state2');
        //   this.$router.replace('/');
        // }
        // else this.$store.commit('change_state');

        this.$axios.post('/user/login', qs.stringify(this.$data))
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success(res.data.data.input_id + ' 登录成功！');
              this.$message.success('token: ' + res.data.data.authorization);
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });

      }
    }
  }
</script>