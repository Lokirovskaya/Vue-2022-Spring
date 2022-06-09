<template>
  <ForumBorder>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div v-if="this.$store.state.login_state == 0" class="login">
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
        <div v-if="this.modify_state == 0">
          <br />
          <el-descriptions title="用户信息" :column="3" :size="size" border style="position: relative;">
            <template slot="extra">

              <!-- <el-button size="small" v-on="this.commit('change_modify_state')"> -->
              <!-- <el-button size="small" @click="change_modify_state()"> -->
              <div v-if="is_visit_self === 0">
                <el-button style="position:relative;left:-10px;" size="small" @click="
                    //alert('123');
                    //console.log('123'); 
                           modify_state = 1;
                           //console.log('123'); 
                      input_username = username;
                     //input_sex = sex;
                     //input_phone_num = phone_num;
                     //input_email = email;
                     //input_school = school;
                     //input_city = city;
                     //input_address = address;
                     input_password = '';
                     input_password2 = '';
                    ">
                  修改信息
                </el-button>
              </div>

            </template>
            <el-descriptions-item label="用户名">{{username}}</el-descriptions-item>
            <!-- <el-descriptions-item label="性别">{{sex}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="手机号">{{phone_num}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="邮箱">{{email}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="学校">{{school}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="居住地">{{city}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="联系地址">{{address}}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="等级">lv{{level}} ( {{exp_now}}/{{exp_next_lv}} )</el-descriptions-item> -->
            <el-descriptions-item label="等级">lv{{level}}</el-descriptions-item>
            <el-descriptions-item label="经验值">{{exp_now}}</el-descriptions-item>
            <!-- <el-descriptions-item label="用户状态">{{user_status}}</el-descriptions-item> -->
          </el-descriptions>
          <br />
        </div>

        <div v-else>
          <br />
          <el-descriptions title="用户头像" :column="3" :size="size" border style="position: relative;">

            <template slot="extra">

              <!-- 上传并预览头像 -->
              <!-- 支持jpg、jpeg、png、heic等 -->
              <!-- <div class="alert-box-item" style="position: relative;left:-370px;top:15px;">  -->
              <!-- <div class="bigImg-div" @click="toGetImg"> -->
              <!-- <img class="bigImg" :src=url_upload v-if="url_upload"> -->


              <!-- <img class="bigImg" :src="url_upload" v-if="url_upload"> -->
              <!-- <img class="bigImg" :src="url_now" v-else> -->
              <!-- <img class="bigImg" src=".././assets/666.png" v-else> -->
              <!-- <div v-else style="position: relative;top:19px;">上传头像</div> -->
              <!-- </div> -->
              <!-- </div> -->

              <el-upload style="position: relative; left:-970px; top:20px" class="avatar-uploader" action=""
                :http-request="upload_file" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                :limit="1" :auto-upload="true">
                <div style="position: relative;left:0px">
                  <img v-if="url_upload" :src="'http://43.138.55.69'+url_upload" class="avatar">
                  <img v_else :src="'http://43.138.55.69'+url_now" class="avatar">
                  <!-- <div v-else style="position: relative;top:19px;">上传头像</div> -->
                  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                </div>
              </el-upload>

              <!-- <el-button size="small" style="position: relative;left:-1070px;top:-25px;">上传头像</el-button> -->
              <!-- <el-button size="small"><router-link to="/viewifo">修改完成</router-link></el-button> -->

              <el-button size="small" style="position: relative;left:-20px;top:-28px;" @click="goto_modify">
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

          <br />
          <div style="position: relative;left:-330px;">
            修改密码：
            <el-input placeholder="输入新密码" v-model="input_password" clearable
              style="width:150px; position: relative;left:0px;" show-password></el-input>
            <!-- <br/><br/> -->
            <el-input placeholder="确认密码" v-model="input_password2" clearable
              style="width:150px; position: relative;left:20px;" show-password></el-input>
            <el-button size="small" style="position: relative;left:40px;" @click="modify_pwd">修改密码</el-button>
          </div>
          <br />
        </div>

        <!-- <el-menu-item index="/PersonCenter" style="position: relative;left:950px;"><el-link><router-link to="/modifyifo">修改个人资料</router-link></el-link></el-menu-item> -->
        <!-- <el-link :underline="false" style="position: relative;right:2px;bottom:-19px" @click="goto_login">编辑资料</el-link> -->


        <div v-if="this.modify_state == 0">
          <el-menu mode="horizontal">

            <el-collapse v-model="activeNames" @change="handleChange">

              <el-collapse-item title="我的帖子" name="1">

                <el-table :data="posting_data" stripe="true" align="left">
                  <el-table-column label="标题" min-width="70%">

                    <!-- <template slot-scope="scope">
                <router-link style="color:black" :to="{path:'/post', query:{id:scope.row.posting_id}}">
                <div class="art-title"><e-link>{{scope.row.title}}</e-link></div>
                </router-link>
              </template> -->

                    <template slot-scope="scope">
                      <router-link style="color:black" :to="{path:'/post', query:{id:scope.row.posting_id}}">
                        <div class="art-title">
                          <el-link>{{scope.row.title}}</el-link>
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

                  <!-- <el-table-column label="板块" min-width="15%">

              <template slot-scope="scope">
                <div class="art-author"><u>{{scope.row.author}}</u></div>
              </template>

            </el-table-column>

            <el-table-column label="发表日期" min-width="15%">

              <template slot-scope="scope">
                <div class="art-date">{{scope.row.date}}</div>
              </template>

            </el-table-column> -->
                </el-table>

                <!-- <el-table :data="posting_data" stripe align="left">

          <el-table-column min-width="5%"></el-table-column>

          <el-table-column label="标题" min-width="45%">
            <template slot-scope="scope">
              <router-link :to="{path:'post', query:{id:scope.row.posting_id}}">
                <el-link id="art-title1">
                  {{scope.row.posting_title}}
                </el-link>
              </router-link>
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

          <el-table-column label="最近回复" min-width="18%">
            <template slot-scope="scope">
              <div class="art-date">{{scope.row.recent_comment_time}}</div>
            </template>
          </el-table-column>

          <el-table-column label="发表日期" min-width="18%">
            <template slot-scope="scope">
              <div class="art-date">{{scope.row.posting_time}}</div>
            </template>
          </el-table-column>

        </el-table> -->

              </el-collapse-item>

              <!-- <el-collapse-item title="近期点赞" name="2">
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
            </el-collapse-item> -->

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

                  <!-- <el-table-column min-width="8%">
            <template slot-scope="scope">
              <div class="el-icon-view" style="width: 15px; height: 15px"></div>
              {{scope.row.click_count}}
            </template>
          </el-table-column> -->

                  <el-table-column label="获赞" min-width="8%">
                    <template slot-scope="scope">
                      <img src="../assets/el-icon-like.png" style="width: 15px; height: 15px" />
                      {{scope.row.like_count}}
                    </template>
                  </el-table-column>

                  <!-- <el-table-column min-width="8%">
            <template slot-scope="scope">
              <img src="../assets/comment.png" style="width: 15px; height: 15px" />
              {{scope.row.comment_count}}
            </template>
          </el-table-column> -->

                  <!-- <el-table-column label="最近回复" min-width="18%">
            <template slot-scope="scope">
              <div class="art-date">{{scope.row.recent_comment_time}}</div>
            </template>
          </el-table-column> -->

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

      <!-- <post-head/> -->


      <!-- <el-upload
  class="avatar-uploader" action="" :http-request="upload_file" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :limit="1" :auto-upload="true">
  <img v-if="url_upload" :src="url_upload" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> -->

    </div>

  </ForumBorder>
</template>

<script>
  import ForumBorder from "@/components/ForumBorder";
  // import PostHead from "@/components/PostHead";
  // import PostReply from "@/components/PostReply";
  // let inputElement = null
  import qs from "qs";
  export default {
    components: { ForumBorder },
    name: 'PersonCenter',
    //   components:{PostHead,PostReply},
    // components:{PostHead},
    data() {
      return {
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
        modify_state: 0,
        username: this.$store.state.username,
        // sex: "OTHER",
        // phone_num: "18000000000",
        // email: "19374252@buaa.edu.cn",
        // school: "北京航空航天大学",
        // city: "北京市",
        // address: "北京市海淀区学院路37号",
        // user_status: "禁言中",
        exp_now: undefined, //当前经验值
        exp_next_lv: undefined, //下一等级经验值
        level: undefined,

        input_username: undefined,
        // input_sex:"",
        // input_phone_num:"",
        // input_email:"",
        // input_school:"",
        // input_city:"",
        // input_address:"",
        input_password: undefined,
        input_password2: undefined,
        is_visit_self: 0, //0：访问自己主页

        url_upload: undefined,
        // url_upload:".././assets/666.png",
        // url_upload:require('.././assets/logo.png'),
        url_now: undefined,

        posting_data: [],
        reply_data: [],

        // imageUrl: ''

        // fileList: [{name: '', url: ''}]

      }
    },
    methods:
    {
      // test1(){
      //   alert('1234');
      // },
      // goto_view_ifo(){
      //     this.$router.replace('/viewifo');
      // },


      getSimpleText(html) {
        var re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        var msg = html.replace(re1, '');//执行替换成空字符
        return msg;
      },

      goto_modify() {
        let user_ifo = {
          username: this.input_username,
          // reply_id:this.reply_id,
          // photo:this.url_upload
        };//数据打包
        // console.log(user_ifo);
        this.$axios.post('/user/modify_username', qs.stringify(user_ifo), {
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

      // toGetImg() {
      // 		if (inputElement === null) {
      // 		// 生成文件上传的控件
      // 			inputElement = document.createElement('input')
      // 			inputElement.setAttribute('type', 'file')
      // 			inputElement.style.display = 'none'

      // 			if (window.addEventListener) {
      // 				inputElement.addEventListener('change', this.uploadFile, false)
      // 			} else {
      // 				inputElement.attachEvent('onchange', this.uploadFile)
      // 			}

      // 			document.body.appendChild(inputElement)
      // 		}
      // 		inputElement.click()
      //     // console.log('print:');
      //     // console.log(this.url_upload);

      // 	},


      upload_file(e) {

        // const reader = new FileReader(); // 创建读取文件对象
        // reader.readAsDataURL(e.target.files[0]); // 发起异步请求，读取文件
        // reader.onload = function() { // 文件读取完成后
        // 	// 读取完成后，将结果赋值给img的src
        // 	this.url_upload = this.result;
        // }

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


      // uploadFile(el) {
      //   console.log('upload')
      //   const files = el.target.files[0]
      // 	if (el && el.target && el.target.files && el.target.files.length > 0) {
      // 		console.log(el)
      // 		// const files = el.target.files[0]
      // 		const isLt2M = files.size / 1024 / 1024 < 2
      // 		const size = files.size / 1024 / 1024
      // 		console.log(size)
      //     // console.log('here')
      // 		// 判断上传文件的大小
      // 		if (!isLt2M) {
      // 			this.$message.error('上传头像图片大小不能超过 2MB!')
      // 		} else if (files.type.indexOf('image') === -1) { //如果不是图片格式
      // 			// this.$dialog.toast({ mes: '请选择图片文件' });
      // 			this.$message.error('请选择图片文件');
      // 		} else {
      // 			const that = this;
      // 			const reader = new FileReader(); // 创建读取文件对象
      // 			reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
      // 			reader.onload = function() { // 文件读取完成后
      // 				// 读取完成后，将结果赋值给img的src
      // 				that.imageUrl = this.result;
      // 				console.log(this.result);
      // 				// 数据传到后台
      // 			const formData = new FormData()
      // 			formData.append('file', files); // 可以传到后台的数据
      // 			};
      // 		}
      //   }
      // 	// },
      //   let formData = new FormData();
      //   formData.append('photo', files); // in_file 改成对应的后端的名字

      //   let my_axios = this.$axios.create({
      //     withCredentials: true,
      //     headers: {
      //       username: this.$store.state.username,
      //       token: this.$store.state.token,
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   });

      //   my_axios.post('/posting/modify_photo', formData)
      //     .then(res => {
      //       if (res.data.errno === 0) {
      //         this.$message.success('成功！');
      //       }
      //       else {
      //         this.$message.error(res.data.msg);
      //       }
      //     })
      //     .catch(err => {
      //       this.$message.error(err);
      //     });
      // },

      // beforeDestroy() {
      //       if (inputElement) {
      //       if (window.addEventListener) {
      //         inputElement.removeEventListener('change', this.onGetLocalFile, false)
      //         } else {
      //         inputElement.detachEvent('onchange', this.onGetLocalFile)
      //         }
      //         document.body.removeChild(inputElement)
      //         inputElement = null
      //         console.log('========inputelement destroy')
      //       }
      //     },

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
        // if (isJPG && isLt2M) //为了实时显示头像
        // {
        //   const that = this;
        // 		const reader = new FileReader(); // 创建读取文件对象
        // 		reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
        // 		reader.onload = function() { // 文件读取完成后
        // 			// 读取完成后，将结果赋值给img的src
        // 			that.url_upload = this.result;
        //     }
        // }
        return isJPG && isLt2M;
      }

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