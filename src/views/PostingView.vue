<template>
  <div class="posting">
    <TopIndex />
    这个帖子的 id 是 {{this.$route.query.id}}
    <PostHead />
    <br>
    <PostReply />
    <br>
    <PostReply />
  </div>
</template>
<script>
  import PostHead from "@/components/PostHead";
  import PostReply from "@/components/PostReply";
  import TopIndex from "@/components/TopIndex";
  export default {
    name: 'PostingView',
    components: { PostHead, PostReply, TopIndex },
  }
</script>