<script>
import Header from "@/components/Global/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import ArticlesContent from "@/components/Articles-Content.vue";
import Login from "@/components/Global/Login.vue";
import {mapMutations} from "vuex";

export default {
  name: "Article",
  components: {Login, ArticlesContent, PageHeader, Header},
  methods: {
    ...mapMutations(['setArticles']),
  },
  mounted() {
  }
}
</script>

<template>
  <div>
    <Header/>
    <div>
      <PageHeader/>
      <ArticlesContent class="onlyArticle"/>
    </div>
  </div>
</template>

<style scoped>
.onlyArticle{
  width: 50%;
  margin: 20px auto 20px auto;
}
@media screen and (max-width: 768px) {
  .onlyArticle{
    width: 90%;
  }
}
</style>
