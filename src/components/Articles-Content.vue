<script>
export default {
  name: "Articles-Content",
  data(){
    return{
      site_img:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
      user:{
        username:'Orange',

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
          {
            title: 'vue3',
            bg: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/vue3.png',
            created_at: '2023-11-01',
          }
        ],
        articleNumber:10,
        blogNumber:1,
        tags:10
      },
    }
  }
}
</script>

<template>
  <div class="articles-content" >
    <div v-for="(article,index) in user.articles" :key="index" style="width: 100%">
      <slot v-if="index<user.articles.length&&index%2===0">
        <div class="article-item"  >

          <router-link to="" class="a-bg">
            <img class="article-bg" :title="user.articles[index].title" :src="user.articles[index].bg" >
          </router-link>

          <div class="article-info" >
            <a class="article-title" :title="user.articles[index].title">{{ user.articles[index].title }}</a>
            <div class="article-meta">
              <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
              <span style="margin-right: 4px">发表于</span>
              <span>{{ user.articles[index].created_at }}</span>
            </div>
            <div>{{user.articles[index].content}}</div>
          </div>

        </div>


        <div class="article-item phone-item"  v-if="index<user.articles.length-1" >

          <div class="article-info"  >
            <a class="article-title" :title="user.articles[index+1].title">{{ user.articles[index+1].title }}</a>
            <div class="article-meta">
              <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
              <span style="margin-right: 4px">发表于</span>
              <span>{{ user.articles[index+1].created_at }}</span>
            </div>
            <div>{{user.articles[index+1].content}}</div>
          </div>

          <router-link to="" class="a-bg" style=" @media (max-width: 768px) {
                display: none;
              }">
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
.article-item:hover .article-bg{
  transform: scale(1.1);
}
.article-info{
  width: 58%;
  padding: 0 40px;
}

.articles-content{
  width: 74%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
}
.article-item{
  display: flex;
  overflow: hidden ;
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

@media (max-width: 768px) {
  .articles-content{
    width: 100%;
  }

  .article-item{
    height: auto;
    margin: 20px 5px 5px 5px;
    overflow: hidden;
    flex-direction: column;
  }
  .article-bg{
    width: 100%;
    height: 100%;
  }
  .a-bg{
    object-fit: cover;
    width: 100%;
    height: 230px;
  }
  .article-info{
    width: 100%;
    height: 100%;
    padding: 20px 20px 30px;
  }
  .phone-item{
    flex-direction: column-reverse;
  }
}
</style>
