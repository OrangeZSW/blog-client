<script>
import Header from "@/components/Global/Header.vue";
import {mapMutations, mapState} from "vuex";

export default {
  name: "UserInfo",
  components: {Header},
  computed: {
    ...mapState(['userDto'])
  },
  methods: {
    updateUserInfo() {
      axios.post('/user', this.userDto).then(res => {
        if(res.code==='200'){
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }
        else{
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>

<template>
  <div style="display: flex; background-image: url('https://server.blog.zorange.online/files/download/ddca66f8ff1a4143b24c9dfb87bb2888.png'); width: 100%; height: 100%; background-position: center; background-size: cover;">
    <Header/>
    <el-card class="content">
      <div style="display: flex; justify-content: center; align-items: center;">
        <el-avatar :size="100" :src="userDto.avatar"></el-avatar>
      </div>
      <el-form class="mt-5" label-width="120px">
        <el-form-item label="用户名">
          <el-input class="input"  v-model="userDto.username" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input class="input" v-model="userDto.email" ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input class="input" v-model="userDto.nickname"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input class="input" v-model="userDto.description"></el-input>
        </el-form-item>
        <el-form-item label="副标题 ">
          <el-input class="input" v-model="userDto.subHeading"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.input {
  box-sizing: border-box;
  width: 30%;
}

.content {
  width: 50%;
  background: rgba(255, 255, 255, 0.3);
  margin: 200px 45em auto auto;
  transition: all 0.5s ease;
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
}

.content:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.09);
}
</style>
