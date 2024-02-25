<script>
import {mapState} from "vuex";

export default {
  name: "Articles-Content",
  computed:{
    ...mapState(['articles'])
  },
  mounted() {
  },
  data(){
    return{
      site_img:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
      user:{
        username:'Orange',
        description:'一个前端小白',
      },
    }
  }
}
</script>

<template>
  <div class="articles-content" >
    <div v-for="(article,index) in articles" :key="index" style="width: 100%">
      <slot v-if="index<articles.length&&index%2===0">
        <div class="article-item"  >
          <router-link to="" class="a-bg">
            <img class="article-bg" :title="articles[index].title" :src="articles[index].coverImg" >
          </router-link>

          <div class="article-info" >
            <a class="article-title" :title="articles[index].title">{{ articles[index].title }}</a>
            <div class="article-meta">
              <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
              <span style="margin-right: 4px">发表于</span>
              <span>{{ articles[index].createdAt }} </span>
              <span v-if="articles[index].category!==''">
                |
                <v-icon style="font-size: 1.5em" >mdi-book-variant</v-icon>
              <span>{{ articles[index].category }}</span>
              </span>
              <span v-if="articles[index].tag!==''">
                |
                <v-icon style="font-size: 1.5em">mdi-tag</v-icon>
              <span>{{ articles[index].tag }}</span>
              </span>
            </div>
            <div class="content">{{articles[index].content}}</div>
          </div>

        </div>


        <div class="article-item phone-item"  v-if="index<articles.length-1" >

          <div class="article-info"  >
            <a class="article-title" :title="articles[index+1].title">{{ articles[index+1].title }}</a>
            <div class="article-meta">
              <v-icon style="font-size: 1.5em">mdi-calendar-range</v-icon>
              <span style="margin-right: 4px">发表于</span>
              <span>{{ articles[index+1].createdAt }}</span>
              <span v-if="articles[index+1].category!==''">
                |
                <v-icon style="font-size: 1.5em">mdi-book-variant</v-icon>
              <span>{{ articles[index+1].category }}</span>
              </span>
              <span v-if="articles[index+1].tag!==''">
                |
                <v-icon style="font-size: 1.5em">mdi-tag</v-icon>
              <span>{{ articles[index+1].tag }}</span>
              </span>
            </div>
            <div class="content">{{articles[index+1].content}}</div>
          </div>

          <router-link to="" class="a-bg" style=" @media (max-width: 768px) {
                display: none;
              }">
            <img class="article-bg" :title="articles[index+1].title" :src="articles[index+1].coverImg" >
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
.content{
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
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
  width: 62%;
  padding: 0 40px;
  -webkit-box-orient: vertical;
}

.articles-content{
  width: 74%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  line-height: 2;
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
    height: 35em;
    margin: 20px 5px 5px 5px;
    overflow: hidden;
    flex-direction: column;
  }
  .article-bg{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .a-bg{
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    margin: 0;
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
