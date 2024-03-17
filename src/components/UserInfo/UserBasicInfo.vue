<script>
import {mapState} from "vuex";

export default {
  name: "UserBasicInfo",
  computed: {
    ...mapState(['userDto'])
  },
  methods: {
    updateUserInfo() {
      axios.post('/user', this.user).then(res => {
        if(res.code==='200'){
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        this.$store.dispatch('updateUserDto')
        }
        else{
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  },
  mounted() {
    this.user = JSON.parse(JSON.stringify(this.userDto));
  },
  data(){
    return {
      user: {},
    }
  }
}
</script>

<template>

  <div style="display: flex;  width: 100%; height: auto; ">
    <el-card class="content">
      <div style="display: flex; justify-content: center; align-items: center;">
        <el-avatar :size="100" :src="userDto.avatar"></el-avatar>
      </div>
      <el-form class="mt-5" label-width="70px">
        <el-form-item label="用户名">
          <el-input class="input"   v-model="user.username" ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input class="input" v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input class="input"  v-model="user.description"></el-input>
        </el-form-item>
        <el-form-item label="副标题 ">
          <el-input class="input"  v-model="user.subHeading"></el-input>
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
  transition: all 0.5s ease;
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
}

.content:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.09);
}
@media screen and (max-width: 768px) {
  .content {
    width: 100%;
  }
  .input {
    width: 100%;
  }
}
</style>
