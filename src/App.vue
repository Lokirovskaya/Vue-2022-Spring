<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/post">帖子</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/usermanager">Manager</router-link> |
      <router-link to="/personcenter">个人中心</router-link>
    </nav>
    <TopIndex></TopIndex>
    <router-view />
  </div>
</template>
<script>
  import TopIndex from "@/components/TopIndex";
  export default {
    components: { TopIndex }
  }
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>