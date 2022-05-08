<template>
  <el-container>
      <el-footer style="background-color: #B3C0D1" height="20px" v-if="SEE"><!--这是回复的回复的点赞评论板块-->
        <img style="width: 20px;height: 20px" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="a.like"
             @click="LIKE">
        <img style="width: 20px;height: 20px" alt="like" src="../assets/el-icon-like.png" v-else
             @click="LIKE">
        <img style="width: 20px;height: 20px;position: relative; left: 15px" alt="comment" src="../assets/comment.png">
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Reply_reply",
  data(){
    return{
      User_name:'李田所',
      comment:'114514',
      like:false,
      SEE:false,
      likeNum:114514,
      Time:'2022-04-15 14:56',
    }
  },
  methods:{
    LIKE(){
      if(this.like === true)
      {
        this.likeNum--;// eslint-disable-line no-unused-vars
        this.like=false;
      }else
      {
        this.likeNum++;// eslint-disable-line no-unused-vars
        this.like=true;
      }
    },
  }
}
</script>

<style scoped>
.el-footer{
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  height: 20px;
}
</style>