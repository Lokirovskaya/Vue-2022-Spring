<template>
  <el-container>
      <el-main>
        <div>
          <el-avatar shape="square" :size="40" v-bind:src="User_Pho"></el-avatar>
          <el-link :underline="false" v-bind:href="User_Page"><i>{{ User_name }}</i></el-link> :&nbsp; {{comment1}}
        </div>
      </el-main>
      <el-footer height="25px"><!--这是回复的回复的点赞评论板块-->
        {{Time}}
        {{likeNum}}
        <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="like"
             @click="LIKE">
        <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="like" src="../assets/el-icon-like.png" v-else
             @click="LIKE">
        <img style="width: 20px;height: 20px;position: relative; left: 7px;bottom: -2px" alt="comment" src="../assets/comment.png">
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Reply_reply",
  data(){
    return{
      User_name:'李田所',
      User_Pho:'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png',
      User_Page:'www.baidu.com',
      comment:'114514',
      comment1:'由于先入为主的概念，我很喜欢动漫里奈的外表设定。刻意的想把里奈线放在最后去攻略，就像是佳肴放到最后去品尝一样。我的攻略顺序是1.小学妹（她的线特别容易进入，我不明不白就误入了hh）2.美咲（学姐线意外的挺虐，面临友情爱情的双重背叛，不过最终修成正果还是很美满的。）3.里奈（在单推由绮的时候，不小心进入了里奈线，也就认了命走到了头。不多谈了就是很符合我的预期，“完美”两个字大概可以概括这个角色。）第4个才进入了由绮TE线（吐槽一下，这条线是真的挺难的。基本上其他异性都不能有太多来往，“！事件”最好别碰，否则不注意就误入其他线。尤其是和里奈聊天一定要注意次数和分寸...）',
      like:false,
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
.el-main {
  background-color: whitesmoke;
  color: #333;
  text-align: left;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-footer{
  background-color: ghostwhite;
  color: #333;
  text-align: left;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>