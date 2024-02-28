<script>
import PageHeader from "@/components/Page-Header.vue";
import Login from "@/components/Global/Login.vue";
import Header from "@/components/Global/Header.vue";
import {mapMutations} from "vuex";

export default {
  name: "Tag",
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
