<template>
  <div class="Post">
    <PostHead :posting_title="posting_title"
              :posting_time="posting_time"
              :user_id="user_id"
              :username="username"
              :content="content"
              :like_count="like_count"
              :authority="authority"
              :resource="resource"
              :like="like"></PostHead>
    <h2>这个帖子的 id 是 {{this.$route.query.id}}</h2>
    <br>
    <div v-for="item in O_replys" :key="item.reply_id">
    <PostReply
        :username="item.username"
        :content="item.content"
        :like_count="item.like_count"
        :reply_count="item.reply_count"
        :time="item.time"
        :like="item.like"
        :replys="item.replys"></PostReply>
      <br>
    </div>
    <MarkdownEditor></MarkdownEditor>
  </div>
</template>
<script>
import PostHead from "@/components/PostHead";
import PostReply from "@/components/PostReply";
import MarkdownEditor from "@/components/MarkdownEditor";
export default {
  name: 'PostView',
  components:{PostHead,PostReply,MarkdownEditor},
  data(){
    return{
      posting_title: '你是一个一个一个美食家', // 帖子标题
      posting_time: '2022-04-15 14:36', // 发布时间
      user_id: 1, // 发布用户ID
      username: '我修院', // 用户名
      User_Level: 2,  //用户等级
      content:'异常的新鲜,异常的美味', // 帖子正文内容
      like_count: 114514, // 帖子点赞数
      authority: 0, // 帖子权限
      resource: '学习资料', // 帖子资源名称
      reply_count: 3, // 总楼层数
      like: false, // 用户是否给该帖子点赞（布尔型）
      O_replys:[
        {
          reply_id: 1, // 楼层的ID
          user_id: 2, // 楼层的用户ID
          username: '德川', // 用户名
          content: '嗯!嘛!啊!鸭蛋莫鸭蛋, 牡蛎莫牡蛎', // 楼层的内容
          like_count: 1919, // 楼层的点赞数
          reply_count: 3, // 楼层的回复数
          time: '2022-04-15 15:55', // 楼层发布时间
          like: false, // 用户是否给该帖子点赞（布尔型）
          replys: [   //楼层的所有回复,包括楼中楼
            {
              reply_id: 1, //回复的ID
              user_id: 3, //回复的用户ID
              username: '淳平', //用户名
              content: '人类有三大欲',  //回复的内容
              like_count: 810,  //回复的点赞数
              time: '2022-04-15 15:59', //回复时间
              judge: 2, //回复类型（2-对楼层的回复 3-对楼层中回复的回复）
              like: false, //用户是否给该回复点赞
              reply_to: '' //只有judge=3才有此字段,为其所回复的用户名
            },
            {
              reply_id: 2, //回复的ID
              user_id: 4, //回复的用户ID
              username: '李田所', //用户名
              content: '依已死,吾亦逝',  //回复的内容
              like_count: 3,  //回复的点赞数
              time: '2022-04-15 16:29', //回复时间
              judge: 3, //回复类型（2-对楼层的回复 3-对楼层中回复的回复）
              like: false, //用户是否给该回复点赞
              reply_to: '淳平' //只有judge=3才有此字段,为其所回复的用户名
            },
            {
              reply_id: 3, //回复的ID
              user_id: 5, //回复的用户ID
              username: '张三', //用户名
              content: '哇哇哇哇,上大分了,happy!!!!!!!!!!',  //回复的内容
              like_count: 34,  //回复的点赞数
              time: '2022-04-15 16:29', //回复时间
              judge: 2, //回复类型（2-对楼层的回复 3-对楼层中回复的回复）
              like: false, //用户是否给该回复点赞
              reply_to: '' //只有judge=3才有此字段,为其所回复的用户名
            }
          ]
        },
        {
          reply_id: 2, // 楼层的ID
          user_id: 6, // 楼层的用户ID
          username: 'Jay 臭', // 用户名
          content: '嗯!嘛!啊!鸭蛋莫鸭蛋, 牡蛎莫牡蛎11111', // 楼层的内容
          like_count: 1910, // 楼层的点赞数
          reply_count: 2, // 楼层的回复数
          time: '2022-04-15 16:55', // 楼层发布时间
          like: false, // 用户是否给该帖子点赞（布尔型）
          replys: [   //楼层的所有回复,包括楼中楼
            {
              reply_id: 1, //回复的ID
              user_id: 7, //回复的用户ID
              username: '李四', //用户名
              content: '关注永雏塔菲喵,关注永雏塔菲谢谢喵',  //回复的内容
              like_count: 80,  //回复的点赞数
              time: '2022-04-15 16:59', //回复时间
              judge: 2, //回复类型（2-对楼层的回复 3-对楼层中回复的回复）
              like: false, //用户是否给该回复点赞
              reply_to: '' //只有judge=3才有此字段,为其所回复的用户名
            },
            {
              reply_id: 2, //回复的ID
              user_id: 8, //回复的用户ID
              username: '除草剂', //用户名
              content: 'gn show show way',  //回复的内容
              like_count: 3,  //回复的点赞数
              time: '2022-04-15 17:29', //回复时间
              judge: 3, //回复类型（2-对楼层的回复 3-对楼层中回复的回复）
              like: false, //用户是否给该回复点赞
              reply_to: '李四' //只有judge=3才有此字段,为其所回复的用户名
            }
          ]
        },
        {
          reply_id: 3, // 楼层的ID
          user_id: 9, // 楼层的用户ID
          username: '嘉心糖', // 用户名
          content: '嘉然,我真的好喜欢你啊,为了你,我要听猫中毒', // 楼层的内容
          like_count: 456, // 楼层的点赞数
          reply_count: 1, // 楼层的回复数
          time: '2022-04-16 10:55', // 楼层发布时间
          like: false, // 用户是否给该帖子点赞（布尔型）
          replys: [   //楼层的所有回复,包括楼中楼
            {
              reply_id: 1, //回复的ID
              user_id: 10, //回复的用户ID
              username: 'V87', //用户名
              content: '呃呃,嘉心糖就是这样的',  //回复的内容
              like_count: 5,  //回复的点赞数
              time: '2022-04-15 15:59', //回复时间
              judge: 2, //回复类型（2-对楼层的回复 3-对楼层中回复的回复）
              like: false, //用户是否给该回复点赞
              reply_to: '' //只有judge=3才有此字段,为其所回复的用户名
            }
          ]
        }
      ]
    }
  }
}
</script>
