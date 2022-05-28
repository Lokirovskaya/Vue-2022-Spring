<template>
  <div>
    你正在往板块 {{sector_info[this.$route.query.name].name}} 发帖<br />
    请使用 Markdown 格式

    <MarkdownEditor ref="MarkdownEditor"></MarkdownEditor>

    <el-button type="primary" @click="submit()">提交</el-button> <br />
    {{input_html}} <br />
    {{input_markdown}}
  </div>
</template>

<script>
  import MarkdownEditor from "@/components/MarkdownEditor";
  export default {
    name: 'NewPostView',
    components: { MarkdownEditor },
    data() {
      return {
        sector_info: {
          'discussion': { name: '讨论区', id: 1 },
          'recommendation': { name: '课程推荐', id: 2 },
          'exercise': { name: '刷题板块', id: 3 },
          'campus': { name: '校园周边', id: 4 },
          'resource': { name: '资源共享', id: 5 },
        },
        input_html: '',
        input_markdown: '',
      }
    },
    methods: {
      submit() {
        this.input_html = this.$refs.MarkdownEditor.html;
        this.input_markdown = this.$refs.MarkdownEditor.content;
      }
    }
  }
</script>