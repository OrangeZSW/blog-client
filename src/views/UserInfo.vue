<script>
import Header from "@/components/Global/Header.vue";
import PageHeader from "@/components/Page-Header.vue";
import {mapState} from "vuex";

export default {
  name: "UserInfo",
  components: {PageHeader, Header},
  computed:{
    ...mapState(['userDto', 'isLogin'])
  }
}
</script>

<template>
  <div style="display: flex;background-image: url('https://server.blog.zorange.online/files/download/ddca66f8ff1a4143b24c9dfb87bb2888.png');width: 100%;height: 100%;background-position: center;background-size: cover;">
    <Header/>
    <el-card class="content">
      <div style="width: 100%;height: auto">
        <div style="width: 110px;display: flex;flex-wrap: wrap">
          <el-avatar class="user-avatar" :src="userDto.avatar"  :size="110" shape="circle" fit="fill" ></el-avatar>
          <el-tag style="font-size: 20px;font-weight: 700;margin: 10px auto auto auto">{{userDto.nickname}}</el-tag>
        </div>
        <div>
          <v-icon>mdi-radiator</v-icon>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.content{
  width: 50%;
  background: rgba(255,255,255,0.3);
  margin: 200px 45em auto auto;
  transition: all 0.5s ease;
  display: flex;
  flex-wrap: wrap;
}
.content:hover{
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.09);
}
</style>
