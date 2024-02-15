<script>
export default {
  name: "Display",
  data(){
    return{
      user:{
        username:'Orange',
        avatar:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/orange.jpg',
        description:'一个前端小白',
        articleNumber:0,
        blogNumber:0,
        categories:0
      },
      article:{}
    }
  }
}
</script>

<template>
  <div class="display">

    <div class="content" >
      <div class="articles-content" v-model="article">
        <div class="article-item">
          <router-link to="" class="article-bg">
            <img src="https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/swagger.png" style="object-fit: cover">
          </router-link>
          <div class="article-info">
            <h2>Swagger</h2>
            <p>Swagger是一款RESTful接口的文档在线自动生成+功能测试功能软件</p>
          </div>
        </div>
        <div class="article-item"></div>
        <div class="article-item"></div>
        <div class="article-item"></div>
      </div>
      <div class="sidebar" >
        <el-card class="card is-center">
            <el-avatar class="user-avatar" :src="user.avatar" :size="110" shape="circle" fit="fill"></el-avatar>
            <h2 style="font-size: 20px">{{ user.username }}</h2>
            <p style="font-size: 14px;margin-top: 10px">{{ user.description }}</p>
            <div class="site-data">
              <router-link to="/article" class="site-data-router" >
                <div>文章</div>
                <div>{{ user.articleNumber }}</div>
              </router-link>
              <router-link to="/article" class="site-data-router">
                <div>博客</div>
                <div>{{ user.blogNumber }}</div>
              </router-link>
              <router-link to="/categories" class="site-data-router">
                <div>分类</div>
                <div>{{ user.categories }}</div>
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
    </div>
  </div>
</template>

<style scoped>
.article-bg{
  height: auto; /* 让高度自适应 */
  object-fit: cover; /* 填充整个容器并保持宽高比例 */
}
.article-info{
  width:58%;
  padding: 0 40px;
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

@media (min-width: 768px) {
  .sidebar{
    width: 26%;
    padding: 0 0 0 15px;
    position: relative;
  }
}
.articles-content{
  width: 74%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.display{
  display: flex;
  width: 100%;
  background-color: #fff;
  flex-direction: column;

}
.content{
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  margin: 0 auto ;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding: 40px 15px;
}
.article-item{
  width: 866px;
  height: 235px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px ;
  display: flex;
  overflow: hidden;
}
@media (max-width: 768px) {
  .articles-content{
    width: 100%;
  }
  .content{
    width: 100%;

  }
  .article-item{
    height: 414px;
    width: 100%;
    margin: 20px 5px 5px 5px;
    overflow: hidden;
  }
}

</style>
