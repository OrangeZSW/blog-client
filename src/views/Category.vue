<script>
import PageHeader from "@/components/Page-Header.vue";
import Login from "@/components/Login.vue";
import Header from "@/components/Header.vue";
import {mapMutations} from "vuex";

export default {
  name: "Category",
  components: {Header, Login, PageHeader},
}
</script>

<template>
  <div>
    <Header/>
    <div>
      <PageHeader/>
    </div>
  </div>
</template>

<style scoped>

</style>
