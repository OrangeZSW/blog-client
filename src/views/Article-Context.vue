<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";

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
  }
}
</script>
<template>
<div>
  <Header/>
  <div>
    <PageHeader/>
      <div class="article-context">
        <v-md-editor style="padding: 50px 40px"  :value="markdown" mode="preview"
                     left-toolbar="undo redo | emoji"
        ></v-md-editor>
      </div>
  </div>
</div>
</template>

<style scoped>
.article-context{
  width: 50%;
  margin: 40px auto 20px auto;
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
}
.article-context:hover{
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
}
</style>
