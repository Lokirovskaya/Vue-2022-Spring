<template>
  <ForumBorder>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/sector', query:{name:this.sector_name}}">{{sector_chinese_name[sector_name]}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.posting_title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <PostHead :posting_title="posting_title"
              :posting_id="posting_id"
              :posting_time="posting_time"
              :user_id="user_id"
              :username="username"
              :user_level="user_level"
              :user_photo="user_photo"
              :content="content"
              :like_count="like_count"
              :authority="authority"
              :resource="resource"
              :like="like"
              @Like="ClickLike"
              @DelPost="DelPost"
              @ToComment="toComment"></PostHead>
    <br>
    <div v-for="item in cur_replys" :key="item.reply_id">
      <PostReply
          :reply_id="item.reply_id"
          :username="item.username"
          :user_level="item.user_level"
          :user_photo="item.user_photo"
          :content="item.content"
          :like_count="item.like_count"
          :reply_count="item.reply_count"
          :time="item.time"
          :like="item.like"
          :replys="item.replys"
          :posting_id="posting_id"></PostReply>
      <br>
    </div>
    <el-pagination layout="prev, pager, next,jumper"
                   :total="reply_count"
                   :page-size="20"
                   @current-change="handleCurrentChange"
                    style="margin-bottom: 15px">
    </el-pagination>
    <MarkdownEditor ref="MarkdownEditor" v-model="input_html"></MarkdownEditor>
    <el-button  @click="comment" id="MComment" style="margin-top: 10px">回复</el-button> <br />
  </ForumBorder>


</template>
<script>
import PostHead from "@/components/PostHead";
import PostReply from "@/components/PostReply";
import MarkdownEditor from "@/components/MarkdownEditor";
import qs from "qs";
import ForumBorder from "@/components/ForumBorder";
export default {
  name: 'PostView',
  components:{PostHead,PostReply,MarkdownEditor,ForumBorder},
  data(){
    return{
        posting_id: this.$route.query.id,
        posting_title: '', // 帖子标题
        posting_time: '', // 发布时间
        user_id: undefined, // 发布用户ID
        username: '', // 用户名
        user_level: 0,  //用户等级,从全局变量找
        user_photo: '',
        content:'', // 帖子正文内容
        like_count: undefined, // 帖子点赞数
        authority: 0, // 帖子权限
        resource: '', // 帖子资源名称
        reply_count: undefined, // 总楼层数
        like: undefined, // 用户是否给该帖子点赞（布尔型）
        replys:[],
        cur_replys:[],
        cur_page: undefined,
        input_html:'',
        autofocus: false,
        sector_name: '',
        sector_chinese_name: {
          'discussion': '讨论区',
          'recommendation': '课程推荐',
          'exercise': '刷题板块',
          'campus': '校园周边',
          'resource': '资源共享',
      },
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
              this.user_level = res.data.user_level;
              this.sector_name = res.data.sector_name;
              this.authority = res.data.authority;

              if (this.user_level < this.authority) {
                this.$message.error('阅读权限不足！当前帖子要求权限 ' + this.authority);
                this.$router.push({ path: '/sector', query: { name: this.sector_name } });
              }

              this.posting_title = res.data.posting_title;
              this.posting_time = res.data.posting_time;
              this.user_id = res.data.user_id;
              this.username = res.data.username;
              this.user_photo = res.data.user_photo;
              this.content = res.data.content;
              this.like_count = res.data.like_count;        
              this.resource = res.data.resource;
              this.reply_count = res.data.reply_count;
              this.like = res.data.like;
              this.replys = res.data.replys;
              this.cur_replys = this.replys.slice((this.cur_page-1)*20,this.cur_page*20);

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
              this.$message.success(res.data.msg);
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
      let bridge = document.querySelector('#MComment');
      let body = document.body;
      let height = 0;

      //计算DOM节点到body顶部的距离
      do {
        height +=bridge.offsetTop;
        bridge = bridge.offsetParent;
      } while(bridge !== body)

      //滚动到指定位置
      window.scrollTo({
        top: height,
        behavior: 'smooth'
      })
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
              this.$message.success("回复成功!");
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
                this.$message.success(res.data.msg);
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
    handleCurrentChange(currentindex){
      this.cur_page = currentindex;
      this.cur_replys = this.replys.slice((currentindex-1)*20,currentindex*20);
      console.log(currentindex);
    },
    created() {
      this.cur_page = 1;
      this.cur_replys = this.replys.slice(0,20);
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
            this.authority = res.data.authority;
            this.user_level = res.data.user_level;
            this.sector_name = res.data.sector_name;

            if (this.user_level < this.authority) {
              this.$message.error('阅读权限不足！当前帖子要求权限 ' + this.authority);
              this.$router.push({ path: '/sector', query: { name: this.sector_name } });
            }

            this.posting_title = res.data.posting_title;
            this.posting_time = res.data.posting_time;
            this.user_id = res.data.user_id;
            this.username = res.data.username;
            this.user_photo = res.data.user_photo;
            this.content = res.data.content;
            this.like_count = res.data.like_count;
            this.resource = res.data.resource;
            this.reply_count = res.data.reply_count;
            this.like = res.data.like;
            this.replys = res.data.replys;
            this.created();
            console.log(res);
          }
          else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err+' 登录后才能看帖子内容!');
        });
  },

}
</script>
