<script>
import ServerIP from "@/assets/config";
import {mapState} from "vuex";
export default {
  name: "CustomSettings",
  computed:{
    ...mapState(['userDto'])
  },
  data() {
    return {
      user:{
        avatar:'',
        coverImg:'',
        announcement:'',
      },
    }
  },
  mounted() {
    this.user = JSON.parse(JSON.stringify(this.userDto));
  },
  methods:{
    ServerIP() {
      return ServerIP
    },
    handleSuccess(res) {
      //复制res.data到剪切板
      if (res.code === '200') {
        let imgUrl = res.data.toString()
        navigator.clipboard.writeText(imgUrl)

        this.$message({
          message: '上传成功,已复制URL到剪切板',
          type: 'success'
        });
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }
    },
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
}
</script>

<template>
<div >
  <el-card style="height: auto;width: auto;overflow: hidden">
<!--    头像、博客背景图片-->
    <el-form label-position="top" label-width="100px" >
      <el-form-item label="修改背景">
        <el-input v-model="user.coverImg" placeholder="请输入博客背景图片地址"></el-input>
<!--        预览-->
        <el-image
            class="mt-5"
            style="width: 150px; height: 100px"
            lazy
            :src="user.coverImg"
            fit="cover">
        </el-image>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
            class="upload-demo"
            :action="ServerIP() + '/files/upload/img'"
            :on-success="handleSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUserInfo">保存</el-button>
      </el-form-item>
    </el-form>

  </el-card>
</div>
</template>

<style scoped>

</style>
