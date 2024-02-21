<script>
import PageHeader from "@/components/Page-Header.vue";
import Login from "@/components/Login.vue";
import Header from "@/components/Header.vue";
import {mapMutations} from "vuex";

export default {
  name: "Tag",
  components: {Header, Login, PageHeader},
  methods:{
    ...mapMutations(['backLoginWindow'])
  }
}
</script>

<template>
  <div>
    <Header/>
    <div @click="backLoginWindow">
      <PageHeader/>
    </div>
  </div>
</template>

<style scoped>

</style>
