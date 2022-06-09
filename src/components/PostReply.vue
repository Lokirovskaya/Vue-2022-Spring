<template>
  <el-container>

    <!--这是回复人的信息框，目前尚未添加的有-->
    <el-aside width="200px">

      <router-link :to="{path:'/personcenter', query:{user:username}}">
        <p><i>{{ username }}</i></p>
      </router-link>

        <router-link :to="{path:'/personcenter', query:{user:username}}">
          <img  :src="'http://43.138.55.69'+user_photo" class="qqtwo" style="height: 150px;width: 150px;position: relative;bottom: -6px">
          <!--<el-avatar shape="square" :size="150" style="position: relative;bottom: -5px" v-bind:src="user_photo"></el-avatar>-->
        </router-link>

      <p style="line-height: 4px">LV{{user_level}}</p>
    </el-aside>
    <el-container style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">

      <!--这是回复的主要内容-->
      <el-main>
        <span v-html="content"></span>
      </el-main>
      <!--这是评论的点赞评论部分-->
      <el-footer height="25px">
        {{time}}&nbsp;
        {{likeNum}}
        <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="clicked_like" src="../assets/el-icon-clicked_like.png" v-if="like1"
               @click="LIKE">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="like" src="../assets/el-icon-like.png" v-else
               @click="LIKE">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="评论" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 7px;bottom: -3px" alt="comment" src="../assets/comment.png"
               @click="see_Comment">
        </el-tooltip>
        <span style="position: relative;bottom: 2px">&nbsp;&nbsp;&nbsp;评论数({{reply_count1}})</span>

        <el-tooltip class="item" effect="light" content="删除本回复" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative;right: -4px ;bottom: -3px" alt="delete"
               src="../assets/delete.png" @click="delPostReply(reply_id)" v-show="this.$store.getters.is_admin">
        </el-tooltip>

      </el-footer>
      <transition>
        <el-collapse-transition>   <!--折叠动画效果-->
          <div v-show="SEE" >
            <Reply_reply v-for="item in cur_replys"
                         :reply_id="item.reply_id"
                         :key="item.reply_id"
                         :username="item.username"
                         :content="item.content"
                         :user_level="item.user_level"
                         :user_photo="item.user_photo"
                         :like_count="item.like_count"
                         :time="item.time"
                         :judge="item.judge"
                         :like="item.like"
                         :reply_to="item.reply_to"
                         @Comment="Comment"></Reply_reply>
            <div style="background-color: #F6F6F6 ;">
              <el-pagination layout="prev, pager, next, jumper"
                             :total="reply_count1"
                             :page-size="5"
                             @current-change="handleCurrentChange"
                             style="margin-top: 10px"
                             v-show="reply_count1 !== 0">
              </el-pagination>
              <div style="margin-left: 80px;margin-right: 80px">
              <el-input
                  ref="COMMENT"
                  type="textarea"
                  style="margin-top: 10px;"
                  placeholder="请输入内容"
                  v-model="textarea"
                  maxlength="140"
                  show-word-limit
                  :disabled="this.$store.getters.is_banned"
              >
              </el-input>
              <div style=" text-align: right ;margin-top: 10px">
                <el-button size="mini" @click="f_Comment" style="position: relative;bottom: 5px;left: -5px">发表</el-button>
              </div>
              </div>

            </div>
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
      User_Pho:'https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg', //用户头像
      User_Page:'www.baidu.com',      //用户个人主页链接
      like1:this.like,                     //该评论是否点赞
      SEE:false,                      //该评论是否可见
      likeNum:this.like_count,                 //该评论点赞数量
      textarea:'', //楼中楼输入框的内容
      judge: 2,
      reply_name: '', //被回复人的名字
      reply_id1: undefined, //回复楼中楼的ID, 用于回复楼中楼
      replys1: this.replys,
      cur_replys: [],
      reply_count1: this.reply_count,
      isFirst: true,
    }
  },

  props:{
    reply_id:{},// 楼层ID
    user_id:{},// 楼层用户的ID
    username:{type: String, required: true},// 用户名
    user_photo:{},
    user_level:{},
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
        if(this.isFirst)
        {
          this.isFirst = false;
          this.created();
        }
    },

    f_Comment(){//回复
      let name = this.textarea.split(':')[0];
      let content = undefined;
      let post_data = undefined;
      let reply = undefined;
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
        reply = {
          reply_id: 1,
          username: this.$store.state.username,
          content: content,
          user_level: 0,
          like_count: 0,
          user_photo: this.$store.state.user_photo,
          like:false,
          time: now,
          judge: 2,
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
        reply = {
          reply_id: 1,
          username: this.$store.state.username,
          content: content,
          user_level: 0,
          like_count: 0,
          user_photo: this.$store.state.user_photo,
          like:false,
          time: now,
          judge: 3,
          reply_to: this.reply_name,
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
              this.replys1.push(reply);
              if( this.cur_replys.length < 5 )
              {
                  this.cur_replys.push(reply);
              }
              this.textarea = '';
              this.reply_count1++;
              this.$message.success("回复成功!");
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
    },
    delPostReply(){
      this.$confirm('此操作将删除该回复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.post('/user/delete_reply', qs.stringify({reply_id:this.reply_id}), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success('成功！');
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
      }).catch(() => {

      });
    },
    handleCurrentChange(currentindex){
      this.cur_page = currentindex;
      this.cur_replys = this.replys1.slice((currentindex-1)*5,currentindex*5);
    },
    created(){
      this.cur_replys = this.replys.slice(0,5);
    },
  }
}
</script>

<style scoped>
  .qqtwo {
  border: 5px double black;
}
.pho_back {
  background-color: white;
  position: relative;
  left: 17px;
  height: 160px;
  width: 160px;
  border-style: solid;
  border-color: dimgray;
  border-width: 2px;
}
.el-header {
  background-color: white;
  color: #333;
  text-align: center;
}

.el-footer{
  background-color: white;
  color: #333;
  text-align: left;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-aside {
  background-color: #f4f5f6;
  color: #333;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-main {
  background-color: white;
  color: #333;
  text-align: left;
  line-height: 1.3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

body > .el-container {
  margin-bottom: 40px;

}
</style>