<template>
  <el-container>
    <el-aside style="width: 200px">
      <p><el-link :underline="false" v-bind:href="User_Page"><i>{{ User_name }}</i></el-link></p>
      <el-avatar shape="square" :size="160" v-bind:src="User_Pho"></el-avatar>
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
        <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
          <img style="width: 20px;height: 20px;" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="like"
               @click="LIKE">
          <img style="width: 20px;height: 20px;" alt="like" src="../assets/el-icon-like.png" v-else
               @click="LIKE">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="回复" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 15px" alt="comment" src="../assets/comment.png">
        </el-tooltip>

      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "PostHead",
  data(){
    return{
      User_name:'李田所',    //用户姓名
      User_Pho:'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png',    //用户头像
      User_Page:'www.baidu.com',     //用户个人主页链接
      Level:'lv5',                  //用户等级
      Title: '24岁，是学生',         //帖子标题
      Content: '你是一个一个一个美食家',//帖子内容
      like:false,                   //是否点赞
      likeNum:114514,               //点赞数量
      Time:'2022-04-15 14:36'       //发布时间
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
  background-color: ghostwhite;
  color: #333;
  text-align: left;
  line-height: 40px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-footer{
  background-color: #B3C0D1;
  text-align: left;
  width: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-main {
  background-color: whitesmoke;
  color: #333;
  text-align: left;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

body > .el-container {
  margin-bottom: 40px;
}
</style>