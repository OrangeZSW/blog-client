<script>
import {mapState} from "vuex";

export default {
  name: "Page-Header",
  props: {
    article: {
      type: Object,
      }
  },
  computed: {
    ...mapState(['userDto', 'isLogin',"author"]),
  },
  data(){
    return{
      createdAt:'',
      lastUpdatedAt:'',
      site_img:'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png',
    }
  },
  mounted() {
  },
  watch:{
    article:{
      handler(){
        this.createdAt = this.article.createdAt[0]+'-'+this.article.createdAt[1]+'-'+this.article.createdAt[2]
        this.lastUpdatedAt = this.article.lastUpdatedAt[0]+'-'+this.article.lastUpdatedAt[1]+'-'+this.article.lastUpdatedAt[2]
      },
      deep:true
    }
  }
}
</script>

<template>
  <div class="page-header" :style="{'background-image': `url(${this.$route.name==='文章内容' ? (this.article.coverImg===''? site_img : this.article.coverImg ): this.author.coverImg })`}">

    <span v-if="this.$route.name!=='文章内容'" class="blog-title">{{author.nickname}}'s{{this.$route.name}}</span>

    <div class="article-info" v-if="this.$route.name==='文章内容'" >
      <h2 class="article-title" >{{ this.article.title }}</h2>
      <div style="color: white;margin-top: 10px">
        <v-icon style="font-size: 1.25em;color: white;margin-right: 5px">mdi-calendar-range</v-icon>
        <span style="margin-right: 4px">发表于</span>
        <span style="margin-right: 5px">{{ createdAt }}</span>
        |
        <v-icon style="color: white;font-size: 1.25em;margin-right: 5px;margin-left: 5px">mdi-update</v-icon>
        <span style="margin-right: 5px">更新于</span>
        <span style="margin-right: 5px">{{ lastUpdatedAt }}</span>
      </div>
    </div>


  </div>
</template>

<style scoped>
.article-title{
  font-size: 2.85em;
  color: white;
  font-weight: bold;
  z-index: 1;
}
.article-info{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  z-index: 1;
  flex-direction: column;
}
.blog-title{
  font-size: 2.85em;
  color: white;
  font-weight: bold;
  z-index: 1;
}
.page-header{
  position: relative; /* 添加相对定位 */
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  flex-direction: column;
}
.page-header::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

</style>
