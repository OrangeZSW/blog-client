<script>
import {mapState} from "vuex";

export default {
  name: "Center",
  computed:{
    ...mapState(['userDto','isLogin']),
  },
  watch: {
    isLogin: {
      handler: function (val) {
          this.content = []
          this.getHitokoto()
      },
      immediate: true
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      clearInterval(this.timrC)
      clearInterval(this.timrI)
      next()
    })
  },
  data() {
    return {
      site_name: 'Orange_Blog',
      subTitle:'',
      content: [],
    }
  },
  methods: {
    getHitokoto() {
      axios.get('https://v1.hitokoto.cn')
          .then(res => {
            this.content.push(res.hitokoto)
            this.content.push('— '+res.from)
            if(this.isLogin){
              this.content.push(this.userDto.subHeading)
              this.content.push('— '+this.userDto.nickname)
            }else{
              this.content.push('欢迎来到我的博客')
              this.content.push('— Orange')
            }
            // console.log(this.hitokoto)
          }).catch(err => {
        console.log(err)
        if(this.isLogin){
          this.content.push(this.userDto.subHeading)
          this.content.push('— '+this.userDto.nickname)
        }else{
          this.content.push('欢迎来到我的博客')
          this.content.push('— Orange')
        }
      })
    },
    runContent() {
      let k=0
      let flag = true
      let i = 0
      this.timrC=setInterval(() => {
        try {
          if(this.content[k]!==undefined){
            this.subTitle = this.content[k].substring(0, i)
          }
          if (flag) {
            i++
          } else if (i > 0) {
            i -= 3
          } else {
            flag = true
            //下一个
            k++
            k=k%this.content.length
          }
          if (i > this.content[k].length) {
            flag = false
          }
        }catch (e) {
          console.log(e)
        }
      }, 200)
    },
    runIcon(){
        this.timrI=setInterval(() => {
          const icon = document.querySelector('.icon')
          icon.style.transform = 'translateY(20px)'
          icon.style.opacity = '0.2'
          setTimeout(() => {
            icon.style.transform = 'translateY(0px)'
            icon.style.opacity= '1'
          }, 1500)
        }, 3000)
    },
    lookBlog(){
      let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // 如果当前滚动位置小于100vh，向下滚动100vh
      if (currentScrollTop < window.innerHeight) {
        document.body.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }
    }
  },
//   闪烁
  mounted() {
    this.getHitokoto()
      this.runContent()
      this.runIcon()
  },
  beforeDestroy() {
    clearInterval(this.timrC)
    clearInterval(this.timrI)
  }
}
</script>

<template>
  <div class="site_center" >
    <div class="site_name" style=" margin-top: 37vh" >{{isLogin ? userDto.nickname+"'s_Blog" : "Oranges"+"'_Blog"}}</div>
    <div ><span  style="color: white;font-size: 20px;margin-top: 20px;height: 20px;" v-if="content" >{{subTitle}}</span>
      <span aria-hidden="true" style="color: white;transition: color 1s ease" class="guangBiao">  |  </span>
    </div>
    <i ref="icon" class="icon el-icon-arrow-down"  @click="lookBlog" ></i>
  </div>
</template>

<style scoped >
.guangBiao{
  color: white;
  transition: color 1s ease;
  font-size: 1.72em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: move 1.5s infinite;
}
@keyframes move {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0px);
  }
}
.site_center{
  position: absolute;
  width: 100%;
  height: 100vh;
  text-align: center;
  justify-content: center;
}
.site_name {
  font-weight: bold;
  width: 100%;
  color: #ffffff;
  margin: auto auto auto 0;
  font-size: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
}
@media (max-width: 768px) {
  .site_name {
    font-size: 25px;
  }
}
.icon{
  z-index: 2;
  color: #ffffff;
  transition: transform 1.5s ease,opacity 1.5s ease;
  font-size: 40px;
  position: absolute;
  bottom: 20px;
}

</style>
