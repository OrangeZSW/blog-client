<script>
import {mapMutations, mapState} from "vuex";
import router from "@/router";

export default {
  name: "SideBar",
  computed: {
    ...mapState(['userDto', 'isLogin',"articles","category","tag","total",'author']),
  },
  data(){
    return{
      announcement: '欢迎来的我的博客',
      site_img:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
    }
  },
  methods:{
    ...mapMutations(['setAuthor','setArticles','setCategory','setTotal','setTag']),
    saveArticle(res){
      this.setArticles(res.data.article.records)
      this.setCategory(res.data.category)
      this.setTotal(res.data.article.total)
      this.setTag(res.data.tag)
    },
    setAuthorInfo(){
      //首先获得文章的作者id
      if(this.$route.path.includes("article-context")){
        const articleId = this.$route.params.id
        axios.get("/article/userIdByArticleId/"+articleId).then(res=>{
          //再获得作者的信息
          axios.get("/user/author/"+res.data).then(res=>{
            if(res.data.avatar === null){
              res.data.avatar = this.site_img
            }
            this.setAuthor(res.data)
          })
          axios.get("/article/userId/"+res.data,{
            params: {
              Number: 1,
              NumberSize: 10
            }
          }).then(res => {
            this.saveArticle(res)
          })
        })
      }
    }
  },
  mounted() {
    this.setAuthorInfo()
    const announcementIcon = this.$el.querySelector('.announcement');
    announcementIcon.classList.add("rotateShake")
  }
}
</script>

<template>
  <div class="sidebar" style="display: block">
    <el-card class="card is-center" >
      <el-avatar class="user-avatar" :src="this.$route.path==='/' ? (isLogin ? userDto.avatar : site_img) :author.avatar" :size="110" shape="circle" fit="fill"></el-avatar>
      <h2 style="font-size: 20px">{{this.$route.path==='/' ? (isLogin ? userDto.nickname : 'Orange' ): author.nickname}}</h2>
      <p style="font-size: 14px;margin-top: 10px">{{this.$route.path==='/' ? (isLogin ? userDto.description :'一个前端小白') : author.description}}</p>
      <div class="site-data" >
        <router-link :to="this.$route.path==='/'&&!isLogin ? '/all-articles' : '/article'" class="site-data-router" >
          <div>文章</div>
          <div>{{ this.total }}</div>
        </router-link>
        <router-link :to="this.$route.path==='/'&&!isLogin ? '/all-category' : '/category'" class="site-data-router">
          <div>分类</div>
          <div>{{ this.category.length }}</div>
        </router-link>
        <router-link :to="this.$route.path==='/'&&!isLogin ? '/all-tag' : '/tag'" class="site-data-router">
          <div>标签</div>
          <div>{{this.tag.length}}</div>
        </router-link>
      </div>
      <a href="https://github.com/OrangeZSW/blog-client" target="_blank">
        <el-button class="user-info-button" type="primary">
          <v-icon style="margin-right: 10px;color: white" >mdi-github</v-icon>
          Follow me
        </el-button>
      </a>
    </el-card>
    <el-card class="card is-center">
      <div style="width: 56px;float: left">
        <v-icon style="color: red" class="announcement">mdi-bullhorn</v-icon>
        <span style="font-size: 16px">公告</span>
      </div>
      <div style="font-size: 15px">{{isLogin ? author.announcement : announcement}}</div>
    </el-card>
  </div>
</template>

<style scoped>
@keyframes rotateShake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.announcement{
  animation: rotateShake 0.4s ease infinite;
}

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
    width: 100%;
    padding: 0;
  }
}
</style>
