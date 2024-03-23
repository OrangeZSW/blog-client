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

  <div style="background-image: url('/img/UserInfo.png'); background-position: center; background-size: cover;">
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

</style>
