<template>
  <div class="Post">
    <h2>这个帖子的 id 是 {{this.$route.query.id}}</h2>
    <PostHead></PostHead>
    <br>
    <PostReply></PostReply>
    <br>
    <PostReply></PostReply>
  </div>
</template>
<script>
  import PostHead from "@/components/PostHead";
  import PostReply from "@/components/PostReply";
  export default {
    name: 'PostView',
    components: { PostHead, PostReply },
  }
</script>