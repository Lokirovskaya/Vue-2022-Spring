<template>
  <div class="home">
    <div v-if = "this.$store.state.login_state == 2"><font size = "5">已登录为管理员！</font></div>
    <div v-else-if = "this.$store.state.login_state == 1"><font size = "5">已登录为登录用户！</font></div>
    <div v-else><font size = "5">未登录！请前往登录</font></div>
    <p>
    <div v-if = "this.$store.state.login_state == 0"><el-button v-on:click = "goto_login" round type="success">login</el-button></div>
    <div v-else><el-button v-on:click = "goto_logout" round type="success">logout</el-button></div>


  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  methods:{
    goto_login(){
        this.$router.replace('/login');
    },
    goto_logout(){
        this.$store.commit('change_state0'); //切换到游客状态
        this.$router.replace('/login');
    }
  }
}
</script>
