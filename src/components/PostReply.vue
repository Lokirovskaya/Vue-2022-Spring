<template>
  <el-container>
    <el-aside width="200px">
      <p>{{ User_name }}</p>
      <img alt="Head Photo" style="width: 160px;height: 160px;" src="../assets/el-icon-defaultPhoto.png">
      <p style="line-height: 4px">{{ Level }}</p>
    </el-aside>
    <el-container>
      <el-main>
        <div>{{Content}}</div>
      </el-main>
      <el-footer height="25px">
        {{Time}}
        {{likeNum}}
        <img style="width: 20px;height: 20px" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="like"
                 @click="LIKE">
        <img style="width: 20px;height: 20px" alt="like" src="../assets/el-icon-like.png" v-else
                 @click="LIKE">
        <img style="width: 20px;height: 20px;position: relative; left: 15px" alt="comment" src="../assets/comment.png"
                 @click="see_Comment">
      </el-footer>
      <div v-for="a in Reply" :key="a"><!--这是回复的回复板块-->
        <el-footer style="background-color: #79c3e1 " v-if="SEE"><!--这是回复的回复的正文板块-->
          <div>
          <img alt="Head Photo" style="width: 40px;height: 40px;" src="../assets/el-icon-defaultPhoto.png">
          {{a.name}}:{{a.Content}}
          </div>
        </el-footer>
        <el-footer style="background-color: #7c889b" height="22px" v-if="SEE"><!--这是回复的回复的点赞评论板块-->
          {{a.Time}}
          {{a.likeNum}}
          <img style="width: 20px;height: 20px" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="a.like"
          @click="LIKE">
          <img style="width: 20px;height: 20px" alt="like" src="../assets/el-icon-like.png" v-else
          @click="LIKE">
          <img style="width: 20px;height: 20px;position: relative; left: 15px" alt="comment" src="../assets/comment.png">
        </el-footer>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "PostReply",
  data(){
    return{
      User_name:'李田所',
      Level:'lv5',
      Content: '你是一个一个一个美食家',
      like:false,
      SEE:false,
      likeNum:114514,
      Time:'2022-04-15 14:56',
      Reply:[
        { name:'张三',Content:'123',like:false,likeNum:114514,Time:'2022-04-15 14:56'},
        { name:'李四',Content:'1234',like:false,likeNum:114514,Time:'2022-04-15 14:56'},
        { name:'王五',Content:'12345',like:false,likeNum:114514,Time:'2022-04-15 14:56',},
      ]
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

    see_Comment(){
        this.SEE = (this.SEE ===true)?false:true;
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
}

.el-footer{
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  height: auto;
}
.el-reply{

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