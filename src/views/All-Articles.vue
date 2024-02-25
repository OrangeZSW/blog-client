<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import ArticlesContent from "@/components/Articles-Content.vue";
import Login from "@/components/Login.vue";
import {mapMutations} from "vuex";

export default {
  name: "Article",
  components: {Login, ArticlesContent, PageHeader, Header},
  methods: {
    ...mapMutations(['setArticles']),
    load(){
      axios.get('/article').then(res => {
        this.setArticles(res.data)
      })
    }
  },
  mounted() {
    this.load()
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
</style>
