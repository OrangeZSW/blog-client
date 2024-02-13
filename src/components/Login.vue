<script>

export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    }
  },
  methods: {
  },

}
</script>

<template>
  <div ref="loginWindow" class="login"  >
    <span class="title">登录</span>
    <el-form :model="user" >
      <el-form-item>
        <el-input ref="username"  prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-lock" placeholder="请输入密码"  v-model="user.password" show-password></el-input>
      </el-form-item>
      <div>
        <el-button style="margin-top: 20px" >登录</el-button>
        <el-button style="float: right;margin-top: 20px" >注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.title{
  font-size: 30px;
  font-weight: bold;
  margin: 40px auto 50px 30px;
  display: flex;
  color: white;
  z-index: 0;
}
.login{
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 0;
  position: absolute;
  border-radius: 10px;
  right: 500px;

  opacity: 0;
  filter: contrast(1.2);
  transition: all 1s ease;
}
@media (min-width: 768px) {
  .login{
    top: 200px;
  }
}
@media (max-width: 768px) {
  .login{
    top: 107px;
  }
}
</style>
