<template>
  <el-container>
    <el-main>
      <div>
        <img :src="'http://43.138.55.69'+user_photo" class="qqtwo" style="height: 40px;width: 40px">
        <!--<el-avatar shape="square" :size="40" v-bind:src="user_photo"></el-avatar>-->
        <span style="position: relative;bottom: 5px">
          &thinsp;
          <router-link :to="{path:'/personcenter', query:{user:username}}">
            <el-link>{{ username }}</el-link>
          </router-link>
          <span v-if="judge===3">&nbsp;回复&nbsp;{{reply_to}}</span> :&nbsp; {{content}}
        </span>
      </div>
    </el-main>
    <el-footer height="25px">
      <!--这是回复的回复的点赞评论板块-->
      {{time}}
      {{likeNum}}

      <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
        <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="clicked_like"
          src="../assets/el-icon-clicked_like.png" v-if="like1" @click="LIKE">
        <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="like"
          src="../assets/el-icon-like.png" v-else @click="LIKE">
      </el-tooltip>

      <el-tooltip class="item" effect="light" content="回复" placement="bottom">
        <img style="width: 20px;height: 20px;position: relative; left: 7px;bottom: -2px" alt="comment"
          src="../assets/comment.png" @click="comment">
      </el-tooltip>

      <el-tooltip class="item" effect="light" content="删除本回复" placement="bottom">
        <img style="width: 20px;height: 20px;position: relative; left: 12px;bottom: -2px" alt="delete"
          src="../assets/delete.png" @click="delPostRReply" v-show="this.$store.getters.is_admin">
      </el-tooltip>

    </el-footer>
  </el-container>
</template>

<script>
  import qs from "qs";
  export default {
    name: "Reply_reply",
    data() {
      return {
        User_Pho: 'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png',
        User_Page: 'www.baidu.com',
        like1: this.like,
        likeNum: this.like_count,
      }
    },

    props: {
      reply_id: {},// 回复的ID
      user_id: {},//  回复的用户ID
      username: { type: String, required: true },// 用户名
      user_level: {},
      user_photo: {},
      content: { type: String, required: true },// 回复的内容
      like_count: { type: Number, required: true },// 回复的点赞数
      time: {},// 回复时间
      like: { type: Boolean, default: false },// 用户是否给该回复点赞（布尔型）
      judge: { type: Number, default: 0 },// 回复类型（2-对楼层的回复 3-对楼层中回复的回复）
      reply_to: {} // 只有judge=3有此字段，为其所回复的回复的用户名
    },

    methods: {
      LIKE() {
        let like_data = {
          judge: 2,
          reply_id: this.reply_id,
        };//数据打包
        console.log(like_data);//测试一下like_data里面的数据是否正确
        this.$axios.post('/posting/like', qs.stringify(like_data), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }//数据头喵
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success(res.data.msg);
              if (this.like1) {
                this.like1 = false;
                this.likeNum--;
              }
              else {
                this.like1 = true;
                this.likeNum++;
              }
              //手动更新喵
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      comment() {
        let arr = [this.username, this.reply_id];
        this.$emit('Comment', arr);
      },
      delPostRReply() {
        this.$confirm('此操作将删除该回复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$axios.post('/user/delete_reply', qs.stringify({ reply_id: this.reply_id }), {
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
    }
  }
</script>

<style scoped>
  .qqtwo {
    border: 5px black;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .el-footer {
    background-color: white;
    color: #333;
    text-align: left;
    height: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>