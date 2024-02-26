<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import md from "@/plugins/markdown-it";
export default {
  name: "Article-Context",
  components: {PageHeader, Header},
  data() {
    return {
      markdown: `# Hello World
      ## This is a markdown editor
      **Enjoy yourself!**
      `
    }
  },
  mounted() {
    const ArticleId = this.$route.params.id
    axios.get('/article/'+ArticleId).then(res => {
      axios.get(res.url).then(res => {
        this.markdown = res
        // this.markdown = md.render(this.markdown)
      })
    })
  },
  methods:{
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
    <PageHeader/>
      <div class="article-context">
<!--        <div id="markdown-area" v-html="markdown"></div>-->
        <template  >
          <v-md-editor   style="padding: 50px 40px; display: flex; height: auto; max-height: none;"
                         :value="markdown" mode="preview"
                         left-toolbar="undo redo | tip"
                         :include-level="[2,3]"
                         @copy-code-success="handleCopyCodeSuccess"
          ></v-md-editor>
        </template>
      </div>
  </div>
</div>
</template>

<style scoped>
.article-context{
  padding: 50px 40px;
  height: auto;
  width: 50%;
  margin: 40px auto 20px auto;
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
  overflow: hidden;

}
.article-context:hover{
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
}
</style>
