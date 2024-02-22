<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import Login from "@/components/Login.vue";
import {mapState} from "vuex";

export default {
  name: "AllCategory",
  components: {Login, PageHeader, Header},
  computed: {
    ...mapState(['userDto', 'isLogin','loginWindow']),
  },
  data() {
    return {}
  },
}
</script>

<template>

  <div>
    <Header />
    <div>
      <PageHeader class="blog-wrapper" />
    </div>
  </div>
</template>

<style scoped>
.blog-wrapper{
  display: flex;

}
</style>
