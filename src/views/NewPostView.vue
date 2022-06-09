<template>
  <ForumBorder>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/sector', query:{name:this.$route.query.name}}">
        {{sector_chinese_name[this.$route.query.name]}}</el-breadcrumb-item>
      <el-breadcrumb-item>发新帖</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      你正在往板块 {{sector_chinese_name[this.$route.query.name]}} 发帖<br />
      请使用 Markdown 格式
      <el-input v-model="input_title" placeholder="标题"></el-input>
      <MarkdownEditor ref="MarkdownEditor"></MarkdownEditor><br />
      <div>
        请输入阅读权限：只有高于
        <el-input-number v-model="input_authority" :min="0" :max="10"></el-input-number>
        级的人才能查看本帖子
      </div>

      <el-upload action="" :http-request="upload_file" :limit="1" :auto-upload="true">
        <el-button type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">选择附件以上传，大小不超过 100 M</div>
      </el-upload>

      <el-button type="success" @click="publish">发帖</el-button> <br />

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
        };

        this.$axios.post('/posting/publish', qs.stringify(post_data), {
          headers: {
            username: this.$store.state.username,
            token: this.$store.state.token,
          }
        })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.success('发帖成功！');
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
            }
            else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    }
  }
</script>