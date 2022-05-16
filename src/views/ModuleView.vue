<template>
  <el-container width="80%">
    <el-header>
      {{modulename[this.$route.name]}}<br />
      多个模块可以用同一个.vue
    </el-header>
    <el-main line-height="200px">
      main a
    </el-main>
    <el-main height="500px">
      main b
    </el-main>
  </el-container>
</template>


<script>
  export default {
    name: 'ModuleView',
    data() {
      return {
        modulename: { // 一个 $route.name 到显示给用户的名字的字典
          'module-a': '模块A是我的名字',
          'module-b': '模块B是我的名字',
        },
        tableData: [{
          uid: '20020212',
          username: 'xyy',
          email: '北京',
          registerdate: '海淀区',
          exp: 'buaa',
          userstatus: 'dada'
        },
        {
          uid: '20020212',
          username: 'xyy',
          email: '北京',
          registerdate: '海淀区',
          exp: 'buaa',
          userstatus: 'dada'
        },
        {
          uid: '20020212',
          username: 'xyy',
          email: '北京',
          registerdate: '海淀区',
          exp: 'buaa',
          userstatus: 'dada'
        }]
      }
    }
  }
</script>