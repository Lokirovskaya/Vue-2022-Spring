<template>
  <el-container>
    <el-aside style="width: 200px">

      <router-link :to="{path:'/personcenter', query:{user:username}}">
        <p>
          <i>{{ username }}</i>
        </p>
      </router-link>

        <div class="pho_back">
          <router-link :to="{path:'/personcenter', query:{user:username}}">
          <el-avatar shape="square" :size="150" style="position: relative;bottom: -5px" v-bind:src="pho" ></el-avatar>
          </router-link>
        </div>

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
        {{posting_time}}&nbsp;
        {{like_count}}
        <el-tooltip class="item" effect="light" content="点赞" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="clicked_like"
            src="../assets/el-icon-clicked_like.png" v-if="like" @click="LIKE">
          <img style="width: 20px;height: 20px;position: relative; bottom: -2px" alt="like"
            src="../assets/el-icon-like.png" v-else @click="LIKE">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="回复" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 7px;bottom: -3px" alt="comment"
            src="../assets/comment.png" @click="Comment">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="资源下载" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 14px;bottom: -2px" alt="download"
               src="../assets/download.png" @click="download">
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="删除本贴" placement="bottom">
          <img style="width: 20px;height: 20px;position: relative; left: 20px;bottom: -3px" alt="delete"
               src="../assets/delete.png" @click="delPost" v-show="this.$store.getters.is_admin">
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
        pho: 'https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg',
        User_Pho: 'https://s2.loli.net/2022/05/08/1mkNYLO9siHrMud.png',    //用户头像
        User_Page: 'www.baidu.com',     //用户个人主页链接
        Level: 5,                  //用户等级
      }
    },
    methods: {
      LIKE() {
        this.$emit('Like');//点赞
      },//可能需要修改
      Comment() {//等老哥解决后再加
        this.$emit('ToComment');
      },
      download(){
        this.$emit('Download');//下载
      },
      delPost(){
        this.$emit('DelPost');//删除帖子
      },
    }
  }
</script>

<style scoped>

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
    text-align: left;
    line-height: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .el-footer {
    background-color: white;
    text-align: left;
    width: auto;
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  body>.el-container {
    margin-bottom: 40px;
  }
</style>