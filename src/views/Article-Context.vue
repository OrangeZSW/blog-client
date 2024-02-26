<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import Codemirror from "codemirror";
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
      })
    })
    new Codemirror(this.$refs.codemirrorEditor, {
      tabSize: 2,
      lineNumbers: true,
      styleActiveLine: true,
      value: this.text,
      mode: 'markdown',
      lineWrapping: 'wrap',
      scrollbarStyle: 'overlay',
      dragDrop: false,
      // 传入的配置将会在此合并
      ...this.codemirrorConfig,
    });
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
        <v-md-editor class="" style="padding: 50px 40px; display: flex; height: auto; max-height: none;"
                     :value="markdown" mode="preview"
                     left-toolbar="undo redo | tip"
                     :include-level="[2,3]"
                     @copy-code-success="handleCopyCodeSuccess"

        ></v-md-editor>
      </div>
  </div>
</div>
</template>

<style scoped>
@import "@/assets/my.css";
.article-context{
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
