<script>

import Header from "@/components/Global/Header.vue";
import Aside from "@/components/UserInfo/Aside.vue";
import UserBasicInfo from "@/components/UserInfo/UserBasicInfo.vue";

export default {
  name: "UserInfo",
  components: {UserBasicInfo, Aside, Header},
  methods:{
  },
  mounted() {
  }
}
</script>

<template>

  <div style="background-image: url('https://server.blog.zorange.online/files/download/ddca66f8ff1a4143b24c9dfb87bb2888.png'); background-position: center; background-size: cover;">
    <Header/>
    <div>
      <el-container style="height: 100vh; border: 1px solid #eee;padding-top: 60px;">
        <Aside/>
        <el-container>
        <router-view/>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<style scoped>

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  overflow: hidden;
}
</style>
