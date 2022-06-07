<template>
  <ForumBorder>
    <el-container>
      <el-header id="title">
        这个板块的名称是 {{ sector_chinese_name[this.$route.query.name]}}
      </el-header>
      <el-header id="intro" v-html="sector_intro"></el-header>
      <el-main>

        <div v-if="this.$store.getters.is_logged">
          <router-link :to="{path:'/sector/newpost', query:{name: this.$route.query.name}}">
            <el-button type="primary">发新帖</el-button>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/login">
            <el-button type="primary">去登录才能发帖</el-button>
          </router-link>
        </div>

        <el-table :data="posting_data" stripe align="left">

          <el-table-column min-width="5%"></el-table-column>

          <el-table-column label="标题" min-width="45%">
            <template slot-scope="scope">
              <router-link :to="{path:'post', query:{id:scope.row.posting_id}}">
                <el-link id="art-title">
                  {{scope.row.posting_title}}
                </el-link>
              </router-link>
              <router-link :to="{path:'/personcenter', query:{user:scope.row.username}}">
                <div id="art-author">
                  <el-link>{{scope.row.username}}</el-link>
                </div>
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

          <el-table-column label="最近回复" min-width="18%">
            <template slot-scope="scope">
              <div class="art-date">{{scope.row.recent_comment_time}}</div>
            </template>
          </el-table-column>

          <el-table-column label="发表日期" min-width="18%">
            <template slot-scope="scope">
              <div class="art-date">{{scope.row.posting_time}}</div>
            </template>
          </el-table-column>

        </el-table>
      </el-main>
    </el-container>
  </ForumBorder>
</template>


<script>
  import qs from 'qs';
  import ForumBorder from "@/components/ForumBorder";
  export default {
    name: 'SectorView',
    components: { ForumBorder },
    data() {
      return {
        sector_intro: '',
        posting_data: [],
        sector_chinese_name: {
          'discussion': '讨论区',
          'recommendation': '课程推荐',
          'exercise': '刷题板块',
          'campus': '校园周边',
          'resource': '资源共享',
        },
      }
    },

    methods: {
      get_sector_info() {
        this.$axios.post('/posting/getSectorPostingList',
          qs.stringify({ sector_name: this.$route.query.name })
        )
          .then(res => {
            if (res.data.errno === 0) {
              this.sector_intro = res.data.sector_introduction;
              this.posting_data = res.data.data;
              console.log(this.posting_data);
            }
            else {
              this.posting_data = [];
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },

    mounted() {
      this.get_sector_info();
    },

    watch: {
      $route(to, from) {
        if (to.query.name != from.query.name) {
          this.name = to.query.name;
          this.get_sector_info();
        }
      },
    },
  }
</script>

<style>
  #title {
    font-size: 30px;
    background-color: #f1f1f1;
    line-height: 80px;
    min-height: 80px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
  }

  #intro {
    font-size: 20px;
    background-color: #f1f1f1;
    min-height: 200px;
    margin-bottom: 20px;
  }

  #art-title {
    font-size: 18px;
  }

  #art-author {
    font-size: 15px;
    margin-left: 20px;
    color: gray;
  }

  .art-date {
    font-size: 15px;
    color: gray;
  }
</style>