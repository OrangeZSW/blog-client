<script>

import {mapMutations, mapState} from "vuex";
import Search from "@/components/Global/Search.vue";

export default {
  name: "Header",
  components: {Search},
  mounted() {
    document.addEventListener('click', this.handleClickOutside);


    const Header = document.querySelector('.Header')
    Header.style.transform = 'translateY(+60px)'
    let lastScrollTop = 0;
    document.addEventListener("scroll", function () {
      let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const site_name = document.querySelector('.site_name')
      const items = document.querySelectorAll('.item')
      const header_icon = document.querySelectorAll('.header-icon')
      if (currentScrollTop > lastScrollTop) {
        // 向下滚动
        // console.log("向下滚动");
        Header.style.top = '-120px'
        Header.style.backgroundColor = 'transparent'
        Header.style.boxShadow = 'none'
      } else if (currentScrollTop !== 0) {
        // 向上滚动并且没有到顶
        site_name.style.color = '#4C4948'
        for (let i = 0; i < items.length; i++) {
          items[i].style.color = '#4C4948'
        }
        for (let i = 0; i < header_icon.length; i++) {
          header_icon[i].style.color = '#4C4948'
        }
        Header.style.top = '-60px'
        Header.style.background = 'rgba(255,255,255,0.8)'
        Header.style.filters = 'constant(1.5)'
        Header.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'
        // console.log("向上滚动并且没有到顶");
      } else {
        // 到顶
        site_name.style.color = '#ffffff'
        for (let i = 0; i < items.length; i++) {
          items[i].style.color = '#ffffff'
        }
        for (let i = 0; i < header_icon.length; i++) {
          header_icon[i].style.color = '#ffffff'
        }
        Header.style.boxShadow = 'none'
        Header.style.top = '-60px'
        Header.style.backgroundColor = 'transparent'
        // console.log("到顶");
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }, true);

  },
  computed: {
    ...mapState(['userDto']),
    ...mapState(['isLogin', 'articles']),
  },
  methods: {
    ...mapMutations(['setLoginWindowStatus', 'setLoginStatus', "setLoginWindowStatus", "setUserDto", 'setArticles',"setSearch"]),
    moveLogin() {
      // 没有登录过
      this.$store.commit('setLoginWindowStatus', true)
      setTimeout(() => {
        try {
          const login = document.querySelector('.login');
          login.style.zIndex = '2';
          login.style.opacity = '1';
          if (!this.$store.state.isLogin) {
            if (window.innerWidth > 768) {
              login.style.right = '100px';
            } else {
              login.style.right = window.innerWidth / 2 - 175 + 'px';
            }
          }
        } catch (e) {
          console.log(e)
        }
      }, 100)
    },
    userInfoOver() {
      if (this.isLogin) {
        const userInfo = document.querySelector('.userInfo-leave')
        userInfo.style.height = '4.8em'
      }
    },
    userInfoLeave() {
      const userInfo = document.querySelector('.userInfo-leave')
      userInfo.style.height = '0%'
    },
    logOut() {
      this.setLoginWindowStatus(true)
      this.setLoginStatus(false)
      this.$message.success('退出登录成功')
      this.setLoginStatus(false)
      this.setUserDto({})
      this.$router.push('/')
    },
    sideBarPhone() {
      setTimeout(() => {
        const sideBarPhone = document.querySelector('.sideBar-menu')
        const body = document.querySelector('body')
        sideBarPhone.style.right = '0'
        body.style.setProperty('--width', window.innerWidth - 300 + 'px')
      }, 100)
    },
    toEditor(){
      if (!this.isLogin) {
        this.$message.error("请先登录")
        //阻止跳转
      } else {
        this.$router.push('/editor-article')
      }
    },
    handleClickOutside(){
        const userAvatar = document.querySelector('.user-avatar');
        if (!userAvatar?.contains(event.target)) {
          this.userInfoLeave();
        }

    }
  },
  data() {
    return {
      site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
      site_name: 'Orange_Blog',
      username: '登录',
      // 后缀
      suffix: "'s_Blog",
    }
  },
}
</script>

<template>
  <div class="Header">
    <router-link to="/" style="display: flex;text-decoration: none;color: #ffffff">
      <img class="site_img" :src="site_img" :title="isLogin ? userDto.nickname +this.suffix: 'Orange'+this.suffix"/>
      <div class="site_name" :title="isLogin ? userDto.nickname+this.suffix : 'Orange'+this.suffix">
        {{ isLogin ? userDto.nickname : 'Orange' }}{{ suffix }}
      </div>
    </router-link>
    <div class="menu">

      <div class="item" @click="setSearch(true)">
        <v-icon class="header-icon" style="color: white">mdi-magnify</v-icon>
        <span>搜索</span>
      </div>
      <div class="item phone" @click="setSearch(true)">
        <v-icon class="header-icon" style="color: white">mdi-magnify</v-icon>
      </div>

      <router-link to="/" class="item">
        <v-icon class="header-icon" style="color: white">mdi-home</v-icon>
        <span>首页</span>
      </router-link>

      <router-link to="/all-articles" class="item">
        <v-icon class="header-icon" style="color: white">mdi-card-bulleted</v-icon>
        <span>文章</span>
      </router-link>

      <div  @click="toEditor" class="item">
        <v-icon class="header-icon" style="color: white">mdi-book-account</v-icon>
        <span>发布文章</span>
      </div>

      <div class="item user-avatar" style="display: flex;align-items: center" @click="moveLogin"
           @mouseover="userInfoOver">
        <v-icon class="header-icon" style="color: white">mdi-heart</v-icon>
        <span>{{ isLogin ? userDto.nickname : '登录' }}</span>
        <el-avatar icon="el-icon-user-solid " class="avatar" :src=" isLogin ? userDto.avatar : site_img"/>
      </div>

      <div class="item phone" @click="sideBarPhone">
        <i class="el-icon-s-unfold"></i>
      </div>

    </div>
    <div class="userInfo-leave" ref="userInfo" v-show="isLogin" @mouseleave="userInfoLeave" @click="handleClickOutside">
      <div class="userInfo-item" style="margin-top:10px" @click="()=>{this.$router.push('/userinfo')}">个人信息</div>
      <div class="userInfo-item" style="margin-bottom: 10px" @click="logOut">退出登录</div>
    </div>
  </div>
</template>

<style scoped>
.userInfo-item {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.userInfo-item:hover {
  background-color: #ECF5FF;
  overflow: hidden;
}

.userInfo-leave {
  position: fixed;
  right: 20px;
  top: 65px;
  background-color: white;
  text-align: center;
  justify-content: center;
  border: none;
  width: 7.5em;
  height: 0%;
  transition: all 0.2s ease;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-icon {
  margin-right: 5px;
  color: white;
  font-size: 16px;
  transition: all 0.5s ease;
}

.item {
  position: relative;
  margin: auto auto auto 10px;
  height: auto;
  filter: brightness(1);
  transition: all 0.5s ease;
  text-decoration: none;
  color: white;
}

.item:hover {
  color: #67B8EF !important;
}

.item:hover .header-icon {
  color: #67B8EF !important;
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

.item:hover {
  filter: brightness(1.3);
  cursor: pointer;
}

.avatar {
  margin-left: 2px;
}

.avatar:hover {
  transition: transform 1s ease;
  transform: scale(0.9);
}

.Header {
  z-index: 3;
  position: fixed;
  top: -60px;
  width: 100%;
  height: 60px;
  padding: 5px;
  display: flex;
  transition: all 1s ease, background-color 1.5s ease;

}

.site_img {
  font-size: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  height: 36px;
  vertical-align: middle;
  margin: auto 6px auto 30px;
  overflow-clip-margin: Content-box;
  transition: all 1s ease;
}

.site_name {
  font-size: 20px;
  color: #ffffff;
  margin: auto auto auto 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  transition: all 1s ease;
}

.menu {
  display: flex;
  flex-direction: row;
  margin: 5px 20px auto auto;
  color: #fff;
  font-size: 14px;
  transition: all 1s ease;
  position: fixed;
  right: 0;
}

/*
手机端
 */
@media (max-width: 768px) {
  .userInfo-leave {
    right: 4.2em;
  }

  .Header {
    max-width: 1000px;
  }

  .item {
    display: none;
  }

  .phone {
    display: block;
  }
  .site_img{
    margin: auto 6px auto 10px;

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
