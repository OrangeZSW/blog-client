<script>
import PageHeader from "@/components/Page-Header.vue";
import ArticlesContent from "@/components/Articles-Content.vue";
import Display from "@/components/Dispaly.vue";
import Header from "@/components/Global/Header.vue";
import Login from "@/components/Global/Login.vue";

export default {
  name: "Article",
  components: {Login, Header, Display, ArticlesContent, PageHeader},
}
</script>

<template>
 <div>
    <Header/>
   <div>
     <PageHeader/>
     <Display/>
   </div>
 </div>
</template>

<style scoped>

</style>
