<script >

export default {
    name: "Header",
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      const Header = document.querySelector('.Header')
      Header.style.transform = 'translateY(+60px)'
    },
    computed:{

    },
    methods: {

      handleScroll() {
        const Header = document.querySelector('.Header')
        // console.log(window.scrollY)
        if (window.scrollY === 0) {
          Header.style.transform = 'translateY(+60px)'
          Header.style.backgroundColor = 'transparent'
        } else {
          Header.style.transform = 'translateY(0px)'
          Header.style.backgroundColor = 'white'
        }
      },
      moveLogin(){
        // 没有登录过
        const login = document.querySelector('.login')
        login.style.zIndex = '2'
        login.style.opacity = '1'
        if(!this.login){
         if(window.innerWidth>768) {
           login.style.right = '200px'
         }else{
           login.style.right = window.innerWidth/2-175+'px'
         }
        }else{
        }
      }
    },
      data() {
        return {
          site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
          site_name: 'Orange_Blog',
          username: '登录',
          avatar: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/orange.jpg',
          login: false
        }
      },
    }
</script>

<template>
  <div class="Header not-top-img" >
    <router-link to="/" style="display: flex;text-decoration: none;color: #ffffff">
      <img class="site_img" :src="site_img"  :title="site_name" />
      <div class="site_name" :title="site_name">{{site_name}}</div>
    </router-link>
        <div class="menu">
          <div class="item" >
            <v-icon class="header-icon">mdi-home</v-icon>
            <span >首页</span>
          </div>
          <div class="item">
            <v-icon class="header-icon">mdi-card-bulleted</v-icon>
            <span>文章</span>
          </div>
          <div class="item">
            <v-icon class="header-icon">mdi-book-account</v-icon>
            <span >博客</span>
          </div>
          <div class="item" style="display: flex;align-items: center" @click="moveLogin">
            <v-icon class="header-icon"  >mdi-heart</v-icon>
            <span  >{{ username }}</span>
            <el-avatar icon="el-icon-user-solid " class="avatar" :src="avatar"  />
          </div>
          <div class="item phone">
            <i class="el-icon-s-unfold"></i>
          </div>
        </div>
  </div>
</template>

<style scoped>
.header-icon{
  margin-right: 5px;
  color: white;
  font-size: 16px;
}
.item {
  position: relative;
  margin: auto auto auto 14px;
  height: auto;
  transition: filter 0.5s;
  filter:brightness(1);
}
.item:hover{
  color: #67B8EF;
}
.item:hover .header-icon{
  color: #67B8EF;
}
.item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0; /* 初始状态，边框宽度为0 */
  height: 3px;
  background-color: #80C8F8;
  transition: width 0.5s; /* 应用过渡效果，宽度变化持续2秒 */
}

.item:hover::after {
  width: 100%; /* 当鼠标移动到元素上时，边框宽度变为100%，从左到右缓慢出现 */
}
.item:hover{
  filter: brightness(1.3);
  cursor: pointer;
}
.avatar{
  margin-left: 2px;
}
.avatar:hover{
  transition: transform 1s ease;
  transform: scale(0.9);
}
.Header{
  z-index: 1;
  position: absolute;
  top:-60px;
  width: 100%;
  height: 60px;
  padding: 5px;
  display: flex;
  transition: transform 0.5s ease, background-color 1.5s ease;
}

.site_img{
  height: 36px;
  vertical-align: middle;
  margin: auto 6px auto 30px;
  overflow-clip-margin: Content-box;
}
.site_name{
  font-size: 20px;
  color: #ffffff;
  margin: auto auto auto 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.15);
}
.menu{
  display: flex;
  flex-direction: row;
  margin: 5px 20px auto auto;
  color: #fff;
  font-size: 14px;
}

/*
手机端
 */
@media (max-width: 768px) {
  .item {
    display: none;
  }
  .phone {
    display: block;
  }
}
/*
PC端
 */
@media (min-width: 768px) {
  .phone {
    display: none;
  }
}
</style>
