<template>
  <div>
    <mavon-editor v-model="content" placeholder="在这里输入 Markdown 代码，在右侧实时展示效果~" :autofocus="false" ref="md"
      @change="change" style="min-height: 600px" />


  </div>
</template>



<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "MarkdownEditor",
    // 注册
    components: {
      mavonEditor,
    },
    data() {
      return {
        content: '', // 输入的markdown
        html: '',    // 及时转的html
      }
    },
    methods: {
      // 所有操作都会被解析重新渲染
      change(value, render) {
        // render 为 markdown 解析后的结果[html]
        this.html = render;
      },
      // 提交
      submit() {
        console.log(this.html);
      }
    },
    mounted() {

    }
  }
</script>