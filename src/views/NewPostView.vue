<template>
  <ForumBorder>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/sector', query:{name:this.$route.query.name}}">
        {{sector_chinese_name[this.$route.query.name]}}</el-breadcrumb-item>
      <el-breadcrumb-item>发新帖</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div>
        <el-input placeholder="请输入标题" v-model="input_title" size="medium" style="font-size: 18px;">
          <template slot="prepend">标题</template>
        </el-input>
      </div>

      <MarkdownEditor ref="MarkdownEditor"></MarkdownEditor><br />

      <div id="attribute">
        <div>
          <div>阅读权限</div>
          <el-input-number v-model="input_authority" :min="0" :max="10" size="medium"></el-input-number>
          <div id="note">查看本帖子的最小等级</div>
        </div>

        <div>
          <div>上传附件</div>
          <el-upload action="" :http-request="upload_file" :limit="1" :auto-upload="true" :before-remove="file_remove">
            <el-button type="primary">点击上传</el-button>
            <div id="note">选择附件上传，大小不超过 100 MB</div>
          </el-upload>
        </div>

        <div style="margin-left: auto; margin-top: auto; margin-bottom: auto;">
          <el-button type="success" @click="publish">发帖</el-button>
        </div>
      </div>
    </div>
  </ForumBorder>
</template>

<script>
  import qs from "qs";
  import MarkdownEditor from "@/components/MarkdownEditor";
  import ForumBorder from "@/components/ForumBorder";
  export default {
    name: 'NewPostView',
    components: { MarkdownEditor, ForumBorder },
    data() {
      return {
        sector_chinese_name: {
          'discussion': '讨论区',
          'recommendation': '课程推荐',
          'exercise': '刷题板块',
          'campus': '校园周边',
          'resource': '资源共享',
        },
        input_title: '',
        input_html: '',
        input_authority: 0,
        input_has_file: false,
        file_id: -1,
      }
    },

    methods: {
      publish() {
        this.input_html = this.$refs.MarkdownEditor.html;
        let date = new Date();
        let now = date.toLocaleString();

        let post_data = {
          sector_name: this.$route.query.name,
          title: this.input_title,
          content: this.input_html,
          time: now,
          authority: this.input_authority,
          file_id: this.file_id,
          has_file: this.input_has_file,
        };

        console.log(post_data);

        this.$axios.post('/posting/publish', qs.stringify(post_data), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              console.log(res.data);
              setTimeout(() => {
                this.$router.push({ path: '/sector', query: { name: this.$route.query.name } });
              }, 1000);
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
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

        my_axios.post('/posting/uploadFile', formData)
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success('附件上传成功！');
              this.file_id = res.data.file_id;
              this.input_has_file = true;
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

      file_remove() {
        this.input_has_file = false;
      }
    }
  }
</script>

<style scoped>
  #attribute {
    width: 98%;
    display: flex;
    padding: 15px;
  }

  #attribute>div {
    margin: 20px;
  }

  #attribute #note {
    font-size: 15px;
    color: gray;
  }
</style>