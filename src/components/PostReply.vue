<template>
  <el-container>

    <!--这是回复人的信息框，目前尚未添加的有-->
    <el-aside width="200px">
      <p><el-link :underline="false" v-bind:href="User_Page"><i>{{ username }}</i></el-link></p>
      <el-avatar shape="square" :size="160" v-bind:src="User_Pho"></el-avatar>
      <p style="line-height: 4px">LV{{ User_Level }}</p>
    </el-aside>
    <el-container>

      <!--这是回复的主要内容-->
      <el-main>
        <span v-html="content"></span>
      </el-main>
      <!--这是评论的点赞评论部分-->
      <el-footer height="25px" style="position: relative;margin-bottom: 5px">
        {{time}}
        {{likeNum}}
        <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="like1"
               @click="LIKE">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="like" src="../assets/el-icon-like.png" v-else
               @click="LIKE">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="评论" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 7px;bottom: -2px" alt="comment" src="../assets/comment.png"
               @click="see_Comment">
        </el-tooltip>
        &nbsp;评论数({{reply_count}})
      </el-footer>
      <transition>
        <el-collapse-transition>   <!--折叠动画效果-->
          <div v-show="SEE" >
            <Reply_reply v-for="item in replys"
                         :reply_id="item.reply_id"
                         :key="item.reply_id"
                         :username="item.username"
                         :content="item.content"
                         :like_count="item.like_count"
                         :time="item.time"
                         :judge="item.judge"
                         :like="item.like"
                         :reply_to="item.reply_to"
                         @Comment="Comment"></Reply_reply>
          </div>
        </el-collapse-transition>
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
            ref="COMMENT"
            type="textarea"
            style="margin-top: 10px"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="140"
            show-word-limit
            v-show="SEE"
            :disabled="this.$store.getters.is_banned"
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
import qs from "qs";
export default {
  name: "PostReply",
  components:{Reply_reply},
  data(){
    return{
      User_Pho:'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png', //用户头像
      User_Page:'www.baidu.com',      //用户个人主页链接
      User_Level: 5, //用户等级
      like1:this.like,                     //该评论是否点赞
      SEE:false,                      //该评论是否可见
      likeNum:this.like_count,                 //该评论点赞数量
      textarea:'', //楼中楼输入框的内容
      judge: 2,
      reply_name: '', //被回复人的名字
      reply_id1: undefined //回复楼中楼的ID, 用于回复楼中楼
    }
  },

  props:{
    reply_id:{},// 楼层ID
    user_id:{},// 楼层用户的ID
    username:{type: String, required: true},// 用户名
    //userlevel:{type: Number, required: true},
    content:{type: String, required: true},// 楼层的内容
    like_count:{type: Number, default: 0},// 回复的点赞数
    reply_count:{type: Number, default: 0},// 楼层的回复数
    time:{},// 回复时间
    like:{type: Boolean, default: false},// 该用户是否给该回复点赞
    replys:{type: Array, required: true},// 楼层中的所有回复
    posting_id:{}//  楼层所在帖子的ID
  },

  methods:{
    LIKE(){
      let like_data = {
        judge:2,
        reply_id:this.reply_id,
      };//数据打包
      console.log(like_data);//测试一下like_data里面的数据是否正确
      this.$axios.post('/posting/like',qs.stringify(like_data),{
        headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
        }//数据头喵
      })
          .then(res =>{
            if(res.data.errno === 0)
            {
              this.$message.success(res.data.msg);
              if( this.like1 ) {
                this.like1 = false;
                this.likeNum--;
              }
              else{
                this.like1 = true;
                this.likeNum++;
              }
              //手动更新喵
            }else
            {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },

    see_Comment(){
        this.SEE = (this.SEE ===true)?false:true;
    },

    f_Comment(){//回复
      let name = this.textarea.split(':')[0];
      let content = undefined;
      let post_data = undefined;
      let date = new Date();
      let now = date.toLocaleString();
      if(name === this.reply_name)//楼中楼回复喵
      {
        this.judge = 3;
        content = this.textarea.slice(name.length+1);
      }else
      {
        this.judge = 2;
        content = this.textarea;
      }
      if(this.judge === 2)//回复层主喵
      {
        post_data = {
          judge: this.judge,
          posting_id: this.posting_id,
          reply_id: this.reply_id,
          content: content,
          time: now,
        };
      }else if(this.judge === 3){
        post_data = {
          judge: this.judge,
          posting_id: this.posting_id,
          reply_id: this.reply_id,
          reply_id1:this.reply_id1,
          content: content,
          time: now,
        };
      }

      this.$axios.post('/posting/comment', qs.stringify(post_data), {
        headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
        }
      })
          .then(res => {
            if (res.data.errno === 0) {
              this.$emit('ToNew');
              this.textarea = '';
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    Comment(arr){//跳转到回复输入框
      this.$refs.COMMENT.focus();
      this.reply_name = arr[0];
      this.reply_id1 = arr[1];
      this.textarea = arr[0] + ':';
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

/*@keyframes reply_out {
  from{
    transform: translateX(100%) ;
  }
  to{
    transform: translateX(0px);
  }
}*/
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