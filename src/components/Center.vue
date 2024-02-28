<script>
import {mapState} from "vuex";

export default {
  name: "Center",
  computed:{
    ...mapState(['userDto','isLogin']),
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      clearInterval(this.timrGB)
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
      self:['I LOVE YOU!','— orange']
    }
  },
  methods: {
    getHitokoto() {
      axios.get('https://v1.hitokoto.cn')
          .then(res => {
            this.content.push(res.hitokoto)
            this.content.push('— '+res.from)
            this.content.push(...this.self)
            // console.log(this.hitokoto)
          }).catch(err => {
        console.log(err)
        this.content.push(...this.self)
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
     this.timrGB=setInterval(() => {
        const site_name = document.querySelector('.guangBiao')
        site_name.style.color = 'white'
        setTimeout(() => {
          site_name.style.color = 'transparent'
        }, 1000)
      }, 2000)
      this.runContent()
      this.runIcon()
  },
  beforeDestroy() {
    clearInterval(this.timrGB)
    clearInterval(this.timrC)
    clearInterval(this.timrI)
  }
}
</script>

<template>
  <div class="site_center" >
    <div class="site_name" style="font-size: 40px; margin-top: 37vh" >{{isLogin ? userDto.nickname+"'s_Blog" : "Oranges"+"'_Blog"}}</div>
    <div ><span style="color: white;font-size: 20px;margin-top: 20px;height: 20px;" v-if="content" >{{subTitle}}</span>
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
  font-size: 2em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
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
