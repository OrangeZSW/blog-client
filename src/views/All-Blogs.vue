<script>
import Header from "@/components/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import Login from "@/components/Login.vue";
import {mapState} from "vuex";

export default {
  name: "Blog",
  components: {Login, PageHeader, Header},
  computed: {
    ...mapState(['userDto', 'isLogin','loginWindow']),
  },
  mounted() {

  },
  data() {
    return {}
  },
  methods: {
    backLoginWindow() {
      if (this.loginWindow) {
        const Login = document.querySelector('.login')
        if (!Login.contains(event.target)) {
          Login.style.zIndex = '0'
          Login.style.opacity = '0'
          Login.style.right = '-400px'
          setTimeout(() => {
            this.$store.commit('setLoginWindowStatus', false)
          }, 500)
        }
      }
    },
  }
}
</script>

<template>

  <div>
    <Header />
    <div @click="backLoginWindow">
      <Login />
      <PageHeader class="blog-wrapper" />
    </div>
  </div>
</template>

<style scoped>
.blog-wrapper{
  display: flex;

}
</style>
