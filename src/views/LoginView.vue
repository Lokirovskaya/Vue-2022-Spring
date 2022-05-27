<template>
  <div v-if="this.$store.state.login_state == 0" class="login">
    <h1>请登录</h1>

    <el-input placeholder="输入账号" v-model="input_id" clearable style="width:300px"></el-input>
    <p>
      <el-input placeholder="输入密码" v-model="input_password" clearable style="width:300px" show-password></el-input>
    <p>
    <div>
      <el-button v-on:click="login" round>登录</el-button>
      <el-button v-on:click="goto_register" round>注册</el-button>
    </div>
  </div>
  <div v-else>
    <font size="5">您已登录！</font>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input_id: "",
        input_password: ""
      }
    },
    methods: {
      goto_register() {
        this.$router.replace('/register');
      },
      login() {
        // if(data.input == 123) this.$store.commit('change_state');
        if (this.$data.input_id == 10001 && this.$data.input_password == 123) //10001：用户测试账号，密码为123
        {
          this.$store.commit('change_state1');
          this.$router.replace('/');
        }
        else if (this.$data.input_id == 10002 && this.$data.input_password == 123) //10002：管理员测试账号，密码为123
        {
          this.$store.commit('change_state2');
          this.$router.replace('/');
        }
        // else this.$store.commit('change_state');
        else alert("账号或密码错误！");
      }
    }
  }
</script>