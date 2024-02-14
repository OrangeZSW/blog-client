<script>
export default {
  name: "Center",
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
            this.content.push(res.data.hitokoto)
            this.content.push('— '+res.data.from)
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
      setInterval(() => {
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
      }, 200)
    },
    runIcon(){
      setInterval(() => {
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
      let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // 如果当前滚动位置小于100vh，向下滚动100vh
      if (scrollPosition < window.innerHeight) {
        window.scrollTo({
          top: window.innerHeight, // 滚动目标位置
          behavior: 'smooth' // 平滑滚动
        });
      }
    }
  },
//   闪烁
  mounted() {
    setInterval(() => {
      const site_name = document.querySelector('.guangBiao')
      site_name.style.color = 'white'
      setTimeout(() => {
        site_name.style.color = 'transparent'
      }, 1000)
    }, 2000)
    this.getHitokoto()
    this.runContent()
    this.runIcon()
  }
}
</script>

<template>
  <div class="site_center" >
    <div class="site_name" style="font-size: 40px; margin-top: 37vh" >{{site_name}}</div>
    <div><span style="color: white;font-size: 20px;margin-top: 20px;height: 20px; " v-if="content" >{{subTitle}}</span>
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
}
.site_center{
  position: absolute;
  width: 100%;
  height: 100vh;
  text-align: center;
  align-items: center;

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
