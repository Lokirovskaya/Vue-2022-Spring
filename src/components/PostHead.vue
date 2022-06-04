<template>
  <el-container>
    <el-aside style="width: 200px">
      <p>
        <el-link :underline="false" v-bind:href="User_Page"><i>{{ username }}</i></el-link>
      </p>
      <el-avatar shape="square" :size="160" v-bind:src="User_Pho"></el-avatar>
      <p>LV{{ Level }}</p>
    </el-aside>
    <el-container>
      <el-header height="40px">
        <b>{{posting_title}}</b>
      </el-header>
      <el-main>
        {{content}}
      </el-main>
      <el-footer height="25px">
        {{Time}}
        {{likeNum}}
        <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="clicked_like"
            src="../assets/el-icon-clicked_like.png" v-if="like1" @click="LIKE">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="like"
            src="../assets/el-icon-like.png" v-else @click="LIKE">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="回复" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 7px;bottom: -2px" alt="comment"
            src="../assets/comment.png">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="资源下载" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 14px;bottom: -2px" alt="comment"
               src="../assets/download.png" @click="download">
        </el-tooltip>

      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import qs from "qs";

  export default {
    name: "PostHead",
    data() {
      return {
        User_Pho: 'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png',    //用户头像
        User_Page: 'www.baidu.com',     //用户个人主页链接
        Level: 5,                  //用户等级
        like1: this.like,                   //是否点赞
        likeNum: this.like_count,               //点赞数量
        Time: this.Time       //发布时间
      }
    },
    props:{
      posting_title:{type: String, required: true},
      posting_time:{type: Date, required: true},
      user_id:{type: Number, required: true},
      username:{type: String, required: true},
      content:{type: String, required: true},
      like_count:{type: Number, default: 0},
      authority:{type: Number, default: 0},
      resource:{type: String},
      like:{type: Boolean, default: false}
    },
    methods: {
      LIKE() {
        let like_data = {
          judge:1,
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
      },//可能需要修改
      comment() {

      },
      download(){

      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: ghostwhite;
    color: #333;
    text-align: left;
    line-height: 40px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .el-footer {
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

  body>.el-container {
    margin-bottom: 40px;
  }
</style>