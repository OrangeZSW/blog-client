<script>

import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "login",
  computed: {
    ...mapState(['userDto']),
    ...mapState([ 'isLogin', 'loginWindow','articles',]),
  },
  data() {
    return {
      user: {
        nickname: "",
        password: "",
      },
    }
  },
  methods: {
    ...mapMutations([ "setUserDto",'setLoginStatus', 'setLoginWindowStatus','setUserDto','setArticles','backLoginWindow']),
    login() {
      axios.post('/user/login', this.user)
          .then(res => {
            if(res.code==='200'){
              this.setUserDto(res.data)
              // 如果没有头像，使用默认头像
              if (res.data.avatar === null) {
                res.data.avatar = 'https://server.blog.zorange.online/files/download/8dab8d9ad1c5489e9d49f7d1b05656bf.png'
              }
              // 如果没有封面，使用默认封面
              if(res.data.coverImg === null){
                res.data.coverImg = 'https://server.blog.zorange.online/files/download/428565553df343e6afb6b6b694e85432.png'
              }
              this.setLoginStatus(true)
              this.$message.success('登录成功', 1.5)
              localStorage.setItem('token', res.data.token)
              this.backLoginWindow()
              this.$router.push('/')
              //强制刷新article-content
              this.load()
            }else{
              this.$message.error(res.msg)
            }
          }).catch(err => {
        console.log(err)
      })
    },
    backLoginWindow(e) {
      const Login = this.$refs.loginWindow
      Login.style.zIndex = '0'
      Login.style.opacity = '0'
      Login.style.right = '-400px'
      setTimeout(() => {
        this.setLoginWindowStatus(false)
      }, 500)
    },
    userRegister() {
      this.backLoginWindow()
      this.$router.push('/register')
    }
  },
}
</script>

<template>
  <div ref="loginWindow" class="login">
    <span class="title">登录</span>
    <el-form :model="user">
      <el-form-item>
        <el-input ref="username" prefix-icon="el-icon-user" placeholder="请输入用户名"
                  v-model="user.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="user.password" show-password></el-input>
      </el-form-item>
      <div>
        <el-button style="margin-top: 20px" @click="login">登录</el-button>
        <el-button style="float: right;margin-top: 20px" @click="userRegister">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.title {
  font-size: 30px;
  font-weight: bold;
  margin: 40px auto 50px 30px;
  display: flex;
  color: white;
  z-index: 0;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 400px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
  position: fixed;
  border-radius: 10px;
  right: -400px;
  opacity: 0;
  filter: contrast(1.2);
  transition: all 1s ease;
}
.login:hover{
  background-color: #5F5D5C;
}

@media (min-width: 768px) {
  .login {
    top: 200px;
  }
}

@media (max-width: 768px) {
  .login {
    top: 107px;
  }
}
</style>
