<template>
    <div>

    <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" router="true">
            <el-menu-item style="width:60px"><el-image style="width: 40px; height: 40px"  src="../assets/el-icon-defaultPhoto.png" :preview-src-list="srcList"></el-image></el-menu-item>
            <el-menu-item  index="/PersonCenter">团长你就是歌姬</el-menu-item>
        <el-link :underline="false" style="position: relative;left:-600px;bottom:-17px;"><font size = "3">Lv4</font></el-link>
</el-menu>
<br/>

    <el-descriptions title="用户信息" :column="3" :size="size" border style="position: relative;">
        
        <template slot="extra">
            <el-button size="small" style="position: relative;left:-1170px;">修改头像</el-button>
      <el-button size="small"><router-link to="/viewifo">修改完成</router-link></el-button>
    </template>

    <el-descriptions-item label="用户名">{{this.$store.state.username}}&nbsp;&nbsp;
        <el-input placeholder="输入新用户名" v-model="input_username" clearable style="width:150px"></el-input>
        <el-button size="small" style="position: relative;left:20px;" v-on:click="modify_username" >修改</el-button>
    </el-descriptions-item>

    <el-descriptions-item label="性别">{{this.$store.state.sex}}&nbsp;&nbsp;
        <el-input placeholder="输入新性别" v-model="input_sex" clearable style="width:150px"></el-input>
        <el-button size="small" style="position: relative;left:20px;" v-on:click="modify_sex" >修改</el-button>
        </el-descriptions-item>
    
    <el-descriptions-item label="手机号">{{this.$store.state.phone_num}}&nbsp;&nbsp;
        <el-input placeholder="输入新手机号" v-model="input_phone_num" clearable style="width:150px"></el-input>
        <el-button size="small" style="position: relative;left:20px;" v-on:click="modify_phone_num">修改</el-button>
        </el-descriptions-item>
    
    <el-descriptions-item label="邮箱">{{this.$store.state.email}}&nbsp;&nbsp;
        <el-input placeholder="输入新邮箱" v-model="input_email" clearable style="width:150px"></el-input>
        <el-button size="small" style="position: relative;left:20px;" v-on:click="modify_email">修改</el-button>
        </el-descriptions-item>
    
    <el-descriptions-item label="学校">{{this.$store.state.school}}&nbsp;&nbsp;
        <el-input placeholder="输入新学校" v-model="input_school" clearable style="width:150px"></el-input>
        <el-button size="small" style="position: relative;left:20px;" v-on:click="modify_school">修改</el-button>
        </el-descriptions-item>
    
    <el-descriptions-item label="居住地">{{this.$store.state.city}}&nbsp;&nbsp;
        <el-input placeholder="输入新居住地" v-model="input_city" clearable style="width:150px"></el-input>
        <el-button size="small" style="position: relative;left:20px;" v-on:click="modify_city">修改</el-button>
        </el-descriptions-item>
    
    <el-descriptions-item label="联系地址">{{this.$store.state.address}}&nbsp;&nbsp;
        <el-input placeholder="输入新地址" v-model="input_address" clearable style="width:150px"></el-input>
        <el-button size="small" style="position: relative;left:20px;" v-on:click="modify_address">修改</el-button>
        </el-descriptions-item>
    
    <el-descriptions-item label="用户状态">{{this.$store.state.user_status}}</el-descriptions-item>

</el-descriptions>
<br/>
<!-- <el-button size="small" style="position: relative;left:-620px;">修改头像</el-button><br/> -->
<div style="position: relative;left:-500px;">
<el-input placeholder="输入新密码" v-model="input_password" clearable style="width:150px; position: relative;left:0px;"></el-input>
<!-- <br/><br/> -->
<el-input placeholder="确认密码" v-model="input_password2" clearable style="width:150px; position: relative;left:20px;"></el-input>
<el-button size="small" style="position: relative;left:40px;">修改密码</el-button>
</div>
<br/>

    </div>
</template>

<script>

// import viewifo from './ViewIfo.vue'
export default {
    name: 'ViewIfo',

data(){
    return{
        flag: "true",
        input_username:"",
        input_sex:"",
        input_phone_num:"",
        input_email:"",
        input_school:"",
        input_city:"",
        input_address:"",
        input_password:"",
        input_password2:""

        // username: viewifo.data.username,
        // username: "iL1nks",
        // sex: "男",
        // sex: viewifo.data.sex,
        // phone_num: "18000000000",
        // email: "19374252@buaa.edu.cn",
        // school: "北京航空航天大学",
        // city: "北京市",
        // address: "北京市海淀区学院路37号",
        // user_status: "禁言中"

    }
},
methods:{
    modify_username(){
        this.$store.state.username = this.input_username;
    },
    modify_sex(){
        if (this.input_sex != "男" && this.input_sex != "女" && this.input_sex != "OTHER") alert("仅可输入“男”、“女”、“OTHER”");
        else this.$store.state.sex = this.input_sex;
    },
    modify_phone_num(){
        if (this.input_phone_num.length != 11) alert("请输入有效的11位手机号");
        else this.$store.state.phone_num = this.input_phone_num;
    },
    modify_email(){
        this.$store.state.email = this.input_email;
    },
    modify_school(){
        this.$store.state.school = this.input_school;
    },
    modify_city(){
        this.$store.state.city = this.input_city;
    },
    modify_address(){
        this.$store.state.address = this.input_address;
    },


}

}
</script>
