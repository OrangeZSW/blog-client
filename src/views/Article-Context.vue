<script>
import Header from "@/components/Global/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import md from "@/plugins/markdown-it";
import SideBar from "@/components/SideBar.vue";
import {mapState} from "vuex";
import VueEasyLightbox from '@/components/ImgPlugins/VueEasyLightbox.vue'
import Footer from "@/components/Global/Footer.vue";
import autolink from "markdown-it/lib/rules_inline/autolink.mjs";
import ServerIP from "../assets/config";


export default {
  name: "Article-Context",
  components: {Footer, SideBar, PageHeader, Header, VueEasyLightbox},
  computed: {
    ...mapState(['userDto', 'author'])
  },
  data() {
    return {
      articleId: this.$route.params.id,
      loading: true,
      vueEasyLightbox: {
        visible: false,
        imgs: [],
        index: 0,
        Valine: ""
      },
      recommendedArticle: {},
      article: {},
      markdown: `# Hello World
      ## This is a markdown editor
      **Enjoy yourself!**
      `
    }
  },
  mounted() {
    this.initValine()
    //到顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.initArticle()
    this.imgAddClickLinsener()
  },
  watch: {
    $route() {
      //  加载动画
      this.loading = true
      this.initArticle()
      this.imgAddClickLinsener()
      this.getRecommendedArticle()
      //   回到顶部
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.initValine();
    },
  },
  methods: {
    getRecommendedArticle() {
      axios.get('/article/recommendation', {
        params: {
          userId: this.isLogin ? this.userDto.userId : "",
        }
      }).then(res => {
        this.recommendedArticle = res.data
        this.loading = false
      })
    },
    initValine() {
      if (this.Valine) {
        // 如果Valine实例已存在，先销毁
        this.Valine = null;
      }
      // 重新导入Valine并初始化
      import('valine').then(res => {
        this.Valine = res.default;
        new this.Valine({
          el: '#vcomments',
          appId: 'PyMWNYy32JGT1RvycbTfElvq-gzGzoHsz',
          appKey: 'nLujNbR2S07rHQ2UlgSiryFQ',
          path: this.$route.params.id,
          visitor: true
        });
      });
    },
    ServerIP() {
      return ServerIP
    },
    autolink,
    handleCopyCodeSuccess(event, text, result) {
      this.$notify({
        message: '复制成功',
        type: 'success',
        position: 'bottom-left',
        duration: 1000
      });
    },
    initArticle() {
      const ArticleId = this.$route.params.id
      try {
        axios.get('/article/' + ArticleId).then(res => {
          this.article = res
          axios.get(res.url).then(res => {
            this.loading=false
            this.getAllImg(res)
            this.markdown = res
            // this.markdown = md.render(this.markdown)
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    getAllImg(content) {
      const imgRegex = /!\[.*?\]\((.*?)\)/g;
      let match;
      const imgList = [];

      while ((match = imgRegex.exec(content)) !== null) {
        const src = match[1];
        imgList.push(src);
      }
      this.vueEasyLightbox.imgs = imgList
    },
    imgAddClickLinsener() {
      const articleContext = document.querySelector('.text')
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
  },
}
</script>
<template>
  <div>
    <Header/>
    <div>

      <PageHeader :article="article"/>
      <VueEasyLightbox :visible="vueEasyLightbox.visible" :imgsRef="vueEasyLightbox.imgs"
                       :indexRef="vueEasyLightbox.index"/>
      <div style="
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  margin: 0 auto ;
  flex-wrap: wrap;
  padding: 20px 15px;
  flex: 1;
">

        <!--        编辑按钮-->
        <div style="width: 100%;text-align: center;" v-if="userDto.userId===author.userId">
          <router-link :to='/update-article/+this.$route.params.id'>
            <el-button type="primary" icon="el-icon-edit">更新文章</el-button>
          </router-link>
          <!--          设置为私密文章-->
        </div>

        <div class="article-context" v-loading="loading">

          <!--        <div id="markdown-area" v-html="markdown"></div>-->
          <div style="overflow: hidden" class="text">
            <v-md-editor style=" display: flex; height: auto; max-height: none;"
                         :value="markdown" mode="preview"
                         left-toolbar="undo redo | tip"
                         :include-level="[2,3]"
                         @copy-code-success="handleCopyCodeSuccess"
            >
            </v-md-editor>
          </div>

          <!--          文章信息-->
          <el-card class="card">
            <!--            标题-->
            <div class="mb-2 test-color">
              文章作者:
              <span style="text-decoration: underline;color: #858585">
              {{ author.nickname }}
            </span>
            </div>
            <!--            链接-->
            <div class="mb-2 test-color">
              文章链接:
              <span class="mb-2">
                <el-link :underline="true" :href="article.url" target="_blank">{{
                    ServerIP() + '' + this.$route.path
                  }}</el-link>
              </span>
            </div>
            <!--            版权声明-->
            <div class="mb-2 test-color">
              版权声明:
              <span style="color: #858585">
                本博客所有文章除特别声明外，均采用
                <el-link href="https://creativecommons.org/licenses/by-nc-sa/4.0/"> CC BY-NC-SA 4.0</el-link>
                许可协议。转载请注明来自
                <el-link href="https://blog.zorange.online/"> Orange's_Blog</el-link>
              </span>
            </div>


          </el-card>

          <!--          分享-->
          <div class="share">
            <el-link :underline="false">
              <v-icon class="we-chat mr-2">mdi-wechat</v-icon>
            </el-link>
            <v-icon class="qq-chat">mdi-qqchat</v-icon>
          </div>

          <!--          智能推荐-->
          <div style="display: flex;padding: 10px 50px;">
            <div class="recommend-card" v-for="(item,index) in recommendedArticle" :key="index">
              <router-link :to="'/article-context/'+item.articleId">
                <el-image lazy fit="cover" :src="item.coverImg" class="recommend-img">
                </el-image>
              </router-link>
              <!--              标题-->
              <div style=" position: absolute;bottom: 20%;left: 30%;width: 100%;color: #ECF5FF; padding: 10px;z-index: 2 ">
                <div>
                  推荐
                </div>
                <div>
                  {{ item.title}}
                </div>
              </div>

            </div>
          </div>

          <!--          评论-->
          <div style="margin: 20px 20px;" id="vcomments"></div>

        </div>
        <SideBar/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommend-img {
  height: 100%;
  width: 100%;
  transition: all 0.5s;
}

.recommend-img:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  transition: all 0.5s ease;
}

.recommend-img:hover {
  transform: scale(1.1);
}

.recommend-card {
  position: relative;
  object-fit: cover;
  background-size: cover;
  overflow: hidden;
  height: 13em;
  width: 50%;
  border: 1px solid #f0f0f0;
}

.qq-chat {
  color: #56B6E7;
  border-radius: 5px;
}

.qq-chat:hover {
  color: white;
  background-color: #56B6E7;
}

.we-chat {
  color: #7BC549;
  border-radius: 5px;
}

.we-chat:hover {
  color: white;
  background-color: #7BC549;
}

.share {
  width: auto;
  text-align: right;
  margin: 10px 20px;
}

.test-color {
  color: #49B1F5;
  font-weight: bold;
}

.card {
  border: 1px;
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}

.card:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.09);
}

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
