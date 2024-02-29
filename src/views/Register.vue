<script>
import Header from "@/components/Global/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import Footer from "@/components/Global/Footer.vue";

export default {
  name: "Register",
  components: {Footer, PageHeader, Header},
  mounted() {
    console.log(this.$route.path)
  },
  data() {
    return {
      welcome: ' Welcome to wallhaven. The best is about to get better!',
      user: {}
    }
  }
}
</script>

<template>
    <div style="height: 100%;overflow: hidden;display: flex;flex-direction: column">
      <Header/>
      <div style="width: 100%;height: 100%;background-image:url('https://server.blog.zorange.online/files/download/9002793970924906b8830237a925701b.png');display: flex;justify-content: center;align-items: center">
        <div class="register-info">
          <img width="40px;" style="margin: 5px auto 5px auto"
               src="https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png" alt="Orange's_Blog">
          <h1 style="margin: 20px auto 40px auto;font-size: 25px;font-weight: 400">Orange's_Blog用户注册</h1>
          <el-form :model="user" ref="user" label-width="auto" style="width: 100%">
            <el-form-item label="*昵称" prop="username">
              <el-input v-model="user.username" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="*密码" prop="password">
              <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="*确认密码" prop="checkPass">
              <el-input type="password" v-model="user.checkPass" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('user')">注册</el-button>
              <el-button @click="resetForm('user')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<style scoped>
.register-info {
  overflow: hidden;
  background-color: white;
  flex-direction: column;
  display: flex;
  width: 25%;
  height: 55%;
  padding: 30px 20px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.15);
  transition: all 0.5s ease;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

}

.register-info:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.09);
}

@media (max-width: 768px) {
  .register-info {
    width: 90%;
    left: 30%;
  }
}
</style>
