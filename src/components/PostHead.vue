<template>
  <el-container>
    <el-aside width="200px">
      <p>{{ User_name }}</p>
      <img alt="Head Photo" style="width: 160px;height: 160px;" v-bind:src="User_Pho">
      <p >{{ Level }}</p>
    </el-aside>
    <el-container>
      <el-header height="40px">
        <b>{{Title}}</b>
      </el-header>
      <el-main>
        {{Content}}
      </el-main>
      <el-footer height="25px">
          {{Time}}
          {{likeNum}}
          <img style="width: 20px;height: 20px;" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="like"
               @click="LIKE">
          <img style="width: 20px;height: 20px;" alt="like" src="../assets/el-icon-like.png" v-else
               @click="LIKE">
        <img style="width: 20px;height: 20px;position: relative; left: 15px" alt="comment" src="../assets/comment.png">
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "PostHead",
  data(){
    return{
      User_name:'李田所',
      User_Pho:'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png',
      Level:'lv5',
      Title: '24岁，是学生',
      Content: '你是一个一个一个美食家',
      like:false,
      likeNum:114514,
      Time:'2022-04-15 14:36'
    }
  },
  methods:{
    LIKE(){
      if(this.like === true)
      {
        this.likeNum--;
        this.like=false;
      }else
      {
        this.likeNum++;
        this.like=true;
      }
    },
    comment(){

    }
  }
}
</script>

<style scoped>
.el-header{
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  line-height: 40px;
}
.el-footer{
  background-color: #B3C0D1;
  text-align: left;
  width: auto;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: left;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>