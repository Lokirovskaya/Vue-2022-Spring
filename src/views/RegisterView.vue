<template>
  <div class="register">
    <h1>欢迎注册</h1>
    <el-input placeholder="输入账号" v-model="input_id" clearable style = "width:300px"></el-input>
    <p>
    <el-input placeholder="输入密码" v-model="input_password" clearable style = "width:300px" show-password></el-input>
    <p>
    <el-input placeholder="确认密码" v-model="input_password2" clearable style = "width:300px" show-password></el-input>
    <div> <el-button v-on:click = "register" round>注册</el-button>
    <el-button v-on:click = "goto_login" round>去登陆</el-button> </div>
  </div>
</template>

<script>
  export default {
      data() {
      return {
        input_id: "",
        input_password: "",
        input_password2: ""
      }
    },
    methods: {
        goto_login(){
        this.$router.replace('/login');
        },
        register(){
            if (this.$data.input_password != this.$data.input_password2) alert('两次密码输入不一致！');
            else
            {
                alert('注册成功！');
                this.$router.replace('/login');
            }
            
        }
    }
}
</script>