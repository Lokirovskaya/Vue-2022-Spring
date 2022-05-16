<template>
  <el-container>
    <el-header id="title">{{module_name[this.$route.name]}}</el-header>
    <el-header id="intro" v-html="intro_content"></el-header>
    <el-main>
      <el-table :data="articles" stripe="true" align="left">
        <el-table-column label="标题" min-width="70%">
          <template slot-scope="scope">
            <div id="art-title"><u>{{scope.row.title}}</u></div>
            <div id="art-summary">这里或许可以放一些摘要？</div>
          </template>
        </el-table-column>
        <el-table-column label="作者" min-width="15%">
          <template slot-scope="scope">
            <div id="art-author"><u>{{scope.row.author}}</u></div>
          </template>
        </el-table-column>
        <el-table-column label="发表日期" min-width="15%">
          <template slot-scope="scope">
            <div id="art-date">{{scope.row.date}}</div>
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
        module_name: { // 一个 $route.name 到显示给用户的名字的字典
          'module-a': '模块A是我的名字',
          'module-b': '模块B是我的名字',
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