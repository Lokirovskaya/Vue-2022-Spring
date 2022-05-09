<template>
  <el-container>

    <!--这是回复人的信息框，目前尚未添加的有-->
    <el-aside width="200px">
      <p><el-link :underline="false" v-bind:href="User_Page"><i>{{ User_name }}</i></el-link></p>
      <el-avatar shape="square" :size="160" v-bind:src="User_Pho"></el-avatar>
      <p style="line-height: 4px">{{ Level }}</p>
    </el-aside>
    <el-container>

      <!--这是回复的主要内容-->
      <el-main>
        {{Content1}}

      </el-main>
      <!--这是评论的点赞评论部分-->
      <el-footer height="25px" style="position: relative;margin-bottom: 5px">
        {{Time}}
        {{likeNum}}
        <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
          <img style="width: 20px;height: 20px;" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="like"
               @click="LIKE">
          <img style="width: 20px;height: 20px;" alt="like" src="../assets/el-icon-like.png" v-else
               @click="LIKE">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="评论" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 15px" alt="comment" src="../assets/comment.png"
               @click="see_Comment">
        </el-tooltip>
        &nbsp;&nbsp;&nbsp;&nbsp;评论数({{Re_Num}})
      </el-footer>
      <transition>
        <div v-show="SEE" >
          <Reply_reply></Reply_reply>
          <Reply_reply></Reply_reply>
          <Reply_reply></Reply_reply>
        </div>
        <!--在循环外加一个分页
        <div v-show="SEE">
          <el-pagination
              layout="prev, pager, next"
              :total="50">
          </el-pagination>-->
      </transition>
      <!--在循环外加一个评论框-->
      <div style="background-color: whitesmoke">
        <el-input
            type="textarea"
            style="margin-top: 10px"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="140"
            show-word-limit
            v-show="SEE"
        >
        </el-input>
        <div style="margin-top: 5px; text-align: right">
          <el-button v-show="SEE" @click="f_Comment">发表</el-button>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import Reply_reply from "@/components/Reply_reply";
export default {
  name: "PostReply",
  components:{Reply_reply},
  data(){
    return{
      User_name:'李田所',  //用户姓名
      Level:'lv5',        //用户等级
      User_Pho:'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png', //用户头像
      User_Page:'www.baidu.com',      //用户个人主页链接
      Content: '你是一个一个一个美食家',   //用户评论内容
      Content1:'其实说起WA1，这部作品在我心目中地位一直挺高的。自己上高中那会有幸看过动漫，只知道这部作品不那么简单，它所传递的不仅仅只是一对情侣感情上的纷扰。它像传递的东西更多，更加丰富。生活？事业？感情？甚至动漫在艺术上的探讨都很深（配合每次酒吧里的分镜...我都觉得再看哲学番2333）不过那会一直没心思去玩玩游戏，直到进入了社会才突然想起这部作品。最近更是花时间去通了游戏，下面浅显的和大家聊聊吧~~\n由于先入为主的概念，我很喜欢动漫里奈的外表设定。刻意的想把里奈线放在最后去攻略，就像是佳肴放到最后去品尝一样。我的攻略顺序是1.小学妹（她的线特别容易进入，我不明不白就误入了hh）2.美咲（学姐线意外的挺虐，面临友情爱情的双重背叛，不过最终修成正果还是很美满的。）3.里奈（在单推由绮的时候，不小心进入了里奈线，也就认了命走到了头。不多谈了就是很符合我的预期，“完美”两个字大概可以概括这个角色。）第4个才进入了由绮TE线（吐槽一下，这条线是真的挺难的。基本上其他异性都不能有太多来往，“！事件”最好别碰，否则不注意就误入其他线。尤其是和里奈聊天一定要注意次数和分寸...）',
      like:false,                     //该评论是否点赞
      SEE:false,                      //该评论是否可见
      likeNum:114514,                 //该评论点赞数量
      Time:'2022-04-15 14:56',        //该评论发布时间
      Re_Num: 3,                      //评论回复数
      textarea:''
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
    },

    f_Comment(){

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
  margin-top: 5px;
  color: #333;
  text-align: left;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: whitesmoke;
  color: #333;
  text-align: left;
  line-height: 1.3;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

@keyframes reply_out {
  from{
    transform: translateX(100%) ;
  }
  to{
    transform: translateX(0px);
  }
}
.v-enter-active{
  animation: reply_out 1s;
}
.v-leave-active {
  animation: reply_out 1.2s reverse;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>