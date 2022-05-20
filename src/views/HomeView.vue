<template>
  <div class="home">
    <el-row>
      <el-col :span="8"><div class="grid-content" >
        <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" router="true">
          <el-menu-item index="/">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">论坛分区</template>
            <el-menu-item index="/module-a" ><i class="el-icon-position"></i>讨论区</el-menu-item>
            <el-menu-item index="/module-b"><i class="el-icon-collection"></i>课程推荐</el-menu-item>
            <el-menu-item index="/module-a"><i class="el-icon-medal"></i>刷题板块</el-menu-item>
            <el-menu-item index="/module-a"><i class="el-icon-present"></i>校园周边</el-menu-item>
            <el-menu-item index="/module-a"><i class="el-icon-download"></i>资源共享</el-menu-item>
          </el-submenu>
          <el-menu-item index="/usermanager">管理员界面</el-menu-item>
        </el-menu>
      </div></el-col><!--导航栏-->
      <el-col :span="8">
        <div class="grid-content" style="position: relative;bottom: -10.5px">
          <el-input
              placeholder="请输入关键词"
              prefix-icon="el-icon-search"
              size="middle"
              v-model="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col ><!--搜索栏-->
      <el-col :span="8">
        <div class="grid-content" style="text-align: right">
          <div v-if = "this.$store.state.login_state == 0">
            <el-link :underline="false" style="position: relative;bottom:-19px" @click="goto_login">登录/注册</el-link>&nbsp;&nbsp;
          </div>
          <div v-else>
            <el-dropdown  @command="User_Command">
              <div>
                <el-avatar style="position: relative;bottom: -13.5px" shape="square" :size="35" v-bind:src="User.pho" ></el-avatar>
                <span style="position: relative;bottom: -3px">&nbsp;{{ User.name }}&nbsp;&nbsp;</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col><!--用户栏-->
    </el-row><!--可使用TopIndex组件代替-->
    <el-container>
      <el-header class="title">随便弄点儿</el-header>
      <el-header class="intro">hello world</el-header>

      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="讨论区" name="1">
          <el-table :data="articles1" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">
              <template slot-scope="scope">
                <div class="art-title"><u>{{scope.row.title}}</u></div>
                <div class="art-summary">这里或许可以放一些摘要？</div>
              </template>
            </el-table-column>
            <el-table-column label="作者" min-width="15%">
              <template slot-scope="scope">
                <div class="art-author"><u>{{scope.row.author}}</u></div>
              </template>
            </el-table-column>
            <el-table-column label="发表日期" min-width="15%">
              <template slot-scope="scope">
                <div class="art-date">{{scope.row.date}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title=" 课程推荐" name="2">
          <el-table :data="articles2" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">
              <template slot-scope="scope">
                <div class="art-title"><u>{{scope.row.title}}</u></div>
                <div class="art-summary">这里或许可以放一些摘要？</div>
              </template>
            </el-table-column>
            <el-table-column label="作者" min-width="15%">
              <template slot-scope="scope">
                <div class="art-author"><u>{{scope.row.author}}</u></div>
              </template>
            </el-table-column>
            <el-table-column label="发表日期" min-width="15%">
              <template slot-scope="scope">
                <div class="art-date">{{scope.row.date}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title=" 刷题板块" name="3">
          <el-table :data="articles3" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">
              <template slot-scope="scope">
                <div class="art-title"><u>{{scope.row.title}}</u></div>
                <div class="art-summary">这里或许可以放一些摘要？</div>
              </template>
            </el-table-column>
            <el-table-column label="作者" min-width="15%">
              <template slot-scope="scope">
                <div class="art-author"><u>{{scope.row.author}}</u></div>
              </template>
            </el-table-column>
            <el-table-column label="发表日期" min-width="15%">
              <template slot-scope="scope">
                <div class="art-date">{{scope.row.date}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title=" 校园周边" name="4">
          <el-table :data="articles4" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">
              <template slot-scope="scope">
                <div class="art-title"><u>{{scope.row.title}}</u></div>
                <div class="art-summary">这里或许可以放一些摘要？</div>
              </template>
            </el-table-column>
            <el-table-column label="作者" min-width="15%">
              <template slot-scope="scope">
                <div class="art-author"><u>{{scope.row.author}}</u></div>
              </template>
            </el-table-column>
            <el-table-column label="发表日期" min-width="15%">
              <template slot-scope="scope">
                <div class="art-date">{{scope.row.date}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title=" 资源下载" name="5">
          <el-table :data="articles5" stripe="true" align="left">
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
        </el-collapse-item>
      </el-collapse>
    </el-container>
  </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {},
  data(){
    return{
      search:"",
      activeNames: ['1'],
      articles1: [
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
      ],//讨论区
      articles2: [
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
      ],//课程推荐
      articles3: [
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
      ],//刷题板块
      articles4: [
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
      ],//校园周边
      articles5: [
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
      ],//资源共享
      User:{
        name:"团长你就是歌姬",
        pho:"https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg",
      }
    }
  },
  methods:{
    goto_login(){
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
    User_Command(command){
      if(command === 'a')
      {
        this.$message('进入个人中心');
      }else if(command === 'b')
      {
        this.goto_logout();
      }
    },
  }
}
</script>

<style scoped>
.el-header, .el-footer {
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
body > .el-container {
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
</style>