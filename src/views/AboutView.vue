<template>
  <div class="about">
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
