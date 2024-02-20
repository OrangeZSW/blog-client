<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";

export default {
  name: "Blog",
  components: {PageHeader, Header}
}
</script>

<template>
  <div class="blog-wrapper">
    <PageHeader/>
    <Header/>
  </div>
</template>

<style scoped>
.blog-wrapper{
  display: flex;

}
</style>
