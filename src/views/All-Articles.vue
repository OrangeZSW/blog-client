<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import ArticlesContent from "@/components/Articles-Content.vue";

export default {
  name: "Article",
  components: {ArticlesContent, PageHeader, Header}
}
</script>

<template>
  <div>
    <Header/>
    <PageHeader/>
      <ArticlesContent class="onlyArticle"/>
  </div>
</template>

<style scoped>
.onlyArticle{
  width: 50%;
  margin: 20px auto 20px auto;
}
</style>
