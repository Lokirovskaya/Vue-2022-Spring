<template>
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
    <el-button type="primary" @click="publish()">发帖</el-button> <br />
    {{input_html}} <br />
    {{input_markdown}}
  </div>
</template>

<script>
  import qs from "qs";
  import MarkdownEditor from "@/components/MarkdownEditor";
  export default {
    name: 'NewPostView',
    components: { MarkdownEditor },
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
    }
  }
</script>