<script >
  export default {
    name: "Header",
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      const Header = document.querySelector('.Header')
      Header.style.transform = 'translateY(+60px)'
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
    },
      data() {
        return {
          site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
          site_name: 'Orange_Blog',
          username: '登录',
          avatar: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/orange.jpg'
        }
      },
    }
</script>

<template>
  <div class="Header" >
    <router-link to="/" style="display: flex;text-decoration: none;color: #ffffff">
      <img class="site_img" :src="site_img"  :title="site_name" />
      <div class="site_name" :title="site_name">{{site_name}}</div>
    </router-link>
        <div class="menu">
          <div class="item" >
            <i style="margin-right: 5px;" class="el-icon-s-home" />
            <span >首页</span>
          </div>
          <div class="item">
            <i style="margin-right: 5px;" class="el-icon-s-order"/>
            <span >博客</span>
          </div>
          <div class="item" style="display: flex;align-items: center">
            <i style="margin-right: 5px;" class="el-icon-star-on"/>
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

.item {
  position: relative;
  margin: auto auto auto 16px;
  height: auto;
  transition: filter 0.5s;
  filter:brightness(0.9);
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
