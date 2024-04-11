<script>
import {mapMutations, mapState} from "vuex";
import router from "@/router";

export default {
  name: "SideBar",
  computed: {
    ...mapState(['userDto', 'isLogin', "articles", "category", "tag", "total", 'author']),
  },
  data() {
    return {
      announcement: '欢迎来的我的博客',
      site_img: 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/blog_img/logo.png',
      categoryNumber: [],
      recommendedArticle:{

      }
    }
  },
  methods: {
    ...mapMutations(['setAuthor', 'setArticles', 'setCategory', 'setTotal', 'setTag']),
    saveArticle(res) {
      this.setArticles(res.data.articles.records)
      this.setCategory(res.data.category)
      this.setTotal(res.data.articles.total)
      this.setTag(res.data.tag)
    },
    setAuthorInfo() {
      //首先获得文章的作者id
      if (this.$route.path.includes("article-context")) {
        const articleId = this.$route.params.id
        axios.get("/article/userIdByArticleId/" + articleId).then(res => {
          //再获得作者的信息
          axios.get("/user/author/" + res.data).then(res => {
            if (res.data.avatar === null) {
              res.data.avatar = this.site_img
            }
            this.setAuthor(res.data)
          })
          axios.get("/article/userId/" + res.data, {
            params: {
              Number: 1,
              NumberSize: 10
            }
          }).then(res => {
            this.saveArticle(res)
          })
        })
      }
    },
    //获取推荐文章
    getRecommendedArticle() {
      axios.get('/article/recommendation',{
        params:{
          userId: this.isLogin ? this.userDto.userId : "",
        }
      }).then(res=>{
        this.recommendedArticle = res.data
      })
    }
  },
  mounted() {
    this.getRecommendedArticle()
    this.setAuthorInfo()
  },
  watch: {
    $route() {
      this.setAuthorInfo()
      this.getRecommendedArticle()
    }
  }
}
</script>

<template>
  <div class="sidebar" style="display: block;">
    <!--    用户信息-->
    <el-card class="card is-center">
      <el-avatar class="user-avatar"
                 :src="this.$route.path==='/' ? (isLogin ? userDto.avatar : site_img) :author.avatar" :size="110"
                 shape="circle" fit="fill"></el-avatar>
      <h2 style="font-size: 20px">
        {{ this.$route.path === '/' ? (isLogin ? userDto.nickname : 'Orange') : author.nickname }}</h2>
      <p style="font-size: 14px;margin-top: 10px">
        {{ this.$route.path === '/' ? (isLogin ? userDto.description : '一个前端小白') : author.description }}</p>
      <div class="site-data">
        <router-link :to="this.$route.path==='/'&&!isLogin ? '/all-articles' : '/article'" class="site-data-router">
          <div>文章</div>
          <div>{{ this.total }}</div>
        </router-link>
        <router-link :to="this.$route.path==='/'&&!isLogin ? '/all-category' : '/category'" class="site-data-router">
          <div>分类</div>
          <div>{{ this.category.length }}</div>
        </router-link>
        <router-link :to="this.$route.path==='/'&&!isLogin ? '/all-tag' : '/tag'" class="site-data-router">
          <div>标签</div>
          <div>{{ this.tag.length }}</div>
        </router-link>
      </div>
      <a href="https://github.com/OrangeZSW/blog-client" target="_blank">
        <el-button class="user-info-button" type="primary">
          <v-icon style="margin-right: 10px;color: white">mdi-github</v-icon>
          Follow me
        </el-button>
      </a>
    </el-card>

    <!--    公告-->
    <el-card class="card is-center">
      <div style="width: 56px;float: left">
        <v-icon style="color: red" class="announcement">mdi-bullhorn</v-icon>
        <span style="font-size: 16px">公告</span>
      </div>
      <div style="font-size: 15px">{{ isLogin ? author.announcement : announcement }}</div>
    </el-card>

    <!--    最新文章-->
    <div style=" position: sticky; ;top: 20px;z-index: 1;">
      <el-card class="card is-center ">
        <div class="mb-3" style="width: 100%;display: flex">
          <v-icon>mdi-history</v-icon>
          <span class="ml-2" style="font-size: 16px">最新文章</span>
        </div>
        <div class="mt-2" v-for="(article,index) of articles" v-if="index<5"
             style="width: 100%;height: 4.6em;display: flex">
          <router-link :to="'/article-context/'+article.articleId">
            <el-image class="new-article" fit="cover" style="height: 4.2em;width: 4.2em" :src="article.coverImg"/>
          </router-link>
          <div class="ml-2"
               style="display: flex ;height: 100%;justify-content: center;text-align: left;flex-direction: column">
            <router-link class="a" :to="'/article-context/'+article.articleId">{{ article.title }}</router-link>
            <span style="color: #858585">{{ article.createdAt }}</span>
          </div>
        </div>
      </el-card>

      <!--    推荐-->
      <el-card class="card is-center">
      <div class="mb-5" style="display: flex">
        <v-icon>mdi-balloon</v-icon>
        <span class="ml-2" style="font-size: 16px;color: #00C4B6">推荐文章</span>
      </div>
        <div class="mt-2" v-for="(article,index) of recommendedArticle" v-if="index<5"
             style="width: 100%;height: 4.6em;display: flex">

         <div style="align-items: center;justify-content: center;width: 100%;">
            <router-link class="a" :to="'/article-context/'+article.articleId">{{ article.title }}</router-link>
            <div style="color: #858585">{{ article.createdAt[0]+'-'+article.createdAt[1]+'-'+article.createdAt[2] }}</div>

         </div>
          <router-link :to="'/article-context/'+article.articleId">
            <el-image class="new-article" lazy fit="cover" style="height: 4.2em;width: 4.2em;float: right" :src="article.coverImg"/>
          </router-link>
        </div>



      </el-card>

      <!--    分类-->
      <el-card v-if="category.length!==0&&!this.$route.path.includes('context')" class="card is-center">
        <div class="mb-5" style="display: flex">
          <v-icon>mdi-format-list-bulleted</v-icon>
          <span class="ml-2" style="font-size: 16px">分类</span>
        </div>
        <router-link to="/category" class="a">
          <div v-for="(item,index) of category" class="category" style="margin: 5px 0;width: 100%;display: flex">
            <span>{{ item }}</span>
            <span style="margin: 0 5px 0 auto">{{ categoryNumber[index] }}</span>
          </div>
        </router-link>
      </el-card>
      <!--    标签-->
      <el-card v-if="tag.length!==0&&!this.$route.path.includes('context')" class="card is-center">
        <div class="mb-5" style="display: flex">

          <v-icon>mdi-tag-heart-outline</v-icon>
          <span class="ml-2" style="font-size: 16px">标签</span>
        </div>
        <div style="display: flex;flex-wrap: wrap">
          <router-link v-for="item of tag" to="/tag" class="a">
            <span style="font-size: 20px;margin: 5px 5px;display: flex">{{ item }}</span>
          </router-link>
        </div>
      </el-card>
      <!--    归档-->
      <div v-if="!this.$route.path.includes('context')  " class="card is-center "
           style="border-radius: 5px;box-shadow:0 3px 8px 6px rgba(7,17,27,0.05);padding: 15px 0 ">
        <div class="mb-5  ml-5 " style="display: flex;">
          <v-icon>mdi-calendar-month</v-icon>
          <span style="font-size: 16px">归档</span>
        </div>
        <v-date-picker
        >
        </v-date-picker>
      </div>
    </div>
  </div>
</template>

<style scoped>
.new-article {
  object-fit: cover;
  overflow: hidden;
  transition: all 0.5s ease;
}

.new-article:hover {
  transform: scale(1.1);
}

.category {
  color: #858585;
  padding: 5px 10px;
  margin-right: 5px;
  transition: all 1s ease;
}

.category:hover {
  padding: 5px 20px;
  background-color: #4AB1F5;

}

.a {
  text-decoration: none;
  color: #5F5D5C;
}

.a:hover {
  color: #4AB1F5;
}

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

.announcement {
  animation: rotateShake 0.4s ease infinite;
}

.user-info-button {
  width: 100%;
  line-height: 2.4;
  border-radius: 0px;
  margin-top: 14px;
  padding: 0;
  color: white;
  border: none
}

.user-info-button:hover {
  transition: all 0.5s ease;
  background-color: #FF7242;
}

.site-data-router {
  text-decoration: none;
  color: black;
  margin: auto;
  transition: all 0.5s ease;
}

.site-data-router:hover {
  color: #4AB1F5;
}

.user-avatar {
  transition: all 0.5s ease;
}

.user-avatar:after {
  transform: rotate(0deg);
}

.user-avatar:hover {
  transform: rotate(360deg);
}

.site-data {
  display: flex;
  width: 100%;
  margin: 14px 0 4px;
  /*
  *  table-layout: fixed; 使表格布局固定
   */
  table-layout: fixed;
}


.is-center {
  text-align: center;
}

.card {
  margin: 20px 0 0;
}

.sidebar {
  width: 26%;
  padding-left: 15px;
}

.card:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.09);
  transition: all 0.5s ease;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    padding: 0;
  }
}
</style>
