<script>
export default {
  name: "Display",
  data(){
    return{
      user:{
        username:'Orange',
        avatar:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/orange.jpg',
        description:'一个前端小白',
        articles:[
          {
            title:'权限菜单',
            bg:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/image-20231101170341911.png',
            created_at:'2023-11-01',
            content:'如何实现一个权限菜单'
          },
          {
            title:'swagger',
            bg:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/swagger.png',
            created_at: '2023-11-01',
            content:'如何使用swaggdd'
          },
        ],
        articleNumber:10,
        blogNumber:1,
        categories:2
      },
    }
  }
}
</script>

<template>
  <div class="display">

    <div class="content" >
      <div class="articles-content" >
        <div v-for="(article,index) in user.articles" :key="index">
          <slot v-if="index<user.articles.length&&index%2===0">
            <div class="article-item"  >
              <router-link to="" >
                <img class="article-bg" :title="user.articles[index].title" :src="user.articles[index].bg" >
              </router-link>
              <div class="article-info">
                <a class="article-title" :title="user.articles[index].title">{{ user.articles[index].title }}</a>
                <div class="article-meta">
                  <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
                  <span style="margin-right: 4px">发表于</span>
                  <span>{{ user.articles[index].created_at }}</span>
                </div>
                <div>{{user.articles[index].content}}</div>
              </div>
            </div>
            <div class="article-item"  v-if="index<user.articles.length-1">
              <div class="article-info">
                <a class="article-title" :title="user.articles[index+1].title">{{ user.articles[index+1].title }}</a>
                <div class="article-meta">
                  <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
                  <span style="margin-right: 4px">发表于</span>
                  <span>{{ user.articles[index+1].created_at }}</span>
                </div>
                <div>{{user.articles[index+1].content}}</div>
              </div>

              <router-link to="" >
                <img class="article-bg" :title="user.articles[index+1].title" :src="user.articles[index+1].bg" >
              </router-link>
            </div>
          </slot>
        </div>
        <el-pagination
            class="pagination"
            background
            layout=" pager, next"
            :total="1000">
        </el-pagination>
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
.pagination{
  margin: 20px auto;
}
.article-meta{
  margin: 6px 0;
  color: #858585;
  font-size: 0.9em;
}
.article-title{
  text-decoration: none;
  color: black;
  font-size: 1.55em;
}
.article-bg{
  width: 25.9em;
  height: 16.8em;
  object-fit: cover;
  transition: all 0.5s ease;
}
.article-bg:hover{
  transform: scale(1.1);
}
.article-info{
  width: 58%;
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

.sidebar{
    width: 26%;
    padding-left: 15px;
    position: relative;
}
@media (max-width:768px) {
  .sidebar{
    display: none;
  }
}
.articles-content{
  width: 74%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
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
  display: flex;
  overflow: hidden ;
  width: 61.8em;
  height: 16.8em;
  border-radius: 8px;
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
  margin-top: 20px ;
  align-items: center;
}
.articles-content .article-item:hover{
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
  transition: all 0.5s ease;
}
.card:hover{
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
  transition: all 0.5s ease;
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
