
<template>
  <div>

    <Header />
    <div class="wrapper" @click="backLoginWindow" >
      <Login ref="login"/>
      <Center />
    </div>

    <div class="main">wd
    dwada
    <h1>dawd</h1>
    </div>

  </div>

</template>

<script>
import Header from "@/components/Header.vue";
import Center from "@/components/Center.vue";
import Login from "@/components/Login.vue";
export default {
  components: {
    Login,
    Header,
    Center
  },
  name: "Blog",
  computed: {
  },
  data(){
    return {
      background_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
      login: false
    }
  },
  methods: {
    backLoginWindow(e){
      // console.log(e)
      console.log(e.target._prevClass)
      if(e.target._prevClass==='icon el-icon-arrow-down'){
        console.log("1111")
        window.screenY = 100
        return
      }
      const Login = document.querySelector('.login')
      console.log("dwa")
      if(!Login.contains(event.target)){
        Login.style.transform = 'translateX(0px)'
      }
    },
    lookBlog(){
      //   窗口下拉
      window.screenY = 100
    }
  },
}
</script>

<style scoped>


.wrapper{
  width: 100%;
  display: flex;
  flex-direction: column;
  background-position: center;
  /*图片将被拉伸或缩小以覆盖整个容器，可能会有部分裁剪*/
  background-size: cover;
  background-image:url("https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png");
  background-color: rgba(0,0,0,0.6);
  /*设置背景大小*/
  height: 100vh;
  /*超过的隐藏*/
  overflow: hidden;
  border-radius: 10px;
  /*滤镜*/

}
.wrapper:before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  z-index: -0;
  border-radius: 10px;
}


.main{
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
