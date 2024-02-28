<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    }
  },
}
</script>

<template>
  <el-card class="register">
    <span class="title">注册</span>
    <el-form :model="user">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.register{
  position: fixed;
  left: 200px;
  top: 150px;
  width: 30em;
  height: 40em;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  display: flex;
  flex-direction: column;
}
</style>
