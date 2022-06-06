<template>
  <el-carousel height="700px" :autoplay="false" arrow="always">
    <el-carousel-item v-for="item in 2" :key="item" >
      <div v-if="item === 2">
        <ForumBorder>
          <el-container>
            <el-table :data="posting_data" stripe align="left">

              <el-table-column min-width="5%"></el-table-column>

              <el-table-column label="标题" min-width="50%">
                <template slot-scope="scope">
                  <router-link :to="{path:'post', query:{id:scope.row.posting_id}}">
                    <el-link id="art-title">
                      {{scope.row.posting_title}}
                    </el-link>
                  </router-link>
                  <div id="art-summary">TODO：摘要</div>
                </template>
              </el-table-column>

              <el-table-column min-width="5%">
                <template slot-scope="scope">
                  <img src="../assets/el-icon-like.png" style="width: 15px; height: 15px" />
                  {{scope.row.like_count}}
                </template>
              </el-table-column>

              <el-table-column min-width="10%">
                <template slot-scope="scope">
                  <img src="../assets/comment.png" style="width: 15px; height: 15px" />
                  {{scope.row.comment_count}}
                </template>
              </el-table-column>

              <el-table-column label="作者" min-width="15%">
                <template slot-scope="scope">
                  <div id="art-author"><u>{{scope.row.username}}</u></div>
                </template>
              </el-table-column>

              <el-table-column label="发表日期" min-width="15%">
                <template slot-scope="scope">
                  <div id="art-date">{{scope.row.posting_time}}</div>
                </template>
              </el-table-column>

            </el-table>
          </el-container>
        </ForumBorder>
      </div>
      <div v-else >
        <body  background="https://s2.loli.net/2022/05/06/IbhUV8CEPNTewAs.png"
               alt="blog7.png"
               style="background-repeat:no-repeat;background-size: 100%">
        <h1>欢迎来到本论坛</h1>
        </body>
      </div>


    </el-carousel-item>
  </el-carousel>

</template>

<script>
  import ForumBorder from "@/components/ForumBorder";
  // @ is an alias to /src
  export default {
    name: 'HomeView',
    components:{ForumBorder},
    data() {
      return {
        search: "",
        posting_data: [],
      }
    },
    methods: {
      goto_login() {
        this.$router.replace('/login');
      },
      goto_logout() {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('change_state0'); //切换到游客状态
          this.$router.replace('/');
        }).catch(() => {
        });
      },
      User_Command(command) {
        if (command === 'a') {
          this.$message('进入个人中心');
        } else if (command === 'b') {
          this.goto_logout();
        }
      },
    }
  }
</script>

<style scoped>

.el-carousel__item h1 {
  color: #535660;
  font-size: 40px;
  opacity: 0.75;
  line-height: 700px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: white;
}
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .title {
    font-size: 30px;
    background-color: #f1f1f1;
    line-height: 80px;
    min-height: 80px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
  }

  .intro {
    font-size: 20px;
    background-color: #f1f1f1;
    min-height: 200px;
    margin-bottom: 20px;
  }

  .art-title {
    font-size: 18px;
  }

  .art-summary {
    font-size: 15px;
    margin-left: 20px;
    color: gray;
  }

  .art-author {
    font-size: 15px;
  }

  .art-date {
    font-size: 15px;
    color: gray;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-row {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 61px;
    margin-bottom: 5px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .el-row {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 61px;
    margin-bottom: 5px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .sector-button {
    margin: 5px;
  }
</style>