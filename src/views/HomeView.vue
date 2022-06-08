<template>
  <!-- <el-carousel id="Picture" height="700px" :autoplay="false" arrow="always" direction="vertical">
    <el-carousel-item v-for="item in 2" :key="item">
      <div v-if="item === 2"> -->

  <div src="../assets/bg.jpg"
    style="width: 100%; background: url(https://s2.loli.net/2022/06/07/gyBqZaJc4tpTrfh.jpg) #061832 no-repeat; background-size: contain; padding-top: 500px; display: flex; justify-content: center;">
    <div
      style="width: 80%; border-top-left-radius: 50px; border-top-right-radius: 50px;background: #FFFFFF; padding-top: 50px; display: flex; justify-content: center;">
      <div style="width: 95%;">
        <el-container>
          <el-header>
          </el-header>

          <el-container>
            <el-header>
              <h2>当前热帖</h2>
            </el-header>
            <el-main>
              <el-table :data="posting_data.slice(0,5)" stripe>

                <el-table-column label="标题" min-width="45%">
                  <template slot-scope="scope">
                    <router-link :to="{path:'post', query:{id:scope.row.posting_id}}">
                      <el-link class="art-title">
                        {{scope.row.posting_title}}
                      </el-link>
                    </router-link>
                  </template>
                </el-table-column>

                <el-table-column min-width="8%">
                  <template slot-scope="scope">
                    <div class="el-icon-view" style="width: 15px; height: 15px"></div>
                    {{scope.row.click_count}}
                  </template>
                </el-table-column>

                <el-table-column min-width="8%">
                  <template slot-scope="scope">
                    <img src="../assets/el-icon-like.png" style="width: 15px; height: 15px" />
                    {{scope.row.like_count}}
                  </template>
                </el-table-column>

                <el-table-column min-width="8%">
                  <template slot-scope="scope">
                    <img src="../assets/comment.png" style="width: 15px; height: 15px" />
                    {{scope.row.comment_count}}
                  </template>
                </el-table-column>

                <el-table-column label="作者" min-width="15%">
                  <template slot-scope="scope">
                    <div class="art-author">{{scope.row.username}}</div>
                  </template>
                </el-table-column>

                <el-table-column label="最新回复时间" min-width="15%">
                  <template slot-scope="scope">
                    <div class="art-date">{{scope.row.recent_comment_time}}</div>
                  </template>
                </el-table-column>

              </el-table>
            </el-main>
          </el-container>

          <el-container>
            <el-header>
              <h2>访问板块</h2>
            </el-header>
            <el-main style="display: flex; align-items: flex-start; flex-direction: column;">
              <el-card v-for="item in this.sector_data" :key="item.name" shadow="hover"
                @click.native="goto_sector(item.name)" style="width: 99%; margin-bottom: 20px;">
                <div style="display: flex; align-items: flex-start; flex-direction: row;">
                  <div style="width: 5%;"></div>
                  <div style="width: 30%; display: flex; align-items: flex-start; flex-direction: column;">
                    <div :class="item.icon + '  sector-icon'" @click="goto_sector(discussion)"></div>
                    <div class="sector-name">{{item.chinese_name}}</div>
                    <div class="sector-intro">{{item.intro}}</div>
                  </div>
                  <div style="display: flex; align-items: flex-start; flex-direction: column;">
                    <div style="margin: 8px">最新发表：</div>
                    <div class="art-title" style="margin: 5px">{{item.post_title}}</div>
                    <div style="margin: 5px">
                      <span class="art-author" style="margin-left: 5px; margin-right: 20px;">{{item.author}}</span>
                      <div class="el-icon-view" style="font-size: 15px;"></div>
                      <span style="margin-left: 5px; margin-right: 20px;">{{item.click_count}}</span>
                      <img src="../assets/el-icon-like.png" style="width: 15px; height: 15px" />
                      <span style="margin-left: 5px; margin-right: 20px;">{{item.like_count}}</span>
                      <img src="../assets/comment.png" style="width: 15px; height: 15px" />
                      <span style="margin-left: 5px; margin-right: 20px;">{{item.comment_count}}</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </div>
  <!-- </div> -->
  <!-- <div v-else>

    <body background="https://s2.loli.net/2022/06/07/gyBqZaJc4tpTrfh.jpg" alt="blog7.png"
      style="background-repeat:no-repeat;background-size: 100%">
      <h1 @click="toPage">欢 迎 来 到 本 论 坛</h1>

    </body> -->

  <!-- </div>


    </el-carousel-item>
  </el-carousel> -->

</template>

<script>
  import qs from "qs";
  export default {
    name: 'HomeView',
    data() {
      return {
        search: "",
        posting_data: [],
        sector_data: [
          {
            name: 'discussion',
            chinese_name: '讨论区',
            icon: 'el-icon-position',
            intro: '自由讨论',
            post_title: '哈哈',
            post_id: 0,
            author: 'lokii',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          {
            name: 'recommendation',
            chinese_name: '课程推荐',
            icon: 'el-icon-collection',
            intro: '自由讨论',
            post_title: '哈哈',
            post_id: 0,
            author: 'lokii',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          {
            name: 'exercise',
            chinese_name: '刷题板块',
            icon: 'el-icon-medal',
            intro: '自由讨论',
            post_title: '哈哈',
            post_id: 0,
            author: 'lokii',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          {
            name: 'campus',
            chinese_name: '校园周边',
            icon: 'el-icon-present',
            intro: '自由讨论',
            post_title: '哈哈',
            post_id: 0,
            author: 'lokii',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          {
            name: 'resource',
            chinese_name: '资源共享',
            icon: 'el-icon-download',
            intro: '自由讨论',
            post_title: '哈哈',
            post_id: 0,
            author: 'lokii',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
        ]
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
      goto_sector(sector_name) {
        // this.$router.push({ path: '/sector', query: { name: sector_name } });
        let routeData = this.$router.resolve({ path: '/sector', query: { name: sector_name } })
        window.open(routeData.href, '_blank');
      },
      User_Command(command) {
        if (command === 'a') {
          this.$message('进入个人中心');
        } else if (command === 'b') {
          this.goto_logout();
        }
      },
      get_HomePage_info() {
        this.$axios.post('/posting/getHomepagePostingList', qs.stringify({}))
          .then(res => {
            if (res.data.errno === 0) {
              this.posting_data = res.data.data;
            }
            else {
              this.posting_data = [];
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      toPage() {
        document.getElementById("Picture").setActiveItem(2);
      },
    },
    mounted() {
      this.get_HomePage_info();
    }
  }
  //#535660
</script>

<style scoped>
  @keyframes textChange {
    from {
      opacity: 0.45;
    }

    to {
      opacity: 0.95;
    }
  }

  .el-carousel__item h1 {
    color: white;
    font-size: 40px;
    line-height: 700px;
    margin: 0;
    animation: textChange 3.5s;
    animation-iteration-count: 100;
    animation-direction: alternate-reverse;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: white;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: white;
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

  .art-author {
    font-size: 16px;
    margin-left: 20px;
    color: gray;
  }

  .art-date {
    font-size: 15px;
    color: gray;
  }

  .sector-name {
    font-size: 22px;
    text-decoration: none;
  }

  .sector-intro {
    font-size: 15px;
    color: gray;
  }

  .sector-icon {
    font-size: 50px;
    color: #617EB1;
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

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>