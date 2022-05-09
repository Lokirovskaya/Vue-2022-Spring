<template>
  <div class="about">
    <h1>This is an about page</h1>
    <PostHead/>
    <br>
    <PostReply/>
    <br>
    <PostReply/>
  </div>
</template>
<script>
import PostHead from "@/components/PostHead";
import PostReply from "@/components/PostReply";
export default {
  name: 'AboutView',
  components:{PostHead,PostReply},
}
</script>
