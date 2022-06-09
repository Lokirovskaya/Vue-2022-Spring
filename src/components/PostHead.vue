<template>
  <el-container>
    <el-aside style="width: 200px">

      <router-link :to="{path:'/personcenter', query:{user:username}}">
        <p>
          <i>{{ username }}</i>
        </p>
      </router-link>

        <router-link :to="{path:'/personcenter', query:{user:username}}">
            <img  :src="'http://43.138.55.69'+user_photo"  class="qqtwo" style="height: 150px;width: 150px;position: relative;bottom: -6px">
          </router-link>


      <p>LV{{ user_level }}</p>
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

  import qs from "qs";

  export default {
    name: "PostHead",
    props:{
      posting_title:{type: String, required: true},
      posting_id: {},
      posting_time:{},
      user_id:{},
      username:{type: String, required: true},
      user_level:{},
      user_photo:{},
      content:{type: String, required: true},
      like_count:{type: Number, default: 0},
      authority:{},
      resource:{type: String},
      like:{type: Boolean, default: false}
    },
    data() {
      return {
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
        console.log(this.posting_id);
        this.$axios.post('/posting/downloadFile',
            qs.stringify({posting_id: this.posting_id}),
            {responseType: 'blob'}
            ).then((res) =>{
              console.log(res);
              const link = document.createElement('a');
              let blob = new Blob([res.data]);
              link.style.display = 'none';
              const url = window.URL || window.webkitURL || window.moxURL;
              link.href = url.createObjectURL(blob);
              link.setAttribute('download',this.resource);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              url.revokeObjectURL(link.href);
        }).catch((err)=>{
          this.$message.error(err);
        })

        /*
        return new Promise((resolve,reject) => {
          axios({
            url: '/posting/downloadFile',// 请求地址
            method: 'post',
            data: {posting_id: this.posting_id},// 参数
            headers: {
              username: this.$store.state.username,
              token: this.$store.state.token,
              "content-type":"multipart/from-data",
            },
            responseType: 'blob'// 表明返回服务器返回的数据类型
          }).then(res => {
            console.log(res.data);

            let blob = new Blob([res.data]);
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = this.resource;
            link.click();
            window.URL.revokeObjectURL(link.href);
            resolve(res);
          }).catch(err=>{
            reject(err);
          });
        });
         */
      },
      delPost(){
        this.$emit('DelPost');//删除帖子
      },
    }
  }
</script>

<style scoped>

  .qqtwo {
    border: 5px double black;
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