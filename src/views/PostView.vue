<template>
  <div class="Post">
    <PostHead :posting_title="posting_title"
              :posting_time="posting_time"
              :user_id="user_id"
              :username="username"
              :content="content"
              :like_count="like_count"
              :authority="authority"
              :resource="resource"
              :like="like"
              @Download="Download"
              @Like="ClickLike"
              @DelPost="DelPost"
              @ToComment="toComment"></PostHead>
    <br>
    <div v-for="item in replys" :key="item.reply_id">
    <PostReply
        :reply_id="item.reply_id"
        :username="item.username"
        :content="item.content"
        :like_count="item.like_count"
        :reply_count="item.reply_count"
        :time="item.time"
        :like="item.like"
        :replys="item.replys"
        :posting_id="posting_id"
        @ToNew="toNew"></PostReply>
      <br>
    </div>
    <MarkdownEditor ref="MarkdownEditor"></MarkdownEditor>
    <el-button type="primary" @click="comment">回复</el-button> <br />
  </div>
</template>
<script>
import PostHead from "@/components/PostHead";
import PostReply from "@/components/PostReply";
import MarkdownEditor from "@/components/MarkdownEditor";
import qs from "qs";
export default {
  name: 'PostView',
  components:{PostHead,PostReply,MarkdownEditor},
  data(){
    return{
        posting_id: this.$route.query.id,
        posting_title: '', // 帖子标题
        posting_time: '', // 发布时间
        user_id: undefined, // 发布用户ID
        username: '', // 用户名
        User_Level: 2,  //用户等级,从全局变量找
        content:'', // 帖子正文内容
        like_count: undefined, // 帖子点赞数
        authority: undefined, // 帖子权限
        resource: '', // 帖子资源名称
        reply_count: undefined, // 总楼层数
        like: undefined, // 用户是否给该帖子点赞（布尔型）
        replys:[],
        input_html:'',
        autofocus: false
    }
  },
  methods:{
    toNew(){
      this.$axios.post('/posting/getPostingInfo', qs.stringify({posting_id: this.$route.query.id}), {
        headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
        }
      })
          .then(res => {
            if (res.data.errno === 0) {
              this.posting_title = res.data.posting_title;
              this.posting_time = res.data.posting_time;
              this.user_id = res.data.user_id;
              this.username = res.data.username;
              this.content = res.data.content;
              this.like_count = res.data.like_count;
              this.authority = res.data.authority;
              this.resource = res.data.resource;
              this.reply_count = res.data.reply_count;
              this.like = res.data.like;
              this.replys = res.data.replys;
              console.log(res);
              this.$message.success('成功！');
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    Download(){
      this.$axios.post('/posting/downloadFile', qs.stringify({posting_id:this.posting_id}), {
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
    },
    ClickLike(){
      let like_data = {
        judge:1,
        posting_id:this.$route.query.id
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
              this.toNew();
            }else
            {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    toComment(){
      this.$refs.MarkdownEditor.focus();
    },
    comment(){
      this.input_html = this.$refs.MarkdownEditor.html;
      let date = new Date();
      let now = date.toLocaleString();

      let post_data = {
        judge: 1,
        posting_id: this.$route.query.id,
        content: this.input_html,
        time: now,
      }

      console.log(post_data);

      this.$axios.post('/posting/comment', qs.stringify(post_data), {
        headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
        }
      })
          .then(res => {
            if (res.data.errno === 0) {
              this.toNew();
              this.input_html = '';
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    DelPost(){
      this.$confirm('此操作将删除该帖, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.post('/user/delete_posting', qs.stringify({posting_id:this.posting_id}), {
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

        this.$router.replace('/');
      }).catch(() => {

      });
    },
  },
  mounted() {
    this.$axios.post('/posting/getPostingInfo', qs.stringify({posting_id: this.$route.query.id}), {
      headers: {
        username: this.$store.state.username,
        token: this.$store.state.token,
      }
    })
        .then(res => {
          if (res.data.errno === 0) {
            this.posting_title = res.data.posting_title;
            this.posting_time = res.data.posting_time;
            this.user_id = res.data.user_id;
            this.username = res.data.username;
            this.content = res.data.content;
            this.like_count = res.data.like_count;
            this.authority = res.data.authority;
            this.resource = res.data.resource;
            this.reply_count = res.data.reply_count;
            this.like = res.data.like;
            this.replys = res.data.replys;
            console.log(res);
          }
          else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
  }
}
</script>
