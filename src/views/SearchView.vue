<template>
  <ForumBorder>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>搜索</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="posting_data" stripe align="left">

      <el-table-column min-width="5%"></el-table-column>

      <el-table-column label="标题" min-width="45%">
        <template slot-scope="scope">

          <router-link :to="{path:'/post', query:{id:scope.row.posting_id}}">
            <el-link class="art-title">
              {{scope.row.posting_title}}
            </el-link>
          </router-link>
          <span v-if="scope.row.has_file" class="art-attribute"> [资源帖]</span>
          <span v-if="scope.row.authority>0" class="art-attribute"> [阅读权限 {{scope.row.authority}}]</span>
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

      <el-table-column label="最近回复" min-width="20%">
        <template slot-scope="scope">
          <div class="art-date">{{scope.row.recent_comment_time}}</div>
        </template>
      </el-table-column>

      <el-table-column label="发表日期" min-width="20%">
        <template slot-scope="scope">
          <div class="art-date">{{scope.row.posting_time}}</div>
        </template>
      </el-table-column>

    </el-table>
  </ForumBorder>
</template>

<script>
  import ForumBorder from "@/components/ForumBorder";
  import qs from "qs";
  export default {
    name: "SearchView",
    components: { ForumBorder },
    data() {
      return {
        search: this.$route.query.searchContent,
        user_level: 0,
        posting_data: [],
      }
    },
    methods: {
      get_Search_Info() {
        this.$axios.post('/posting/searchPosting', qs.stringify({ search: this.search }))
          .then(res => {
            if (res.data.errno === 0) {
              this.user_level = res.data.user_level;
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
      }
    },
    mounted() {
      this.get_Search_Info();
    },
    watch: {
      $route(to, from) {
        if (to.query.searchContent !== from.query.searchContent) {
          this.search = to.query.searchContent;
          this.get_Search_Info();
        }
      },
    },
  }
</script>

<style scoped>
#title {
  font-size: 40px;
  letter-spacing: 10px;
  background-color: #F4F4F4;
  line-height: 80px;
  min-height: 80px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bolder;
}
  #art-title {
    font-size: 18px;
  }

  #art-summary {
    font-size: 15px;
    margin-left: 20px;
    color: gray;
  }

.art-attribute {
  font-size: 15px;
  color: gray;
}

  #art-author {
    font-size: 15px;
    margin-left: 20px;
    color: gray;
  }

  #art-date {
    font-size: 15px;
    color: gray;
  }
a {
  text-decoration: none;
}
</style>