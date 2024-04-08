
<script>
import Header from "@/components/Global/Header.vue";
import Center from "@/components/Center.vue";
import Login from "@/components/Global/Login.vue";
import Display from "@/components/Dispaly.vue";
import {mapActions, mapMutations, mapState} from "vuex";
import SideBarPhone from "@/components/SideBar-Phone.vue";

export default {
  components: {
    SideBarPhone,
    Display,
    Login,
    Header,
    Center
  },
  name: "Home",
  computed: {
    ...mapState(['userDto', 'isLogin', 'loginWindow', 'articles']),
  },
  data() {
    return {
      site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
      login: false,
    }
  },
  methods: {
    ...mapMutations(['backLoginWindow','setArticles']),
    lookBlog() {
      //   窗口下拉
      window.screenY = 100
    },
  },
  mounted() {
  }
}
</script>


<template>
  <div>
    <Header/>
    <div class="wrapper" id="wrapper" :style="{'background-image': `url(${isLogin ? userDto.coverImg : site_img})`}">
      <Center/>
    </div>
    <div>
      <Display/>
    </div>
  </div>

</template>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-position: center;
  /*图片将被拉伸或缩小以覆盖整个容器，可能会有部分裁剪*/
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.6);
  /*设置背景大小*/
  height: 100vh;
  /*超过的隐藏*/
  overflow-x: hidden;
  border-radius: 5px;
  background-attachment: fixed; /* 让背景图像固定 */

}
.wrapper:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
  transition: all 0.5s ease;
}

</style>
