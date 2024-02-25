<script>
import {mapState} from "vuex";

export default {
  name: "SideBar",
  computed: {
    ...mapState(['userDto', 'isLogin',"articles","category","tag"]),
  },
  data(){
    return{
      site_img:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
    }
  }
}
</script>

<template>
  <div class="sidebar" >
    <el-card class="card is-center" >
      <el-avatar class="user-avatar" :src="isLogin ? userDto.avatar : site_img" :size="110" shape="circle" fit="fill"></el-avatar>
      <h2 style="font-size: 20px">{{ isLogin ? userDto.nickname : 'Orange'}}</h2>
      <p style="font-size: 14px;margin-top: 10px">{{ isLogin ? userDto.description : '一个前端小白' }}</p>
      <div class="site-data">
        <router-link :to="isLogin ? '/article' : '/all-articles'" class="site-data-router" >
          <div>文章</div>
          <div>{{ this.articles.length }}</div>
        </router-link>
        <router-link to="/category" class="site-data-router">
          <div>分类</div>
          <div>{{ category.length }}</div>
        </router-link>
        <router-link to="/tag" class="site-data-router">
          <div>标签</div>
          <div>{{tag.length}}</div>
        </router-link>
      </div>
      <a href="https://github.com/OrangeZSW/blog-client" target="_blank">
        <el-button class="user-info-button" type="primary">
          <v-icon style="margin-right: 10px;color: white" >mdi-github</v-icon>
          Follow me
        </el-button>
      </a>
    </el-card>
  </div>
</template>

<style scoped>
.user-info-button{
  width: 100%;
  line-height: 2.4;
  border-radius: 0px;
  margin-top: 14px;
  padding: 0;color: white;
  border: none
}
.user-info-button:hover{
  transition: all 0.5s ease;
  background-color: #FF7242;
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


.is-center{
  text-align: center;
}

.card{
  margin: 20px 0 0;
}

.sidebar{
  width: 26%;
  padding-left: 15px;
  position: relative;
  flex-shrink: 0;

}
.card:hover{
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
  transition: all 0.5s ease;
}
@media (max-width: 768px) {
  .sidebar{
    display: none;
  }
}
</style>
