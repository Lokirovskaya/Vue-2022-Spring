<template>
  <el-container>
    <el-header id="title">
      这个板块的名称是 {{ sector_chinese_name[this.$route.query.name]}},
    </el-header>
    <el-header id="intro" v-html="intro_content"></el-header>
    <el-main>

      <router-link :to="{path:'/sector/newpost', query:{name: this.$route.query.name}}">
        <el-button type="primary">发新帖</el-button>
      </router-link>

      <el-table :data="res.data" stripe="true" align="left">

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
  export default {
    name: 'SectorView',
    data() {
      return {
        sector_chinese_name: {
          'discussion': '讨论区',
          'recommendation': '课程推荐',
          'exercise': '刷题板块',
          'campus': '校园周边',
          'resource': '资源共享',
        },
        res: {
          sector_name: '其实没什么用的字段', // 板块名称
          sector_introduction: '<b>介绍！</b>', // 板块介绍
          data: [
            {
              posting_id: 1,
              posting_title: '标题1', // 帖子标题
              username: 'xxx', // 发布用户名
              posting_time: '2002-05-06', // 发布时间
              like_count: 10, // 点赞数量
              comment_count: 20 // 评论数
            },
            {
              posting_id: 2,
              posting_title: '标题2', // 帖子标题
              username: 'yyy', // 发布用户名
              posting_time: '1999-05-06', // 发布时间
              like_count: 0, // 点赞数量
              comment_count: 1000 // 评论数
            },
          ]
        },
      }
    },
    methods: {

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