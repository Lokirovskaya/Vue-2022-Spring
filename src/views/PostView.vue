<template>
  <div class="Post">
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
  components:{PostHead,PostReply},
}
</script>
