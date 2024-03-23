<script>
import Header from "@/components/Global/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import md from "@/plugins/markdown-it";
import SideBar from "@/components/SideBar.vue";
import {mapState} from "vuex";
import VueEasyLightbox from '@/components/ImgPlugins/VueEasyLightbox.vue'
import Footer from "@/components/Global/Footer.vue";
import autolink from "markdown-it/lib/rules_inline/autolink.mjs";
export default {
  name: "Article-Context",
  components: {Footer, SideBar, PageHeader, Header,VueEasyLightbox},
  computed:{
    ...mapState(['userDto','author'])
  },
  data() {
    return {
      vueEasyLightbox: {
        visible: false,
        imgs: [],
        index: 0
      },
      article:{},
      markdown: `# Hello World
      ## This is a markdown editor
      **Enjoy yourself!**
      `
    }
  },
  mounted() {
    //到顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.initArticle()
    this.imgAddClickLinsener()

  },
  methods: {
    autolink,
    handleCopyCodeSuccess(event, text, result) {
      this.$notify({
        message: '复制成功',
        type: 'success',
        position: 'bottom-left',
        duration: 1000
      });
    },
    initArticle(){
      const ArticleId = this.$route.params.id
      try {
        axios.get('/article/' + ArticleId).then(res => {
          this.article = res
          axios.get(res.url).then(res => {
            this.getAllImg(res)
            this.markdown = res
            // this.markdown = md.render(this.markdown)
          })
        })
      }catch (e){
        console.log(e)
      }
    },
    getAllImg(content){
      const imgRegex = /!\[.*?\]\((.*?)\)/g;
      let match;
      const imgList = [];

      while ((match = imgRegex.exec(content)) !== null) {
        const src = match[1];
        imgList.push(src);
      }
      this.vueEasyLightbox.imgs = imgList
    },
    imgAddClickLinsener(){
      const articleContext = document.querySelector('.article-context')
      articleContext.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
          this.vueEasyLightbox.imgs.map((item, index) => {
            if (item === e.target.src) {
              this.vueEasyLightbox.index = index
              this.vueEasyLightbox.visible = !this.vueEasyLightbox.visible
            }
          })
        }
      })
    }
  }
}
</script>
<template>
  <div >
    <Header/>
    <div>

      <PageHeader :article="article"/>
      <VueEasyLightbox :visible="vueEasyLightbox.visible" :imgsRef="vueEasyLightbox.imgs" :indexRef="vueEasyLightbox.index"/>
      <div style="
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  margin: 0 auto ;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding: 20px 15px;
  flex: 1;
">

<!--        编辑按钮-->
        <div style="width: 100%;text-align: center;" v-if="userDto.userId===author.userId">
          <router-link :to='/update-article/+this.$route.params.id' >
            <el-button  type="primary" icon="el-icon-edit" >更新文章</el-button>
          </router-link>
<!--          设置为私密文章-->
        </div>

        <div class="article-context">

          <!--        <div id="markdown-area" v-html="markdown"></div>-->
          <v-md-editor style=" display: flex; height: auto; max-height: none;"
                       :value="markdown" mode="preview"
                       left-toolbar="undo redo | tip"
                       :include-level="[2,3]"
                       @copy-code-success="handleCopyCodeSuccess"
          >
          </v-md-editor>

        </div>
        <SideBar />
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-context {
  height: auto;
  width: 72%;
  margin: 20px auto 20px auto;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  overflow: hidden;

}

.article-context:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.09);
}
@media (max-width: 768px) {
  .article-context {
    width: 100%;
  }
}
</style>
