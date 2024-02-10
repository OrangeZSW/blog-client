<script>

export default {
  name: "login",
  props: {
    login: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<template>
  <div  class="login">
    <span class="title">登录</span>
  </div>
</template>

<style scoped>
.title{
  font-size: 30px;
  font-weight: bold;
  margin: 20px auto auto 20px;
  display: flex;
  color: white;
  z-index: 1;
  filter: brightness(1.5);
}
.login{
  width: 350px;
  height: 400px;
  background: rgba(255,255,255,0.5);
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  position: absolute;
  border-radius: 10px;
  opacity: 0.5;
  right: 100px;
  top: 200px;
}
</style>
