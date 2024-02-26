<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import md from "@/plugins/markdown-it";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "Article-Context",
  components: {SideBar, PageHeader, Header},
  data() {
    return {
      article:{},
      markdown: `# Hello World
      ## This is a markdown editor
      **Enjoy yourself!**
      `
    }
  },
  mounted() {
    const ArticleId = this.$route.params.id
    axios.get('/article/' + ArticleId).then(res => {
      this.article = res
      axios.get(res.url).then(res => {
        this.markdown = res
        // this.markdown = md.render(this.markdown)
      })
    })
  },
  methods: {
    handleCopyCodeSuccess(event, text, result) {
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    }
  }
}
</script>
<template>
  <div>
    <Header/>
    <div>
      <PageHeader :article="article"/>
      <div style="
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  margin: 0 auto ;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding: 40px 15px;
  flex: 1;
">
        <div class="article-context">
          <!--        <div id="markdown-area" v-html="markdown"></div>-->
          <v-md-editor style="padding: 50px 40px; display: flex; height: auto; max-height: none;"
                       :value="markdown" mode="preview"
                       left-toolbar="undo redo | tip"
                       :include-level="[2,3]"
                       @copy-code-success="handleCopyCodeSuccess"
          ></v-md-editor>
        </div>
        <SideBar/>
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
</style>
