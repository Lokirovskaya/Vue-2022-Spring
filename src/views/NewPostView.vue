<template>
  <ForumBorder>
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

      <!-- <el-upload :on-preview="handlePreview" :limit="1" :file-list="file_list" :auto-upload="false">
        <el-button type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">选择附件以上传，大小不超过 20 MB</div>
      </el-upload> -->
      <!-- <input type="file" value="" id="file" @change="upload_file"> <br /> -->

      <el-button type="success" @click="publish()">发帖</el-button> <br />

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
        file_list: [],
      }
    },
    methods: {
      publish() {
        this.input_html = this.$refs.MarkdownEditor.html;
        let date = new Date();
        let now = date.toLocaleString();

        console.log(this.file_list);

        let post_data = {
          sector_name: this.$route.query.name,
          title: this.input_title,
          content: this.input_html,
          time: now,
          authority: this.input_authority,
          // in_file: this.file_list[0].url,
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
        let data = JSON.stringify({
          user: "username",
          env: "dev"
        });
        formData.append('file', e.target.files[0]);
        formData.append('data', data);   // 上传文件的同时， 也可以上传其他数据
        let url = this.$store.state.path + "api/tools/handle_upload_file";
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        };
        this.$axios.post(url, formData, config).then(function (response) {
          console.log(response.data)

        })
      }
    }
  }
</script>