<template>
  <div class="register">
    <h1>欢迎注册</h1>
    <el-input placeholder="输入账号" v-model="input_id" clearable style="width:300px"></el-input>
    <p>
      <el-input placeholder="输入密码" v-model="input_password" clearable style="width:300px" show-password></el-input>
    <p>
      <el-input placeholder="确认密码" v-model="input_password2" clearable style="width:300px" show-password></el-input>
    <div>
      <el-button @click="register()" round>注册</el-button>
      <router-link to="/login">
        <el-button round>去登录</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  export default {
    data() {
      return {
        input_id: "",
        input_password: "",
        input_password2: ""
      }
    },
    methods: {
      register() {
        if (this.$data.input_password != this.$data.input_password2) {
          this.$message.error('两次输入的密码不一致！');
          return;
        }
        else {
          this.$axios.post('/user/register', qs.stringify(this.$data))
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success('注册成功！');
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
  }
</script>