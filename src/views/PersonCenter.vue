<template>
<ForumBorder>

    <div>
        <div v-if="this.$store.state.login_state == 0" class="login">
    <div>{{this.$route.query.userid}}</div>
    <h1>请登录</h1>

  </div>
  <div>
            <div v-if = "this.modify_state == 0">
            <br/>
            <el-descriptions title="用户信息" :column="3" :size="size" border style="position: relative;">
            <template slot="extra">
                    <div v-if="is_visit_self === 0">
                    <el-button 
                    style="position:relative;left:-10px;"
                    size="small"
                    @click="
                      modify_state = 1;
                      input_username = username;
                      input_password = '';
                      input_password2 = '';
                    ">
                    修改信息
                    </el-button>
                    </div>

            </template>
            <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
            <el-descriptions-item label="等级">lv{{level}}</el-descriptions-item>
            <el-descriptions-item label="经验值">{{exp_now}}</el-descriptions-item>
        </el-descriptions>
        <br/>
            </div>

            <div v-else>
              <br/>
              <el-descriptions title="用户头像" :column="3" :size="size" border style="position: relative;">
        
        <template slot="extra">

<el-upload
  style="position: relative; left:-1600%; top:20px"
  class="avatar-uploader" action="" :http-request="upload_file" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :limit="1" :auto-upload="true">
  <div style="position: relative;left:left:-1600%;">
  <img v-if="url_upload" :src="'http://43.138.55.69'+url_upload" class="avatar">
  <img v_else :src="'http://43.138.55.69'+url_now" class="avatar">
  </div>
</el-upload>
      <el-button size="small" style="position: relative;left:-20px;top:-28px;"
      @click="goto_modify">
      提交
      </el-button>


    </template>

    <el-descriptions-item label="用户名">
        <el-input placeholder="输入新用户名" v-model="input_username" clearable style="width:150px"></el-input>
        <!-- <el-button size="small" style="position: relative;left:20px;" v-on:click="username = input_username" >修改</el-button> -->
    </el-descriptions-item>
</el-descriptions>

<br/>
<div style="position: relative;left:-330px;">
    修改密码：
<el-input placeholder="输入新密码" v-model="input_password" clearable style="width:150px; position: relative;left:0px;" show-password></el-input>
<!-- <br/><br/> -->
<el-input placeholder="确认密码" v-model="input_password2" clearable style="width:150px; position: relative;left:20px;" show-password></el-input>
<el-button size="small" style="position: relative;left:40px;" @click="modify_pwd">修改密码</el-button>
</div>
<br/>
            </div>

<div v-if="this.modify_state == 0">
        <el-menu mode="horizontal">

            <el-collapse v-model="activeNames" @change="handleChange">

            <el-collapse-item title="我的帖子" name="1">

          <el-table :data="posting_data" stripe="true" align="left">
            <el-table-column label="标题" min-width="70%">

              <template slot-scope="scope">
                <router-link style="color:black" :to="{path:'/post', query:{id:scope.row.posting_id}}">
                <div class="art-title"><el-link>{{scope.row.title}}</el-link></div>
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
              <div class="art-date">{{scope.row.time}}</div>
            </template>
          </el-table-column>

          </el-table>

            </el-collapse-item>

            <el-collapse-item title="近期评论" name="3">

          <el-table :data="reply_data" stripe="true" align="left">

        <el-table-column label="评论内容" min-width="70%"> 

              <template slot-scope="scope">
                <router-link style="color:black" :to="{path:'/post', query:{id:scope.row.posting_id_id}}">
                <div class="art-title"><el-link v-html="scope.row.content"></el-link></div>
                </router-link>
              </template>

            </el-table-column>

          <el-table-column label="获赞" min-width="8%">
            <template slot-scope="scope">
              <img src="../assets/el-icon-like.png" style="width: 15px; height: 15px" />
              {{scope.row.like_count}}
            </template>
          </el-table-column>

          <el-table-column label="评论时间" min-width="18%">
            <template slot-scope="scope">
              <div class="art-date">{{scope.row.time}}</div>
            </template>
          </el-table-column>

          </el-table>
            </el-collapse-item>


            </el-collapse>
            
        </el-menu>
</div>
  </div>
    </div>
    
</ForumBorder>
</template>

<script>
import ForumBorder from "@/components/ForumBorder";

import qs from "qs";
export default {
  components: { ForumBorder },
  name: 'PersonCenter',

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
        username:this.$store.state.username,
        exp_now: undefined, //当前经验值
        exp_next_lv: undefined, //下一等级经验值
        level:undefined,

        input_username:undefined,
        input_password:undefined,
        input_password2:undefined,
        is_visit_self:0, //0：访问自己主页

        url_upload: undefined,
        url_now:undefined,

        posting_data: [],
        reply_data: [],
    }
},
methods:
{
      getSimpleText(html){
      var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      var msg = html.replace(re1,'');//执行替换成空字符
      return msg;
      },

    goto_modify(){
    let user_ifo = {
        username:this.input_username,
      };
    this.$axios.post('/user/modify_username', qs.stringify(user_ifo),{
        headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
        }
      })
            .then(res => {
              if (res.data.errno === 0) {
                this.username = this.input_username; //更新页面变量
                this.$store.state.username = this.username; //更新全局变量
                // this.$store.token = res.data.token; //更新token
                this.$message.success(res.data.msg);
                this.modify_state = 0;
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => { 
              this.$message.error(err);
            });

    },

    init_view(){
      console.log('run init_view');
      console.log(this.$store.state.username);
      console.log(this.$route.query.user);
      // this.username = this.$store.state.username;
      if (this.$route.query.user != this.$store.state.username) //如果是访问其他人的主页
      {
        this.is_visit_self = 1;
          this.$axios.post('/user/other_space', qs.stringify({other_name:this.$route.query.user}),{
            // this.$axios.post('/user/space', qs.stringify(),{
        headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
        }
      })
      .then(res => {
              if (res.data.errno === 0) {
                this.url_now = res.data.user_photo;
                this.username = this.$route.query.user;
                this.level = res.data.user_level;
                this.exp_now = res.data.user_experience;
                this.posting_data = res.data.postings;
                this.reply_data = res.data.replys;
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => { 
              this.$message.error(err);
            });
            // console.log(this.url_now);
      }
      
      else //访问自己的主页
      {
        this.is_visit_self = 0;
        console.log('visit self');
          this.$axios.post('/user/space', qs.stringify(),{
        headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
        }
      })
      .then(res => {
              if (res.data.errno === 0) {
                this.url_now = res.data.user_photo;
                // this.url_now = require(res.data.user_photo);
                console.log('1:'+this.url_now);
                this.username = this.$store.state.username;
                // this.username = this.$route.query.user;
                this.level = res.data.user_level;
                this.exp_now = res.data.user_experience;
                this.posting_data = res.data.postings;
                this.reply_data = res.data.replys;
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => { 
              this.$message.error(err);
            });
            console.log(this.url_now);
      }
            console.log('print:'+this.url_upload);
    },

    modify_pwd(){
      let password_ifo = {
        password_1:this.input_password,
        password_2:this.input_password2
      }
        if (this.input_password === '') {
          this.$message.error('密码不能为空！');
        }
        else if (this.input_password2 === '') {
          this.$message.error('请再次输入密码！');
        }
        else {
          // alert('success');
          this.$axios.post('/user/modify_password', qs.stringify(password_ifo),
          {headers: {
          username: this.$store.state.username,
          token: this.$store.state.token,
            }})
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
                this.modify_state = 0;
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => { 
              this.$message.error(err);
            });
        }
    },
    
    upload_file(e) {

        let formData = new FormData();
        formData.append('in_file', e.file);

        let my_axios = this.$axios.create({
          withCredentials: true,
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
            'Content-Type': 'multipart/form-data'
          }
        });

        my_axios.post('/user/modify_photo', {photo:e.file})
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success('头像修改成功！');
              this.url_now = res.data.photo;
              this.url_upload = res.data.photo;
              this.$store.state.user_photo = res.data.photo;
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

        handleAvatarSuccess(res, file) {
          console.log('success');
          console.log('imageurl:'+this.imageUrl);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log('before');
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    },
    mounted: function () {
  // alert('页面一加载，就会弹出此窗口')
  this.init_view();
 }
};
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

	.alert-box-item {
		overflow: hidden;
	}

	.bigImg-div {
		width: 60px;
		height: 60px;
		border-radius: 20%;
		overflow: hidden;
		border: 1px solid #ddd;
	}

	.bigImg {
		display: block;
		width: 60px;
		height: 60px;
		border-radius: 20%;
	}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 60px;
    height: 60px;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 30px;
    height: 30px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }

    #art-title1 {
    font-size: 18px;
  }

  #art-author {
    font-size: 15px;
    margin-left: 20px;
    color: gray;
  }
</style>