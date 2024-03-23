<script>
import sideBar from "@/components/SideBar.vue";

export default {
  name: "RightSide",
  computed: {
    sideBar() {
      return sideBar
    }
  },
  methods: {
    rightSide(){
      document.body.addEventListener("scroll", function () {
        const rightSide = document.querySelector('.right-side')
        const sets = document.querySelector('.sets')
        if (document.body.scrollTop===0) {
          rightSide.style.right = '-45px'
          sets.style.right = '-40px'
        } else {
          rightSide.style.right = '10px'
        }
      })
    },
    moveTop(){
      //平滑滚动到顶部
      document.body.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    displaySets(){
      //显示设置
      const sets = document.querySelector('.sets')
      if (sets.style.right === '10px') {
        sets.style.right = '-40px'
      } else {
        sets.style.right = '10px'
      }
    },
    sideBarDisPlay(){
      //单栏和双栏转换
      const sideBar = document.querySelector('.sidebar')
      if (sideBar.style.display !== 'block') {
        sideBar.style.display = 'block'
      } else {
        sideBar.style.display = 'none'
      }
    },
  },
  mounted() {
    this.rightSide()
  }
}
</script>

<template>
  <div class="right-side">
    <div class="sets">
      <button v-if="!this.$route.path.includes('all')" class="button mb-2 arrow" title="单栏和双栏转换" @click="sideBarDisPlay"><v-icon size="20" style="color: #ECF5FF">mdi-arrow-left-right</v-icon></button>
    </div>
    <button class="button mb-2 " title="设置" @click="displaySets"><v-icon size="20" class="setting" style="color: #ECF5FF">mdi-cog</v-icon></button>
    <button class="button" title="回到顶部" @click="moveTop"><v-icon size="20" style="color: #ECF5FF">mdi-arrow-up</v-icon></button>
  </div>
</template>

<style scoped>
.sets{
  position: fixed;
  display: flex;
  flex-direction: column;
  right: -40px;
  bottom: 130px;
  transition: all 0.5s ease;
}
.right-side{
  position: fixed;
  right: -40px;
  bottom: 50px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
}
.button{
  width: 35px;
  height: 35px;
  background-color: #6DC0F7;
  border-radius: 5px;
}
.button:hover{
  background-color: #FF8E67;
}
.setting{
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 768px) {
  .arrow{
    display: none;
  }
}
</style>
