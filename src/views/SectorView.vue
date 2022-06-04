<template>
  <el-container>
    <el-header id="title">
      这个板块的名称是 {{ sector_chinese_name[this.$route.query.name]}}
    </el-header>
    <el-header id="intro" v-html="sector_intro"></el-header>
    <el-main>

      <router-link :to="{path:'/sector/newpost', query:{name: this.$route.query.name}}">
        <el-button type="primary">发新帖</el-button>
      </router-link>

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
    </el-main>
  </el-container>
</template>


<script>
  import qs from 'qs';
  export default {
    name: 'SectorView',

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

    },

    mounted() {
      this.$axios.post('/posting/getSectorPostingList',
        qs.stringify({ sector_name: this.$route.query.name })
      )
        .then(res => {
          if (res.data.errno === 0) {
            this.sector_intro = res.data.sector_introduction;
            this.posting_data = res.data.data;
            this.$message.success('信息加载成功');
          }
          else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
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

  #art-summary {
    font-size: 15px;
    margin-left: 20px;
    color: gray;
  }

  #art-author {
    font-size: 15px;
  }

  #art-date {
    font-size: 15px;
    color: gray;
  }
</style>