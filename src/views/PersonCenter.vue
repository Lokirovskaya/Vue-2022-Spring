<template>

    <div>
        <div v-if="this.$store.state.login_state == 0" class="login">
    <div>{{this.$route.query.userid}}</div>
    <h1>请登录</h1>

  </div>
  <div>
    <!-- <el-button size="small" style="position: relative;left:20px;" @click="func1" >修改</el-button> -->
    <!-- <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" router="true"> -->
            <!-- <el-menu-item style="width:60px"><el-image style="width: 40px; height: 40px"  src="../assets/el-icon-defaultPhoto.png" :preview-src-list="srcList"></el-image></el-menu-item> -->
            
            <!-- <el-menu-item  index="/PersonCenter">团长你就是歌姬</el-menu-item> -->

            
            <!-- <el-dropdown>
        <span class="el-dropdown-link">
            <el-menu-item index="/PersonCenter" style="position: relative;left:-720px;"><el-link :underline="false" >Lv4</el-link></el-menu-item><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown"> 
           <font size = "2" style="position: relative;left:-720px;">经验：30/100</font>
        </el-dropdown-menu>
        </el-dropdown> -->
        <!-- <el-link :underline="false" style="position: relative;left:-600px;bottom:-17px;"><font size = "3">Lv4</font></el-link> -->

            <!-- <el-menu-item index="/PersonCenter" style="position: relative;left:950px;" ><el-link><router-link to="/viewifo">查看个人资料</router-link></el-link></el-menu-item> -->
            
    <!-- </el-menu> -->
            <div v-if = "this.modify_state == 0">
            <br/>
            <el-descriptions title="用户信息" :column="3" :size="size" border style="position: relative;">
            <template slot="extra">
              
                <!-- <el-button size="small" v-on="this.commit('change_modify_state')"> -->
                  <!-- <el-button size="small" @click="change_modify_state()"> -->
                    <el-button size="small"
                    @click="
                           modify_state = 1;
                      input_username = username; 
                     //input_sex = sex;
                     //input_phone_num = phone_num;
                     //input_email = email;
                     //input_school = school;
                     //input_city = city;
                     //input_address = address;
                     //input_password = '';
                     //input_password2 = '';
                    ">
                    修改信息
                    </el-button>

            </template>
            <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
            <!-- <el-descriptions-item label="性别">{{sex}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="手机号">{{phone_num}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="邮箱">{{email}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="学校">{{school}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="居住地">{{city}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="联系地址">{{address}}</el-descriptions-item> -->
            <el-descriptions-item label="等级">lv4({{exp_now}}/{{exp_next_lv}})</el-descriptions-item>
            <!-- <el-descriptions-item label="用户状态">{{user_status}}</el-descriptions-item> -->
        </el-descriptions>
        <br/>
            </div>

            <div v-else>
              <br/>
              <el-descriptions title="用户信息" :column="3" :size="size" border style="position: relative;">
        
        <template slot="extra">
            <el-button size="small" style="position: relative;left:-1170px;">上传头像</el-button>
      <!-- <el-button size="small"><router-link to="/viewifo">修改完成</router-link></el-button> -->

      <el-button size="small" 
      @click="
      modify_state = 0;
      username = input_username;
      sex = input_sex;
      phone_num = input_phone_num;
      email = input_email;
      school = input_school;
      city = input_city;
      address = input_address;">
      提交
      </el-button>


    </template>

    <el-descriptions-item label="用户名">
        <el-input placeholder="输入新用户名" v-model="input_username" clearable style="width:150px"></el-input>
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="username = input_username" >修改</el-button> -->
    </el-descriptions-item>

    <!-- <el-descriptions-item label="性别"> -->
        <!-- <el-input placeholder="输入新性别" v-model="input_sex" clearable style="width:150px"></el-input> -->
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="sex = input_sex" >修改</el-button> -->
        <!-- </el-descriptions-item> -->
    
    <!-- <el-descriptions-item label="手机号"> -->
        <!-- <el-input placeholder="输入新手机号" v-model="input_phone_num" clearable style="width:150px"></el-input> -->
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="phone_num = input_phone_num">修改</el-button> -->
        <!-- </el-descriptions-item> -->
    
    <!-- <el-descriptions-item label="邮箱"> -->
        <!-- <el-input placeholder="输入新邮箱" v-model="input_email" clearable style="width:250px"></el-input> -->
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="email = input_email">修改</el-button> -->
        <!-- </el-descriptions-item> -->
    
    <!-- <el-descriptions-item label="学校"> -->
        <!-- <el-input placeholder="输入新学校" v-model="input_school" clearable style="width:250px"></el-input> -->
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="school = input_school">修改</el-button> -->
        <!-- </el-descriptions-item> -->
    
    <!-- <el-descriptions-item label="居住地"> -->
        <!-- <el-input placeholder="输入新居住地" v-model="input_city" clearable style="width:150px"></el-input> -->
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="city = input_city">修改</el-button> -->
        <!-- </el-descriptions-item> -->
    
    <!-- <el-descriptions-item label="联系地址"> -->
        <!-- <el-input placeholder="输入新地址" v-model="input_address" clearable style="width:250px"></el-input> -->
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="address = input_address">修改</el-button> -->
        <!-- </el-descriptions-item> -->
        
    <!-- <el-descriptions-item label="等级">lv4({{exp_now}}/{{exp_next_lv}})</el-descriptions-item> -->

    <!-- <el-descriptions-item label="用户状态">{{user_status}}</el-descriptions-item> -->

</el-descriptions>

<br/>
<div style="position: relative;left:-510px;">
    修改密码：
<el-input placeholder="输入新密码" v-model="input_password" clearable style="width:150px; position: relative;left:0px;" show-password></el-input>
<!-- <br/><br/> -->
<el-input placeholder="确认密码" v-model="input_password2" clearable style="width:150px; position: relative;left:20px;" show-password></el-input>
<!-- <el-button size="small" style="position: relative;left:40px;">修改密码</el-button> -->
</div>
<br/>
            </div>

            <!-- <el-menu-item index="/PersonCenter" style="position: relative;left:950px;"><el-link><router-link to="/modifyifo">修改个人资料</router-link></el-link></el-menu-item> -->
            <!-- <el-link :underline="false" style="position: relative;right:2px;bottom:-19px" @click="goto_login">编辑资料</el-link> -->
        

<div v-if="this.modify_state == 0">
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
  </div>
        
        <!-- <post-head/> -->
    </div>
    
</template>

<script>

// goto_modify = function(){
//       this.modify_state = 1;
//                     this.nput_username = this.username;
//                     this.input_sex = this.sex;
//                     this.input_phone_num = this.phone_num;
//                     this.input_email = this.email;
//                     this.input_school = this.school;
//                     this.input_city = this.city;
//                     this.input_address = this.address;
//                     this.input_password = '';
//                     this.input_password2 = '';
//     }

// import PostHead from "@/components/PostHead";
// import PostReply from "@/components/PostReply";
// import qs from "qs";
export default {
//   name: 'PersonCenter',
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
        ],
        modify_state:0,
        username:"ilinks",
        // sex: "OTHER",
        // phone_num: "18000000000",
        // email: "19374252@buaa.edu.cn",
        // school: "北京航空航天大学",
        // city: "北京市",
        // address: "北京市海淀区学院路37号",
        // user_status: "禁言中",
        // exp_now: 120, //当前经验值
        // exp_next_lv: 200, //下一等级经验值

        input_username:"",
        // input_sex:"",
        // input_phone_num:"",
        // input_email:"",
        // input_school:"",
        // input_city:"",
        // input_address:"",
        input_password:"",
        input_password2:""

    }
},
method:
{
    goto_view_ifo(){
        this.$router.replace('/viewifo');
    },

    // goto_modify(){
    //   this.modify_state = 1;
    //                 this.nput_username = this.username;
    //                 this.input_sex = this.sex;
    //                 this.input_phone_num = this.phone_num;
    //                 this.input_email = this.email;
    //                 this.input_school = this.school;
    //                 this.input_city = this.city;
    //                 this.input_address = this.address;
    //                 this.input_password = '';
    //                 this.input_password2 = '';
    // }

    // input_init(){
    //   this.input_username = this.username;
    // }

    // change_modify_state(){
    //   alert("test");
    //   if(this.modify_state == 0) this.modify_state = 1;
    //   else this.modify_state = 0;
    // },
    // change_modify_state(){
    //   this.modify_state = 1;
    // }
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