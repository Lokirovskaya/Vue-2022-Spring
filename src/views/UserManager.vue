<template>
  <border border-radius="10px">
    <el-table :data="tableData" stripe border align="center">
      <el-table-column prop="uid" label="UID" width="150"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="registerdate" label="注册日期" width="150"></el-table-column>
      <el-table-column prop="exp" label="积分" width="130"></el-table-column>
      <el-table-column prop="userstatus" label="用户状态" width="150"></el-table-column>
      <el-table-column label="操作" width="200">
        <template>
          <!-- 此处应有各种v-if -->
          <el-button type="danger" size="small">禁言</el-button>
          <el-button type="primary" size="small">设为管理员</el-button>
        </template>
      </el-table-column>
    </el-table>
  </border>
</template>


<script>
  export default {
    name: 'UserManager',
    data() {
      return {
        tableData: [{
          uid: '20020212',
          username: 'xyy',
          email: '20373744@buaa.edu.cn',
          registerdate: '20020212',
          exp: '114514',
          userstatus: 'dog'
        },
        {
          uid: '1232456',
          username: '???',
          email: '百京',
          registerdate: '西城区',
          exp: 'infinity',
          userstatus: 'unknown'
        },
        ]
      }
    }
  }
</script>