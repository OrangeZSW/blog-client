<script>
import {mapState} from "vuex";

export default {
  name: "SideBar-Phone",
  computed:{
    ...mapState(['isLogin', 'userDto'])
  },
  data(){
    return {
      site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
      user: {
        articleNumber: 0,
        blogNumber: 0,
        tags: 0
      }
    }
  }
}
</script>

<template>
  <div class="sideBar-menu" ref="sideBarPhone">
    <el-avatar class="user-avatar" :src="isLogin ? userDto.avatar : site_img" :size="110" shape="circle" fit="fill"></el-avatar>
    <h2 style="font-size: 20px">{{ isLogin ? userDto.nickname : 'Orange'}}</h2>
    <p style="font-size: 14px;margin-top: 10px">{{ isLogin ? userDto.description : '一个前端小白' }}</p>
    <div class="site-data">
      <router-link to="/article" class="site-data-router" >
        <div>文章</div>
        <div>{{ user.articleNumber }}</div>
      </router-link>
      <router-link to="/Blog" class="site-data-router">
        <div>分类</div>
        <div>{{ user.blogNumber }}</div>
      </router-link>
      <router-link to="/tag" class="site-data-router">
        <div>标签</div>
        <div>{{ user.tags }}</div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.sideBar-menu{
  z-index: 3;
  background-color: white;
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.site-data-router{
  text-decoration: none;
  color: black;
  margin: auto;
  transition: all 0.5s ease;
}
.site-data-router:hover{
  color: #4AB1F5;
}
.user-avatar{
  transition: all 0.5s ease;
}
.user-avatar:after{
  transform: rotate(0deg);
}
.user-avatar:hover{
  transform: rotate(360deg);
}
.site-data{
  display:flex;
  width: 100%;
  margin:14px 0 4px;
  /*
  *  table-layout: fixed; 使表格布局固定
   */
  table-layout: fixed;
}


</style>
