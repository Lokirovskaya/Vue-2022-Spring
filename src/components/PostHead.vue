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
        <span v-html="content"></span>
      </el-main>
      <el-footer height="25px">
        {{posting_time}}
        {{like_count}}
        <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="clicked_like"
            src="../assets/el-icon-clicked_like.png" v-if="like" @click="LIKE">
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

  export default {
    name: "PostHead",
    props:{
      posting_title:{type: String, required: true},
      posting_time:{},
      user_id:{},
      username:{type: String, required: true},
      content:{type: String, required: true},
      like_count:{type: Number, default: 0},
      authority:{},
      resource:{type: String},
      like:{type: Boolean, default: false}
    },
    data() {
      return {
        User_Pho: 'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png',    //用户头像
        User_Page: 'www.baidu.com',     //用户个人主页链接
        Level: 5,                  //用户等级
      }
    },
    methods: {
      LIKE() {
        this.$emit('Like');//点赞
      },//可能需要修改
      comment() {//等老哥解决后再加

      },
      download(){
        this.$emit('Download');//下载
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