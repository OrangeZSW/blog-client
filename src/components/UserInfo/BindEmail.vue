<script>

import {mapState} from "vuex";

export default {
  name: "BindEmail",
  computed: {
    ...mapState(['userDto'])
  },
  methods: {
    //邮箱格式验证
    emailCheck(email) {
      let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      return reg.test(email);
    },
    timeDown(){
      if(this.time>0){
        setTimeout(()=>{
          this.time--;
          this.timeDown();
        },1000)
      }

    },
    sendCode() {
      this.code = ''
      if (this.emailCheck(this.user.email)) {
        axios.get('/email/code?email=' + this.user.email).then(res => {
          if (res.code === '200') {
            this.time=60;
            this.timeDown();
            this.$message({
              message: '验证码已发送',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      } else {
        this.$message({
          message: '邮箱格式错误',
          type: 'warning'
        });
      }
    },
    codeVerify() {
      if (this.emailCheck(this.user.email)) {
        axios.get('/email/code/verifyEmail',{
          params:{
            email:this.user.email,
            code:this.code
          }
        }).then(res => {
          if (res.code === '200') {
            this.updateEmail();
            this.code=''
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      } else {
        this.$message({
          message: '邮箱格式错误',
          type: 'warning'
        });
      }
    },
    updateEmail() {
      if(this.userDto.email!==''){
        this.user.email = ''
      }
      axios.post('/user', this.user).then(res => {
        if (res.code === '200') {
          this.$store.dispatch('updateUserDto')
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  },
  data() {
    return {
      user: {},
      code: '',
      time: 0,
    }
  },
  mounted() {
    this.user = JSON.parse(JSON.stringify(this.userDto));
  }
}
</script>

<template>
  <div>
    <el-card class="content">
      <el-form class="mt-5" label-width="70px">
        <el-form-item label="邮箱">
          <el-input  v-model="user.email" :disabled="this.userDto.email!==''&&this.userDto.email!==null"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="input" v-model="code"></el-input>
          <el-button class="mt-5" @click="sendCode"  :disabled="time!==0" >
            {{ time=== 0 ? '发送验证码' : time + 's' }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='codeVerify'>{{ this.userDto.email === ''||null ? '绑定' : '取消绑定' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.content {
  width: auto;
  height: auto;
  overflow: hidden;
}

.content:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.09);
}
</style>
