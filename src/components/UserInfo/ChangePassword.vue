<script>
import {mapState} from "vuex";

export default {
  name: "ChangePassword",
  computed: {
    ...mapState(['userDto'])
  },
  data(){
    return {
      time:0,
      user:{
        newPassword:'',
        checkPassword:'',
        code:'',
      },
      rules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods:{
    changePassword(){
      this.formCheck()
      axios.get('/email/code/verifyPassword',{
        params:{
          password:this.user.newPassword,
          code:this.user.code,
          userId:this.userDto.userId
        }
      }).then(res=>{
        if(res.code==='200'){
          this.$message({
            message: '修改成功',
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
    },
    passwordCheck() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if(!reg.test(this.user.newPassword)){
        this.$message({
          message: '密码至少包含数字和字母',
          type: 'warning'
        });
        return false
      }
      return true
    },
    formCheck(){
      if(this.user.newPassword!==this.user.checkPassword){
        this.$message({
          message: '两次密码不一致',
          type: 'warning'
        });
        return false
      }
      else if (!this.passwordCheck()){
        return false
      }
      else if(this.userDto.email===""||this.userDto.email===null||this.userDto.email===undefined){
        this.$message({
          message: '请先绑定邮箱',
          type: 'warning'
        });
        return false
      }
      return true
    },
    timeDown(){
      if(this.time>0){
        setTimeout(()=>{
          this.time--;
          this.timeDown();
        },1000)
      }
    },
    sendCode(){
      this.user.code=''
      if(!this.formCheck()){
        return
      }
      axios.get('/email/code',{
        params:{
          email:this.userDto.email
        }
      }).then(res=>{
        if(res.code==='200'){
          this.time=60;
          this.timeDown();
          this.$message({
            message: '验证码已发送',
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

 <div>
   <el-card style="height: auto;width: auto;overflow: hidden">
     <el-form :model="user"  :rules="rules" label-width="80px"  class="form">
       <el-form-item label="原密码" >
         <el-input type="password" v-model="userDto.password" disabled></el-input>
       </el-form-item>
       <el-form-item label="新密码" prop="newPassword" :show-password="true">
         <el-input type="password" v-model="user.newPassword"></el-input>
       </el-form-item>
       <el-form-item label="确认密码" prop="checkPassword" show-password>
         <el-input type="password" v-model="user.checkPassword"></el-input>
       </el-form-item>
       <el-form-item label="验证码" prop="code">
         <el-input class="input" v-model="user.code"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button class="mt-5" @click="sendCode"  :disabled="time!==0" >
           {{ time=== 0 ? '发送验证码' : time + 's' }}
         </el-button>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="changePassword">提交</el-button>
       </el-form-item>
     </el-form>
   </el-card>
 </div>

</template>

<style scoped>
.form{
  width: 400px  ;
}
@media (max-width: 768px) {
  .form{
    width: auto ;
  }
}
</style>
