<script>
import {mapState} from "vuex";

export default {
  name: "Footer",
  data() {
    return {
      isShow: true,
      ignore: ['/register', '/editor-article', '/userinfo',"/bind-email","/change-password","/Custom-Settings",'update-article'],
      site_img: 'https://server.blog.zorange.online/files/download/428565553df343e6afb6b6b694e85432.png',
      articleImg:''
    }
  },
  methods: {
    // 通过路由判断是否显示footer
    isShowFooter() {
      let path = this.$route.path
      return this.ignore.every(item => {
        return !path.includes(item)
      })
    },
    getArticleImg(){
      if(this.$route.path.includes("article-context")){
        let articleId = this.$route.params.id
        this.articles.forEach(item=>{
          if(item.articleId+'' === articleId){
            this.articleImg = item.coverImg
          }
        })
      }
    }
  },
  computed: {
    ...mapState(['userDto', 'isLogin','articles']),
  },
  mounted() {

  },
  watch: {
    $route() {
      this.isShow = this.isShowFooter()
      this.getArticleImg()
    }
  }
}
</script>

<template>
  <div class="footer" v-if="isShow" :style="{'background-image': `url(  ${this.$route.path.includes('/article-context') ? articleImg : isLogin ? userDto.coverImg : site_img} )`}">
    <div class="footer-info">
      <span>© 2023-2024 OrangeZSW</span>
      <span>Powered by <a id="a"  href="https://v2.cn.vuejs.org/v2/guide/" target="_blank">vue</a> | 主题 <a id="a" href="https://github.com/jerryc127/hexo-theme-butterfly">Butterfly</a></span>
      <span>welcome to my <img  src="https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/背景/爱心.png" alt=""> blog</span>
      <a href="https://beian.miit.gov.cn/" id="a" target="_blank">粤ICP备202305021008781号</a>
    </div>
  </div>
</template>

<style scoped>
#a:hover{
  text-decoration: underline;
  color: white;
}
#a{
  color: white;
  text-decoration: none;
}
.footer-info{

  color: white;
  z-index: 1;
  margin: 10px 40% 10px 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer{
  width: 100%;
  height: 194px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2;
  background-size: cover; /* 可根据需要调整 */
  background-position: center bottom; /* 将背景图片底部对齐 */
  position: relative;
}
.footer:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 194px;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
@media (max-width: 768px) {
  .footer-info{
    margin: 10px 10% 10px 10%;
  }
}
</style>
