<template>
    <div>

<el-menu :default-active="1" class="el-menu-demo" mode="horizontal" router="true">
            <el-menu-item style="width:60px"><el-image style="width: 40px; height: 40px"  src="../assets/el-icon-defaultPhoto.png" :preview-src-list="srcList"></el-image></el-menu-item>
        <!-- <el-avatar style="position: relative;bottom: -13.5px" shape="square" :size="35" v-bind:src="User.pho" ></el-avatar> -->
            <el-menu-item  index="/PersonCenter">团长你就是歌姬</el-menu-item>
        <el-link :underline="false" style="position: relative;left:-600px;bottom:-17px;"><font size = "3">Lv4</font></el-link>
</el-menu>
<br/>
    <el-descriptions title="用户信息" :column="3" :size="size" border style="position: relative;">
        <template slot="extra">
      <el-button size="small"><router-link to="/modifyifo">修改信息</router-link></el-button>
    </template>
    <el-descriptions-item label="用户名">{{this.$store.state.username}}</el-descriptions-item>
    <el-descriptions-item label="性别">{{this.$store.state.sex}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{this.$store.state.phone_num}}</el-descriptions-item>
    <el-descriptions-item label="邮箱">{{this.$store.state.email}}</el-descriptions-item>
    <el-descriptions-item label="学校">{{this.$store.state.school}}</el-descriptions-item>
    <el-descriptions-item label="居住地">{{this.$store.state.city}}</el-descriptions-item>
    <el-descriptions-item label="联系地址">{{this.$store.state.address}}</el-descriptions-item>
    <el-descriptions-item label="经验值">{{this.$store.state.exp_now}}/{{this.$store.state.exp_next_lv}}</el-descriptions-item>
    <el-descriptions-item label="用户状态">{{this.$store.state.user_status}}</el-descriptions-item>
</el-descriptions>
    </div>
</template>

<script>

export default {
    name: 'ViewIfo',

data(){
    return{
        // username: "iL1nks",
        // sex: "男",
        // phone_num: "18000000000",
        // email: "19374252@buaa.edu.cn",
        // school: "北京航空航天大学",
        // city: "北京市",
        // address: "北京市海淀区学院路37号",
        // user_status: "禁言中"

    }
}

}
</script>
