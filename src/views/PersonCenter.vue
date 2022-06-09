<template>
  <ForumBorder>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-link :underline="false" type="info" @click="go_back">用户中心</el-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>

      <div v-if="this.$store.state.login_state == 0" class="login">
        <h1>请登录</h1>

      </div>
      <div>

        <div v-if="this.modify_state === 0">
          <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">

            <div v-if="is_visit_self === 0" style="margin-left: auto;">
              <el-button style="position:relative;left:-10px;" @click="                
                modify_state = 1;
                input_username = username;
                input_password = '';
                input_password2 = '';
                ">
                修改信息
              </el-button>
            </div>


            <img :src="'http://43.138.55.69'+url_now" class="avatar">

            <div style="font-size: 25px; margin: 5px;">{{username}}</div>

            <el-descriptions border style="margin: 15px;">
              <el-descriptions-item label="等级">Lv{{level}}</el-descriptions-item>
              <el-descriptions-item label="经验值">{{exp_now}}</el-descriptions-item>
            </el-descriptions>

          </div>
        </div>

        <div v-else>
          <div style="display: flex; justify-items: center; align-items: center; flex-direction: column;">

            <div v-if="is_visit_self === 0" style="margin-left: auto;">
              <el-button style="position:relative;left:-10px;" @click="                
                modify_state = 0;
                input_username = username;
                input_password = '';
                input_password2 = '';
                ">
                返回
              </el-button>
            </div>

            <el-upload class="avatar-uploader" action="" :http-request="upload_file" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" :limit="1" :auto-upload="true">
              <img v-if="url_upload" :src="'http://43.138.55.69'+url_upload" class="avatar">
              <img v_else :src="'http://43.138.55.69'+url_now" class="avatar">
            </el-upload>
            <div>点击上方修改头像</div>

            <el-divider></el-divider>

            <div style="margin: 10px;">
              <div>修改用户名</div>
              <el-input placeholder="输入新用户名" v-model="input_username" style="margin: 5px;" clearable
                ></el-input>
              <br />
              <el-button size="small" @click="goto_modify">提交</el-button>
            </div>

            <div style="margin: 10px;">
              <div>修改密码</div>
              <el-input placeholder="输入新密码" v-model="input_password" style="margin: 5px;" clearable show-password>
              </el-input>
              <br />
              <el-input placeholder="确认密码" v-model="input_password2" style="margin: 5px;" clearable show-password>
              </el-input>
              <br />
              <el-button size="small" @click="modify_pwd">修改密码</el-button>
            </div>
          </div>
        </div>

        <!-- <el-menu-item index="/PersonCenter" style="position: relative;left:950px;"><el-link><router-link to="/modifyifo">修改个人资料</router-link></el-link></el-menu-item> -->
        <!-- <el-link :underline="false" style="position: relative;right:2px;bottom:-19px" @click="goto_login">编辑资料</el-link> -->


        <div v-if="this.modify_state === 0" style="display: flex; align-items: center; flex-direction: column;">
          <el-menu mode="horizontal" style="width: 95%;">

            <el-collapse v-model="activeNames" @change="handleChange">

              <el-collapse-item title="我的帖子" name="1">

                <el-table :data="posting_data" stripe="true" align="left">

                  <el-table-column label="标题" min-width="70%">
                    <template slot-scope="scope">
                      <router-link style="color:black" :to="{path:'/post', query:{id:scope.row.posting_id}}">
                        <div class="art-title">
                          <el-link>{{scope.row.title}}</el-link>
                        </div>
                      </router-link>
                    </template>
                  </el-table-column>

                  <!-- <el-button>123</el-button> -->

                    <el-table-column min-width="10%">
                    <template >
                      <el-button round type="text" @click="DelPost(posting.row.posting_id)">
                      <div style="width: 15px; height: 15px">删除</div>
                      </el-button>
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
                      <div class="art-date">{{scope.row.time}}</div>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- <el-button>a</el-button> -->
              </el-collapse-item>

              <el-collapse-item title="近期评论" name="3">

                <el-table :data="reply_data" stripe="true" align="left">

                  <el-table-column label="评论内容" min-width="70%">

                    <template slot-scope="scope">
                      <router-link style="color:black" :to="{path:'/post', query:{id:scope.row.posting_id_id}}">
                        <div class="art-title">
                          <el-link v-html="scope.row.content"></el-link>
                        </div>
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
        <!-- <el-button @click="test1()" round>测试</el-button> -->

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
    data() {
      return {
        modify_state: 0,
        username: this.$store.state.username,
        exp_now: undefined, //当前经验值
        exp_next_lv: undefined, //下一等级经验值
        level: undefined,
        input_username: undefined,
        input_password: undefined,
        input_password2: undefined,
        is_visit_self: 0, //0：访问自己主页
        url_upload: undefined,
        url_now: undefined,
        posting_data: [],
        reply_data: [],

      }
    },
    methods:
    {
      DelPost(id){
        // alert('id:'+id);
      this.$confirm('此操作将删除该帖, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.post('/user/delete_posting', qs.stringify({posting_id:id}), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
            .then(res => {
              if (res.data.errno === 0) {
                this.$message.success(res.data.msg);
              }
              else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });

        // this.$router.replace('/');
      }).catch(() => {

      });
    },

      go_back() {
        this.modify_state = 0;
      },

      getSimpleText(html) {
        var re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        var msg = html.replace(re1, '');//执行替换成空字符
        return msg;
      },

      goto_modify() {
        let user_ifo = {
          username: this.input_username,
        };
        this.$axios.post('/user/modify_username', qs.stringify(user_ifo), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.username = this.input_username; //更新页面变量
              this.$store.state.username = this.input_username; //更新全局变量
              this.$store.state.token = res.data.authorization; //更新token
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
      init_view() {
        console.log('run init_view');
        console.log(this.$store.state.username);
        console.log(this.$route.query.user);
        // this.username = this.$store.state.username;
        if (this.$route.query.user != this.$store.state.username) //如果是访问其他人的主页
        {
          this.is_visit_self = 1;
          this.$axios.post('/user/other_space', qs.stringify({ other_name: this.$route.query.user }), {
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
          this.$axios.post('/user/space', qs.stringify(), {
            headers: {
              username: this.$store.state.username,
              token: this.$store.state.token,
            }
          })
            .then(res => {
              if (res.data.errno === 0) {
                this.url_now = res.data.user_photo;
                // this.url_now = require(res.data.user_photo);
                console.log('1:' + this.url_now);
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
        console.log('print:' + this.url_upload);
      },
      modify_pwd() {
        let password_ifo = {
          password_1: this.input_password,
          password_2: this.input_password2
        }
        if (this.input_password === '') {
          this.$message.error('密码不能为空！');
        }
        else if (this.input_password2 === '') {
          this.$message.error('请再次输入密码！');
        }
        // else if (this.input_password !== this.input_password2) {
        //   this.$message.error('两次输入的密码不一致！');
        // }
        else {
          // alert('success');
          this.$axios.post('/user/modify_password', qs.stringify(password_ifo),
            {
              headers: {
                username: this.$store.state.username,
                token: this.$store.state.token,
              }
            })
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
        my_axios.post('/user/modify_photo', { photo: e.file })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success('头像修改成功！');
              this.url_now = res.data.photo;
              this.url_upload = res.data.photo;
              this.$store.state.user_photo = res.data.photo;
              // this.file_id = res.data.file_id;
              // this.url_upload = res.data.url;
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
        console.log('imageurl:' + this.imageUrl);
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
    },
    watch: {//监听路由变量
      $route(to, from) {
        if (to.query.user !== from.query.user) {
          this.init_view();
        }
      },
    },
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
    width: 180px;
    height: 180px;
    border-radius: 20%;
    overflow: hidden;
    border: 1px solid #ddd;
  }

  .bigImg {
    display: block;
    width: 180px;
    height: 180px;
    border-radius: 15px;
  }

  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 15px;
    cursor: pointer;
    width: 180px;
    height: 180px;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 180px;
    border-radius: 15px;
    margin: 20px;
    line-height: 190px;
    text-align: center;
  }

  .avatar {
    width: 180px;
    height: 180px;
    border-radius: 15px;
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