<template>
    <div>
        <div v-if="this.$store.state.login_state == 0" class="login">
    <div>{{this.$route.query.userid}}</div>
    <h1>请登录</h1>

  </div>
  <div v-else>
    <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" router="true">
            <el-menu-item style="width:60px"><el-image style="width: 40px; height: 40px"  src="../assets/el-icon-defaultPhoto.png" :preview-src-list="srcList"></el-image></el-menu-item>
            
            <el-menu-item  index="/PersonCenter">团长你就是歌姬</el-menu-item>

            
            <!-- <el-dropdown>
        <span class="el-dropdown-link">
            <el-menu-item index="/PersonCenter" style="position: relative;left:-720px;"><el-link :underline="false" >Lv4</el-link></el-menu-item><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown"> 
           <font size = "2" style="position: relative;left:-720px;">经验：30/100</font>
        </el-dropdown-menu>
        </el-dropdown> -->
        <el-link :underline="false" style="position: relative;left:-720px;bottom:-17px;"><font size = "3">Lv4</font></el-link>

            <el-menu-item index="/PersonCenter" style="position: relative;left:950px;" ><el-link><router-link to="/viewifo">查看个人资料</router-link></el-link></el-menu-item>
            <el-menu-item index="/PersonCenter" style="position: relative;left:950px;"><el-link><router-link to="/modifyifo">修改个人资料</router-link></el-link></el-menu-item>
            <!-- <el-link :underline="false" style="position: relative;right:2px;bottom:-19px" @click="goto_login">编辑资料</el-link> -->
        </el-menu>


        <el-menu mode="horizontal">

            <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="我的帖子" name="1">
          <el-table :data="articles1" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">
              <template slot-scope="scope">
                <div class="art-title"><u>{{scope.row.title}}</u></div>
              </template>
            </el-table-column>
            <el-table-column label="板块" min-width="15%">
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

            <el-collapse-item title="近期点赞" name="2">
          <el-table :data="articles1" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">
              <template slot-scope="scope">
                <div class="art-title"><u>{{scope.row.title}}</u></div>
              </template>
            </el-table-column>
            <el-table-column label="板块" min-width="15%">
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

            <el-collapse-item title="近期评论" name="3">
          <el-table :data="articles1" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">
              <template slot-scope="scope">
                <div class="art-title"><u>{{scope.row.title}}</u></div>
              </template>
            </el-table-column>
            <el-table-column label="板块" min-width="15%">
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


            </el-collapse>
            
        </el-menu>
  </div>
        
        <!-- <post-head/> -->
    </div>
    
</template>

<script>
// import PostHead from "@/components/PostHead";
// import PostReply from "@/components/PostReply";
export default {
  name: 'PersonCenter',
//   components:{PostHead,PostReply},
// components:{PostHead},
data(){
    return{
        articles1: [
        {
          id: 1,
          title: '本来不存希望，',
          author: '讨论区',
          date: '2002-02-12',
        },
        {
            id: 2,
            title: 'test',
            author: '课程推荐',
            date: '2002-02-12',
        },
        {
            id: 2,
            title: 'test',
            author: '刷题板块', 
            date: '2002-02-12',
        },
        ]
    }
},
method:
{
    goto_view_ifo(){
        this.$router.replace('/viewifo');
    },
},
}
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
</style>