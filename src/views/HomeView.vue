<template>

  <body>
    <div id="title">BUAA<br />学习生活论坛</div>
    <div id="inner-body">
      <div style="width: 95%;">
        <el-container>
          <el-header></el-header>
          <el-container>

            <el-container>
              <el-header>
                <h2>当前热帖</h2>
              </el-header>
              <el-main>
                <el-table :data="hot_posting_data" stripe>
                  <el-table-column label="标题" min-width="45%">
                    <template slot-scope="scope">
                      <div style="margin: 5px">
                        <router-link :to="{path:'/post', query:{id:scope.row.posting_id}}">
                          <el-link class="art-title">{{scope.row.posting_title}}</el-link>
                        </router-link>
                      </div>
                      <div style="margin: 5px">
                        <span style="margin-left: 5px; margin-right: 20px;">
                          <router-link :to="{path:'/personcenter', query:{user:scope.row.username}}">
                            <el-link class="art-author">{{scope.row.username}}</el-link>
                          </router-link>
                        </span>
                        <div class="el-icon-view" style="font-size: 15px;"></div>
                        <span style="margin-left: 5px; margin-right: 20px;">{{scope.row.click_count}}</span>
                        <img src="../assets/el-icon-like.png" style="width: 15px; height: 15px" />
                        <span style="margin-left: 5px; margin-right: 20px;">{{scope.row.like_count}}</span>
                        <img src="../assets/comment.png" style="width: 15px; height: 15px" />
                        <span style="margin-left: 5px; margin-right: 20px;">{{scope.row.comment_count}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
            </el-container>

            <el-container>
              <el-header>
                <h2>最新帖子</h2>
              </el-header>
              <el-main>
                <el-table :data="recent_posting_data" stripe>
                  <el-table-column label="标题" min-width="45%">
                    <template slot-scope="scope">
                      <div style="margin: 5px">
                        <router-link :to="{path:'/post', query:{id:scope.row.posting_id}}">
                          <el-link class="art-title">{{scope.row.posting_title}}</el-link>
                        </router-link>
                      </div>
                      <div style="margin: 5px">
                        <span style="margin-left: 5px; margin-right: 20px;">
                          <router-link :to="{path:'/personcenter', query:{user:scope.row.username}}">
                            <el-link class="art-author">{{scope.row.username}}</el-link>
                          </router-link>
                        </span>
                        <div class="el-icon-view" style="font-size: 15px;"></div>
                        <span style="margin-left: 5px; margin-right: 20px;">{{scope.row.click_count}}</span>
                        <img src="../assets/el-icon-like.png" style="width: 15px; height: 15px" />
                        <span style="margin-left: 5px; margin-right: 20px;">{{scope.row.like_count}}</span>
                        <img src="../assets/comment.png" style="width: 15px; height: 15px" />
                        <span style="margin-left: 5px; margin-right: 20px;">{{scope.row.comment_count}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
            </el-container>
          </el-container>

          <el-container>
            <el-header>
              <h2>访问板块</h2>
            </el-header>
            <el-main style="display: flex; align-items: flex-start; flex-direction: column;">
              <div v-for="item in this.sector_data" :key="item.name" style="width: 99%; margin-bottom: 20px;">
                <router-link :to="{ path:'/sector', query:{name:item.name}}">
                  <el-card shadow="hover">
                    <div style="display: flex; align-items: flex-start; flex-direction: row;">
                      <div style="width: 5%;"></div>
                      <div style="width: 30%; display: flex; align-items: flex-start; flex-direction: column;">
                        <div :class="item.icon + '  sector-icon'" @click="goto_sector(discussion)"></div>
                        <div class="sector-name">{{item.chinese_name}}</div>
                        <div class="sector-intro">{{item.intro}}</div>
                      </div>
                      <div style="display: flex; align-items: flex-start; flex-direction: column;">
                        <div style="margin: 8px">最新发表：</div>
                        <div style="margin: 5px">
                          <router-link :to="{path:'/post', query:{id:item.posting_id}}">
                            <el-link class="art-title">{{item.post_title}}</el-link>
                          </router-link>
                        </div>
                        <div style="margin: 5px">
                          <span style="margin-left: 5px; margin-right: 20px;">
                            <router-link :to="{path:'/personcenter', query:{user:item.author}}">
                              <el-link class="art-author">{{item.author}}</el-link>
                            </router-link>
                          </span>
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
                </router-link>
              </div>
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
        hot_posting_data: [],
        recent_posting_data: [],
        sector_data: {
          discussion: {
            name: 'discussion',
            chinese_name: '讨论区',
            icon: 'el-icon-position',
            intro: '自由讨论',
            post_title: '',
            post_id: 0,
            author: '',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          recommendation: {
            name: 'recommendation',
            chinese_name: '课程推荐',
            icon: 'el-icon-collection',
            intro: '自由讨论',
            post_title: '',
            post_id: 0,
            author: '',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          exercise: {
            name: 'exercise',
            chinese_name: '刷题板块',
            icon: 'el-icon-medal',
            intro: '自由讨论',
            post_title: '',
            post_id: 0,
            author: '',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          campus: {
            name: 'campus',
            chinese_name: '校园周边',
            icon: 'el-icon-present',
            intro: '自由讨论',
            post_title: '',
            post_id: 0,
            author: '',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
          resource: {
            name: 'resource',
            chinese_name: '资源共享',
            icon: 'el-icon-download',
            intro: '自由讨论',
            post_title: '',
            post_id: 0,
            author: '',
            click_count: 0,
            like_count: 0,
            comment_count: 0,
          },
        },
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
              this.hot_posting_data = res.data.data1.slice(0, 5);
              this.recent_posting_data = res.data.data2.slice(0, 5);
              if (res.data.discussion[0]) this.set_sector_info('discussion', res.data.discussion[1]);
              if (res.data.recommendation[0]) this.set_sector_info('recommendation', res.data.recommendation[1]);
              if (res.data.exercise[0]) this.set_sector_info('exercise', res.data.exercise[1]);
              if (res.data.campus[0]) this.set_sector_info('campus', res.data.campus[1]);
              if (res.data.resource[0]) this.set_sector_info('discussion', res.data.resource[1]);
            }
            else {
              this.hot_posting_data = [];
              this.recent_posting_data = [];
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

      set_sector_info(sector_name, data) {
        this.sector_data[sector_name].post_id = data.posting_id;
        this.sector_data[sector_name].post_title = data.posting_title;
        this.sector_data[sector_name].author = data.username;
        this.sector_data[sector_name].click_count = data.click_count;
        this.sector_data[sector_name].like_count = data.like_count;
        this.sector_data[sector_name].comment_count = data.comment_count;
      }
    },
    mounted() {
      this.get_HomePage_info();
    }
  }
  //#535660
</script>

<style scoped>
  @keyframes Atitle {
    from {}
  }

  body {
    width: 100%;
    background: url("../assets/bg.jpg") #061832 no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  #title {
    width: 100%;
    height: 600px;
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

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>