<template>

  <body>
    <div id="title">BUAA<br />学习生活论坛</div>
    <div id="inner-body">
      <div style="width: 95%;">
        <el-container>
          <el-header></el-header>
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
  </body>
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

@keyframes Atitle {
  from{ }
}

  body {
    width: 100%;
    background: url(https://s2.loli.net/2022/06/07/gyBqZaJc4tpTrfh.jpg) #061832 no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  #title {
    width: 100%;
    height: 500px;
    font-size: 72px;
    color: #F4F4F4;
    font-weight: bolder;
    letter-spacing: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  #inner-body {
    width: 80%;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    background: #FFFFFF;
    padding-top: 50px;
    display: flex;
    justify-content: center;
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