<template>
  <el-container>
    <el-header id="title">
      这个板块的名称是 {{ sector_info[this.$route.query.name].name }},
      传给后端的板块 id 是 {{ sector_info[this.$route.query.name].id }}
    </el-header>
    <el-header id="intro" v-html="intro_content"></el-header>
    <el-main>
      <el-table :data="res.data" stripe="true" align="left">

        <el-table-column label="标题" min-width="55%">
          <template slot-scope="scope">
            <div id="art-title"><u>{{scope.row.posting_title}}</u></div>
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
    name: 'ModuleView',
    data() {
      return {
        sector_info: {
          'discussion': { name: '讨论区', id: 1 },
          'recommendation': { name: '课程推荐', id: 2 },
          'exercise': { name: '刷题板块', id: 3 },
          'campus': { name: '校园周边', id: 4 },
          'resource': { name: '资源共享', id: 5 },
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
        intro_content: '板块的介绍<br/><b>支持HTML代码</b><br/><i>界面颜色好丑啊之后再统一吧</i>',
        articles: [
          {
            id: 1,
            title: '本来不存希望，',
            author: '测试',
            date: '2002-02-12',
          },
          {
            id: 2,
            title: '心事化作春泥。',
            author: '测试',
            date: '2002-02-12',
          },
          {
            id: 3,
            title: '谁人巧言令色，',
            author: '测试',
            date: '2002-02-12',
          },
          {
            id: 4,
            title: '使我意马难收？',
            author: '测试',
            date: '2002-02-12',
          },
          {
            id: 5,
            title: '谁说时光最能疗创，',
            author: '测试',
            date: '2002-02-12',
          },
          {
            id: 6,
            title: '谁说旧仇转眼遗忘。',
            author: '测试',
            date: '2002-02-12',
          },
          {
            id: 7,
            title: '旧事笑声泪影，',
            author: '测试',
            date: '2002-02-12',
          },
          {
            id: 8,
            title: '历历在我心上。',
            author: 'George Orwell',
            date: '1984-01-01',
          },
        ]
      }
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